import React, { Component } from 'react'
import FloorButtonGrid from '../components/FloorButtonGrid';

class InsideElevator extends Component {

    floorsRemainingUp = (currentFloor, queue, totalFloors) => {
        let floorCheck = currentFloor
        let remainingFloors = false
        while (floorCheck < totalFloors) {
            if (!queue[floorCheck + 1]) {
                floorCheck += 1
            } else {
                return true
            }
        }
    }

    floorsRemainingDown = (currentFloor, queue, totalFloors) => {
        let floorCheck = currentFloor
        let remainingFloors = false
        while (floorCheck < totalFloors) {
            if (!queue[floorCheck - 1]) {
                floorCheck -= 1
            } else {
                return true
            }
        }
    }

    componentDidUpdate(prevProps) {
        if ((this.props.direction !== prevProps.direction) || (this.props.currentFloor !== prevProps.currentFloor) || (this.props.highestUpFloor !== prevProps.highestUpFloor) || (this.props.lowestDownFloor !== prevProps.lowestDownFloor)){
            let currentFloor = this.props.currentFloor
            let direction = this.props.direction
            let updateCurrentFloor = this.props.updateCurrentFloor
            let upQueue = this.props.upQueue
            let downQueue = this.props.downQueue
            let totalFloors = this.props.totalFloors
            let floorCheck = currentFloor
            let highestUpFloor = this.props.highestUpFloor
            let lowestDownFloor = this.props.lowestDownFloor

            if (direction === 'up') {
                console.log('time to get this elevator moving..', currentFloor, direction)
                // check if true values above current floor.
                // if so, move up one floor.
                if (this.floorsRemainingUp(currentFloor, upQueue, totalFloors)) {
                    setTimeout(() => {
                        updateCurrentFloor(currentFloor + 1)
                    }, 1000);
                }
            }
            if (direction === 'down') {
                console.log('time to get this elevator moving..', currentFloor, direction)
                // check if true values above current floor.
                // if so, move up one floor.
                if (this.floorsRemainingDown(currentFloor, downQueue, totalFloors)) {
                    setTimeout(() => {
                        updateCurrentFloor(currentFloor - 1)
                    }, 1000);
                }
            }
        }
    }

    

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