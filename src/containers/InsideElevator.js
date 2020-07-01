import React, { Component } from 'react'
import FloorButtonGrid from '../components/FloorButtonGrid';

class InsideElevator extends Component {
    render() {
        let {currentFloor, isGoingUp} = this.props
        return (
            <div>

        Welcome to the elevator. You are currently on floor {currentFloor}.
        <br/>
        <br/>
        <FloorButtonGrid/>
        <br/>
        <br/>
        Need to have upcoming floors displaying 
        <br/>
        Need directional arrow
        <br/>
        This elevator is going {isGoingUp ? "UP" : "DOWN"}

        <br/>
        <br/>
      </div>
        )
    }

}

export default InsideElevator;