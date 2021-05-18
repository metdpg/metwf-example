package main

import (
	"log"
	"net/http"
	"net/url"

	"gitlab.met.no/havardf/metwf-example/internal/client"
	"gitlab.met.no/havardf/metwf-example/internal/proxy"
)

func main() {
	apiURL, err := url.Parse("https://api.met.no/weatherapi/locationforecast/2.0")
	if err != nil {
		log.Fatalf("could not parse proxy url: %s", err)
	}
	proxyUnchanged := proxy.ProxyUnchanged(apiURL)
	proxyWithPP := proxy.ProxyWithPP(apiURL)

	clientFS, err := client.GetStaticFS()
	if err != nil {
		log.Fatalf("could not setup client: %s", err)
	}

	http.Handle("/api/proxy/", http.StripPrefix(("/api/proxy"), proxyUnchanged))
	http.Handle("/api/pp/", http.StripPrefix("/api/pp", proxyWithPP))
	http.Handle("/", http.FileServer(clientFS))

	log.Println("Start up proxy server...")
	log.Fatal(http.ListenAndServe((":8080"), nil))
}
