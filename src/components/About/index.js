import ScrollAnim from 'rc-scroll-anim'
import React, { Component } from 'react'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

import TweenOne from 'rc-tween-one'
import Animate from 'rc-animate'
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
              <StyledScrollThree
                playScale={1}
                id="page4">
                <Spacer />
                <Animate key="6" transitionName="fade" transitionAppear>
                  <ContentOne></ContentOne>
                </Animate>
                <StyledTweenOne
                  animation={{ y: 0, opacity: 1 }}
                  key="7">
                  <ContentTwo>    
                      <Tabs>
                        <TabList>
                            <StyledTab>Title 1</StyledTab>
                            <StyledTab>Title 2</StyledTab>
                        </TabList>
                    
                        <TabPanel>
                            <h2>{data.summary}</h2>
                        </TabPanel>
                        <TabPanel>
                            <h2>Company Info</h2>
                           {data ? 
                           <ul>
                                <List>Founded: {data.founded}</List>
                                <List>Employees: {data.employees}</List>
                                <List>Launch Sites: {data.launch_sites}</List>
                                <List>Test Sites: {data.test_sites}</List>
                                <List>Rockets: {data.vehicles}</List>
                            </ul> : <ul></ul>
                        } 
                        </TabPanel>
                    </Tabs>
                </ContentTwo>
                </StyledTweenOne>
              </StyledScrollThree>
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

const StyledScrollThree = styled(ScrollOverPack)`
    background: transparent;
    width: 100%;
    height: 1000px;
`;

const Spacer = styled(TweenOne)`
    width: 100%;
    opacity: 0;
    color: #fff;
    font-size: 32px;
    padding-top: 10%;
    text-align: center;
    padding-bottom: 50px;
`;

const ContentOne = styled.div`
    margin: 0 auto;
    width: 60%;
    padding: 1px 80px;
    text-align: center;
    background-color: rgba(0,0,0,0.4);
    border-radius: 4px;
    color: #ffffff;
    font-size: 2rem;
`;

const ContentTwo = styled.div`
    margin: 0 auto;
    width: 60%;
    padding: 80px 10px;
    background-color: rgba(0,0,0,0.4);
    margin-top: 20px;
    border-radius: 4px;
    color: #ffffff;
`;

const StyledTab = styled(Tab)`
    list-style: none;
    cursor: pointer;
`;

const List = styled.li`
    list-style: none;
`;

const StyledTweenOne = styled(TweenOne)`
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