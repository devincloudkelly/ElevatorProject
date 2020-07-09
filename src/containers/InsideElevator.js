import React, { Component } from 'react'
import FloorButtonGrid from '../components/FloorButtonGrid';

class InsideElevator extends Component {

    currentDirection = (direction) => {
        if (direction == "up") {
            return "UP"
        } else if (direction == "down") {
            return "DOWN"
        } else {
            return "NOT MOVING"
        }
    }
    

    render() {
        let {currentFloor, direction, totalFloors, addFloorToQueue} = this.props
        return (
            <div>

        <h3>Current floor: {currentFloor}</h3>
        <h3>Current direction: {this.currentDirection(direction)}</h3>
        <br/>
        <p>Select a floor:</p>
        <FloorButtonGrid totalFloors={totalFloors} addFloorToQueue={addFloorToQueue} currentFloor={currentFloor} direction={direction}/>
        <br/>
      </div>
        )
    }

}

export default InsideElevator;