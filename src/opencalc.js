import React, { Component } from "react";

class OpenCalc extends Component {
  render() {
    return (
      <button onClick={this.props.click} className="save">
        <img src={require(`./assets/calculator.svg`)} alt="" />

        <span>Calculate my Savings!</span>
        <div />

        {/* <img src={require(`./assets/up-arrow.svg`)} alt="" /> */}
      </button>
    );
  }
}

export default OpenCalc;
