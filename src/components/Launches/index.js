import React, { Component } from 'react'

import 'ag-grid-community/dist/styles/ag-grid.css'
import 'ag-grid-community/dist/styles/ag-theme-balham-dark.css'

import { LaunchCard } from './LaunchCard'
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
    const url = `https://api.spacexdata.com/v3/`
    try {
      const upcomingRes = await fetch(`${url}launches/upcoming`)
      const pastRes = await fetch(`${url}launches/past/?order=desc`)

      if (!upcomingRes.ok) {
        throw Error(upcomingRes.statusText)
      } else if (!pastRes.ok) {
        throw Error(pastRes.statusText)
      }
      const upcoming = await upcomingRes.json()
      const past = await pastRes.json()
      this.createRowData(past, upcoming)
    } catch (error) {
      console.log(error);
    }
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
