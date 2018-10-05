import React, { Component } from "react";

const TESTIMONIALS = [
  {
    background: "bg1",
    image: "img1",
    hashtag: "#savings",
    name: "Mr. Gupta",
    house: "(5000 sq. ft. house, Jaipur)",
    quote:
      '"I cut my monthly electricity bill from ₹6,000 to  ₹4,000. It’s like magic!"',
    tag: "Savings in 6 years: ₹ 2,00,000"
  },
  {
    background: "bg3",
    image: "img3",
    hashtag: "#zero downpayment",
    name: "The Manjunaths",
    house: "(2000 sq. ft. house, Bengaluru)",
    quote:
      '"Without spending a single rupee, we started saving money from the first month itself!"',
    tag: "Down-payment: Zero"
  },
  {
    background: "bg2",
    image: "img2",
    hashtag: "#gogreen",
    name: "Mrs. Renuka",
    house: "(1000 sq. ft. house, Noida)",
    quote: '"Switching to solar is like planting 4 trees every month!"',
    tag: "Trees planted in 6 years: 300"
  }
];

class Testimonials extends Component {
  render() {
    return (
      <section className="testimonials">
        {TESTIMONIALS.map(
          ({ hashtag, background, image, name, house, quote, tag }, index) => (
            <div
              className={`testimonial testimonial-${index + 1}`}
              key={hashtag}
            >
              <div className={`hashtag hashtag-${index + 1}`}>{hashtag}</div>
              <img
                className={`img-${index + 1}`}
                src={require(`./assets/${image}.webp`)}
                alt={image}
              />
              <div className="testimonial-text">
                <p className="name">
                  {name + " "}
                  <span className="house">{house}</span>
                </p>
                <p className="quote">{quote}</p>
                <p className="tag">{tag}</p>
              </div>
            </div>
          )
        )}
        <div className="empty" />
      </section>
    );
  }
}

export default Testimonials;
