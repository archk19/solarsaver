import React, { Component } from "react";

class Tooltip extends Component {
  render() {
    return (
      <div className="tooltip">
        <img
          src={require("./assets/information.svg")}
          alt="information tool-tip"
        />
        <div className="tooltip-text expanded">{this.props.tooltip}</div>
      </div>
    );
  }
}

export default Tooltip;
