import ScrollAnim from 'rc-scroll-anim'
import React, { Component } from 'react'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

import TweenOne from 'rc-tween-one'
import styled from 'styled-components'

const ScrollOverPack = ScrollAnim.OverPack
ScrollAnim.scrollScreen.init({ loop: true })

export default class About extends Component {
    constructor() {
        super()

        this.state = {
            data: [],
        }
  }

  componentDidMount() {
    fetch('https://api.spacexdata.com/v2/info')
      .then(res => res.json())
      .then(data => this.setState({ data: data }))
      .catch(err => console.error(err));
  }

    render() {
        const { data } = this.state 
        return (
            <Page>
              <Image />
              <Scroll
                playScale={1}
                id="page4">
                <Tween
                  animation={{ y: 0, opacity: 1 }}
                  key="7">
                  <Content>    
                      <Tabs>
                        <Folder>
                            <StyledTab>About</StyledTab>
                            <StyledTab>Stats</StyledTab>
                        </Folder>
                    
                        <TabPanel>
                            <Item1>{data.summary}</Item1>
                        </TabPanel>
                        <TabPanel>
                            <Title>Company Info</Title>
                           {data ? 
                           <List>
                                <Item>Founded: {data.founded}</Item>
                                <Item>Employees: {data.employees}</Item>
                                <Item>Launch Sites: {data.launch_sites}</Item>
                                <Item>Test Sites: {data.test_sites}</Item>
                                <Item>Rockets: {data.vehicles}</Item>
                            </List> : <List></List>
                        } 
                        </TabPanel>
                    </Tabs>
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
    padding-top: 10%;
`;

const Content = styled.div`
    margin: 0 auto;
    width: 60%;
    padding: 10px;
    height: 400px;
    background-color: rgba(0,0,0,0.4);
    margin-top: 20px;
    border-radius: 4px;
    color: #ffffff;
`;

const Folder = styled(TabList)`
    display: flex;
    justify-content: flex-start;
    flex-direction: row;
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

    &:hover {
        color: white;
        -webkit-box-shadow: 2px -1px 0px -1px orange;
        -moz-box-shadow: 2px -1px 0px -1px orange;
        box-shadow: 2px -1px 0px -1px orange;
        
    }
`;

const Title = styled.h2`
    text-align: center;
`;


const List = styled.ul`
    margin: 80px;
`;

const Item = styled.li`
    list-style: none;
`;

const Item1 = styled.p`
    margin: 80px;
`;

const Tween = styled(TweenOne)`
    opacity: 0;
    transform: translateY(100px);
`;

const Image = styled.div `
    position: absolute;
    top: 4000px;
    left: 0;
    right: 0;
    bottom: 0;
    background-image: url("https://c1.staticflickr.com/5/4888/32040173048_b4a45010a0_m.jpg");
    background-color: #cccccc;
    height: 1000px; 
    background-position: center; 
    background-repeat: no-repeat;
    background-size: cover;
    z-index: -1;
`;