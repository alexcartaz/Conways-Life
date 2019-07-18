import {
  ITERATE_BOARD,
  TOGGLE_CELL_UPDATE,
  START_ITERATE_BOARD,
} from '../actions';

//import initBoard from ../lifeFunctions/lifeFunctions.js

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
  console.log(board)
  return board
}

const initState = {
  board: initBoard(),
  isRunning: false,
  delay: 2, //ms
  generation: 0,
  iterating: false,
  error: null,
}

const reducer = (state = initState, action) => {
  console.log(action.payload)
  switch (action.type){
    case START_ITERATE_BOARD:
      return {
        ...state,
        iterating: true
      };
    case ITERATE_BOARD:
      return {
        ...state,
        board: action.payload.board,
        generation: action.payload.generation,
        iterating: false,
        error: null
      };
    case TOGGLE_CELL_UPDATE:
      return {
        ...state,
        board: action.payload,
        error: null
      };

    default: 
      return state;
  }
};

export default reducer;