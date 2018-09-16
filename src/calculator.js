import React, { Component } from "react";
// import OpenCalc from "./opencalc";

class Calculator extends Component {
  state = {
    fields: {
      screen: 1,
      electricity: "",
      roof: "",
      state: ""
    }
  };

  onInputChange = evt => {
    const fields = this.state.fields;
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

  one = () => {
    const fields = this.state.fields;
    fields[window.screen] = 1;
    this.setState({ fields });
  };

  two = () => {
    const fields = this.state.fields;
    fields[window.screen] = 2;
    this.setState({ fields });
  };

  three = () => {
    const fields = this.state.fields;
    fields[window.screen] = 3;
    this.setState({ fields });
  };

  render() {
    return (
      <div>
        {/* <OpenCalc /> */}
        <button onClick={this.saveMyMoney} className="save">
          <div />
          <span>Save My Money!</span>
          <img src={require(`./assets/up-arrow.svg`)} alt="" />
        </button>
        <div className="overlay" ref={overlay => (this.overlay = overlay)}>
          {/* <CloseCalc /> */}
          <button onClick={this.close} className="close">
            X
          </button>
          <div className="calculator">
            {/* {if this.state.fields.screen==1} */}
            <div className="electricity">
              <label htmlFor="">Step 1</label>
              <p>What's your monthly electricity bill?</p>
              <div className="wrapper">
                <span>Rs.</span>
                <input
                  name="electricity"
                  placeholder="1,200"
                  type="number"
                  value={this.state.fields.electricity}
                  onChange={this.onInputChange}
                />
              </div>
            </div>
            <button
              className="next"
              disabled={!this.state.fields.electricity}
              onClick={this.two}
            >
              <div className="progress" style={{ width: "100%" }} />
              <span>Next</span>
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default Calculator;
