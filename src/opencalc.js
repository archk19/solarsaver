import React, { Component } from "react";

class OpenCalc extends Component {
  render() {
    return (
      <button onClick={this.props.click} className="save">
        <div />
        <span>Save My Money!</span>
        <img src={require(`./assets/up-arrow.svg`)} alt="" />
      </button>
    );
  }
}

export default OpenCalc;
