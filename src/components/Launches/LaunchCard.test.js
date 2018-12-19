import { LaunchCard } from './LaunchCard'

it('renders correctly', () => {
    const wrapper = render(
        <LaunchCard />
    )

    expect(wrapper).toMatchSnapshot()
})