import React, { Component } from "react";
import "./Node.css";

export default class Node extends Component {
  updateNodeOnGrid = () => {
    let { row, col, isAlive } = this.props;
    this.props.updateGrid(row, col, !isAlive);
  };

  returnClassName = () => {
    return this.props === undefined
      ? "Node"
      : this.props.isAlive
      ? "NodeAlive"
      : "Node";
  };

  render() {
    return (
      <div
        className={this.returnClassName()}
        onMouseDown={this.updateNodeOnGrid}
      ></div>
    );
  }
}
