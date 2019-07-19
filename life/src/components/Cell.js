import React, { PureComponent } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';

const LifeCell = styled.div`
  border: .5px solid black;
  width: 9px;
  height: 9px;
  border-radius: 25%;
  background-color : ${props => {
    //I don't fully understand how passing values into this works
    if(props.isAlive === true){
      return 'green';
    } else {
      return 'black';
    }
  }};
`;
//pure component (import pure component)
class Cell extends PureComponent {

  constructor(props) {
    super(props);
    this.state = {
      isAlive: props.isAlive,
      isAliveProp: props.isAlive
    };
  }

  //this is called before rendering.
  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.isAlive !== prevState.isAliveProp){
      return {
        isAlive: nextProps.isAlive,
        isAliveProp: nextProps.isAlive
      }
    }
    return null
  }
  
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
    console.log(this.props.id)
    return(
      //onClick={ () => this.props.onClick(this.props.id) 
      /*<LifeCell id={this.props.id} isAlive={this.props.isAlive} onClick={event => this.handleClick(event)} />*/
      //this.handler(this.props.id, this.props.onClick)
      <LifeCell id={this.props.id} isAlive={this.state.isAlive} onClick={this.handler}  />
    )
  }
};

export default Cell;