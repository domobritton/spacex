import React, { Component } from 'react'

import Header from './Header/Header'
import LaunchPads from './LaunchPads'
import Launches from './Launches'
import Landings from './Landings'
import Reuse from './Reuse'
import About from './About'
import { Tabss } from './Trial'
export default class App extends Component {
  render() {
    return (
      <>
        <Header />
        <Launches />
        <Landings />
        <LaunchPads />
        <Reuse />
        <About /> 
      </>
    );
  }
}

