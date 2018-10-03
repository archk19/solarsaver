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
    place: this.props.place
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

    const minKwpArray = kwpByConsumptionArray.map(item =>
      Math.min(item, kwpByRoof)
    );

    const kwpSS =
      Math.round(
        (minKwpArray.reduce((sum, item) => sum + item) / minKwpArray.length) *
          100
      ) / 100;

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
          Math.round((item + sumArray[sumArray.length - 1]) / 100) * 100
        );
        return sumArray;
      },
      []
    );

    const options = {
      chart: {
        type: "spline"
      },
      title: {
        text: ""
      },
      subtitle: {
        text:
          "Swipe over the map to see your annual and cumulative savings by year"
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
      tooltip: {
        shared: true,
        followPointer: true,
        crosshairs: true
      }
    };

    return (
      <div className="result">
        {/* <div>Result</div>
        <div>{electricity}</div>
        <div>{roof}</div>
        <div>{roofUnit}</div>
        <div>{place}</div> */}

        <div>
          <HighchartsReact highcharts={Highcharts} options={options} />
        </div>

        {/* <div style={{ whiteSpace: "pre" }}>{annualSavingsArray.join("\n")}</div>
        <div style={{ whiteSpace: "pre" }}>
          {cumulativeSavingsArray.join("\n")}
        </div> */}
      </div>
    );
  }
}

export default Results;
