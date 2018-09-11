import React, { Component } from "react";
import Logo from "./logo";
import Propositions from "./propositions";
import Testimonials from "./testimonials";
import "./App.css";
//com
class App extends Component {
  render() {
    return (
      <div className="app">
        <Logo />
        <Propositions />
        <Testimonials />
      </div>
    );
  }
}

export default App;
