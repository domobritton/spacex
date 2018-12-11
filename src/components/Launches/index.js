import ScrollAnim from 'rc-scroll-anim'
import React, { Component } from 'react'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'

import TweenOne from 'rc-tween-one'
import styled from 'styled-components'
import { AgGridReact } from 'ag-grid-react'
import 'ag-grid-community/dist/styles/ag-grid.css'
import 'ag-grid-community/dist/styles/ag-theme-balham-dark.css'


const ScrollOverPack = ScrollAnim.OverPack
ScrollAnim.scrollScreen.init({ loop: true })

export default class Launches extends Component {

  constructor() {
    super()

    this.state = {
      columnDefs: [
        {headerName: 'Mission Name', field: 'name'},
        {headerName: 'Flight Number', field: 'number'},
        {headerName: 'Launch Date', field: 'date'},
        {headerName: 'Rocket', field: 'rocket'},
        {headerName: 'Launch Site', field: 'site'}
      ],
      pastRowData: [],
      upcomingRowData: [],
    }
    
    this.createRowData = this.createRowData.bind(this)
    this.onGridReady = this.onGridReady.bind(this)
  }
  
  async componentDidMount() {
    const upcomingRes = await fetch(`https://api.spacexdata.com/v3/launches/upcoming`)
    const upcoming = await upcomingRes.json() 
    const pastRes = await fetch(`https://api.spacexdata.com/v3/launches/past/?order=desc`)
    const past = await pastRes.json()
    this.createRowData(past, upcoming)
  }

  createRowData(past, upcoming) {
    let utcDate, localDate

    const upcomingRowData = upcoming.map(data => {
      utcDate = data.launch_date_utc
      localDate = new Date(utcDate).toLocaleString()
      return (
         {
           name: data.mission_name, 
           number: data.flight_number, 
           date: localDate, 
           rocket: data.rocket.rocket_name,
           site: data.launch_site.site_name
          }
      )
    })

    const pastRowData = past.map(data => {
      utcDate = data.launch_date_utc
      localDate = new Date(utcDate).toLocaleString()
      return (
          {
          name: data.mission_name,
          number: data.flight_number,
          date: localDate,
          rocket: data.rocket.rocket_name,
          site: data.launch_site.site_name
        }
      )
    })

    this.setState({ pastRowData, upcomingRowData }) 
  }

  onGridReady(params) {
    this.gridApi = params.api;
    this.columnApi = params.columnApi;

    this.gridApi.sizeColumnsToFit();
  }

  render() {
    const { columnDefs, upcomingRowData, pastRowData } = this.state

    return (
          <Page>
            <HeroWrapper>
              <HeroImage src={`https://farm1.staticflickr.com/914/29700004918_334cd5a572_k.jpg`} />
            </HeroWrapper>
            <Scroll
              playScale={1}
              id="page0">
              <Tween
                animation={{ y: 0, opacity: 1 }}
                key="c">
                <Content> 
                    <Tabs>
                      <Title>Past and Upcoming Launches</Title>   
                      <Folder>
                          <StyledTab>PAST</StyledTab>
                          <StyledTab>UPCOMING</StyledTab>
                      </Folder>
                  
                      <TabPanel>
                          <div 
                          className='ag-theme-balham-dark' 
                          style={{height: '74vh', width: '100%' }}>
                      
                            <AgGridReact
                              id='past'
                              columnDefs={columnDefs}
                              rowData={ pastRowData}
                              onGridReady={this.onGridReady}>
    
                            </AgGridReact>
                          
                        </div>
                      </TabPanel>
                      <TabPanel>
                        <div 
                          className='ag-theme-balham-dark' 
                          style={{height: '74vh', width: '100%' }}>
                      
                            <AgGridReact
                              id='upcoming'
                              columnDefs={columnDefs}
                              rowData={ upcomingRowData}
                              onGridReady={this.onGridReady}>
    
                            </AgGridReact>
                          
                        </div>
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
    margin-top: 5%;
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

const Tween = styled(TweenOne)`
    opacity: 0;
    transform: translateY(100px);
`;

const HeroWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #cccccc;
  height: 1000px; 
  background-position: center; 
  background-repeat: no-repeat;
  background-size: cover;
  z-index: -1;
  overflow: hidden;
`;

const HeroImage = styled.img`
    width: 100vw;
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
`;