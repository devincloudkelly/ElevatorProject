import React, { Component } from 'react'
import FloorButtonGrid from '../components/FloorButtonGrid';

class InsideElevator extends Component {
  // checks to see if any floors remain above current floor in given queue
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

  // checks to see if any floors remain below current floor in given queue
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
        return counter;
      } else {
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
        return counter;
      } else {
        counter += 1;
      }
    }
    return counter;
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
      } = this.props;

    //   start up logic
    if (direction === "up") {
        if (this.floorsRemainingUp(currentFloor, upQueue)) {
            setTimeout(() => {
                visitUpFloor(currentFloor + 1);
            }, 1000);
        }
        if ((!this.floorsRemainingUp(currentFloor, upQueue)) && (this.floorsRemainingUp(currentFloor, downQueue))) {
            setTimeout(() => {
                visitUpFloor(currentFloor + 1);
            }, 1000);
        }
        if ((!this.floorsRemainingUp(currentFloor, upQueue)) && (!this.floorsRemainingUp(currentFloor, downQueue))){ 
                let highestDownFloor = this.findHighestDownFloor(totalFloors,downQueue);
                if (highestDownFloor === currentFloor) {
                    visitDownFloor(currentFloor)
                }
            changeDirection(highestDownFloor, currentFloor);
        }

    //   start down logic
    } else if (direction === 'down'){
      if (this.floorsRemainingDown(currentFloor, downQueue)){
          setTimeout(() => {
            visitDownFloor(currentFloor - 1);
          }, 1000);
        }
        if ((!this.floorsRemainingDown(currentFloor, downQueue)) && (this.floorsRemainingDown(currentFloor, upQueue))) {
            setTimeout(() => {
                visitDownFloor(currentFloor - 1);
            }, 1000);
            }
        if ((!this.floorsRemainingDown(currentFloor, downQueue)) && (!this.floorsRemainingDown(currentFloor, upQueue))) {
            let lowestUpFloor = this.findLowestUpFloor(totalFloors, upQueue);
            if (lowestUpFloor === currentFloor){
                visitUpFloor(currentFloor)
            }
            changeDirection(lowestUpFloor, currentFloor);
        }
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