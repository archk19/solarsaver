import React, { Component } from 'react';
import './App.css';

const PROPOSITIONS = [{
  image: '',
  text: 'savings'
},{
  image: '',
  text: 'zerodownpayment'
},{
  image: '',
  text: 'gogreen'
}];

const TESTIMONIALS = [{
  background: '',
  image: '',
  tag: 'savings',
  name: '',
  quote:'',
  tag2:'',
},
{
  background: '',
  image: '',
  tag: 'zerodownpayment',
  name: '',
  quote:'',
  tag2:'',
},
{
  background: '',
  image: '',
  tag: 'gogreen',
  name: '',
  quote:'',
  tag2:'',
}];

class App extends Component {
  render() {
    return (
      <div className="App">
        <section className="propositions">
        {PROPOSITIONS.map(({text}) => <div className="proposition" key={text}>{text}</div>)}
        </section>
      

        <section className="testimonials">
        {TESTIMONIALS.map(({tag}) => <div className="testimonial" key={tag}>{tag}</div>)}
        </section>
        </div>
    );
  }
}

export default App;
