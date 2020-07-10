import React from 'react'
import { Button } from 'semantic-ui-react'

function OutsideElevator(props) {
    
    let { totalFloors, updateOutsideFloor, outsideFloor} = props
    console.log('these are all the props...', totalFloors, outsideFloor)
    console.log('here is outside floor', props.outsideFloor)

    function updateFloor(e) {
        let floor = parseInt(e.target.id)
        console.log('hello, updating the floor', floor)
        updateOutsideFloor(floor)
    }

    let requestElevator = (e) => {
        console.log('requesting current floor and direction', outsideFloor, e.target.value)

    }

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
                <h3>Current floor: {outsideFloor}</h3>
                <br/><br/>
                <p>Select a floor to simulate:</p>
                <Button.Group>
                    {createFloorButtons(totalFloors)}
                </Button.Group>
                <br/><br/>
                <Button.Group>
                    <Button onClick={requestElevator} value="up">Up</Button>
                    <Button onClick={requestElevator} value="down">Down</Button>
                </Button.Group>
            </div>
        )
    
}


export default OutsideElevator;