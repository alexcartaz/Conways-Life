import React, { Component } from 'react';
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
 
  handleRandomInitClick = event => {
    if(this.props.isRunning === false){
      this.props.onRandomInitClick()
    }
  };

  handleIterateClick = event => {
    if(this.props.isRunning === false){
      this.props.onIterateClick()
    }
  };

  handleClearClick = event => {
    if(this.props.isRunning === false){
      this.props.onClearClick()
    }
  };

  handleRunClick = event => {
    if(this.props.isRunning === false){
      this.props.onRunClick()
    }
  };

  handleStopClick = event => {
    this.props.onStopClick()
  };

  render() {
    return(
      //<Iterate />
      //// <button onClick={event => this.iterateClick(event)} >Iterate</button>
      <div>
        <button onClick={event => this.handleRandomInitClick(event)} >Random Init</button>
        <button onClick={event => this.handleIterateClick(event)} >Iterate</button>
        <button onClick={event => this.handleClearClick(event)} >Clear</button>
        <button onClick={event => this.handleRunClick(event)} >Run</button>
        <button onClick={event => this.handleStopClick(event)} >Stop</button>
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