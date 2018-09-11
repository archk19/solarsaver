import React, { Component } from "react";

const PROPOSITIONS = [
  {
    image: "savings",
    text: "Save your entire electricity bill",
    color: "#4285F4"
  },
  {
    image: "downpayment",
    text: "Not a single rupee from your pocket",
    color: "#DD4B39"
  },
  {
    image: "gogreen",
    text: "Help save the planet by going green",
    color: "#FBBC05"
  }
];

class Propositions extends Component {
  render() {
    return (
      <section className="propositions">
        {PROPOSITIONS.map(({ text, image, color }) => (
          <div
            className="proposition"
            style={{ backgroundColor: color }}
            key={text}
          >
            <img src={require(`./assets/${image}.svg`)} alt={image} />
            <span>{text}</span>
          </div>
        ))}
      </section>
    );
  }
}

export default Propositions;
