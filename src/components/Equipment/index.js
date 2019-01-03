import React, { Component } from 'react'

import { EquipmentCard } from './EquipmentCard'
import apiGet from '../apiGet/apiGet';
export default class Equipment extends Component {
  constructor() {
    super()

    this.state = {
      rockets: [],
      roadster: [],
      imageSwitch: 'a',
    }

    this.switchImage = this.switchImage.bind(this)
  }

    async componentDidMount() {
        const rockets = await apiGet(`rockets`)
        const roadster = await apiGet(`roadster`)
        this.setState({ rockets, roadster })
    }

    switchImage(e) {
        this.setState({ imageSwitch: e })
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
