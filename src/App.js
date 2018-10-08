import React, { Component } from "react";
import Header from "./header";
import Testimonials from "./testimonials";
import Calculator from "./calculator";
import "./App.css";

class App extends Component {
  render() {
    return (
      <div className="app">
        <div className="mobile">
          <Header />
          <Testimonials />
          <Calculator />
        </div>
        <div className="desktop" />
      </div>
    );
  }
}

export default App;
