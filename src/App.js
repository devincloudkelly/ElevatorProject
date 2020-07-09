import React from 'react';
import './App.css';
import OutsideElevator from './containers/OutsideElevator';
import InsideElevator from './containers/InsideElevator';

class App extends React.Component {

  
  state = {
    currentFloor: 1,
    direction: 'not moving',
    upArray: [],
    downArray: [],
    outsideFloor: 1,
  }
  
  totalFloors = 9

  updateOutsideFloor = (newFloor) => {
    this.setState({
      outsideFloor: parseInt(newFloor)
    })
  }

  startMoving = (direction) => {
    // use this when you are addingFloorToQueue to start elevator if it is stationery.
    if (this.state.direction == "not moving"){
      this.setState({direction: direction})
    }
  }

  addFloorToQueue = (floor, direction) => {
    console.log('adding floor to queue in App', floor, direction)
    if (direction = 'up'){
      this.setState(state => {
        const upArray = state.upArray.map((element, index) => {
          if (index = parseInt(floor)-1){
            return true;
          } else {
            return element
          }
        })
        // this isn't working because it is updating the direction, then changing it I think...
        this.startMoving(direction)
        return {upArray};
      })
    }
    if (direction = 'down'){
      this.setState(state => {
        const downArray = state.downArray.map((element, index) => {
          if (index = parseInt(floor)-1){
            return true
          } else {
            return element
          }
        })
        this.startMoving(direction)
        return {downArray};
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
      <OutsideElevator totalFloors={this.totalFloors} updateOutsideFloor={this.updateOutsideFloor} outsideFloor={this.outsideFloor}/>
    </div>
    )
  }
}

export default App;
