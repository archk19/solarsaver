import React, { Component } from "react";
import VALUES, {
  consumptionGrowthRate,
  govtGrowthRate,
  roofToKwp,
  solarHrsPerYear,
  ppaFactor,
  cpuForState,
  sqmToSqf,
  years,
  usableRoof
} from "./values";

import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

class Results extends Component {
  compoundedValue = (value, rate, years) => {
    return value * Math.pow(1 + rate / 100, years);
  };

  valuesArray = (value, rate, years) => {
    let arr = [];
    for (let i = 0; i < years; i++) {
      arr[i] = this.compoundedValue(value, rate, i);
    }
    return arr;
  };

  sqmToSqfConverter = sqm => {
    return sqm * sqmToSqf;
  };

  state = {
    place: this.props.place,
    email: "",
    isSuccess: false
  };

  isValidEmail = () => {
    const { email } = this.state;
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  };

  onEmailChange = event => this.setState({ email: event.target.value });

  onSubmitEmail = async () => {
    if (this.isValidEmail()) {
      try {
        const { electricity, roof, place, roofUnit } = this.props;
        const roofInSqf =
          roofUnit === "sqf" ? roof : this.sqmToSqfConverter(roof);
        await Promise.all([
          fetch("https://hooks.zapier.com/hooks/catch/3861433/l1x8vp/", {
            method: "POST",
            body: JSON.stringify({
              email: this.state.email,
              timestamp: new Date().toLocaleString(),
              electricity,
              roofInSqf,
              place
            })
          }),
          window.firebaseDB.collection("leads").add({
            email: this.state.email,
            timestamp: new Date().toLocaleString(),
            electricity,
            roofInSqf,
            place
          })
        ]);
        /* Success logic */

        this.setState({
          isSuccess: true
        });
      } catch (_) {
        /* Ignore error */
      }
    } else {
    }
  };

  static getDerivedStateFromProps({ place }) {
    const item = VALUES.find(item => item.place === place);
    if (item) {
      return { place };
    }
    return null;
  }

  render() {
    const { electricity, roof, roofUnit } = this.props;
    const { place } = this.state;
    const govtRateToday = cpuForState(place);
    const annualConsumptionToday = (electricity / govtRateToday) * 12;
    const annualConsumptionArray = this.valuesArray(
      annualConsumptionToday,
      consumptionGrowthRate,
      years
    );
    const govtRateArray = this.valuesArray(
      govtRateToday,
      govtGrowthRate,
      years
    );
    const roofInSqf = roofUnit === "sqf" ? roof : this.sqmToSqfConverter(roof);

    const kwpByRoof = roofInSqf * usableRoof * roofToKwp;

    const kwpByConsumptionArray = annualConsumptionArray.map(
      item => item / solarHrsPerYear
    );

    // const minKwpArray = kwpByConsumptionArray.map(item =>
    //   Math.min(item, kwpByRoof)
    // );

    const kwpSS =
      Math.round(Math.min(kwpByConsumptionArray[0], kwpByRoof) * 100) / 100;

    const maxAnnualConsumptionSS = kwpSS * solarHrsPerYear;

    const annualConsumptionSSArray = annualConsumptionArray.map(item =>
      Math.min(item, maxAnnualConsumptionSS)
    );

    const annualSavingsArray = annualConsumptionSSArray.map((ac, index) => {
      const gr = govtRateArray[index];
      return Math.round((ac * gr * (1 - ppaFactor)) / 10) * 10;
    });

    const cumulativeSavingsArray = annualSavingsArray.reduce(
      (sumArray, item) => {
        if (sumArray.length === 0) {
          sumArray.push(Math.round(item / 100) * 100);
          return sumArray;
        }
        sumArray.push(
          Math.round((item + sumArray[sumArray.length - 1]) / 1000) * 1000
        );
        return sumArray;
      },
      []
    );

    const options = {
      chart: {
        type: "spline"
        // borderColor: "#EBBA95",
        // borderWidth: 2,
        // borderRadius: 20
        // // margin: [100, 100, 100, 100]
      },
      title: {
        text: ""
      },
      subtitle: {
        text: ""
      },
      series: [
        {
          name: "Annual Savings",
          marker: {
            radius: 1
          },
          data: annualSavingsArray
        },
        {
          name: "Total Savings till date",
          marker: {
            radius: 1
          },
          data: cumulativeSavingsArray
        }
      ],
      xAxis: {
        categories: [
          "Year 1",
          "Year 2",
          "Year 3",
          "Year 4",
          "Year 5",
          "Year 6",
          "Year 7",
          "Year 8",
          "Year 9",
          "Year 10",
          "Year 11",
          "Year 12",
          "Year 13",
          "Year 14",
          "Year 15",
          "Year 16",
          "Year 17",
          "Year 18",
          "Year 19",
          "Year 20",
          "Year 21",
          "Year 22",
          "Year 23",
          "Year 24",
          "Year 25"
        ]
      },

      yAxis: {
        labels: {
          format: "₹ {value}"
        }
      },
      tooltip: {
        shared: true,
        followPointer: true,
        crosshairs: true
      }
    };

    const formatter = new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    });

    return (
      <div className="results">
        {/* <div>Result</div>
        <div>{electricity}</div>
        <div>{roof}</div>
        <div>{roofUnit}</div>
        <div>{place}</div> */}

        <div className="resultsCard">
          <header>
            Lifetime Savings (25 years):
            <br />
            {formatter.format(cumulativeSavingsArray[24])}
          </header>
          <div>
            Don't spend a single rupee. EVER.
            <br />
            Save from the first month! Save for 25 years :)
          </div>

          <div>
            <HighchartsReact highcharts={Highcharts} options={options} />
          </div>
        </div>

        {/* <div style={{ whiteSpace: "pre" }}>{annualSavingsArray.join("\n")}</div>
        <div style={{ whiteSpace: "pre" }}>
          {cumulativeSavingsArray.join("\n")}
        </div> */}
        {this.state.isSuccess ? (
          <div className="leadCapture success">
            Thank you for your interest!
            <br /> We'll get back to you as soon as we can.
          </div>
        ) : (
          <div className="leadCapture">
            Leave your email to get quotes from top solar providers in your
            area!
            <div className="emailwrapper">
              <input
                name="email"
                placeholder="e.g anil@gmail.com"
                type="email"
                value={this.state.email}
                onChange={this.onEmailChange}
              />
            </div>
            <button
              className="submit"
              disabled={!this.isValidEmail()}
              onClick={this.onSubmitEmail}
            >
              {" "}
              Save my Money!
            </button>
          </div>
        )}
      </div>
    );
  }
}

export default Results;
