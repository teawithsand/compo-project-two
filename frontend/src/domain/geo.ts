export const findPlace = async (query: string) => {
    const res = (
        await fetch(
            `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(
                query
            )}&format=json&accept-language=pl&limit=10`
        )
    ).json()

    if (!(res instanceof Array)) {
        return []
    }

    return res.map((v) => ({
        name: v.display_name,
        longitude: v.lon,
        latitude: v.lat,
    }))
}