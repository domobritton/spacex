const fakeData = 
    {
        'name': 'Front-End Dev',
        'founder': 'Dom Adams',
        'founded': 1974,
        'employees': 1,
        'vehicles': 1,
        'ceo': 'Dom', 
        'cto': 'Dom',
        'coo': 'Dom',
        'launch_sites': 1,
        'test_sites': 1,
        'summary': 'I build great web experiences',
        'id': 1,
        'rocket_name': 'Falcon9',
        'first_flight': '2018-02-06',
        'cost_per_launch': 9000000,
        'description': 'it launched',
        'wikipedia': 'its a spacex rocket',
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

export default async ext => {
    const response = await new Promise(resolve => {
        resolve(fakeData)
    })

    return response
}
