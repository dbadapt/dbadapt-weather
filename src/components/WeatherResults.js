import "./styles/WeatherResults.css";
import Cfg from "../config.json";
import React from "react";

export default class WeatherResults extends React.Component {

      componentDidMount() {
        this.props.getResults();
      }

    /** 
     * Adapted from github user basarat
     * https://gist.github.com/basarat/4670200
     * Given "0-360" returns the nearest cardinal direction "N/NE/E/SE/S/SW/W/NW"  
     */
    getCardinal(angle) {
      /** 
       * Customize by changing the number of directions you have
       * We have 8
       */
      const degreePerDirection = 360 / 8;

      /** 
       * Offset the angle by half of the degrees per direction
       * Example: in 4 direction system North (320-45) becomes (0-90)
       */
      const offsetAngle = angle + degreePerDirection / 2;

      return (offsetAngle >= 0 * degreePerDirection && offsetAngle < 1 * degreePerDirection) ? "N"
        : (offsetAngle >= 1 * degreePerDirection && offsetAngle < 2 * degreePerDirection) ? "NE"
          : (offsetAngle >= 2 * degreePerDirection && offsetAngle < 3 * degreePerDirection) ? "E"
            : (offsetAngle >= 3 * degreePerDirection && offsetAngle < 4 * degreePerDirection) ? "SE"
              : (offsetAngle >= 4 * degreePerDirection && offsetAngle < 5 * degreePerDirection) ? "S"
                : (offsetAngle >= 5 * degreePerDirection && offsetAngle < 6 * degreePerDirection) ? "SW"
                  : (offsetAngle >= 6 * degreePerDirection && offsetAngle < 7 * degreePerDirection) ? "W"
                    : "NW";
}      

      render() {
        let state=this.props.getResults();
        if (!state) state={results:null,city:null,units:null,error:null};
        if (state.results != null) {
          let temp_postfix=(state.units === 'imperial' ? "F" : "C");
          let wind_postfix=(state.units === 'imperial' ? "MPH" : "M/S");
          let weatherIconURL=Cfg.WEATHER_ICON_IMG_BASE_URL+state.results.weather[0].icon+"."+Cfg.WEATHER_ICON_IMG_FORMAT;

          // wind gust is not always in API result
          let windGust="";
          if (state.results.wind.gust) {
            windGust = (
              <tr>
                <th>Wind Gust</th>
                <td>{state.results.wind.gust} {wind_postfix}</td>
              </tr>
            );
          }

          return(
           <div className="component-weatherresults">
             <table>
               <tr>
                 <th>Conditions</th>
                 <td><img src={weatherIconURL} alt=""/>
                   {state.results.weather[0].main} - ({state.results.weather[0].description})</td>
               </tr>
               <tr>
                 <th>Temperature</th>
                 <td>{state.results.main.temp}&deg; {temp_postfix}</td>
               </tr>
               <tr>
                 <th>Feels Like</th>
                 <td>{state.results.main.feels_like}&deg; {temp_postfix}</td>
               </tr>
               <tr>
                 <th>Today's Range</th>
                 <td>{state.results.main.temp_min}&deg; {temp_postfix} -
                     {state.results.main.temp_max}&deg; {temp_postfix}
                  </td>
               </tr>
               <tr>
                 <th>Pressure</th>
                 <td>{state.results.main.pressure} hPa</td>
               </tr>
               <tr>
                 <th>Humidity</th>
                 <td>{state.results.main.humidity} %</td>
               </tr>
               <tr>
                 <th>Wind Speed</th>
                 <td>{state.results.wind.speed} {wind_postfix}</td>
               </tr>
               <tr>
                 <th>Wind Direction</th>
                 <td>{this.getCardinal(state.results.wind.deg)}</td>
               </tr>
               { windGust }
             </table>
             </div>
           )
         } else {
           return (<div/>)
         }
       }
}
