import React, { Component } from 'react';
import styled from 'styled-components';

const LifeCell = styled.div`
  border: .5px solid black;
  width: 9px;
  height: 9px;
  background-color : ${props => {
    //console.log(props)
    //const isAlive = props.isAlive ;
    //I don't fully understand how passing values into this works
    if(props.isAlive === true){
      return 'green';
    } else {
      return 'black';
    }
  }};
`;

class Cell extends Component {

  constructor(props) {
    super(props);
    this.state = {
      currentState: props.isAlive,
      id: props.id,
      board: props.board
    };
  }

  handleClick = event => {
    if(this.props.isRunning === false){
      //if i don't set state here (and only update MapStateToProps value board, 
      //UI doesnt update and I dont rememebr why)
      this.setState({
       currentState: !this.state.currentState
      });
      let board = this.state.board
      board[this.state.id] = !board[this.state.id]
      this.props.toggleCellUpdate(board);
    }
  };

  render() {
    return(
      <LifeCell isAlive = {this.state.currentState} onClick={event => this.handleClick(event)} />
    )
  }
}

export default Cell;