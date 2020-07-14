## Introduction

Thank you for this opportunity to showcase my software engineering skills - I hope you enjoy the result. Please message me with any questions. 

### Overview

This app allows you to mimic an elevator's operations, both from the inside and the outside at the same time. Follow the installation instructions below to get started, then take a look at the testing notes to test out its functionality.

The project is built entirely in React and has the following component structure:

            App
            |   \
InsideElevator  OutsideElevator
            |
    ButtonGrid
 
State is stored in App and passed down where necessary. 

### Installation

To install:

- Clone this repo to your computer
- `cd` into this project
- run `npm start` to start up a local server
- The app will open in localhost:8000 on your preferred browser

### Testing the app

When the app loads, you'll see the screen divided in half. The top view provides an inside simulator for the elevator, and the bottom view provides an outside simulator.

Each view has an indicator of which floor they are on, ex. Inside the elevator will show which floor the elevator is currently on, and outside will show which floor you are simulating.

### To call an elevator from outside
- Press the floor you wish to simulate
- Then press the direction you wish to go

### To go to a floor from inside
- Press any button, and the elevator will move accordingly.
- If you press the same floor as you are currently on (and there are no other pending requests) you will not go anywhere


### Future Improvements

There are several areas that could be expanded on depending on the end needs of the client or goals for this project. Some ideas include:

- Providing a prompt or display for when a requested floor is reached, as well as pausing for additional time
- Converting the simulator into a dynamic display that changes based on whether you are inside or outside the elevator
- Adding ability for multiple users to access at once

