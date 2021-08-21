import React, { Component } from "react";
import GameVisual from "../GameVisual/GameVisual";
import "./AskDimension.css";

export default class AskDimension extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rowVal: 10,
    };
  }

  changeStateRow = (value) => {
    let valueAsNum = parseInt(value.target.value);
    if (valueAsNum < 5 || valueAsNum > 40 || isNaN(valueAsNum)) {
      this.setState({ rowVal: 10 });
    } else {
      this.setState({ rowVal: valueAsNum });
    }
    this.child.getInitialGrid();
  };

  render() {
    return (
      <div className="AskDimension">
        <div className="center pa3 ph5-ns centerbek">
          <span className="centerbekchild">Conway's game of life</span>
          <label className="">Insert # of rows</label>
          <input
            id="rowNum"
            type="number"
            onChange={this.changeStateRow}
            placeholder="4<#<41"
            min="5"
            max="40"
          />
        </div>
        <GameVisual
          ref={(instance) => {
            this.child = instance;
          }}
          rowVal={this.state.rowVal}
        ></GameVisual>
        <a
          href="https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life"
          target="_blank"
          rel="noreferrer"
          className="f6 link dim1 ba ph3 pv2 dib black rules"
        >
          Rules
        </a>
      </div>
    );
  }
}
