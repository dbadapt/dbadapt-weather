import "./styles/Button.css";

function Button(props) {

  return (
    <div className="component-button">
    <button className="component-button-button" onClick={props.onClick}>GO!</button>
    </div>
  )
}

export default Button;