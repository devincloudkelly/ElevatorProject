import React from 'react';
import './App.css';
import OutsideElevator from './containers/OutsideElevator';
import InsideElevator from './containers/InsideElevator';

class App extends React.Component {
  
  
  state = {
    currentFloor: 5,
    outsideFloor: 1,
    direction: 'none',
    upQueue: {
      1:0,
      2:0,
      3:0,
      4:0,
      5:0,
      6:0,
      7:0,
      8:0,
      9:0,
    },
    downQueue: {
      1:0,
      2:0,
      3:0,
      4:0,
      5:0,
      6:0,
      7:0,
      8:0,
      9:0,
    },
  }

  totalFloors = 9

  updateOutsideFloor = (newFloor) => {
    console.log('updating outside floor in state', newFloor)
    this.setState({outsideFloor: newFloor})
  }

  startMoving = (direction) => {
    // use this when you are addingFloorToQueue to start elevator if it is stationery.
    if (this.state.direction === "none"){
      this.setState({direction: direction})
    }
  }

  // working
  addFloorToQueue = (floor, direction) => {
    console.log('from App, adding floor, direction', floor, direction)
    console.log('adding floor to queue in App', floor, direction)
    if (direction === 'up'){
      this.setState(state => {
        let upQueue = Object.assign({}, state.upQueue)
        upQueue[floor] = 1
        return {upQueue}
      })
    }
    if (direction === 'down'){
      this.setState(state => {
        let downQueue = Object.assign({}, state.downQueue)
        downQueue[floor] = 1
        return {downQueue}
      })
    }
  }

  render() {
    return (
      <div>
        <h1>Inside the Elevator</h1>      
      <InsideElevator currentFloor={this.state.currentFloor} direction={this.state.direction} totalFloors={this.totalFloors} addFloorToQueue={this.addFloorToQueue}/>
      <br/><br/>
      <div>--------------------------------------</div>
      <br/><br/>
      <h1>Outside the Elevator</h1>
      {console.log('outside floor in app...', this.outsideFloor)}
      <OutsideElevator totalFloors={this.totalFloors} updateOutsideFloor={this.updateOutsideFloor} outsideFloor={this.outsideFloor}/>
    </div>
    )
  }
}

export default App;
