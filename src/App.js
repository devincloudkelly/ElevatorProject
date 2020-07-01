import React from 'react';
import './App.css';
import OutsideElevator from './containers/OutsideElevator';
import InsideElevator from './containers/InsideElevator';

class App extends React.Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     currentFloor: 1,
  //     isGoingUp: false,
  //     downFloors: [],
  //     upFloors: [],
  //   }
  // }

  state = {
    isInside: true,
    currentFloor: 1,
    isGoingUp: false,
  }

  render() {
    return (
    !this.state.isInside ?
     
      <div>
        <OutsideElevator />
      </div>

     :
    <div>
      <InsideElevator currentFloor={this.state.currentFloor} isGoingUp={this.state.isGoingUp}/>
    </div>
    )
  }
}

export default App;
