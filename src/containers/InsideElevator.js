import React, { Component } from 'react'
import FloorButtonGrid from '../components/FloorButtonGrid';

class InsideElevator extends Component {
  // checks to see if any floors remain above current floor in upQueue
  floorsRemainingUp = (currentFloor, queue) => {
    let floorCheck = currentFloor;
    let totalFloors = this.props.totalFloors;
    while (floorCheck < totalFloors) {
      if (!queue[floorCheck + 1]) {
        floorCheck += 1;
      } else {
        return true;
      }
    }
  };

  // checks to see if any floors remain below current floor in downQueue
  floorsRemainingDown = (currentFloor, queue) => {
    let floorCheck = currentFloor;
    while (floorCheck > 1) {
      if (!queue[floorCheck - 1]) {
        floorCheck -= 1;
      } else {
        return true;
      }
    }
    return false;
  };

  // returns the highest floor in the downQueue
  findHighestDownFloor = (totalFloors, downQueue) => {
    let counter = totalFloors;
    while (counter > 1) {
      if (downQueue[counter]) {
        console.log("returning true from find highest...");
        return counter;
      } else {
        console.log("decrementing counter from find highest...");
        counter -= 1;
      }
    }
    return counter;
  };

  // returns lowest floor in the upQueue
  findLowestUpFloor = (totalFloors, upQueue) => {
    let counter = 1;
    while (counter < totalFloors) {
      if (upQueue[counter]) {
        console.log("returning true from find lowest...");
        return counter;
      } else {
        console.log("incrementing counter from find lowest...");
        counter += 1;
      }
    }
    return counter;
  };

  updateHasFloors = (direction) => {
    return this.props.hasNoFloors(direction);
  };

  componentDidUpdate(prevProps) {
    if ((this.props.currentFloor !== prevProps.currentFloor) || (this.props.direction !== prevProps.direction)) {
      let {
        currentFloor,
        direction,
        visitUpFloor,
        visitDownFloor,
        upQueue,
        downQueue,
        totalFloors,
        changeDirection,
        hasUpFloors,
        hasDownFloors,
      } = this.props;

    //   start up logic
    if (direction === "up") {
        if (this.floorsRemainingUp(currentFloor, upQueue)) {
            console.log('up going through up queue')
            setTimeout(() => {
                visitUpFloor(currentFloor + 1);
            }, 1000);
        }
        if ((!this.floorsRemainingUp(currentFloor, upQueue)) && (this.floorsRemainingUp(currentFloor, downQueue))) {
            // this.updateHasFloors('up')
            console.log('up, gong through down queue')
            setTimeout(() => {
                visitUpFloor(currentFloor + 1);
            }, 1000);
        }
        if ((!this.floorsRemainingUp(currentFloor, upQueue)) && (!this.floorsRemainingUp(currentFloor, downQueue))){ 
            // this.updateHasFloors('up')
            console.log('are we finding highest down floor?')
                let highestDownFloor = this.findHighestDownFloor(totalFloors,downQueue);
                if (highestDownFloor === currentFloor) {
                    visitDownFloor(currentFloor)
                }
            console.log("going to change direction...");
            changeDirection(highestDownFloor, currentFloor);
        }
        // if ((hasUpFloors === 0 && hasDownFloors === 0)) {
        //   console.log("has no floors...from up");
        //   changeDirection(0, 0);
        // }
    } else if (direction === 'down'){
    //   start down logic
      if (this.floorsRemainingDown(currentFloor, downQueue)){
          console.log("down, going through down queue");
          setTimeout(() => {
            visitDownFloor(currentFloor - 1);
          }, 1000);
        }
        if ((!this.floorsRemainingDown(currentFloor, downQueue)) && (this.floorsRemainingDown(currentFloor, upQueue))) {
            // this.updateHasFloors('down')
            console.log('down, no more down queue, going to up queue')
            setTimeout(() => {
                visitDownFloor(currentFloor - 1);
            }, 1000);
            }
        if ((!this.floorsRemainingDown(currentFloor, downQueue)) && (!this.floorsRemainingDown(currentFloor, upQueue))) {
            // this.updateHasFloors('down')
            console.log('are we finding lowest up floor?')
            let lowestUpFloor = this.findLowestUpFloor(totalFloors, upQueue);
            if (lowestUpFloor === currentFloor){
                visitUpFloor(currentFloor)
            }
            changeDirection(lowestUpFloor, currentFloor);
        }
        // if (hasUpFloors === 0 && hasDownFloors === 0) {
        //   changeDirection(0, 0);
        // }
      
    }
  }   
}

  // provides stylized direction to component
  currentDirection = (direction) => {
    if (direction === "up") {
      return "UP";
    } else if (direction === "down") {
      return "DOWN";
    } else {
      return "NOT MOVING";
    }
  };

  render() {
    let { currentFloor, direction, totalFloors, addFloorToQueue } = this.props;
    return (
      <div>
        <p>Select a floor to travel to it.</p>
        <h1>Current floor: {currentFloor}</h1>
        <h3>Current direction: {this.currentDirection(direction)}</h3>
        <br />
        <p>1. Select a floor:</p>
        <FloorButtonGrid
          totalFloors={totalFloors}
          addFloorToQueue={addFloorToQueue}
          currentFloor={currentFloor}
          direction={direction}
        />
        <br />
      </div>
    );
  }
}

export default InsideElevator;