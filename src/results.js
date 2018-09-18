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
      return ac * gr * (1 - ppaFactor);
    });

    const cumulativeSavingsArray = annualSavingsArray.reduce(
      (sumArray, item) => {
        if (sumArray.length === 0) {
          sumArray.push(item);
          return sumArray;
        }
        sumArray.push(item + sumArray[sumArray.length - 1]);
        return sumArray;
      },
      []
    );

    return (
      <div className="result">
        <div>Result</div>
        <div>{electricity}</div>
        <div>{roof}</div>
        <div>{roofUnit}</div>
        <div>{place}</div>

        <div style={{ whiteSpace: "pre" }}>{annualSavingsArray.join("\n")}</div>
        <div style={{ whiteSpace: "pre" }}>
          {cumulativeSavingsArray.join("\n")}
        </div>
      </div>
    );
  }
}

export default Results;
