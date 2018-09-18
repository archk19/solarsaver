import React, { Component } from "react";

class Tooltip extends Component {
  state = {
    isExpanded: false
  };

  toggle = () => {
    this.setState({ isExpanded: !this.state.isExpanded });
  };
  render() {
    const { isExpanded } = this.state;
    const { question, tooltip } = this.props;
    return (
      <div className="question">
        {question}
        <img
          alt="tool-tip image"
          src={
            isExpanded
              ? require("./assets/close.svg")
              : require("./assets/information.svg")
          }
          onClick={this.toggle}
        />
        <div className={`tooltip${isExpanded ? " expanded" : ""}`}>
          {tooltip}
        </div>
      </div>
    );
  }
}

export default Tooltip;
