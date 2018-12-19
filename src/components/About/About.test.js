import React from 'react'
import About from './index'


jest.mock('../apiGet/apiGet')

it('renders correctly', () => {
    const wrapper = shallow(
        <About />
    )

    expect(wrapper).toMatchSnapshot()
})

it('fetches company info, updates state, and renders on mount', (done) => {
    const wrapper = shallow(<About />)

    setTimeout(() => {
        wrapper.update()

        const state = wrapper.instance().state 
       
        expect(state.company.ceo).toEqual('Dom')
        expect(state.company.name).toEqual('Front-End Dev')
        expect(state.company.founded).toEqual(1974)

        done()
    })
})