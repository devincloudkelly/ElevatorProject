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
    hasUpFloors: 0,
    hasDownFloors: 0,
  }

  // update outsideFloor in state
  updateOutsideFloor = (newFloor) => {
    this.setState({outsideFloor: newFloor})
  }

  // update currentFloor in state
  updateCurrentFloor = (newFloor) => {
    this.setState({currentFloor: newFloor})
  }

  hasNoFloors = (direction) => {
    console.log('updatings has no floors state...', direction)
    direction === 'up' ? 
    this.setState({hasUpFloors: 0}) :
    this.setState({hasDownFloors: 0})
  }

  // when a floor is visited, you update the currentFloor and remove it from the appropriate queue
  visitUpFloor = (floor) => {
    this.updateCurrentFloor(floor)
    // logic to remove floor from appropriate queue
    this.setState(state => {
      let upQueue = Object.assign({}, state.upQueue)
      upQueue[floor] = 0
      return {upQueue}
    })
  }

  visitDownFloor = (floor) => {
    console.log('visiting down floor..')
    this.updateCurrentFloor(floor)
    this.setState(state => {
      let downQueue = Object.assign({}, state.downQueue)
      downQueue[floor] = 0
      return {downQueue}
    })
  }

  // changes elevator direction
  changeDirection = (requestFloor, currentFloor) => {
    console.log('changing direction...', requestFloor, currentFloor)
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
        // if (floor > this.state.highestUpFloor) {
        //   return {upQueue, highestUpFloor: floor}
        // } else {
          return {upQueue, hasUpFloors: 1}
        // }
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
        // if (floor < this.state.lowestDownFloor){
        //  return {downQueue, lowestDownFloor: floor} 
        // } else {
          return {downQueue, hasDownFloors: 1}
        // }
      }, () => {
        if (this.state.direction === 'none'){
        this.changeDirection(floor, currentFloor)
        }
      })
    }
  }

  removeFloorFromQueue = (floor, queue) => {
    console.log('removing floor from queue', floor, queue)
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
          visitUpFloor={this.visitUpFloor}
          visitDownFloor={this.visitDownFloor}
          upQueue={this.state.upQueue} 
          downQueue={this.state.downQueue} 
          highestUpFloor={this.state.highestUpFloor} 
          lowestDownFloor={this.state.lowestDownFloor}
          changeDirection={this.changeDirection}  
          hasNoFloors={this.hasNoFloors}
          hasUpFloors={this.state.hasUpFloors}
          hasDownFloors={this.state.hasDownFloors}
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
