import React, { Component } from "react";
import Node from "./Node";
import "./GameVisual.css";
import AlgorithmInit from "../GameAlgorithm/Algorithm";

export default class GameVisual extends Component {
  constructor() {
    super();
    this.state = {
      nodes: [],
    };
  }

  componentDidMount() {
    this.getInitialGrid();
  }

  returnStateNodes = () => {
    console.log(this.state.nodes);
    return this.state.nodes;
  };

  gridUpdater = (row, col, isAlive) => {
    this.setState((prevState) => {
      let nodes = [...prevState.nodes];
      nodes[row][col].isAlive = isAlive;
      return nodes;
    });
  };

  onButtonClick = (updatedNodes) => {
    let algoResult = AlgorithmInit(updatedNodes);
    this.setState({ nodes: algoResult }, () => {
      console.log(algoResult, "algo completed");
    });
  };

  render() {
    return (
      <div className="centerGol">
        <button onClick={() => this.onButtonClick(this.returnStateNodes())}>
          click
        </button>
        <div>
          {/* {console.log("indiv", this.state.nodes)} */}
          {this.state.nodes.map((elem, idx) => {
            return (
              <div key={idx}>
                {elem.map((g, i) => {
                  return (
                    <Node
                      key={i}
                      row={g.row}
                      col={g.col}
                      isAlive={g.isAlive}
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

  getInitialGrid() {
    let _nodes = [];
    for (let _row = 0; _row < 10; _row++) {
      let currentRow = [];
      for (let _column = 0; _column < 10; _column++) {
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
  }
}
