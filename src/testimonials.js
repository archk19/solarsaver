import React, { Component } from "react";

const TESTIMONIALS = [
  {
    background: "bg1",
    image: "img1",
    tag: "#savings",
    name: "Mr. Gupta (owns a 5000 sq. ft. house in Malviya Nagar, Jaipur):",
    quote:
      "I cut my monthly electricity bill from ₹5,000 to  ₹2,000. It’s like magic!",
    tag2: "Savings in 4 years: ₹ 1,20,000"
  },
  {
    background: "bg2",
    image: "img2",
    tag: "#zerodownpayment",
    name: "Mr. Sharma (owns a 1000 sq ft house in Noida):",
    quote:
      "Without spending a single rupee, we started saving money from the first month itself!",
    tag2: "Down-payment: Zero"
  },
  {
    background: "bg3",
    image: "img3",
    tag: "#gogreen",
    name: "Mr. & Mrs. Manjunath (own a 2000 sq. ft. house in Bengaluru):",
    quote:
      "We’ve wanted to switch to solar since forever. Having made the switch- it’s like planting 4 trees every month!",
    tag2: "Trees planted in 6 years: 300"
  }
];

class Testimonials extends Component {
  render() {
    return (
      <section className="testimonials">
        {TESTIMONIALS.map(
          ({ tag, background, image, name, quote, tag2 }, index) => (
            <div className={`testimonial testimonial-${index + 1}`} key={tag}>
              <img src={require(`./assets/${image}.jpg`)} alt={image} />
              <div className="testimonial-text">
                <p>{tag}</p>
                <p>{name}</p>
                <p>{quote}</p>
                <p>{tag2}</p>
              </div>
            </div>
          )
        )}
      </section>
    );
  }
}

export default Testimonials;