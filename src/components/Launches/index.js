import ScrollAnim from 'rc-scroll-anim'
import React, { Component } from 'react'

import 'ag-grid-community/dist/styles/ag-grid.css'
import 'ag-grid-community/dist/styles/ag-theme-balham-dark.css'

import { LaunchCard } from './LaunchCard'

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
      <LaunchCard 
        columnDefs={columnDefs}
        upcomingRowData={upcomingRowData}
        pastRowData={pastRowData}
        onGridReady={this.onGridReady} />
      )
  }
}
