import React, { Component } from "react";

class Logo extends Component {
  render() {
    return (
      <div className="logo">
        <img src={require(`./assets/solarsaver.jpg`)} />
      </div>
    );
  }
}

export default Logo;
