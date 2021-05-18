package main

import (
	"log"
	"net/http"
	"net/http/httputil"
	"net/url"

	"gitlab.met.no/havardf/metwf-example/internal/proxy"
)

func main() {
	apiURL, err := url.Parse("https://blurgh.api.met.no/weatherapi/locationforecast/2.0")
	if err != nil {
		log.Fatalf("could not parse proxy url: %s", err)
	}
	proxyUnchanged := httputil.NewSingleHostReverseProxy(apiURL)
	proxyUnchanged.Director = proxy.ApiMetNoDirector

	proxyWithPP := httputil.NewSingleHostReverseProxy(apiURL)
	proxyWithPP.Director = proxy.ApiMetNoDirector
	proxyWithPP.ModifyResponse = proxy.PostProcess

	http.Handle("/proxy", proxyUnchanged)
	http.Handle("/pp", proxyWithPP)
	//http.Handle("/x", )

	log.Fatal(http.ListenAndServe((":8080"), nil))
}
