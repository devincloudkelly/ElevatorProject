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
    let totalFloors = this.props.totalFloors;
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
    if (
      this.props.direction !== prevProps.direction ||
      this.propscurrentFloor !== prevProps.currentFloor
    ) {
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

      if (direction === "up") {
        // check if floor values set to true above current floor exist. If so, move up one floor.
        if (this.floorsRemainingUp(currentFloor, upQueue)) {
            console.log("has up floors.. from up");
            setTimeout(() => {
                visitUpFloor(currentFloor + 1);
            }, 1000);
            // if no floors, checks if the downQueue has any true values
        } else if (!this.floorsRemainingUp(currentFloor, upQueue)) {
            let highestDownFloor = this.findHighestDownFloor(totalFloors,downQueue);
            if (this.floorsRemainingUp(currentFloor, downQueue)) {
          console.log("has down floors... from up");         
            setTimeout(() => {
              visitUpFloor(currentFloor + 1);
            }, 1000);
          } else {
            console.log("going to change direction...");
            changeDirection(highestDownFloor, currentFloor);
          }
        } else if (hasUpFloors === 0 && hasDownFloors === 0) {
          console.log("has no floors...from up");
          changeDirection(0, 0);
        }
      }
      if (direction === "down") {
        // check if true values above current floor. If so, move up one floor.
        if (this.floorsRemainingDown(currentFloor, downQueue)) {
          console.log("has down floors... from down");
          setTimeout(() => {
            visitDownFloor(currentFloor - 1);
          }, 1000);
        } else if (!this.floorsRemainingDown(currentFloor, downQueue)) {
          let lowestUpFloor = this.findLowestUpFloor(totalFloors, upQueue);
          if (this.floorsRemainingDown(currentFloor, upQueue)) {
            setTimeout(() => {
              visitDownFloor(currentFloor - 1);
            }, 1000);
          } else {
            changeDirection(lowestUpFloor, currentFloor);
          }
        } else if (hasUpFloors === 0 && hasDownFloors === 0) {
          changeDirection(0, 0);
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