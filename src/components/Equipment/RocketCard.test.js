import { RocketCard } from './RocketCard'

const rockets = [{
    'id': 1,
    'rocket_name': 'Falcon9',
    'first_flight': '2018-02-06',
    'cost_per_launch': 9000000,
    'description': 'it launched',
    'wikipedia': 'its a spacex rocket'
}]

it('renders correctly', () => {
    const wrapper = render(
        <RocketCard rockets={rockets} />
    )

    expect(wrapper).toMatchSnapshot()
})