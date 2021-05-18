package proxy

import (
	"net/http"
	"net/http/httputil"
	"net/url"
)

func ProxyUnchanged(apiURL *url.URL) *httputil.ReverseProxy {
	return &httputil.ReverseProxy{
		Director: func(r *http.Request) {
			r.Header.Set("User-Agent", "gitlab.met.no/havardf/metwf-example")
			r.Host = apiURL.Host
			r.URL.Host = r.Host
			r.URL.Scheme = "https"
		},
	}
}

func ProxyWithPP(apiURL *url.URL) *httputil.ReverseProxy {
	return &httputil.ReverseProxy{
		Director: func(r *http.Request) {
			r.Header.Set("User-Agent", "gitlab.met.no/havardf/metwf-example")
			r.Host = apiURL.Host
			r.URL.Host = r.Host
			r.URL.Scheme = "https"
		},
		ModifyResponse: PostProcess,
	}
}

func ProxyHandler(w http.ResponseWriter, r *http.Request) {

}

func PostProcess(resp *http.Response) error {

	return nil
}
