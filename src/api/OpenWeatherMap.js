import superagent from 'superagent';
import querystring from 'querystring';

export default class OpenWeatherMap {

    constructor(config) {
        this.base_url = config.base_url;
        this.api_key = config.api_key
    }

    getRequest(endpoint = "", parameters = {}) {

        parameters.appid = this.api_key;
        
        let qs = "?" + querystring.stringify(parameters);
        
        let url = this.base_url + endpoint + qs;
    
        let headers = {
            "Content-type": "application/json"
        };
    
        return(superagent.get(url).set(headers));
    }
      
    getWeather(parameters) {
        if (!parameters.q.match(/,US/)) {
            parameters.q += ",US";
        }
        return(this.getRequest("/weather",parameters ));
    }

}