import React, { Component } from 'react'
import FloorButtonGrid from '../components/FloorButtonGrid';

class InsideElevator extends Component {

    floorsRemainingUp = (currentFloor, queue, totalFloors) => {
        let floorCheck = currentFloor
        while (floorCheck < totalFloors) {
            if (!queue[floorCheck + 1]) {
                floorCheck += 1
            } else {
                return true
            }
        }
    }

    floorsRemainingDown = (currentFloor, queue) => {
        let floorCheck = currentFloor
        while (floorCheck > 1) {
            if (!queue[floorCheck - 1]) {
                floorCheck -= 1
            } else {
                return true
            }
        }
    }

    findHighestDownFloor = (totalFloors, downQueue) => {
        let counter = totalFloors
        while (counter > 1) {
            if (downQueue[counter]) {
                console.log('returning true from find highest...')
                return counter
            } else {
                console.log('decrementing counter from find highest...')
                counter -= 1
            }
        }
        return counter
    }

    findLowestUpFloor = (totalFloors, upQueue) => {
        let counter = totalFloors
        while (counter < totalFloors) {
            if (upQueue[counter]) {
                console.log('returning true from find lowest...')
                return counter
            } else {
                console.log('incrementing counter from find lowest...')
                counter += 1
            }
        }
        return counter
    }

    componentDidUpdate(prevProps) {
        if ((this.props.direction !== prevProps.direction) || (this.props.currentFloor !== prevProps.currentFloor) || (this.props.highestUpFloor !== prevProps.highestUpFloor) || (this.props.lowestDownFloor !== prevProps.lowestDownFloor)){
            let currentFloor = this.props.currentFloor
            let direction = this.props.direction
            let visitUpFloor = this.props.visitUpFloor
            let visitDownFloor = this.props.visitDownFloor
            let upQueue = this.props.upQueue
            let downQueue = this.props.downQueue
            let totalFloors = this.props.totalFloors
            let changeDirection = this.props.changeDirection

            if (direction === 'up') {
                console.log('time to get this elevator moving..', currentFloor, direction)
                // check if floor values set to true above current floor exist. If so, move up one floor.
                if (this.floorsRemainingUp(currentFloor, upQueue, totalFloors)) {
                    setTimeout(() => {
                        visitUpFloor(currentFloor + 1)
                    }, 1000)
                // if no floors, checks if the downQueue has any true values
                } else if (this.floorsRemainingDown(currentFloor, downQueue)) {
                    console.log('done going up, there are downValues to go to now...')
                    console.log(this.findHighestDownFloor(totalFloors, downQueue))
                    let highestDownFloor = this.findHighestDownFloor(totalFloors, downQueue)
                    if ( highestDownFloor > currentFloor){
                        setTimeout(() => {
                            visitUpFloor(currentFloor + 1)
                        }, 1000)
                    } else {
                        console.log('going to change direction...')
                        changeDirection(highestDownFloor,currentFloor)
                    }
                    // if it does, check for highest down floor. If it's above, keep moving up one floor per second.
                    // if it's equal to current floor or below, update direction to down
                }
            }
            if (direction === 'down') {
                console.log('time to get this elevator moving..', currentFloor, direction)
                // check if true values above current floor.
                // if so, move up one floor.
                if (this.floorsRemainingDown(currentFloor, downQueue, totalFloors)) {
                    setTimeout(() => {
                        visitDownFloor(currentFloor - 1)
                    }, 1000);
                } else if (this.floorsRemainingUp(currentFloor, upQueue)) {
                    console.log('done going up, there are downValues to go to now...')
                    console.log(this.findHighestDownFloor(totalFloors, upQueue))
                    let lowestUpFloor = this.findHighestDownFloor(totalFloors, upQueue)
                    if ( lowestUpFloor < currentFloor){
                        setTimeout(() => {
                            visitUpFloor(currentFloor - 1)
                        }, 1000)
                    } else {
                        console.log('going to change direction...')
                        changeDirection(lowestUpFloor,currentFloor)
                    }
                    // if it does, check for highest down floor. If it's above, keep moving up one floor per second.
                    // if it's equal to current floor or below, update direction to down
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
                <h1>Current floor: {currentFloor}</h1>
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