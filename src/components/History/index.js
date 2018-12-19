import React, { Component } from 'react'

import HistoryCard from './HistoryCard'
import apiGet from '../apiGet/apiGet';
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
    const history = await apiGet(`history`)
    this.setState({ history })

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

