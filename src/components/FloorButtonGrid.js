import React from 'react'
import { Button } from 'semantic-ui-react'

let FloorButtonGrid = (props) => {
    let { totalFloors, addFloorToQueue, currentFloor } = props

    // adds floor to appropriate queue in state
    function requestFloor(e) {
        let targetFloor = parseInt(e.target.id)
        if (targetFloor > currentFloor){
            return addFloorToQueue(targetFloor, "up")
        }
        if (targetFloor < currentFloor) {
            return addFloorToQueue(targetFloor, "down")
        }
        return null
    }

    // creates floor buttons based on total floors
    function createButtons(nFloors) {
        let floors = []
        for (let i = 1; i<=nFloors; i++){
            floors.push(i)
        }
        return floors.map(floor => {
                return <Button key={Math.random()} id={floor} onClick={requestFloor}>{floor}</Button>
        })
    }

    return (
        <div>
            <Button.Group>
                {createButtons(totalFloors)}
            </Button.Group>               
        </div>
    )
}

export default FloorButtonGrid;