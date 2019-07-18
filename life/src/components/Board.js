import React, { Component } from 'react';
import Cell from './Cell';
import styled from 'styled-components';

const BoardContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 500px;
  height: 500px;
  background-color: gray;
  margin: 0 auto;
  flex-wrap: wrap;
`;

//I don't think I need a class for board, fix this later
class Board extends Component {

  constructor(props) {
    super(props);
    this.state = {
      board: props.board,
      delay: props.delay,
    };
  }

  render() {
    return (
      <BoardContainer>
        {this.props.board.map((cell, index) => (
          <Cell isAlive={cell} id={index} {...this.props}/>
        ))}
      </BoardContainer>
    );
  }
}

export default Board;
