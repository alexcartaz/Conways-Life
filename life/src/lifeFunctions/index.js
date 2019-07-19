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
  let row_above = 0
  let row_below = 0
  let left_column = 0
  let right_column = 0

  if (currentRow === 0) {
    row_above = 49
  } else {
    row_above = currentRow - 1
  }

  if (currentRow === 49) {
    row_below = 0
  } else {
    row_below = currentRow + 1
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

export function iterateGeneration(board){
  let newBoard = []
  for (let c = 0; c < 2500; c++){
    let numNeighbors = determineNumberOfAliveNeighbors(board, c)
    
    if (board[c] && (numNeighbors===2 || numNeighbors===3)){
      newBoard[c] = true
    }else if(!board[c] && numNeighbors===3){
      newBoard[c] = false
    }else{
      newBoard[c] = false
    }
  }
  return newBoard
}

export function initBoard(){
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

export function clearBoard(){
  let clearBoard = []
  for (let c = 0; c < 2500; c++){
    clearBoard[c] = false
  }
  return clearBoard
}
/*
***********************************************
 */