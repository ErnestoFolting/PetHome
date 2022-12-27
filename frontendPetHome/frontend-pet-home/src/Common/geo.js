const REVERSE_GEOCODING_KEY = process.env.REACT_APP_REVERSE_GEOCODING_KEY

const defaultLoc = {
    lat: 50.450001,
    lng: 30.523333
}

export async function getBrowserLocation() {
    return new Promise((resolve, reject) => {
        if ('geolocation' in navigator) {
            navigator.geolocation.getCurrentPosition(
                (pos) => {
                    const { latitude: lat, longitude: lng } = pos.coords;
                    resolve({ lat, lng });
                },
                () => {
                    reject(defaultLoc);
                },
            );
        } else {
            reject(defaultLoc)
        }
    });
};

export async function getUserLocation() {
    let res = "";
    try {
        const curloc = await getBrowserLocation();
        const reverseGeoUrl = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${curloc.lat},${curloc.lng}&key=${REVERSE_GEOCODING_KEY}`
        console.log('API CALL')
        const response = await fetch(reverseGeoUrl)
        const data = await response.json()
        let parts = data.results[3].address_components;
        parts.forEach(part => {
            if (part.types.includes("locality")) {
                res += part.long_name + ', ';
            }
            if (part.types.includes("sublocality_level_1")) {
                res += part.long_name + ', ';
            }
            if (part.types.includes("administrative_area_level_1")) {
                res += part.long_name;
            }
        })
        return ({ location: res, locationLat: curloc.lat, locationLng: curloc.lng })
    } catch (e) {
        return ({ location: 'default', locationLat: defaultLoc.lat, locationLng: defaultLoc.lng })
    }
}

