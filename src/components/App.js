import React, { Component } from 'react'

import Header from './Header/Header'
import LaunchPads from './LaunchPads'
import Launches from './Launches'
import Landings from './Landings'
import Reuse from './Reuse'


export default class App extends Component {
  render() {
    return (
      <>
        <Header />
        <Launches />
        <Landings />
        <LaunchPads />
        <Reuse />
      </>
    );
  }
}

