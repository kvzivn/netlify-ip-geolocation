const IPGeolocationAPI = require('ip-geolocation-api-javascript-sdk');
const GeolocationParams = require('ip-geolocation-api-javascript-sdk/GeolocationParams');

exports.handler = async (event) => {
	const api = new IPGeolocationAPI(process.env.IP_GEOLOCATION_API_TOKEN, false);
    const params = new GeolocationParams();
    const ip = event.headers['client-ip'];

    params.setIPAddress(ip);
    params.setFields('country_code2');

    try {
      const result = await new Promise((resolve) => {
        api.getGeolocation((json) => resolve(json), params);
      });
      return { statusCode: 200, body: JSON.stringify(result.country_code2) };
    } catch (error) {
      return { statusCode: 500, body: JSON.stringify(error) };
    }
};