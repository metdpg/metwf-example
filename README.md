# Example weather forecast site

Show a weather forecast for any location on earth, in two modes:

- Click on a map to get a forecast timeseries graph of that location.
- Select country and city from a list and get a forecast timeseries as a table.

**Please note**: The table in the forecast list page has a `corrected` column.
This column is for illustration purposes only and contains no actual corrections. Its there to showcase the possibility of doing just-in-time corrections of the forecast with local data.

Weather forecast data comes from https://api.met.no/weatherapi/locationforecast/2.0/documentation.

Weather icons comes from https://github.com/nrkno/yr-weather-symbols.

## Build

```bash
docker build -t example-site .
```

## Run

```bash
docker run -it -p 8080:8080 example-site
```
