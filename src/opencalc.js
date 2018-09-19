import React, { Component } from "react";

class OpenCalc extends Component {
  render() {
    return (
      <button onClick={this.props.click} className="save">
        <div />
        <span>Calculate my Savings!</span>
        <img src={require(`./assets/up-arrow.svg`)} alt="" />
      </button>
    );
  }
}

export default OpenCalc;
