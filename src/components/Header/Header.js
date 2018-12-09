import React, { Component } from 'react'
import ScrollAnim from 'rc-scroll-anim'
import styled from 'styled-components'

const Link = ScrollAnim.Link

export default class Header extends Component {
    componentDidMount() {
        const EventListener = ScrollAnim.Event
        EventListener.addEventListener('resize.userResize', this.barAnimate.bind(this));
    }

    onFocus = (e) => {
        this.dom = e.target;
        this.barAnimate();
    }

    barAnimate = () => {
        if (!this.dom) {
            return;
        }
        const bar = this.bar;
        bar.style.left = `${this.dom.getBoundingClientRect().left}px`;
    }

    render() {
        return (
            <Nav>
                <Wrapper>
                <StyledLink
                    to="page0"
                    showHeightActive="300"
                    onFocus={this.onFocus}>
                    Launches
                </StyledLink>
                <StyledLink
                    to="page1"
                    showHeightActive="300"
                    onFocus={this.onFocus}>
                    Landings
                </StyledLink>
                <StyledLink
                    to="page2"
                    showHeightActive="300"
                    onFocus={this.onFocus}>
                    Sites
                </StyledLink>
                <StyledLink
                    to="page3"
                    showHeightActive="300"
                    onFocus={this.onFocus}>
                    Reuse
                </StyledLink>
                <NavBar ref={(c) => { this.bar = c; }} />
                </Wrapper>
            </Nav>
        )
    }
}

const Nav = styled.div`
    position: fixed;
    background: #0098CE;
    color: #fff;
    width: 100%;
    height: 58px;
    z-index: 9999;
    top: 0;
`

const Wrapper = styled.div`
    float: right;
    padding-right: 30px;
`
const StyledLink = styled(Link)`
    width: 100px;
    height: 100%;
    float: left;
    line-height: 58px;
    text-align: center;
    cursor: pointer;
    margin-right: 30px;
    transition: background .45s;
`

const NavBar = styled.div`
    width: 100px;
    position: absolute;
    top: 58px;
    left: 0;
    height: 2px;
    background: #fff;
    transition: left .3s;
`

