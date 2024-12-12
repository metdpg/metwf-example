# Example weather forecast site

Show a weather forecast for any location on earth, in two modes:

- Click on a map to get a forecast timeseries graph of that location.
- Select country and city from a list and get a forecast timeseries as a table.

Using https://api.met.no/weatherapi/locationforecast/2.0/documentation as data source.

And using weather icons from https://github.com/nrkno/yr-weather-symbols.

## Build

```bash
docker build -t example-site .
```

## Run

```bash
docker run -it -p 8080:8080 example-site
```
