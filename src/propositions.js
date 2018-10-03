import React, { Component } from "react";

const PROPOSITIONS = [
  {
    image: "downpayment",
    text: "Only savings, no payments!"
  },
  {
    image: "savings",
    text: "Save 40% of your electricity bill"
  },

  {
    image: "gogreen",
    text: "Go green & save the planet"
  }
];

class Propositions extends Component {
  render() {
    return (
      <section>
        <div className="propositions">What you get with Solar Saver:</div>
        {PROPOSITIONS.map(({ text, image }) => (
          <div className="proposition" key={text}>
            <img src={require(`./assets/${image}.svg`)} alt={image} />
            <span>{text}</span>
          </div>
        ))}
      </section>
    );
  }
}

export default Propositions;
