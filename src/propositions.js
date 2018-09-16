import React, { Component } from "react";

const PROPOSITIONS = [
  {
    image: "savings",
    text: "Save your entire electricity bill"
  },
  {
    image: "downpayment",
    text: "No need to spend a single rupee"
  },
  {
    image: "gogreen",
    text: "Go green- the planet will thank you"
  }
];

class Propositions extends Component {
  render() {
    return (
      <section className="propositions">
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
