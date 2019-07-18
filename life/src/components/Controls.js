import React, { Component } from 'react';


 
 
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
  console.log("!")
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

class Controls extends Component {

  constructor(props) {
    super(props);
    this.state = {
      board: props.board,
      delay: props.delay,
      isRunning: props.isRunning,
      generation: props.generation
    };
  }

  handleClick = event => {
    if(this.props.isRunning === false){
      this.props.iterateBoard(iterateGeneration(this.state.board), (this.state.generation+1));
    }
  };

  render() {
    return(
      //<Iterate />
      <div>
        <button onClick={event => this.handleClick(event)} >Iterate</button>
        <div>Generation: {this.state.generation}</div>
      </div>
      /*
      <Start />
      <Stop />
      <Clear />
      */
      /*<Speed />*/
    );
  }
}

export default Controls;