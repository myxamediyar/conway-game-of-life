import React, { Component } from "react";
import "./Node.css";

export default class Node extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nodeData: {
        row: props.row,
        col: props.col,
        isAlive: props.isAlive,
      },
    };
  }
  // componentDidMount() {
  //   console.log("props, nodedata", this.props, this.nodeData);
  // }
  // componentDidUpdate() {
  //   console.log("props, nodedata", this.props, this.state.nodeData);
  // }

  changeNodeClass = () => {
    this.setState(
      (prevState) => {
        let nodeData = { ...prevState.nodeData };
        if (nodeData.isAlive) {
          nodeData.isAlive = false;
        } else {
          nodeData.isAlive = true;
        }
        return { nodeData };
      },
      () => {
        let { row, col, isAlive } = this.state.nodeData;
        this.updateNodeOnGrid(row, col, isAlive);
      }
    );
  };

  updateNodeOnGrid = (row, col, isAlive) => {
    this.props.updateGrid(row, col, isAlive);
  };

  render() {
    return (
      <div
        className={
          this.props === undefined
            ? "Node"
            : this.props.isAlive
            ? "NodeAlive"
            : "Node"
        }
        onClick={this.changeNodeClass}
      ></div>
    );
  }
}
