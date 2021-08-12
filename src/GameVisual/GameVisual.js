import React, { Component } from "react";
import Node from "./Node";
import "./GameVisual.css";
import AlgorithmInit from "../GameAlgorithm/Algorithm";

export default class GameVisual extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nodes: [],
    };
  }

  componentDidMount() {
    this.getInitialGrid();
  }

  gridUpdater = (row, col, isAlive) => {
    this.setState((prevState) => {
      let nodes = [...prevState.nodes];
      nodes[row][col].isAlive = isAlive;
      return nodes;
    });
  };

  onButtonClick = (updatedNodes) => {
    let algoResult = AlgorithmInit(
      updatedNodes,
      this.props.rowVal,
      this.props.colVal
    );
    this.setState({ nodes: algoResult });
  };

  render() {
    return (
      <div className="centerGol">
        <div className="buttonContainer">
          <button
            className="f6 grow no-underline br-pill ba ph3 pv2 mb2 dib black ma1"
            onClick={this.getInitialGrid}
          >
            clear
          </button>
          <button
            className="f6 grow no-underline br-pill ba ph3 pv2 mb2 dib black ma1"
            onClick={() => this.onButtonClick(this.state.nodes)}
          >
            next generation
          </button>
        </div>
        <div className="pa2">
          {this.state.nodes.map((row, rowIndex) => {
            return (
              <div key={rowIndex}>
                {row.map((nodeObj, nodeObjIndex) => {
                  return (
                    <Node
                      key={nodeObjIndex}
                      row={nodeObj.row}
                      col={nodeObj.col}
                      isAlive={nodeObj.isAlive}
                      updateGrid={this.gridUpdater}
                    ></Node>
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  getInitialGrid = () => {
    this.setState({ nodes: [] }, () => {
      let _nodes = [];
      for (let _row = 0; _row < this.props.rowVal; _row++) {
        let currentRow = [];
        for (let _column = 0; _column < this.props.colVal; _column++) {
          let positionInfo = {
            row: _row,
            col: _column,
            isAlive: false,
          };
          currentRow.push(positionInfo);
        }
        _nodes.push(currentRow);
      }
      this.setState({ nodes: _nodes });
    });
  };
}
