import React, { Component } from 'react'
import FloorButtonGrid from '../components/FloorButtonGrid';

class InsideElevator extends Component {

    // provides stylized direction to component
    currentDirection = (direction) => {
        if (direction === "up") {
            return "UP"
        } else if (direction === "down") {
            return "DOWN"
        } else {
            return "NOT MOVING"
        }
    }
    

    render() {
        let {currentFloor, direction, totalFloors, addFloorToQueue} = this.props
        return (
            <div>
                <p>Select a floor to travel to it.</p>
                <h3>Current floor: {currentFloor}</h3>
                <h3>Current direction: {this.currentDirection(direction)}</h3>
                <br/>
                <p>1. Select a floor:</p>
                <FloorButtonGrid totalFloors={totalFloors} addFloorToQueue={addFloorToQueue} currentFloor={currentFloor} direction={direction}/>
                <br/>
            </div>
        )
    }

}

export default InsideElevator;