import React, { Component } from 'react';
import './App.css';
import Board from './components/Board';
import Controls from './components/Controls';
import { initBoard, iterateGeneration , clearBoard } from './lifeFunctions/';
import styled from 'styled-components';

const Title = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 60px;
  margin: 0 auto;
  flex-wrap: wrap;
  justify-content: center;
  font-weight: bold;
  font-size: 30px;
  padding: 0 10px;
  align-items: center;
`;

const Body = styled.div`
  display: inline-flex;
  flex-direction: row;
  width: 60%;
  height: 100%;
  margin: 0 auto;
  flex-wrap: no-wrap;
  justify-content: flex-start;
  margin-bottom: 20px;
`;

const BoardContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 50%;
  height: 100%;
  flex-wrap: no-wrap;
`;

const Rules = styled.div`
  display: flex;
  flex-direction: row;
  width: 50%;
  height: 100%;
  flex-wrap: wrap;
  text-align: left;
`;

const Footer = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 100%;
  flex-wrap: wrap;
  justify-content: center;
`;

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  flex-wrap: wrap;
`;

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
      delay: 20000, //ms
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
    let newIsRunning = didChange
    if(!this.state.isRunning){
      newIsRunning = false
    }
    this.setState(prevState => {
      return {
        ...prevState,
        generation: prevState.generation + 1,
        board: newBoard.concat([]),
        toggleUpdateState: !prevState.toggleUpdateState,
        isRunning: newIsRunning
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
      
  render() {
    let {board, isRunning, generation, delay, toggleUpdateState} = this.state
    return (
      <AppContainer className="App">
        <Title>Conway's Game of Life</Title>
        <Body>
          <BoardContainer>
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
          </BoardContainer>
          <Rules>
            <p>The Rules:{"\n"}{"\n"}</p>
            <p>1. Any live cell with fewer than two live neighbours dies, as if by underpopulation.</p>
            <p>2. Any live cell with two or three live neighbours lives on to the next generation.</p>
            <p>3. Any live cell with more than three live neighbours dies, as if by overpopulation.</p>
            <p>4. Any dead cell with three live neighbours becomes a live cell, as if by reproduction.</p>
            <br/>
          </Rules>
        </Body>
        <Footer>
          <a href="https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life">Learn more about Conway's Game of Life</a>
        </Footer>
      </AppContainer>
    );
  }
}

export default App;