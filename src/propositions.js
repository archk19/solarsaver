import React, { Component } from "react";

const PROPOSITIONS = [
  {
    image: "savings",
    text: "Save your entire electricity bill"
  },
  {
    image: "downpayment",
    text: "Not a single rupee from your pocket"
  },
  {
    image: "gogreen",
    text: "Help save the planet by going green"
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
