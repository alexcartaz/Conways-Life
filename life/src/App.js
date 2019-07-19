import React, { Component } from 'react';
import './App.css';
import Board from './components/Board';
import Controls from './components/Controls';
import { connect } from 'react-redux';
//import { iterateBoard } from './actions/';


/*
***************  Life game code  *************
 */
function generateIndex(row, column){
  return row*50+column
}

function calcIndiciesOfNeighbors(currentRow, currentColumn, row_above, row_below, left_column, right_column){
  let indices = []
  indices.push(generateIndex(row_above,left_column))
  indices.push(generateIndex(row_above,currentColumn))
  indices.push(generateIndex(row_above,right_column))
  indices.push(generateIndex(currentRow,right_column))
  indices.push(generateIndex(row_below,right_column))
  indices.push(generateIndex(row_below,currentColumn))
  indices.push(generateIndex(row_below,left_column))
  indices.push(generateIndex(currentRow,left_column))
  return indices
}

function determineNumberOfAliveNeighbors(board, index){
  //default 2500 (50x50)
  //this approach should work for any board of equal height/width
  let len = board.length
  let numRows = Math.sqrt(len)
  let currentRow = Math.floor(index / numRows) //btw 1-50
  let currentColumn = (index % numRows)
  /*
  console.log("row: " + currentRow)
  console.log("column: " + currentColumn)
  console.log("index: " + generateIndex(currentRow,currentColumn))
  */
  let row_above = 0
  let row_below = 0
  let left_column = 0
  let right_column = 0

  if (currentRow === 0) {
    row_above = 49
  } else {
    row_above = currentRow + 1
  }

  if (currentRow === 49) {
    row_below = 0
  } else {
    row_below = currentRow - 1
  }

  if (currentColumn === 49) {
    right_column = 0
  } else {
    right_column = currentColumn + 1
  }

  if (currentColumn === 0) {
    left_column = 49
  } else {
    left_column = currentColumn - 1
  }


  let indicesOfNeighbors = calcIndiciesOfNeighbors(currentRow, currentColumn, row_above, row_below, left_column, right_column)
  let numNeighbors = 0
  for (let i = 0; i < 9; i++){
    if (board[indicesOfNeighbors[i]]){
      numNeighbors++;
    }
  }

  return numNeighbors
}

 /*
  Rules:
  If the cell is alive and has 2 or 3 neighbors, then it remains alive. Else it dies.
  If the cell is dead and has exactly 3 neighbors, then it comes to life. Else if remains dead.
*/

function iterateGeneration(board){
  let newBoard = []
  for (let c = 0; c < 2500; c++){
    let numNeighbors = determineNumberOfAliveNeighbors(board, 1329)
    if (board[c] && (numNeighbors===2 || numNeighbors===3)){
      newBoard[c] = false
    }else if(!board[c] && numNeighbors===3){
      newBoard[c] = true
    }else{
      newBoard[c] = false
    }
  }
  return newBoard
}

function initBoard(){
  let board = []
  let randomSeed = 0
  //this config makes every 1 in 10 random squares in 100x100
  for (let c = 0; c < 2500; c++){
    randomSeed = Math.floor(Math.random() * 11);
    if (randomSeed === 0) {
      board[c] = true
    }else{
      board[c] = false
    }
  }
  return board
}
/*
***********************************************
 */


class App extends Component {
  constructor(props) {
    super(props);
    this.onCellClick = this.onCellClick.bind(this);
    this.onIterateClick = this.onIterateClick.bind(this);
    this.board = initBoard();
    this.currentBoard = this.board.concat([]);
    this.state = {
      //board: initBoard(),
      isRunning: false,
      delay: 2, //ms
      generation: 0,
      iterating: false,
      error: null
    };
  }

  onCellClick(id) {
    /*
    let board = this.state.board
    board[id] = !board[id]
    this.setState(prevState => {
      return {
        ...prevState,
        board: board //board.concat([])
      };
    });*/
    this.currentBoard[id] =! this.currentBoard[id]
  };

  onIterateClick(){
    console.log('*iterating*')
    this.board = iterateGeneration(this.currentBoard, this.state.generation)
    this.currentBoard = this.board.concat([])
     this.setState(prevState => {
      return {
        ...prevState,
        generation: prevState.generation + 1
      };
    });
    /*
    let oldBoard = this.state.board;
    let board = iterateGeneration(this.state.board, this.state.generation)
    console.log('pre-setState comparison: ' + (oldBoard === board))
    this.setState(prevState => {
      return {
        ...prevState,
        board: board, //.concat([])
        generation: prevState.generation + 1
      };
    });
    //console.log('generation: ' + this.state.generation);
    //console.log('does old board === new board? ' + (oldBoard === this.state.board));
    */
  }

  //need code here to surpress entire board refresh and manage new cell appearance with toggle state 
  //<Controls board={this.props.board} generation={generation} isRunning={isRunning} delay={delay} onIterateClick={this.onIterateClick} />
      
  render() {
    let {board, isRunning, generation, delay} = this.state
    console.log(generation)
    console.log(board)
    return (
      <div className="App">
        <Board board={this.board} isRunning={isRunning} onClick={this.onCellClick} />
        <Controls board={board} generation={generation} isRunning={isRunning} delay={delay} onIterateClick={this.onIterateClick} />
      </div>
    );
  }
}
/*s
const mapStateToProps = state => ({
  board: state.board,
  delay: state.delay,
  isRunning: state.isRunning,
  generation: state.generation,
  iterating: false,
  error: state.error
});

export default connect(
  mapStateToProps,
  //{ iterateBoard, toggleCellUpdate }
)(App);*/

export default App;