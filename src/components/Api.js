class Api {
        components(config){
    this._url = config.url;
    this.headers = config.headers;
        }

    getSomeInfo() {
            return fetch(this._url, {
        method: "GET",
        headers: this.headers})

        .then((res) => {
            return res.json();
        })

        .then((data) => {
            console.log(data); 
        })

        }
}