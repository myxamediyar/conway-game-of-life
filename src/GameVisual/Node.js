import React, { Component } from "react";
import "./Node.css";

export default class Node extends Component {
  changeNodeState = () => {
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
  setIsMousePressed = (isMouseDown) => {
    this.setState({ mouseIsPressed: isMouseDown });
  };

  catchMouseEnter = () => {
    if (!this.props.mouseIsPressed) return;
    this.changeNodeState();
  };

  render() {
    let { setIsMousePressed } = this.props;
    return (
      <div
        className={this.returnClassName()}
        onMouseDown={() => {
          setIsMousePressed(true);
          this.changeNodeState();
        }}
        onMouseUp={() => setIsMousePressed(false)}
        onMouseEnter={this.catchMouseEnter}
      ></div>
    );
  }
}
