import React from 'react';
import './App.css';
import OutsideElevator from './containers/OutsideElevator';
import InsideElevator from './containers/InsideElevator';
import { Container, Divider, Icon } from 'semantic-ui-react';

class App extends React.Component {  
  state = {
    totalFloors: 9,
    currentFloor: 5,
    direction: 'none',
    outsideFloor: 1,
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
    highestUpFloor: 1,
    lowestUpFloor: 9,
    lowestDownFloor: 9,
    highestDownFloor: 1,
  }

  // update outsideFloor in state
  updateOutsideFloor = (newFloor) => {
    this.setState({outsideFloor: newFloor})
  }

  // update currentFloor in state
  updateCurrentFloor = (newFloor) => {
    this.setState({currentFloor: newFloor})
  }

  // changes elevator direction
  changeDirection = (requestFloor, currentFloor) => {
    let direction;
    if (this.state.direction === "none"){
      if (requestFloor < currentFloor) {
        direction = 'down'
      }
      else if (requestFloor > currentFloor) {
        direction = 'up'
      } else {
        direction = 'none'
      }
      this.setState({direction: direction})
    }
  }

  // adds floor to approriate queue based on direction
  addFloorToQueue = (floor, direction) => {
    let currentFloor = this.state.currentFloor
    if (direction === 'up'){
      let lowestUpFloor = floor < this.state.lowesUpFloor ? {lowestUpFloor: floor} : null
      this.setState(state => {
        let upQueue = Object.assign({}, state.upQueue)
        upQueue[floor] = 1
        if (floor > this.state.highestUpFloor) {
          return {upQueue, highestUpFloor: floor}
        } else {
          return {upQueue}
        }
      }, () => {this.changeDirection(floor, currentFloor)})
    }
    if (direction === 'down'){
      this.setState(state => {
        let downQueue = Object.assign({}, state.downQueue)
        downQueue[floor] = 1
        if (floor < this.state.lowestDownFloor){
         return {downQueue, lowestDownFloor: floor} 
        } else {
          return {downQueue}
        }
      }, () => {this.changeDirection(floor, currentFloor)})
    }
  }

  render() {
    return (
      <div>
        <br/>
      <Container>
        <InsideElevator 
          currentFloor={this.state.currentFloor} 
          direction={this.state.direction} 
          totalFloors={this.state.totalFloors} 
          addFloorToQueue={this.addFloorToQueue} 
          updateCurrentFloor={this.updateCurrentFloor} 
          upQueue={this.state.upQueue} 
          downQueue={this.state.downQueue} 
          highestUpFloor={this.state.highestUpFloor} 
          lowestDownFloor={this.state.lowestDownFloor}
          changeDirection={this.changeDirection}  
        />
        <br/><br/>
      </Container>
        <Divider horizontal><Icon name='hand point up'/>Inside Elevator / <Icon name='hand point down'/>Outside Elevator</Divider>
        <Container>
        <br/><br/>
        <OutsideElevator 
          totalFloors={this.state.totalFloors} 
          updateOutsideFloor={this.updateOutsideFloor} 
          outsideFloor={this.state.outsideFloor} 
          addFloorToQueue={this.addFloorToQueue}
        />
    </Container>
    </div>
    )
  }
}

export default App;
