import React from 'react'
import { Button } from 'semantic-ui-react'

function OutsideElevator(props) {
    
    let { totalFloors, outsideFloor, updateOutsideFloor} = props
    console.log(totalFloors, 'total floors as a prop')
    console.log(props)

    function updateFloor(e) {
        console.log('hello, updating the floor', e.target.id)
        updateOutsideFloor(e.target.id)
    }

    function createFloorButtons(nFloors) {  
        let floors = []
        for (let i = 1; i<=nFloors; i++){
            console.log(i, 'i from in the method')
            floors.push(i)
        }
        return floors.map(floor => {
            if(floor === props.outsideFloor){
                return <Button id={floor} color='blue' onClick={updateFloor}>{floor}</Button>
            } else {
                return <Button id={floor} onClick={updateFloor}>{floor}</Button>
            }
        })
    }
            
        return(
            <div>
                <p>Select a floor to simulate:</p>
                <Button.Group>
                    {createFloorButtons(totalFloors)}
                </Button.Group>
                <br/><br/>
                <Button.Group>
                    <Button>Up</Button>
                    <Button>Down</Button>
                </Button.Group>
            </div>
        )
    
}


export default OutsideElevator;