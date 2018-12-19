import { RoadsterCard } from './RoadsterCard'

const data = {
    'name': `Elon Musk's Tesla Roadster`,
    'launch_date_utc': '2018-02-06T20:45:00.000Z',
    'orbit_type': 'heliocentric',
    'speed_mph': 45362.54860012799,
    'earth_distance_mi': 210452509.00200382,
    'flickr_images': [
        'https://farm5.staticflickr.com/4615/40143096241_11128929df_b.jpg',
        'https://farm5.staticflickr.com/4702/40110298232_91b32d0cc0_b.jpg',
        'https://farm5.staticflickr.com/4676/40110297852_5e794b3258_b.jpg',
        'https://farm5.staticflickr.com/4745/40110304192_6e3e9a7a1b_b.jpg'
    ],
    'details': `Elon Musk's Tesla Roadster`
}

it('renders correctly', () => {
    const wrapper = render(
        <RoadsterCard roadster={data}/>
    )

    expect(wrapper).toMatchSnapshot()
})
