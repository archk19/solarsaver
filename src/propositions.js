import React, { Component } from "react";

const PROPOSITIONS = [
  {
    image: "downpayment",
    text: "Pay zero down-payment"
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
