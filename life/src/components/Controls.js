import React, { Component } from 'react';
//import { iterateBoard } from '../actions/';
import styled from 'styled-components';

const ControlsContainer = styled.div`
  border: .5px solid red;
  flex-direction: row;
  width: 500px;
  height: 100%;
  background-color: white;
  margin: 0 auto;
  flex-wrap: wrap;
`;

const Iterate = styled.button`
  background-color: white;
`;

class Controls extends Component {
  /*
  constructor(props) {
    super(props);
    this.state = {
      board: props.board,
      delay: props.delay,
      isRunning: props.isRunning,
      generation: props.generation
    };
  }
  */
 /*
  iterateClick = event => {
    console.log('*')
    if(this.props.isRunning === false){
      /*
      this.setState(prevState => {
        return {
          ...prevState,
          generation: prevState.generation+1
        }
      });
      */
      //this.props.onIterateClick(iterateGeneration(this.state.board), (this.state.generation))
      //iterateBoard();
 //   }
 // };

  handler = event => {
    if(this.props.isRunning === false){
      this.props.onIterateClick()
    }
  };

  render() {
    return(
      //<Iterate />
      //// <button onClick={event => this.iterateClick(event)} >Iterate</button>
      <div>
        <button onClick={event => this.handler(event)} >Iterate</button>
        <div>Generation: {this.props.generation}</div>
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