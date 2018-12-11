import React, { Component } from 'react'

import Header from './Header/Header'
import History from './History'
import Launches from './Launches'
import Equipment from './Equipment'
import About from './About'
export default class App extends Component {
  render() {
    return (
      <>
        <Header />
        <Launches />
        <Equipment />
        <History />
        <About /> 
      </>
    );
  }
}

