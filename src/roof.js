import React, { Component } from "react";

class Roof extends Component {
  changeRoofUnit = value => () => {
    this.props.onInputChange({ target: { name: "roofUnit", value } });
  };
  render() {
    const { value, onInputChange, onClick, roofUnit, isCollapsed } = this.props;
    const isSqm = roofUnit === "sqm";
    return (
      <section className="inputarea" onClick={onClick}>
        <div>
          <label htmlFor="">Step 2</label>
          {isCollapsed ? null : <p>What's your roof area?</p>}
          <div className={`wrapper${isCollapsed ? " collapsed" : ""}`}>
            {isCollapsed ? (
              <span className={`value${value ? "" : " empty"}`}>
                {value || "1,000"}
              </span>
            ) : (
              <input
                name="roof"
                placeholder="1,000"
                type="number"
                value={value}
                onChange={onInputChange}
                maxLength={5}
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
