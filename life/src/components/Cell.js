import React, { Component } from 'react';
import styled from 'styled-components';
/*
const LifeCell = styled.div`
  border: .5px solid black;
  width: 9px;
  height: 9px;
  border-radius: 25%;
  background-color : ${state => {
    //I don't fully understand how passing values into this works
    console.log('color: ' + state.isAlive)
    if(state.isAlive === true){
      return 'green';
    } else {
      return 'black';
    }
  }};
`;
*/

//look into Style (React)
//<div style={{ background: ‘black’, width: 100, height: 100 }} /> 
//const style = {...}
const LifeCellAlive = styled.div`
  border: .5px solid black;
  width: 9px;
  height: 9px;
  border-radius: 25%;
  background-color : green;
`;

const LifeCellDead = styled.div`
  border: .5px solid black;
  width: 9px;
  height: 9px;
  border-radius: 25%;
  background-color : black;
`;

class Cell extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isAlive: props.isAlive,
      toggleUpdateState: props.toggleUpdateState
    };
  }
  
  //this is called before rendering.
  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.toggleUpdateState !== prevState.toggleUpdateState){
      return {
        isAlive: nextProps.isAlive,
        toggleUpdateState: nextProps.toggleUpdateState
      }
    }
    return null
  }
  
  //revist why using generation over toggle doesn't work
  handler = () => {
    if(this.props.isRunning === false){
      this.setState(prevState => {
        return {
          ...prevState,
          isAlive: !prevState.isAlive
        }
      });
      this.props.onClick(this.props.id)
    }
  };
 
  render() {
    if (this.state.isAlive === true){
      return(
        <LifeCellAlive id={this.props.id} onClick={this.handler}  />
      )
    }else{
      return(
        <LifeCellDead id={this.props.id} onClick={this.handler}  />
      )
    }
  }
};

export default Cell;