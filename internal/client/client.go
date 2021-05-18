package client

import (
	"embed"
	"io/fs"
	"net/http"
)

//go:embed build
var staticFilesDir embed.FS

func GetStaticFS() (http.FileSystem, error) {
	fsys, err := fs.Sub(staticFilesDir, "build")
	if err != nil {
		return nil, err
	}

	return http.FS(fsys), nil
}
