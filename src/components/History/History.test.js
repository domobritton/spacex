import React from 'react'
import History from './index'


jest.mock('../apiGet/apiGet')

it('renders correctly', () => {
    const wrapper = shallow(
        <History />
    )

    expect(wrapper).toMatchSnapshot()
})

it('fetches company info and updates state', (done) => {
    const wrapper = shallow(<History />)

    setTimeout(() => {
        wrapper.update()

        const state = wrapper.instance().state

        expect(state.history.launch_sites).toEqual(1)
        done()
    })
})


