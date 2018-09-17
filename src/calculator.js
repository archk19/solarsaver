import React, { Component } from "react";
import OpenCalc from "./opencalc";
import Electricity from "./electricity";
import Roof from "./roof";
import Place from "./place";

const SCREENS = {
  ELECTRICITY: 1,
  ROOF: 2,
  PLACE: 3,
  NONE: 0
};
class Calculator extends Component {
  state = {
    screen: SCREENS.ELECTRICITY,
    fields: {
      electricity: "",
      roof: "",
      place: "",
      roofUnit: "sqf"
    }
  };

  onInputChange = evt => {
    const fields = { ...this.state.fields };
    fields[evt.target.name] = evt.target.value;
    this.setState({ fields });
  };

  saveMyMoney = () => {
    const overlay = this.overlay;
    overlay.classList.add("expanded");
  };

  close = () => {
    const overlay = this.overlay;
    overlay.classList.remove("expanded");
  };

  setScreen = screen => () => {
    this.setState({
      screen
    });
  };

  isNextDisabled = () => {
    const {
      fields: { electricity, roof, place },
      screen
    } = this.state;
    let disabled = false;
    if (screen === SCREENS.ELECTRICITY) disabled = electricity === "";
    if (screen === SCREENS.ROOF) disabled = roof === "";
    if (screen === SCREENS.PLACE) disabled = place === "";

    return disabled;
  };

  goToNext = () => {
    const {
      fields: { electricity, roof, place },
      screen
    } = this.state;
    if (screen === SCREENS.ELECTRICITY) this.setScreen(SCREENS.ROOF)();
    if (screen === SCREENS.ROOF) this.setScreen(SCREENS.PLACE)();
    //if (screen === SCREENS.PLACE) disabled = place === "";
  };

  isCollapsed = forScreen => {
    const { screen } = this.state;
    let collapsed = true;
    if (screen === forScreen) collapsed = false;
    return collapsed;
  };

  render() {
    const {
      fields: { electricity, roof, place, roofUnit }
      // screen
    } = this.state;

    const INPUTS = [
      {
        Component: Electricity,
        value: electricity,
        key: SCREENS.ELECTRICITY
      },
      {
        Component: Roof,
        value: roof,
        key: SCREENS.ROOF
      },
      {
        Component: Place,
        value: place,
        key: SCREENS.PLACE
      }
    ];

    return (
      <div>
        <OpenCalc click={this.saveMyMoney} />

        <div className="overlay" ref={overlay => (this.overlay = overlay)}>
          <button onClick={this.close} className="close">
            X
          </button>

          <div className="calculator">
            {INPUTS.map(({ Component, value, key }) => (
              <Component
                value={value}
                onInputChange={this.onInputChange}
                key={key}
                roofUnit={roofUnit}
                isCollapsed={this.isCollapsed(key)}
                onClick={this.setScreen(key)}
              />
            ))}
            <button
              className="next"
              disabled={this.isNextDisabled()}
              onClick={this.goToNext}
            >
              <div className="progress" style={{ width: "100%" }} />
              {this.state.screen === 3 ? (
                <span> Save my Money!</span>
              ) : (
                <span>Next</span>
              )}
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default Calculator;
