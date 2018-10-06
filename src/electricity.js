import React, { Component } from "react";
import Tooltip from "./tooltip";

class Electricity extends Component {
  _handleKeyPress = e => {
    if (e.key === "Enter") {
      this.props.goToNext();
    }
  };
  render() {
    const {
      value,
      onInputChange,
      onClick,
      isCollapsed,
      question,
      tooltip,
      errors
    } = this.props;
    return (
      <section className="inputarea" onClick={onClick}>
        <div>
          <label htmlFor="">Step 1 of 3</label>
          {isCollapsed ? null : (
            <Tooltip question={question} tooltip={tooltip} />
          )}
          <div className={`wrapper${isCollapsed ? " collapsed" : ""}`}>
            <span>Rs.</span>
            <input
              name="electricity"
              placeholder="e.g 1,200"
              type="number"
              value={value}
              onChange={onInputChange}
              maxLength={5}
              onKeyPress={this._handleKeyPress}
              //autoFocus
            />
            <div className="error">{errors.electricity}</div>
          </div>
        </div>
      </section>
    );
  }
}

export default Electricity;
