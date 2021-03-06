import ScrollAnim from 'rc-scroll-anim'
import React, { Component } from 'react'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'

import TweenOne from 'rc-tween-one'
import styled from 'styled-components'
import apiGet from '../apiGet/apiGet'

const ScrollOverPack = ScrollAnim.OverPack
ScrollAnim.scrollScreen.init({ loop: true })

export default class About extends Component {
    constructor() {
        super()

        this.state = {
            company: {},
        }
  }

  async componentDidMount() {
      const company = await apiGet(`info`)
      this.setState({ company })
  }

    render() {
        const { company } = this.state 
     
        return (
            <Page>
                <HeroWrapper>
                    <HeroImage src={`https://farm5.staticflickr.com/4760/40126462231_c11129efbe_k.jpg`} />
                </HeroWrapper>
                <Scroll
                    playScale={1}
                    id="page3">
                    <Tween
                    animation={{ y: 0, opacity: 1 }}
                    key="3">
                        <Content> 
                            {company.length < 1 ? 
                            <Info>
                                <Loading>No Info To Show</Loading>
                            </Info>
                            :
                            <Tabs>
                                <Folder>
                                    <StyledTab>ABOUT</StyledTab>
                                    <StyledTab>INFO</StyledTab>
                                </Folder>
                            
                                <TabPanel>
                                    <Title>ABOUT SPACEX</Title>
                                    <Item1>{company.summary}</Item1>
                                </TabPanel>
                                <TabPanel>     
                                    <Title>COMPANY INFO</Title>
                                    <List>
                                        <Item>Founded: {company.founded}</Item>
                                        <Item>Employees: {company.employees}</Item>
                                        <Item>Launch Sites: {company.launch_sites}</Item>
                                        <Item>Test Sites: {company.test_sites}</Item>
                                        <Item>Rockets: {company.vehicles}</Item>
                                    </List>
                                    <Title>COMPANY LEADERSHIP</Title>
                                    <List>
                                        <Item>CEO: {company.ceo}</Item>
                                        <Item>COO: {company.coo}</Item>
                                        <Item>CTO: {company.cto}</Item>
                                    </List> 
                                </TabPanel>
                            </Tabs>
                            }   
                        </Content>
                    </Tween>
                </Scroll>
            </Page>
        )
    }
}

const Page = styled.div `
    overflow: hidden;
    height: 1000px;
    width: 100vw;
    font-family: 'Noto Sans', sans-serif;
`;

const Scroll = styled(ScrollOverPack)`
    background: transparent;
    width: 100%;
    height: 1000px;
    padding-top: 5%;

    @media all and (max-width: 768px) {
        padding-top: 15%;
    }
`;

const Content = styled.div`
    margin: 0 auto;
    flex-grow: 1;
    position: relative;
    overflow: hidden;
    width: 80vw;
    padding: 10px;
    height: 80vh;
    background-color: rgba(0,0,0,0.4);
    margin-top: 2%;
    border-radius: 4px;
    color: #ffffff;

    @media all and (max-width: 975px) {
        width: 90%;
    }

    @media all and (max-width: 768px) {
        width: 95%;
        height: 75vh;
    }
`;

const Info = styled.div `
  display: flex;
  justify-content: center;
  align-items: center;
  height: 70vh;
`;

const Loading = styled.div `
  font-size: 12px;
`;

const Folder = styled(TabList)`
    display: flex;
    justify-content: flex-start;
    flex-direction: row;
    margin-bottom: 40px;
`;

const StyledTab = styled(Tab)`
    list-style: none;
    cursor: pointer;
    color: #8d8d8d;
    width: 100px;
    height: 40px;
    margin-right: 10px;
    border-right: 1px solid orange;
    border-bottom: 1px solid orange;
    border-bottom-right-radius: 8px;
    transition: all .35s ease-in-out;

    &:hover, &.react-tabs__tab--selected {
        color: white;
        -webkit-box-shadow: 2px -1px 0px -1px orange;
        -moz-box-shadow: 2px -1px 0px -1px orange;
        box-shadow: 2px -1px 0px -1px orange;
        
    }
`;

const Title = styled.h2`
    text-align: center;
    font-family: 'Exo', sans-serif;
    font-size: 35px;

    @media all and (max-width: 768px) {
        font-size: 25px;
    }
`;


const List = styled.ul`
    margin: 30px 80px;
    display: flex;
    justify-content: space-between;

    @media all and (max-width: 768px) {
        margin: 40px;
    }
`;

const Item = styled.li`
    list-style: none;

    @media all and (max-width: 768px) {
        font-size: 12px;
    }
`;
    
const Item1 = styled.p`
    margin: 80px;
    line-height: 24px;

    @media all and (max-width: 768px) {
        margin: 40px;
    }
`;

const Tween = styled(TweenOne)`
    opacity: 0;
    transform: translateY(100px);
`;

const HeroWrapper = styled.div `
    position: absolute;
    top: 3000px;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #cccccc;
    height: 1000px; 
    z-index: -1;
    overflow: hidden;
`;

const HeroImage = styled.img `
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    width: 100%;
    height: 100%;
`;