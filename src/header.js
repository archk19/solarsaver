import React, { Component } from "react";
import Propositions from "./propositions";

class Header extends Component {
  render() {
    return (
      <div className="header">
        <img
          src={require(`./assets/landingbg.webp`)}
          className="landing"
          alt="Landing Background"
        />
        <div className="content">
          <Propositions />
        </div>
        <div className="logo">
          <img src={require(`./assets/logo.png`)} alt="Logo" />
          <span>Solar Saver</span>
        </div>
      </div>
    );
  }
}

export default Header;
