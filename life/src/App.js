import React, { Component } from 'react';
import './App.css';
import Board from './components/Board';
import Controls from './components/Controls';
import { connect } from 'react-redux';
import { iterateBoard, toggleCellUpdate } from './actions/';


class App extends Component {

  
  componentDidMount() {
    //this.props.initializeBoard();
  }

  componentDidUpdate(prevProps, prevState){

  }

  render() {
    if(this.props.iterating){
      console.log('-------------- LOADING --------------');
      return <h4>Loading...</h4>
    }else{
      return (
        <div className="App">
          <Board {...this.props} />
          <Controls {...this.props} />
        </div>
      );
    }
  }
}

const mapStateToProps = state => ({
  board: state.board,
  delay: state.delay,
  isRunning: state.isRunning,
  generation: 0,
  iterating: false,
  error: state.error
});

export default connect(
  mapStateToProps,
  { iterateBoard, toggleCellUpdate }
)(App);

/*
<SmurfForm {...props} />
<Smurfs {...this.props} />
 */