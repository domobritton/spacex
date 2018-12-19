import React, { Component } from 'react'

import { EquipmentCard } from './EquipmentCard'
import apiGet from '../apiGet/apiGet';
export default class Equipment extends Component {
  constructor() {
    super()

    this.state = {
      rockets: [],
      roadster: [],
      imageSwitch: false,
    }

    this.switchImage = this.switchImage.bind(this)
    this.handleScroll = this.handleScroll.bind(this)
  }

    async componentDidMount() {
        const rockets = await apiGet(`rockets`)
        const roadster = await apiGet(`roadster`)
        this.setState({ rockets, roadster })

        window.addEventListener('scroll', this.handleScroll)
    }

    switchImage() {
        const { imageSwitch } = this.state 
        this.setState({ imageSwitch: !imageSwitch })
    }

    handleScroll() {
        if (window.scrollY < 965) {
            this.setState({imageSwitch: false })
        }
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleScroll)
    }

    render() {
        const { imageSwitch, roadster, rockets } = this.state 
        
    return (
        <EquipmentCard 
            imageSwitch={imageSwitch} 
            switchImage={this.switchImage} 
            roadster={roadster} 
            rockets={rockets}/>
      )
    }
}
