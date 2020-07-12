import React from 'react';
import './App.css';
import OutsideElevator from './containers/OutsideElevator';
import InsideElevator from './containers/InsideElevator';
import { Container, Divider, Icon } from 'semantic-ui-react';

class App extends React.Component {  
  state = {
    totalFloors: 9,
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

  componentDidMount() {
    // check is direction is !'none'
    // check if direction is up
    // if true, check for more true floors above. If there are, then set timeout to update current floor in 1 second.
    //  if there are no more floors, check if downqueue has any true values. 
    //  if downqueue has any true values, navigate to highest value, one floor at a time. 

    // save highestDownFloor as a state value and lowestUpFloor. 
  }

  // update outsideFloor in state
  updateOutsideFloor = (newFloor) => {
    console.log('updating outside floor in state', newFloor)
    this.setState({outsideFloor: newFloor})
  }

  // puts elevator in motion, either up or down.
  startMoving = (requestFloor, currentFloor) => {
    let direction;
    // use this when you are addingFloorToQueue to start elevator if it is stationery.
    if (this.state.direction === "none"){
      if (requestFloor < currentFloor) {
        direction = 'down'
      }
      if (requestFloor > currentFloor) {
        direction = 'up'
      }
      this.setState({direction: direction})
    }
  }

  // adds floor to approriate queue based on direction
  addFloorToQueue = (floor, direction) => {
    let currentFloor = this.state.currentFloor
    if (direction === 'up'){
      this.setState(state => {
        let upQueue = Object.assign({}, state.upQueue)
        upQueue[floor] = 1
        return {upQueue}
      }, () => {this.startMoving(floor, currentFloor)})
    }
    if (direction === 'down'){
      this.setState(state => {
        let downQueue = Object.assign({}, state.downQueue)
        downQueue[floor] = 1
        return {downQueue}
      }, () => {this.startMoving(floor, currentFloor)})
    }
  }

  render() {
    return (
      <div>
        <br/>
      <Container>
        <InsideElevator currentFloor={this.state.currentFloor} direction={this.state.direction} totalFloors={this.state.totalFloors} addFloorToQueue={this.addFloorToQueue}/>
        <br/><br/>
      </Container>
        <Divider horizontal><Icon name='hand point up'/>Inside Elevator / <Icon name='hand point down'/>Outside Elevator</Divider>
        <Container>
        <br/><br/>
        <OutsideElevator totalFloors={this.state.totalFloors} updateOutsideFloor={this.updateOutsideFloor} outsideFloor={this.state.outsideFloor} addFloorToQueue={this.addFloorToQueue}/>
    </Container>
    </div>
    )
  }
}

export default App;
