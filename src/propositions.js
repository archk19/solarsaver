import React, { Component } from "react";

const PROPOSITIONS = [
  {
    image: "downpayment",
    text: "Zero down-payment. No hidden fees."
  },
  {
    image: "savings",
    text: "Save upto 40% of your electricity bill"
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
