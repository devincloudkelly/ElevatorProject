import React from 'react'

let FloorButtonGrid =(props) => {

    let createButtonGrid = (floors, width) => {
        let buttonCounter = floors + 1
        let height = Math.ceil(floors/width)
        for (let i = height; i--; i>0) {
            return (<tr>
                while (buttonCounter > 0) {

                    // Need to finish this part
                     (<td>
                        {buttonCounter - 1}
                    </td>)
                }
            </tr>)
        }
    }

    return (
        <div>
            <table>
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
            </table>
        </div>
    )
}

export default FloorButtonGrid;