import ScrollAnim from 'rc-scroll-anim'
import React, { Component } from 'react'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'
import HorizontalTimeline from 'react-horizontal-timeline'
import Example from '../Example'

import styled from 'styled-components'

const ScrollOverPack = ScrollAnim.OverPack
ScrollAnim.scrollScreen.init({ loop: true })

export default class History extends Component {

  constructor() {
    super()
    this.state = {
      value: 0,
      previous: 0,
      history: [],
    }

    this.handleClick = this.handleClick.bind(this)
  }

    async componentDidMount() {
      const historyRes = await fetch(`https://api.spacexdata.com/v3/history`)
      const history = await historyRes.json()
      this.setState({history})
    }

    handleClick(index) {
      const { value } = this.state 
      this.setState({ value: index, previous: value })
    }

    get renderInfo() {
      const { history, value } = this.state 
      debugger
      if (history.length < 1) { return null }

      return (
        <>
          <SubTitle>{history[value].title}</SubTitle>
          <Description>Flight Number: {history[value].flight_number}</Description>
          <Description>{history[value].details}
          <Button><Link href={history[value].links.article} alt="spaceX article" target="_blank">More Info</Link></Button>
          </Description>
        </>
      )
    }



    render() {
      const { history } = this.state
      let utcDate, localDate 
      const dates = history.map(data => {
        utcDate = data.event_date_utc
        localDate = new Date(utcDate).toLocaleDateString()
        return localDate
      })
      
        return (
          <Page>
            <Image />
            <Scroll
              playScale={1}
              id="page2">
                <Content> 
                    <Tabs>
                      <Title>HISTORICAL EVENTS</Title>   
                      <Folder>
                          <StyledTab>TIMELINE</StyledTab>
                          <StyledTab>LAUNCH SUCCESS</StyledTab>
                          <StyledTab>LANDING SUCCESS</StyledTab>
                      </Folder>
                  
                      <TabPanel>
                          <Inner>
                              <div style={{ width: '98%', height: '100px', margin: '0 auto', fontSize: '14px' }}>
                                <HorizontalTimeline
                                  labelWidth={100}
                                  isOpenBeginning={false}
                                  isOpenEnding={false}
                                  styles = {
                                    {
                                      background: '#2D3436',
                                      foreground: 'orange',
                                      outline: '#A7A8A8',
                                    }
                                  }
                                  index={this.state.value}
                                  indexClick={(index) => this.handleClick(index)}
                                  values={ dates } />
                              </div>
                              <div className='text-center'>
                                {this.renderInfo}    
                                {this.state.value}
                              </div>
                          </Inner>
                      </TabPanel>
                      <TabPanel>
                        <Example />
                      </TabPanel>
                      <TabPanel>

                      </TabPanel>
                  </Tabs>
              </Content>
            </Scroll>
          </Page>
        )
    }
}

const Page = styled.div `
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0;
    padding: 0;
    flex-direction: row;
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

const Folder = styled(TabList)`
    display: flex;
    justify-content: flex-start;
    flex-direction: row;
    margin-bottom: 5px;
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
    position: absolute;
    top: 10px;
    right: 10px;
    font-family: 'Exo', sans-serif;
    letter-spacing: 2px;
    font-size: 35px;

    @media all and (max-width: 768px) {
        font-size: 25px;
    }

    @media all and (max-width: 600px) {
        font-size: 18px;
    }

    @media all and (max-width: 500px) {
      display: none;
    }
`;

const Inner = styled.div`
    overflow-y: scroll;
    overflow-x: hidden;
    background: #2D3436;
    position: relative;
    padding-left: 5px;
    padding-right: 5px;
    width: 100%;
    height: 500px;
`;

const List = styled.ul`
    display: flex;
    position: relative;
    justify-content: space-around;
    align-items: center;
    background: #1C1F1F;
    height: 32px;

    @media all and (max-width: 768px) {
        margin: 40px;
    }
`;

const Item = styled.li`
    list-style: none;
    color: #A7A8A8;
    font-size: 12px;
    font-weight: bold;
`;

const SubTitle = styled.h3`
    font-size: 20px;
    color: #fff;
`;
    
const Description = styled.div`
    position: relative;
    padding: 30px 10px;
    line-height: 24px;

    @media all and (max-width: 768px) {
        margin: 40px;
    }
`;

const Button = styled.button`
    position: absolute;
    bottom: 10px;
    right: 15px;
    width: 100px;
    height: 30px;
    padding: 5px;
    border: 1px solid orange;
    border-radius: 5px;
    background: transparent;
    cursor: pointer;
`;

const Link = styled.a`
    text-decoration: none;
    color: #A7A8A8;
`;

const Image = styled.div `
  position: absolute;
  top: 2000px;
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

