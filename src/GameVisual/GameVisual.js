import React, { Component } from "react";
import Node from "./Node";
import "./GameVisual.css";
import AlgorithmInit from "../GameAlgorithm/Algorithm";

export default class GameVisual extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nodes: [],
      mouseIsPressed: false,
      generationNumber: 0,
    };
  }

  setIsMousePressed = (isMouseDown) => {
    this.setState({ mouseIsPressed: isMouseDown });
  };

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
    let genNum = parseInt(this.state.generationNumber);

    let algoResult = AlgorithmInit(
      updatedNodes,
      this.props.rowVal,
      this.props.rowVal
    );
    if (algoResult[1] === 0) {
      this.setState({
        generationNumber: `${genNum} (no changes/empty)`,
      });
    } else {
      this.setState({
        nodes: algoResult[0],
        generationNumber: genNum + 1,
      });
    }
  };

  render() {
    return (
      <div className="centerGol">
        <div className="buttonContainer">
          <button
            className="f6 link dim1 ba ph3 pv2 mb2 dib black ma4"
            onClick={this.getInitialGrid}
          >
            clear
          </button>{" "}
          <button
            className="f6 link dim1 ba ph3 pv2 mb2 dib black ma4"
            onKeyPress={(event) => {
              if (event.key === "w") {
                this.onButtonClick(this.state.nodes);
              }
            }}
            onClick={() => this.onButtonClick(this.state.nodes)}
          >
            next generation
          </button>
        </div>
        <div
          className="mw5 mw7-ns center ph5-ns"
          style={{ height: "100%", width: "100%" }}
        >
          <h2 className="genClass">
            generation: {this.state.generationNumber}
          </h2>
          <div className="gridDiv" style={this.displayRowValFractions()}>
            {this.state.nodes.map((row, rowIndex) => {
              return (
                <div
                  className="nodeDiv"
                  key={rowIndex}
                  style={this.displayColValFractions()}
                >
                  {row.map((nodeObj, nodeObjIndex) => {
                    return (
                      <Node
                        key={nodeObjIndex}
                        row={nodeObj.row}
                        col={nodeObj.col}
                        isAlive={nodeObj.isAlive}
                        updateGrid={this.gridUpdater}
                        mouseIsPressed={this.state.mouseIsPressed}
                        setIsMousePressed={this.setIsMousePressed}
                        // styleChanger={this.properNodeDimensions}
                      ></Node>
                    );
                  })}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  getInitialGrid = () => {
    this.setState({ nodes: [], generationNumber: 0 }, () => {
      let _nodes = [];
      for (let _row = 0; _row < this.props.rowVal; _row++) {
        let currentRow = [];
        for (let _column = 0; _column < this.props.rowVal; _column++) {
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

  displayRowValFractions() {
    return {
      width: "100%",
      height: "auto",
      display: "grid",
      gridTemplateColumns: "1fr",
      gridTemplateRows: `repeat(${this.props.rowVal}, 1fr)`,
    };
  }
  displayColValFractions() {
    return {
      display: "grid",
      gridTemplateColumns: `repeat(${this.props.rowVal}, 1fr)`,
      gridTemplateRows: "1fr",
    };
  }
}
