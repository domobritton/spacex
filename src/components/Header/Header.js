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
                        style={{marginRight: '25px'}}
                        onFocus={this.onFocus}>
                        Launches
                    </StyledLink>
                    <StyledLink
                        to="page1"
                        showHeightActive="300"
                        style={{marginRight: '20px'}}
                        onFocus={this.onFocus}>
                        Equipment
                    </StyledLink>
                    <StyledLink
                        to="page2"
                        showHeightActive="300"
                        onFocus={this.onFocus}>
                        History
                    </StyledLink>
                    <StyledLink
                        to="page3"
                        showHeightActive="300"
                        onFocus={this.onFocus}>
                        About
                    </StyledLink>
                    <NavBar ref={(c) => { this.bar = c; }} />
                </Wrapper>
            </Nav>
        )
    }
}

const Nav = styled.div`
    position: fixed;
    top: 0;
    background: #2D3436;
    color: #fff;
    width: 100vw;
    height: 58px;
    z-index: 99;
`;

const Wrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: row;
`;

const StyledLink = styled(Link)`
    width: 100px;
    height: 100%;
    line-height: 58px;
    text-align: center;
    cursor: pointer;

    @media all and (max-width: 768px) {
        font-size: 14px;
    }
`;

const NavBar = styled.div`
    width: 100px;
    position: absolute;
    top: 58px;
    left: 0;
    height: 2px;
    background: #fff;
    transition: left .3s;

    @media all and (max-width: 768px) {
        display: none;
    }
`;

