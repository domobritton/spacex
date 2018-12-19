import React from 'react'
import LaunchBar from './index'

jest.mock('../apiGet/apiGet')

const launches = [
    {
        'launch_year': '2006',
        'launch_success': false,
    },
    {
        'launch_year': '2007',
        'launch_success': true,
    }
]
it('renders correctly', () => {
    const wrapper = shallow(
        <LaunchBar launches={launches}/>
    )

    expect(wrapper).toMatchSnapshot()
})

it('fetches launch info and updates state', (done) => {
    const wrapper = shallow( <LaunchBar /> )

    setTimeout(() => {
        wrapper.update()

        const state = wrapper.instance().state
  
        expect(state.launches[0].launch_year).toEqual('2006')
        expect(state.launches[0].launch_success).toEqual(false)
        done()
    })
})



