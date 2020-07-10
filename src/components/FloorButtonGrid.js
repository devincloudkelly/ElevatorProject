import React from 'react'
import { Button } from 'semantic-ui-react'

let FloorButtonGrid = (props) => {
    let { totalFloors, addFloorToQueue, currentFloor } = props



    function requestFloor(e) {
        let targetFloor = parseInt(e.target.id)
        console.log('target and current floor from pushbutton',targetFloor, currentFloor)
        if (targetFloor > currentFloor){
            return addFloorToQueue(targetFloor, "up")
        }
        if (targetFloor < currentFloor) {
            return addFloorToQueue(targetFloor, "down")
        }
        return null
    }

    function createButtonGrid(nFloors) {
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
                {createButtonGrid(totalFloors)}
            </Button.Group>               
        </div>
    )
}

export default FloorButtonGrid;