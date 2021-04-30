import './App.css';
import React from "react";
import Cfg from "./config.json";
import OpenWeatherMap from './api/OpenWeatherMap';
import Header from './components/Header'
import Search from './components/Search'
import UnitSelect from './components/UnitSelect'
import Button from './components/Button'
import WeatherResults from "./components/WeatherResults"

export default class App extends React.Component {

  constructor(props){
    super(props);
    this.state = {
        city: null,
        units: "imperial",
        results: null,
        error: null
    }
    this.weatherCall = this.weatherCall.bind(this);
    this.getWeatherResults = this.getWeatherResults.bind(this);
  }

  setSearchCity = (searchCity) => {
    let newState={city: searchCity};
      // clear results if search box is empty
      if (searchCity == null || searchCity == "") {
        newState.results=null;
        newState.error=null;
    }
    this.setState(newState);
  } 

  setUnitValue = (searchUnit) => {
    this.setState({units: searchUnit},function(){
      // if results are display they must
      // retreived again with new units
      if (this.state.results) {
        this.weatherCall();
      }
    });
  }

  getWeatherResults() {
    return(this.state);
  }

  weatherCall(params) {
    let apiurl=null;
    if (this.state.city && this.state.units) {
      // this should really be handled by a proper
      // multi-environment configuration system
      if (process.env.NODE_ENV == 'development') {
        apiurl=Cfg.DEV_WEATHER_URL;
      } else {
        apiurl=Cfg.PRD_WEATHER_URL;
      }
      let openWeatherMap = new OpenWeatherMap({
        base_url: apiurl,
        api_key: Cfg.OPENWEATHERMAP_API_KEY
      });
      openWeatherMap.getWeather({q: this.state.city, units: this.state.units}).then(result => {
        if (typeof(result) == 'object' 
            && typeof(result.body) == 'object' 
            && result.body.main.temp > -999) {
              this.setState({results: result.body});
              this.setState({error: null});
            } else {
              this.setState({results: null, error: "City "+this.state.city+" not found"});
            }
      }).catch((err) => {
        this.setState({results: null,error: "City "+this.state.city+" not found"});
      });
    } else {
      this.setState({results: null, error: null});
    }
  }

  render() {
    return(
      <div className="App">
        <Header/>
        <UnitSelect parentSetUnit={this.setUnitValue}/>
        <Search parentSetCity={this.setSearchCity}/>
        <Button onClick={this.weatherCall}/>
        <WeatherResults getResults={this.getWeatherResults}/>
      </div>
    );
  }
}