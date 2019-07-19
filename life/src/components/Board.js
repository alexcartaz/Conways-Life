import React, { Component } from 'react';
import Cell from './Cell';
import styled from 'styled-components';

const BoardContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 500px;
  height: 500px;
  background-color: black;
  margin: 0 auto;
  flex-wrap: wrap;
`;

//function Board ({board, isRunning, onClick}) {
class Board extends Component {
  /*
  constructor(props) {
    super(props);
    this.state = {
      board: props.board
    }
  }
  */
  render() {
    let {board, isRunning, onClick, toggleUpdateState} = this.props
    console.log('*board re-render*')
    console.log(this.props.board)
    //console.log('**')
    return (
      <BoardContainer>
        {board.map((cell, index) => (
          <Cell isAlive={cell} id={index} isRunning={isRunning} onClick={onClick} toggleUpdateState={toggleUpdateState}/*generation={generation}*/ />
        ))}
      </BoardContainer>
    );
  }
}
//I don't think mapStateToProps is necessary here since on <Cell> and <Controls> modify board
/*
const mapStateToProps = state => ({
  board: state.board
});
*/
export default Board;