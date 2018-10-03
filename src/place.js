import React, { Component } from "react";
import values from "./values";
import Tooltip from "./tooltip";

class Place extends Component {
  state = {
    prevValue: this.props.value
  };

  _handleKeyPress = e => {
    if (e.key === "Enter") {
      this.props.goToNext();
    }
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
    const placesList = values.map(item => item.place);
    const {
      value,
      onInputChange,
      onClick,
      isCollapsed,
      question,
      tooltip
    } = this.props;
    return (
      <section className="inputarea" onClick={onClick}>
        <div>
          <label htmlFor="">Step 3 of 3</label>
          {isCollapsed ? null : (
            <Tooltip question={question} tooltip={tooltip} />
          )}
          <div className={`wrapper${isCollapsed ? " collapsed" : ""}`}>
            <input
              name="place"
              value={value}
              onChange={onInputChange}
              list="places"
              placeholder="e.g Karnataka"
              onFocus={this.onFocus}
              onBlur={this.onBlur}
              onKeyPress={this._handleKeyPress}
              //autoFocus
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
