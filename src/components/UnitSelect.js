import { Component } from "react";
import "./styles/UnitSelect.css";

class UnitSelect extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedOption: "imperial"
    };
  }

  handleOptionChange = changeEvent => {
    this.setState({
      selectedOption: changeEvent.target.value
    });
    this.props.parentSetUnit(changeEvent.target.value);
  };

  render() {
    return (
      <div className="component-unitselect">
        <input type="radio" name="unit" value="imperial" checked={this.state.selectedOption === "imperial"} onChange={this.handleOptionChange} /> Fahrenheit
        <input type="radio" name="unit" value="metric" checked={this.state.selectedOption === "metric"} onChange={this.handleOptionChange} /> Celcius
      </div>
    );
  }
}

export default UnitSelect;