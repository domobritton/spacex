import React from 'react'
import About from './index'

it('renders correctly', () => {
    const wrapper = shallow(
        <About />
    )

    expect(wrapper).toMatchSnapshot()
})