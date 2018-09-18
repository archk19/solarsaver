import React, { Component } from "react";
import Tooltip from "./tooltip";

class Electricity extends Component {
  render() {
    const {
      value,
      onInputChange,
      onClick,
      isCollapsed,
      question,
      tooltip
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
              placeholder="1,200"
              type="number"
              value={value}
              onChange={onInputChange}
              maxLength={5}
            />
          </div>
        </div>
      </section>
    );
  }
}

export default Electricity;
