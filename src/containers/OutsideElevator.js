import React from 'react'
import { Button } from 'semantic-ui-react'

function OutsideElevator(props) {
    
    let { totalFloors, updateOutsideFloor, outsideFloor, addFloorToQueue} = props

    // updates 'outsideFloor' in state
    function updateFloor(e) {
        let floor = parseInt(e.target.id)
        console.log('hello, updating the floor', floor)
        updateOutsideFloor(floor)
    }

    // adds the requested floor to the upQueue or the downQueue
    let requestElevator = (e) => {
        let direction = e.target.value
        console.log('direction and outside floor from pushbutton', direction, outsideFloor)
        return addFloorToQueue(outsideFloor, direction)
    }

    // creates floor buttons based on total floors of building
    function createFloorButtons(nFloors) {  
        let floors = []
        for (let i = 1; i<=nFloors; i++){
            floors.push(i)
        }
        return floors.map(floor => {
                return <Button key={Math.random()} id={floor} onClick={updateFloor}>{floor}</Button>
        })
    }
            
        return(
            <div>
                <p>Select a floor then press the up or down button to simulate calling an elevator to that floor.</p>
                <h3>Outside floor: {outsideFloor}</h3>
                <br/>
                <p>1. Select a floor to simulate:</p>
                <Button.Group>
                    {createFloorButtons(totalFloors)}
                </Button.Group>
                <br/><br/>
                <p>2. Select a direction</p>
                <Button.Group>
                    <Button onClick={requestElevator} value="up">Up</Button>
                    <Button onClick={requestElevator} value="down">Down</Button>
                </Button.Group>
            </div>
        )
    
}


export default OutsideElevator;