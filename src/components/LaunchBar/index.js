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
import apiGet from '../apiGet/apiGet';

export default class LaunchBar extends React.Component {

  constructor() {
    super()
    this.state = {
      launches: [],
      successData: [],
      failData: [],
      width: window.innerWidth - 250,
    }
    this.launchSuccess = this.launchSuccess.bind(this)
    this.handleResize = this.handleResize.bind(this)
  }

  async componentDidMount() {
    const launches = await apiGet(`launches/past`)
    this.setState({ launches })

    window.addEventListener('resize', this.handleResize)
    this.launchSuccess()
  }

  handleResize() {
    if (window.innerWidth < 768) {
      this.setState({ width: window.innerWidth - 10})
    }
    if (window.innerWidth < 650) {
      this.setState({ width: window.innerWidth - 20})
    }
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize)
  }

  launchSuccess() {
    const { launches } = this.state
    const years = launches.map(data => data.launch_year)
                          .sort()
                          .filter((year, idx, ary) => !idx || year !== ary[idx - 1])
    const failData = []
    const successData = []

    launches.forEach((data, idx) => {
      if (data.launch_success === false) {
          failData.push({x: data.launch_year, y: 1})
      } else if (years[idx] !== undefined){
          failData.push({x: years[idx], y: 0})
      }
      if (data.launch_success === true) {
        successData.push({x: data.launch_year, y: 1})
      } else if (years[idx] !== undefined) {
        successData.push({x: years[idx], y: 0})
      }
    })
    
    this.setState({ successData, failData })
  }

  render() {
   const { successData, failData, width } = this.state 

    return (
      <>
        {(successData.length < 1 && failData.length < 1) ?
        <Content>
          <Loading>No Bars To Show</Loading>
        </Content>
        :
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
            <WhiteKey></WhiteKey>
            <Description>Successful Missions</Description>
            <OrangeKey></OrangeKey>
            <Description>Failed Missions</Description>
          </Wrapper>
        </Bar>
        }
      </>
    )
  }
}

const Content = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 70vh;
`;

const Loading = styled.div`
  font-size: 12px;
`;

const Bar = styled.div`
  margin-top: 80px;
`;

const Wrapper = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
`;

const WhiteKey = styled.div`
  width: 25px;
  height: 15px;
  background: white;
  border: 1px solid #8d8d8d;
  border-radius: 3px;
`;

const OrangeKey = styled.div`
  width: 25px;
  height: 15px;
  background: orange;
  border: 1px solid #8d8d8d;
  border-radius: 3px;
`;

const Description = styled.p`
  font-size: 11px;
  color: #ffffff;
  margin: 0 15px;
`;
