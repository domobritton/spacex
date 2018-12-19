import React, { Component } from 'react'

import { EquipmentCard } from './EquipmentCard'
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
        const url = `https://api.spacexdata.com/v3/`
        try {
            const rocketsRes = await fetch(`${url}rockets`)
            const roadsterRes = await fetch(`${url}roadster`)
            if (!rocketsRes.ok) {
                throw Error(rocketsRes.statusText)
            } else if (!roadsterRes.ok) {
                throw Error(roadsterRes.statusText)
            }
            const rockets = await rocketsRes.json()
            const roadster = await roadsterRes.json()
            this.setState({ rockets, roadster })
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
