function initBoard(){
  let board = []
  let randomSeed = 0
  //this config makes every 1 in 10 random squares in 100x100
  for (let c = 0; c < 1000; c++){
    randomSeed = Math.floor(Math.random() * 11);
    if (randomSeed === 0) {
      board[c] = 1
    }else{
      board[c] = 0
    }
  }
  return board
}

export default initBoard;