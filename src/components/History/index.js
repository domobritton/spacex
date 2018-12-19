import React, { Component } from 'react'

import HistoryCard from './HistoryCard'
export default class History extends Component {

  constructor() {
    super()

    this.state = {
      value: 0,
      previous: 0,
      history: [],
      imageSwitch: false,
    }
    this.switchImage = this.switchImage.bind(this)
    this.handleScroll = this.handleScroll.bind(this)
    this.handleClick = this.handleClick.bind(this)
  }

  async componentDidMount() {
    const url = `https://api.spacexdata.com/v3/`
    try {
      const historyRes = await fetch(`${url}history`)
      if (!historyRes.ok) {
        throw Error(historyRes.statusText)
      }
      const history = await historyRes.json()
      this.setState({ history })
    } catch (error) {
      console.log(error);
    }
    window.addEventListener('scroll', this.handleScroll)
  }

  switchImage() {
      const { imageSwitch } = this.state 
      this.setState({ imageSwitch: !imageSwitch })
  }

  handleScroll() {
      if (window.scrollY < 965) {
          this.setState({ imageSwitch: false })
      }
  }

  componentWillUnmount() {
      window.removeEventListener('scroll', this.handleScroll)
  }

  handleClick(index) {
    const { value } = this.state 
    this.setState({ value: index, previous: value })
  }

    render() {
      const { history, imageSwitch, value } = this.state
      
        return (
            <HistoryCard 
                history={history}
                imageSwitch={imageSwitch}
                value={value}
                switchImage={this.switchImage}
                handleClick={this.handleClick}/>
        )
    }
}

