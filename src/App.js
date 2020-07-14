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
  }

  // update outsideFloor in state
  updateOutsideFloor = (newFloor) => {
    this.setState({outsideFloor: newFloor})
  }

  // update currentFloor in state
  updateCurrentFloor = (newFloor) => {
    this.setState({currentFloor: newFloor})
  }

  // update currentFloor and visited floor from queue
  visitUpFloor = (floor) => {
    this.updateCurrentFloor(floor)
    // logic to remove floor from appropriate queue
    this.setState(state => {
      let upQueue = Object.assign({}, state.upQueue)
      upQueue[floor] = 0
      return {upQueue}
    })
  }

  // update current floor and remove visited floor from queue
  visitDownFloor = (floor) => {
    this.updateCurrentFloor(floor)
    this.setState(state => {
      let downQueue = Object.assign({}, state.downQueue)
      downQueue[floor] = 0
      return {downQueue}
    })
  }

  // changes elevator direction
  changeDirection = (requestFloor, currentFloor) => {
    let newDirection;
      if (requestFloor < currentFloor) {
        newDirection = 'down'
      }
      else if (requestFloor > currentFloor) {
        newDirection = 'up'
      } else {
        newDirection = 'none'
      }
      this.setState({direction: newDirection})
  }

  // adds floor to approriate queue based on direction
  addFloorToQueue = (floor, direction) => {
    let currentFloor = this.state.currentFloor
    if (direction === 'up'){
      this.setState(state => {
        let upQueue = Object.assign({}, state.upQueue)
        upQueue[floor] = 1
          return {upQueue}
      }, () => {
        if (this.state.direction === 'none'){
        this.changeDirection(floor, currentFloor)
      }
    })
    }
    if (direction === 'down'){
      this.setState(state => {
        let downQueue = Object.assign({}, state.downQueue)
        downQueue[floor] = 1
          return {downQueue}
      }, () => {
        if (this.state.direction === 'none'){
        this.changeDirection(floor, currentFloor)
        }
      })
    }
  }

  render() {
    return (
      <div>
        <br/>
      <Container>
        <InsideElevator 
          addFloorToQueue={this.addFloorToQueue} 
          visitUpFloor={this.visitUpFloor}
          visitDownFloor={this.visitDownFloor}
          changeDirection={this.changeDirection}  
          currentFloor={this.state.currentFloor} 
          direction={this.state.direction} 
          totalFloors={this.state.totalFloors} 
          upQueue={this.state.upQueue} 
          downQueue={this.state.downQueue} 
        />
        <br/><br/>
      </Container>
        <Divider horizontal><Icon name='hand point up'/>Inside Elevator / <Icon name='hand point down'/>Outside Elevator</Divider>
        <Container>
        <br/><br/>
        <OutsideElevator 
          totalFloors={this.state.totalFloors} 
          outsideFloor={this.state.outsideFloor} 
          updateOutsideFloor={this.updateOutsideFloor} 
          addFloorToQueue={this.addFloorToQueue}
        />
    </Container>
    </div>
    )
  }
}

export default App;
