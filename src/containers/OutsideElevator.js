import React, { Component } from 'react'

class OutsideElevator extends Component {
    render() {
        return(
            <div>

                <button>
                    Up
                </button>
                <button>
                    Down
                </button>
                Hello, you are outside the elevator
            </div>
        )
    }
}


export default OutsideElevator;