import React, { PureComponent } from "react";
import "./styles/Header.css";

export default class Header extends PureComponent {
  render() {
    return (
      <header className="component-header">
        dbadapt-weather
        <p>OpenWeatherMap API demonstration in React
        </p>
      </header>
    );
  }
}
