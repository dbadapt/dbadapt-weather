import './App.css';
import React from "react";
import Header from './components/Header'
import Search from './components/Search'
import UnitSelect from './components/UnitSelect'
import Button from './components/Button'
import OpenWeatherMap from './api/OpenWeatherMap';

class App extends React.Component {

  constructor(props){
    super(props);
    this.state = {
        city: null,
        units: "imperial",
        results: null,
        error: null
    }
    this.weatherCall = this.weatherCall.bind(this);
  } 

  setSearchCity = (searchCity) => {
    this.setState({city: searchCity})
  } 

  setUnitValue = (searchUnit) => {
    this.setState({units: searchUnit});
  }

  weatherCall() {
    let apiurl=null;
    if (process.env.NODE_ENV == 'development') {
      // run with proxy to avoid CORS issues
      apiurl="http://localhost:3000/data/2.5";
    } else {
      apiurl="https://api.openweathermap.org/data/2.5";
    }
    let openWeatherMap = new OpenWeatherMap({
      base_url: apiurl,
      api_key: "4ff9086409bab044f46489691f1c0d96"
    }); 
    openWeatherMap.getWeather({q: this.state.city, units: this.state.units}).then(result => {
      if (typeof(result) === 'object' 
          && typeof(result.body) === 'object' 
          && result.body.temp > -999) {
            this.state.results=result.body;
            this.state.error=null;
          } else {
            this.state.results=null;
            this.state.error="City "+this.state.city+" not found";
          }
          console.log(result);
          return;
    }).catch((err) => {
      this.state.result=null;
      this.state.error="City "+this.state.city+" not found";
      console.log(err);
    });
  }

  render() {
    return(
      <div className="App">
        <Header/>
        <Search parentSetCity={this.setSearchCity}/>
        <UnitSelect parentSetUnit={this.setUnitValue}/>
        <Button onClick={this.weatherCall}/>
      </div>
    );
  }
}

export default App;
