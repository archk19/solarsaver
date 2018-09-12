import React, { Component } from "react";
import Header from "./header";
import Testimonials from "./testimonials";
import "./App.css";

class App extends Component {
  render() {
    return (
      <div className="app">
        <Header />
        {/* <Propositions />
        <Testimonials /> */}
      </div>
    );
  }
}

export default App;
