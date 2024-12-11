# Example weather forecast site

Using https://api.met.no/weatherapi/locationforecast/2.0/documentation as data source.

## Build

```bash
docker build -t example-site .
```

## Run

```bash
docker run -it -p 8080:8080 example-site
```