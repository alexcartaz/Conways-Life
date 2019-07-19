import React, { Component } from 'react';
import Cell from './Cell';
import styled from 'styled-components';
import { connect } from 'react-redux';

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
  }
  */
  render() {
    let {isRunning, onClick} = this.props
    console.log('*board re-render*')
    return (
      <BoardContainer>
        {this.props.board.map((cell, index) => (
          <Cell isAlive={cell} id={index} isRunning={isRunning} onClick={onClick} />
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
export default connect(
  //mapStateToProps
)(Board);
