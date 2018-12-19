import React, { Component } from 'react';
import Display from "./components/Display";
import ButtonPanel from "./components/ButtonPanel";
import calculation from "./logic/calculation";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      total: null,
      nextVal: null,
      operation: null,
    };
  }

  handleClick = buttonName => {
    this.setState(calculation(this.state, buttonName));
  };

  render() {
    return (
      <div className="calculator">
        <Display value={this.state.nextVal || this.state.total || "0"} />
        <ButtonPanel clickHandler={this.handleClick} />
      </div>
    );
  }
}
export default App;
