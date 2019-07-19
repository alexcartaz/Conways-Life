import React, { Component } from 'react';
import './App.css';
import Board from './components/Board';
import Controls from './components/Controls';
import { initBoard, iterateGeneration , clearBoard } from './lifeFunctions/';

class App extends Component {
  constructor(props) {
    super(props);
    this.onCellClick = this.onCellClick.bind(this);
    this.boardIterate = this.boardIterate.bind(this);
    this.boardClear = this.boardClear.bind(this);
    this.boardRandomInit = this.boardRandomInit.bind(this);
    this.startRun = this.startRun.bind(this);
    this.endRun = this.endRun.bind(this);
    this.state = {
      //board: initBoard(),
      isRunning: false,
      board: initBoard(),
      delay: 200, //ms
      generation: 0,
      iterating: false,
      toggleUpdateState: false,
      error: null
    };
    this.currentBoard = this.state.board.concat([]);
  }

  //only need to store values on state that are needed to trigger component re-renders
  //removed board from state since onClick cell and button clicks (iterate, etc.) are
  //all thats needed for re-render (not board itself)
  //-can probably use generation for loop increment re-render if i hit issues
  //once working, i should refactor to remove anything else from state not used for re-render
  onCellClick(id) {
    console.log('cell click')
    this.currentBoard[id] = !this.currentBoard[id]
  };

  boardClear() {
    console.log('*clear*')
    console.log('tUS: ' + this.state.toggleUpdateState)
    let clearedBoard = clearBoard()
    this.currentBoard = clearedBoard
    this.setState(prevState => {
      return {
        ...prevState,
        generation: 0,
        board: clearedBoard.concat([]),
        toggleUpdateState: !prevState.toggleUpdateState
      };
    });
  }

  boardIterate(){
    console.log('*iterating*')
    let { newBoard, didChange } = iterateGeneration(this.currentBoard)
    this.currentBoard = newBoard
    this.setState(prevState => {
      return {
        ...prevState,
        generation: prevState.generation + 1,
        board: newBoard.concat([]),
        toggleUpdateState: !prevState.toggleUpdateState,
        isRunning: didChange
      };
    });

  }

  boardRandomInit(){
    console.log('*board random init*')
    let newBoard = initBoard()
    this.currentBoard = newBoard
    this.setState(prevState => {
      return {
        ...prevState,
        generation: 0,
        board: newBoard.concat([]),
        toggleUpdateState: !prevState.toggleUpdateState
      };
    });
  }

  startRun(){
    console.log('*start run*')
    this.setState(prevState => {
      return {
        ...prevState,
        isRunning: true
      };
    });
  }

  endRun(){
    console.log('*end run*')
    this.setState(prevState => {
      return {
        ...prevState,
        isRunning: false
      };
    });
  }



  //need code here to surpress entire board refresh and manage new cell appearance with toggle state 
  //<Controls board={this.props.board} generation={generation} isRunning={isRunning} delay={delay} onIterateClick={this.onIterateClick} />
      
  render() {
    let {board, isRunning, generation, delay, toggleUpdateState} = this.state
    return (
      <div className="App">
        <Board 
          board={board} 
          isRunning={isRunning} 
          onClick={this.onCellClick} 
          toggleUpdateState={toggleUpdateState} 
          triggerIterate={this.boardIterate}
        />
        <Controls 
          board={board} 
          generation={generation} 
          isRunning={isRunning} 
          delay={delay} 
          onRandomInitClick={this.boardRandomInit} 
          onIterateClick={this.boardIterate} 
          onClearClick={this.boardClear}
          onRunClick={this.startRun} 
          onStopClick={this.endRun}
        />
      </div>
    );
  }
}

export default App;