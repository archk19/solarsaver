import React, { Component } from "react";
import Tooltip from "./tooltip";

class Roof extends Component {
  _handleKeyPress = e => {
    if (e.key === "Enter") {
      this.props.goToNext();
    }
  };
  changeRoofUnit = value => () => {
    this.props.onInputChange({ target: { name: "roofUnit", value } });
  };
  render() {
    const {
      value,
      onInputChange,
      onClick,
      roofUnit,
      isCollapsed,
      question,
      tooltip
    } = this.props;
    const isSqm = roofUnit === "sqm";
    return (
      <section className="inputarea" onClick={onClick}>
        <div>
          <label htmlFor="">Step 2 of 3</label>
          {isCollapsed ? null : (
            <Tooltip question={question} tooltip={tooltip} />
          )}
          <div className={`wrapper${isCollapsed ? " collapsed" : ""}`}>
            {isCollapsed ? (
              <span className={`value${value ? "" : " empty"}`}>
                {value || "1,000"}
              </span>
            ) : (
              <input
                name="roof"
                placeholder="e.g 1,000"
                type="number"
                value={value}
                onChange={onInputChange}
                maxLength={5}
                onKeyPress={this._handleKeyPress}
                autoFocus
              />
            )}
            {isCollapsed ? (
              <span>{isSqm ? "Sq. m" : "Sq. ft"}</span>
            ) : (
              <div className="toggle">
                <div
                  className={`sqf${isSqm ? "" : " active"}`}
                  onClick={this.changeRoofUnit("sqf")}
                >
                  Sq. ft
                </div>
                <div
                  className={`sqf${isSqm ? " active" : ""}`}
                  onClick={this.changeRoofUnit("sqm")}
                >
                  Sq. m
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    );
  }
}

export default Roof;
