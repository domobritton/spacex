export default async item => {
    const url = `https://api.spacexdata.com/v3/`
    try {
        const launchRes = await fetch(`${url}${item}`)
        if (!launchRes.ok) {
            throw Error(launchRes.statusText)
        }
        const launches = await launchRes.json()
        return launches
    } catch (error) {
        console.log(error);
    }
}

// https://api.spacexdata.com/v3/launches/?launch_year/?launch_success/