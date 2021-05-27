package main

import (
	"log"
	"net/http"
	"net/url"
	"strings"

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
	http.Handle("/", cacheStatic(http.FileServer(clientFS)))

	log.Println("Start up proxy server...")
	log.Fatal(http.ListenAndServe((":8080"), nil))
}

func cacheStatic(h http.Handler) http.Handler {
	cacheHandler := func(w http.ResponseWriter, r *http.Request) {
		if strings.HasPrefix(r.URL.Path, "/static/") {
			w.Header().Set("Cache-Control", "public, max-age=172800")
		} else {
			w.Header().Set("Cache-Control", "max-age=60")
		}
		h.ServeHTTP(w, r)
	}
	return http.HandlerFunc(cacheHandler)
}
