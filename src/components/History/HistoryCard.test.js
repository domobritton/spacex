import HistoryCard  from './HistoryCard'

const history = [
    {
        'event_date_utc': "2018-02-06T20:45:00.000Z",
        'title': 'great accomplishment',
        'flight_number': 1,
        'details': 'it was wow',
        'links': {
            'article': 'this article'
        }

    }
]

it('renders correctly', () => {
    const wrapper = render(
        <HistoryCard imageSwitch={false} value={0} history={history} switchImage={() => {}}/>
    )

    expect(wrapper).toMatchSnapshot()
})

it('toggles background image on click', () => {
    const spy = sinon.spy()
    const wrapper = mount(
        <HistoryCard imageSwitch={false} value={0} history={history} switchImage={spy} />
    )

    wrapper.find('StyledTab').first().simulate('click')

    expect(spy.calledOnce).toBe(true)
})