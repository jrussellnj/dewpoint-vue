# What's the Dew Point?

According to the [National Weather Service](https://www.weather.gov/arx/why_dewpoint_vs_humidity), the dew point is

> the temperature the air needs to be cooled to in order to achieve a relative humidity (RH) of 100%. The higher the dew point rises, the greater the amount of moisture in the air. This directly affects how "comfortable" it will feel outside. So if you want a real judge of just how "dry" or "humid" it will feel outside, look at the dew point instead of the RH. The higher the dew point, the muggier it will feel.

It's easy to only glance at the humidity value when they are trying to figure out if it's muggy or comfortable outside, but the dew point value is really the one to use for answering that question. With "What's the Dew Point?", you can quickly view color-coded current and forecasted dew point values to gauge how comfortable or uncomfortable it is outside today and what the week ahead looks like as well.

---

## To run the project locally
- Clone this repository
- Create the `.env` file as described below
- Run `npm install`
- When the installation has finished, run `npm run serve` to spin up a local development environment that will serve the website

## To build a production version of the code
- Run `npm run build` 

The resulting build will be in the `dist/` directory.

## ⚠️ Warning!

This project uses an API key that has not been pushed to this repository for security purposes. You would need to create a Google Cloud API key with access to the Geocoding API, Maps JavaScript API, and Places API to properly run the project. Once that key is made, copy the `.env.sample` file to `.env` file in the root directory and replace `XXXXXXXXXXXXXXXX` with your key, like so:

```
VUE_APP_GOOGLE_MAPS_API_KEY=<your API key here>
```
