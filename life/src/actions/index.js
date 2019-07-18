export const ITERATE_BOARD = 'ITERATE_BOARD';
export const TOGGLE_CELL_UPDATE = 'TOGGLE_CELL_UPDATE';
export const START_ITERATE_BOARD = 'START_ITERATE_BOARD';


export const iterateBoard = (board, generation) => dispatch => {
  dispatch({ type: START_ITERATE_BOARD });
  dispatch({ type: ITERATE_BOARD, payload: {board, generation} });
}

export const toggleCellUpdate = board => dispatch => {
  dispatch({ type: TOGGLE_CELL_UPDATE, payload: board  });
}
