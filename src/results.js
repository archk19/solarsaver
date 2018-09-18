import React, { Component } from "react";

class Results extends Component {
  render() {
    const { electricity, roof, place, roofUnit } = this.props;

    return (
      <div className="result">
        <div>Result</div>
        <div>{electricity}</div>
        <div>{roof}</div>
        <div>{roofUnit}</div>
        <div>{place}</div>
      </div>
    );
  }
}

export default Results;
