package app

import (
	"io/ioutil"
	"net/http"
)

func handleIndex(w http.ResponseWriter, r *http.Request) {
//	w.Write([]byte("dsffsdsdsa"))
	if contents, err := ioutil.ReadFile("build/index.html"); err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
	} else {
		w.Write(contents)
	}
}

func init() {
	http.HandleFunc("/", handleIndex)
}
