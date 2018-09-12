import React, { Component } from "react";
import Header from "./header";
import Testimonials from "./testimonials";
import "./App.css";

class App extends Component {
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
      <div className="app">
        <Header />
        {/* <Propositions />
        <Testimonials /> */}
        <button onClick={this.saveMyMoney} className="save">
          <div />
          <span>Save My Money!</span>
          <img src={require(`./assets/up-arrow.svg`)} alt="" />
        </button>
        <div className="overlay" ref={overlay => (this.overlay = overlay)}>
          <button onClick={this.close} className="close">
            X
          </button>
          <button className="next">
            <div className="progress" style={{ width: "100%" }} />
            <span>Next</span>
          </button>
        </div>
      </div>
    );
  }
}

export default App;
