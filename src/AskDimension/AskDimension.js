import React, { Component } from "react";
import GameVisual from "../GameVisual/GameVisual";

export default class AskDimension extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rowVal: 10,
      colVal: 10,
    };
  }

  changeStateRow = (value) => {
    this.setState({ rowVal: parseInt(value.target.value) });
  };
  changeStateCol = (value) => {
    this.setState({ colVal: parseInt(value.target.value) });
  };

  render() {
    return (
      <div>
        <input type="text" onChange={this.changeStateRow} placeholder="rows" />
        <input type="text" onChange={this.changeStateCol} placeholder="cols" />
        <GameVisual
          rowVal={this.state.rowVal}
          colVal={this.state.colVal}
        ></GameVisual>
      </div>
    );
  }
}
