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
    upArray: [],
    downArray: [],
  }

  totalFloors = 9

  render() {
    return (
      <div>
        <h1>Inside the Elevator</h1>      
      <InsideElevator currentFloor={this.state.currentFloor} isGoingUp={this.state.isGoingUp}/>
      <div>--------------------------------------</div>
      <h1>Outside the elevator</h1>
      <OutsideElevator totalFloors={this.totalFloors}/>
    </div>
    )
  }
}

export default App;
