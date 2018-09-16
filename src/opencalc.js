import React, { Component } from "react";

// window.closeIt = () => {
//   const overlay = this.overlay;
//   overlay.classList.remove("expanded");
// };

saveMyMoney = () => {
  const overlay = this.overlay;
  overlay.classList.add("expanded");
};

class OpenCalc extends Component {
  render() {
    return (
      <button onClick={this.saveMyMoney} className="save">
        <div />
        <span>Save My Money!</span>
        <img src={require(`./assets/up-arrow.svg`)} alt="" />
      </button>
    );
  }
}

export default OpenCalc;
