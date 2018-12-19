import React from 'react'
import Equipment from './index'


jest.mock('../apiGet/apiGet')

it('renders correctly', () => {
    const wrapper = shallow(
        <Equipment />
    )

    expect(wrapper).toMatchSnapshot()
})

it('fetches company info and updates state', (done) => {
    const wrapper = shallow(<Equipment />)

    setTimeout(() => {
        wrapper.update()

        const state = wrapper.instance().state 
       
        expect(state.rockets[0].launch_sites).toEqual(1)
        expect(state.rockets[0].test_sites).toEqual(1)
        expect(state.roadster[0].orbit_type).toEqual('heliocentric')

        done()
    })
})