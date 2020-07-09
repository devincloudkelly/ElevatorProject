import React from 'react'
import { Button } from 'semantic-ui-react'

let FloorButtonGrid = (props) => {
    let { totalFloors, addFloorToQueue, currentFloor } = props

    function requestFloor(e) {
        let targetFloor = e.target.id
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
            console.log(i, 'i from in the method')
            floors.push(i)
        }
        return floors.map(floor => {
                return <Button id={floor} onClick={requestFloor}>{floor}</Button>
        })
    }

    return (
        <div>
            <Button.Group>
                {createButtonGrid(totalFloors)}
            </Button.Group>
                
            {/* <table>
                <tr>
                    <td>
                        7
                    </td>
                    <td>
                        8
                    </td>
                    <td>
                        9
                    </td>
                </tr>
                <tr>
                    <td>
                        4
                    </td>
                    <td>
                        5
                    </td>
                    <td>
                        6
                    </td>
                </tr>
                <tr>
                    <td>
                        1
                    </td>
                    <td>
                        2
                    </td>
                    <td>
                        3
                    </td>
                </tr>
            </table> */}
        </div>
    )
}

export default FloorButtonGrid;