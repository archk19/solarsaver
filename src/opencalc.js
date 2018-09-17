import React, { Component } from "react";

class OpenCalc extends Component {
  render() {
    return (
      <button onClick={this.props.click} className="save">
        <div />
        <span>Save my Money in 3 Steps!</span>
        <img src={require(`./assets/up-arrow.svg`)} alt="" />
      </button>
    );
  }
}

export default OpenCalc;
