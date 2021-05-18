package proxy

import "net/http"

func ApiMetNoDirector(r *http.Request) {
	r.Header.Set("User-Agent", "gitlab.met.no/havardf/metwf-example")
}

func ProxyHandler(w http.ResponseWriter, r *http.Request) {

}

func PostProcess(resp *http.Response) error {

	return nil
}
