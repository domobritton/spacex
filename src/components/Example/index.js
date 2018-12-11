import React from 'react';

import {
  XYPlot,
  XAxis,
  YAxis,
  VerticalGridLines,
  HorizontalGridLines,
  VerticalBarSeries,
} from 'react-vis';
import styled from 'styled-components'

export default class Example extends React.Component {

  constructor() {
    super()
    this.state = {
      launches: [],
      successData: [],
      failData: [],
      width: 1025,
    }
    this.dataArr = this.dataArr.bind(this)
    this.handleResize = this.handleResize.bind(this)
  }

  async componentDidMount() {
    const launchesRes = await fetch(`https://api.spacexdata.com/v3/launches/?launch_year/?launch_success/`)
    const launches = await launchesRes.json()
    this.setState({ launches })
    // window.addEventListener('resize', this.handleResize)
    this.dataArr()
  }

  handleResize() {
    let size = window.innerWidth
    // if (size < 1274) {
    //   this.setState({ width: window.innerWidth - 60})
    // }
    // if (size < 768) {
    //   this.setState({ width: window.innerWidth - 60})
    // }
    // if (size < 650) {
    //   this.setState({ width: window.innerWidth - 60})
    // }
  }

  componentWillUnmount() {
    // window.removeEventListener('resize', this.handleResize)
  }

  dataArr() {
    const { launches } = this.state 
    const success = {2006: 0, 2007: 0}
    const fail = {2009: 0, 2010: 0, 2012: 0, 2013: 0, 2014: 0, 2017: 0, 2018: 0}
    launches.forEach(data => {
      if (!success[data.launch_year] && data.launch_success === true) {
        success[data.launch_year] = 1
      } else if (data.launch_success === true) {
        success[data.launch_year] += 1
      }

      if (!fail[data.launch_year] && data.launch_success === false) {
        fail[data.launch_year] = 1
      } else if (data.launch_success === false) {
        fail[data.launch_year] += 1
      }
    })
    
    const successYears = Object.keys(success)
    const successTrips = Object.values(success)
    const failYears = Object.keys(fail)
    const failTrips = Object.values(fail)
    let successData = []
    let failData = []
    for (let i = 0; i < successYears.length; i++) {
        successData.push({x: successYears[i], y: successTrips[i]})
    }
    for (let i = 0; i < failYears.length; i++) {
      failData.push({x: failYears[i], y: failTrips[i]})
    }
    
    this.setState({ successData, failData })
  }

  render() {
   const { successData, failData, width } = this.state 

    return (
      <Bar>
        <XYPlot width={width} height={300} stackBy="y" xType="ordinal">
          <VerticalGridLines />
          <HorizontalGridLines />
          <XAxis />
          <YAxis />
          <VerticalBarSeries data={failData} color='orange'/>
          <VerticalBarSeries data={successData} color='white'/>
        </XYPlot>
        <Wrapper>
          <Key></Key>
          <Description>Successful Missions</Description>
          <Key></Key>
          <Description>Failed Missions</Description>
        </Wrapper>
      </Bar>
    );
  }
}

const Bar = styled.div`
  margin-top: 60px;
`;

const Wrapper = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
`;

const Key = styled.div`
  width: 25px;
  height: 15px;
  background: orange;
  border: 1px solid white;
  border-radius: 3px;
`;

const Description = styled.p`
  font-size: 11px;
  color: #ffffff;
  margin: 0 15px;
`;
