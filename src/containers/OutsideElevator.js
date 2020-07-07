import React from 'react'
import { Button } from 'semantic-ui-react'

function OutsideElevator(props) {
    
    function createFloorButtons(nFloors) {  
        let floors = []
        for (let i = 1; i<=nFloors; i++){
            console.log(i, 'i from in the method')
            floors.push(i)
        }
        return floors.map(floor => {return <Button>{floor}</Button>})
    }
            
        let { totalFloors } = props
        console.log(totalFloors, 'total floors as a prop')
        console.log(props)
     
        return(
            <div>
                <Button.Group>
                    {createFloorButtons(totalFloors)}
                </Button.Group>
                    
                <Button.Group>
                    <Button>Up</Button>
                    <Button>Down</Button>
                </Button.Group>
            </div>
        )
    
}


export default OutsideElevator;