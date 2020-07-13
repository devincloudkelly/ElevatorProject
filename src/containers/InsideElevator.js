import React, { Component } from 'react'
import FloorButtonGrid from '../components/FloorButtonGrid';

class InsideElevator extends Component {

    // checks to see if any floors remain above current floor in upQueue
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

    // checks to see if any floors remain below current floor in downQueue
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

    // returns the highest floor in the downQueue
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

    // returns lowest floor in the upQueue
    findLowestUpFloor = (totalFloors, upQueue) => {
        let counter = 1
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

    updateHasFloors = (queue) => {
        return this.props.hasNoFloors(queue)
    }

    componentDidUpdate(prevProps) {
        let {
            currentFloor,
            direction,
            visitUpFloor,
            visitDownFloor,
            upQueue,
            downQueue,
            totalFloors,
            changeDirection,
            hasNoFloors,
            hasUpFloors,
            hasDownFloors
        } = this.props
        if ((direction !== prevProps.direction) || (currentFloor !== prevProps.currentFloor)){

            if (direction === 'up') {
                console.log('time to get this elevator moving..', currentFloor, direction)
                // check if floor values set to true above current floor exist. If so, move up one floor.
                if (this.floorsRemainingUp(currentFloor, upQueue, totalFloors)) {
                    console.log('has up floors.. from up')
                    setTimeout(() => {
                        visitUpFloor(currentFloor + 1)
                    }, 1000)
                // if no floors, checks if the downQueue has any true values
                } else if (this.floorsRemainingDown(currentFloor, downQueue)) {
                    console.log('has down floors... from up')
                    hasNoFloors('up')
                    let highestDownFloor = this.findHighestDownFloor(totalFloors, downQueue)
                    if ( highestDownFloor > currentFloor){
                        setTimeout(() => {
                            visitUpFloor(currentFloor + 1)
                        }, 1000)
                    } else {
                        console.log('going to change direction...')
                        changeDirection(highestDownFloor,currentFloor)
                    }
                } else if ((hasUpFloors === 0) && (hasDownFloors === 0)){
                    console.log('has no floors...from up')
                    changeDirection(0,0)
                }
            }
            if (direction === 'down') {
                console.log('time to get this elevator moving..', currentFloor, direction)
                // check if true values above current floor. If so, move up one floor.
                if (this.floorsRemainingDown(currentFloor, downQueue)) {
                    console.log('has down floors... from down')
                    setTimeout(() => {
                        visitDownFloor(currentFloor - 1)
                    }, 1000);
                } else if (this.floorsRemainingUp(currentFloor, upQueue, totalFloors)) {
                    console.log('has up floors... from up')
                    hasNoFloors('down')
                    console.log(this.findHighestDownFloor(totalFloors, upQueue))
                    let lowestUpFloor = this.findLowestUpFloor(totalFloors, upQueue)
                    if ( lowestUpFloor < currentFloor){
                        setTimeout(() => {
                            visitDownFloor(currentFloor - 1)
                        }, 1000)
                    } else {
                        console.log('going to change direction...')
                        changeDirection(lowestUpFloor,currentFloor)
                    }
                    // if it does, check for highest down floor. If it's above, keep moving up one floor per second.
                    // if it's equal to current floor or below, update direction to down
                } else if ((hasUpFloors === 0) && (hasDownFloors === 0)) {
                    changeDirection(0,0)
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