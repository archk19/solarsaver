import React, { Component } from "react";
import OpenCalc from "./opencalc";
import Electricity from "./electricity";
import Roof from "./roof";
import Place from "./place";
import Results from "./results";
import Tooltip from "./tooltip";

const SCREENS = {
  ELECTRICITY: "electricity",
  ROOF: "roof",
  PLACE: "place",
  NONE: "none"
};
class Calculator extends Component {
  state = {
    screen: SCREENS.ELECTRICITY,
    fields: {
      electricity: "",
      roof: "",
      place: "",
      roofUnit: "sqf"
    },
    touched: {
      electricity: true,
      roof: false,
      place: false
    },
    showResults: false
  };

  onInputChange = evt => {
    const fields = { ...this.state.fields };
    fields[evt.target.name] = evt.target.value;
    this.setState({ fields });
  };

  saveMyMoney = () => {
    const overlay = this.overlay;
    window.scrollTo(0, 0);
    overlay.classList.add("expanded");
    document.body.classList.add("expanded");
  };

  close = () => {
    const overlay = this.overlay;
    overlay.classList.remove("expanded");
    document.body.classList.remove("expanded");
  };

  setScreen = screen => () => {
    this.setState({
      screen,
      touched: {
        ...this.state.touched,
        [screen]: true
      }
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
    const { screen } = this.state;
    if (screen === SCREENS.ELECTRICITY) this.setScreen(SCREENS.ROOF)();
    if (screen === SCREENS.ROOF) this.setScreen(SCREENS.PLACE)();
    if (screen === SCREENS.PLACE) {
      this.setScreen(SCREENS.NONE)();
      this.setState({ showResults: true });
    }
  };

  isCollapsed = forScreen => {
    const { screen } = this.state;
    let collapsed = true;
    if (screen === forScreen) collapsed = false;
    return collapsed;
  };

  render() {
    const {
      fields: { electricity, roof, place, roofUnit },
      touched,
      screen,
      showResults
    } = this.state;

    let progress = 33;
    if (screen === SCREENS.ROOF) {
      progress = 67;
    }
    if (screen === SCREENS.PLACE || screen === SCREENS.NONE) {
      progress = 100;
    }

    const INPUTS = [
      {
        Component: Electricity,
        value: electricity,
        key: SCREENS.ELECTRICITY,
        touched: touched[SCREENS.ELECTRICITY],
        question: "What's your monthly electricity bill?",
        tooltip:
          "Based on your monthly usage we'll recommend the most optimised solar installation size for you! If you don't know your bill, take a guess :)"
      },
      {
        Component: Roof,
        value: roof,
        key: SCREENS.ROOF,
        touched: touched[SCREENS.ROOF],
        question: "What's your roof-top area?",
        tooltip:
          "We'll assume 80% usable area to account for shaded areas. This will help us know your maximum capacity."
      },
      {
        Component: Place,
        value: place,
        key: SCREENS.PLACE,
        touched: touched[SCREENS.PLACE],
        question: "Which State is your house in?",
        tooltip:
          "Your state will help us with the rate you pay for electricity from the grid. And also the average solar radiation in your State."
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
            {INPUTS.map(
              ({ Component, value, key, touched, question, tooltip }) =>
                touched ? (
                  <Component
                    value={value}
                    onInputChange={this.onInputChange}
                    key={key}
                    roofUnit={roofUnit}
                    isCollapsed={this.isCollapsed(key)}
                    onClick={this.setScreen(key)}
                    question={question}
                    tooltip={tooltip}
                    goToNext={this.goToNext}
                  />
                ) : null
            )}
            {showResults ? null : (
              <button
                className="next"
                disabled={this.isNextDisabled()}
                onClick={this.goToNext}
              >
                <div className="progress" style={{ width: `${progress}%` }} />
                {progress === 100 ? (
                  <span> Save my Money!</span>
                ) : (
                  <span>Next</span>
                )}
              </button>
            )}
            {showResults ? (
              <Results
                electricity={electricity}
                roof={roof}
                place={place}
                roofUnit={roofUnit}
              />
            ) : null}
          </div>
        </div>
      </div>
    );
  }
}

export default Calculator;
