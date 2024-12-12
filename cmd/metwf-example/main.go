package main

import (
	"io"
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

	indexPage, err := clientFS.Open("/index.html")
	if err != nil {
		log.Fatalln(err)
	}
	indexPageData, err := io.ReadAll(indexPage)
	if err != nil {
		log.Fatalln(err)
	}
	indexPage.Close()

	http.Handle("/",
		cacheStatic(
			overrideNotFound(
				http.FileServer(clientFS), indexPageData),
		),
	)

	log.Println("Start up proxy server...")
	log.Fatal(http.ListenAndServe((":8080"), nil))
}

func overrideNotFound(h http.Handler, notFoundText []byte) http.Handler {
	handler := func(w http.ResponseWriter, r *http.Request) {
		h.ServeHTTP(override404(w, notFoundText), r)
	}
	return http.HandlerFunc(handler)
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

func override404(w http.ResponseWriter, returnInstead []byte) http.ResponseWriter {
	return &override404Handler{
		w:             w,
		returnInstead: returnInstead,
		override:      false,
	}
}

type override404Handler struct {
	w             http.ResponseWriter
	returnInstead []byte
	override      bool
}

func (h *override404Handler) Header() http.Header {
	return h.w.Header()
}

func (h *override404Handler) Write(data []byte) (int, error) {
	if h.override {
		log.Println("override")
		h.w.Header().Set("Content-Type", "text/html; charset=utf-8")
		data = h.returnInstead
	}
	return h.w.Write(data)
}

func (h *override404Handler) WriteHeader(statusCode int) {
	if statusCode == 404 {
		h.override = true
		return
	}
	h.w.WriteHeader(statusCode)
}
