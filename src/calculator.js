import React, { Component } from "react";

class Calculator extends Component {
  state = {
    fields: {
      electricity: " "
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

  render() {
    return (
      <div>
        <button onClick={this.saveMyMoney} className="save">
          <div />
          <span>Save My Money!</span>
          <img src={require(`./assets/up-arrow.svg`)} alt="" />
        </button>
        <div className="overlay" ref={overlay => (this.overlay = overlay)}>
          <button onClick={this.close} className="close">
            X
          </button>
          <div className="calculator">
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
            <button className="next" disabled={!this.state.fields.electricity}>
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
