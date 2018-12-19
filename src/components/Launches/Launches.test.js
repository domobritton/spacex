import React from 'react'
import Launches from './index'


jest.mock('../apiGet/apiGet')

it('renders correctly', () => {
    const wrapper = shallow(
        <Launches />
    )

    expect(wrapper).toMatchSnapshot()
})

it('fetches launch info and updates state', (done) => {
    const wrapper = shallow(<Launches />)

    setTimeout(() => {
        wrapper.update()

        const state = wrapper.instance().state 

        expect(state.upcoming.length).toEqual(1)
        done()
    })
})

