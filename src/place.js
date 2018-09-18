import React, { Component } from "react";
import stateValues from "./stateValues";

class Place extends Component {
  state = {
    prevValue: this.props.value
  };

  onFocus = () => {
    this.setState({ prevValue: this.props.value }, () => {
      this.props.onInputChange({
        target: {
          name: "place",
          value: ""
        }
      });
    });
  };

  onBlur = () => {
    if (this.props.value === "" && this.state.prevValue !== " ") {
      this.props.onInputChange({
        target: {
          name: "place",
          value: this.state.prevValue
        }
      });
    }
  };

  render() {
    const placesList = stateValues.map(item => item.place);
    const { value, onInputChange, onClick, isCollapsed } = this.props;
    return (
      <section className="inputarea" onClick={onClick}>
        <div>
          <label htmlFor="">Step 3</label>
          {isCollapsed ? null : <p>Which state is your house in?</p>}
          <div className={`wrapper${isCollapsed ? " collapsed" : ""}`}>
            <input
              name="place"
              value={value}
              onChange={onInputChange}
              list="places"
              placeholder="e.g Karnataka"
              onFocus={this.onFocus}
              onBlur={this.onBlur}
            />

            <datalist id="places">
              {placesList.map(item => (
                <option value={item} key={item} />
              ))}
            </datalist>
          </div>
        </div>
      </section>
    );
  }
}

export default Place;