import React from 'react'
import { Button } from 'semantic-ui-react'

function OutsideElevator(props) {

    let createFloorButtons = (totalFloors) => {  
            for (let i = 0; i++; i<totalFloors){
            console.log(i, 'i from in the method')
            return <Button>{i+1}</Button>
        }
    }

        let {totalFloors} = props
        console.log(totalFloors, 'total floors as a prop')
        return(
            <div>
                <Button.Group>
                {createFloorButtons(totalFloors)}
                <Button>1</Button>
                <Button>2</Button>
                <Button>3</Button>
                <Button>4</Button>
                <Button>5</Button>
                <Button>6</Button>
                </Button.Group>
                    
                <button>
                    Up
                </button>
                <button>
                    Down
                </button>
            </div>
        )
    
}


export default OutsideElevator;