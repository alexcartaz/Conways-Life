How to Guide

My approach to creating a Conway's Game of Life simulation was as follows:

1. Setup

React

First I needed to create a React App. Conway's game of life requires creating a grid and toggling cells within that grid as eitehr dead or alive. Here, it was important to ask myself what do I need? We aren't making any web calls, this is just a simple app, so I don't think I'll need a database or Redux, just vanilla React.

It looks like within the main App.js itself, I'll need a Board container that will map over an array of individual cells, as well as a component to house all my user button toggles -- so 3 components. I prefer to use styled components for my CSS, so I'll incorporate that into the project as well.

So after creating the React app, I first wanted to get my visual display working. So I created my <Board> and <Cell> components and played around with styling (width, height, flexbox) until I got an array of equal width and height to properly show up as a square grid.

Logic

I decided that each value in my array should be a boolean, corresponding to Alive (true) or Dead (false).

Next I knew that I would need to create several game functions to make this work. Initializing a board (with random values), clearing the board (setting all values in the array to false), and iterating over each item in the board array to calculate the number of neighbors to determine what the state of that cell should be in the next iteration of the board, ie the next generation of Conway's Game of Life.

I created first versions of the these programs in their own file and folder that imported into my App.js to reduce clutter.

2. Basic Integration

Now it was time to test functionality piece by piece to make sure functionality was working and pieces of the app were talking to one another.

First up, generating a randomized board. I tested my initBoard function and used it to initialized my this.state.board in App.js.

Next I wanted to make sure I clear my board, so I linked up my clear board function and passsed it down into controls. I created an eventhandler that, when clicked, would call the passed function and cascade back up to App.js. In order for this to work I had to use this line in my constructor in App:

this.boardClear = this.boardClear.bind(this);

Without it the function wouldn't have access to ".this".

Next I took the random init function I used when initializing state and turned that into a button as well.

And then I began to test my iterate function (which initially had bugs), to ensure that it worked.

3. Advanced Features

There are two advanced features in this implementation of Conway's Game of Life. The first is starting a loop that continues to iterate over generations (ostensibly until a steady-state is reached) and allowing the user to click on the board to change the alive/dead state of any specific cell (while the game is not in run mode).

I arbitrarly decided to tackle the user-click cell-toggle feature first.

a. Cell Toggle Feature

I had several concerns here. I initialized my board into a large array (length=2500). I don't know what the norm is for React but I don't think React is optimized for running thousands of concurrent components; which is to say I already had performance and optimizations concerns. What I wanted to avoid was having the board entirely re-render (ie map over all 2500 cells) each time one cell (and a specific cell we could identify at that) was clicked and changed.

Because updating an item on App.js's state that is passed into the <Board> component is how the entire board is re-rendered, I decided to store a 2nd copy of board within the App component, but not on State. I made an event handler that locally changed the state of a cell component when clicked, but stored the change to a version of board that would not trigger an entire refresh.

The next issue is what happens when I *do* trigger a board refresh. How do I get the new props passed down into Cell to change the current state of that cell if it's been clicked. This tool a lot of troubleshooting for me, and my solution relied on this code:

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.toggleUpdateState !== prevState.toggleUpdateState){
      return {
        isAlive: nextProps.isAlive,
        toggleUpdateState: nextProps.toggleUpdateState
      }
    }
    return null
  }

Basically, I created an arbitrary flag on my App.js state whose value was inverted everytime the board underwent a hard change (iterate, clear, initialize). This value was passed from App to Board to Cell and the "getDerivedStateFromProps" function would use it to check to see if the component needed to be refreshed, which we would do by setting State inside that actual Cell. this toggle essentially kept each Cell in sync with the version of a board refresh.

b. Run / Stop Simulation

First I created "Run" and "Stop" buttons in controls that changed the value of this.state.isRunning on my App.js to true and false respectively.

In order to make the simulation "Run" I needed a way to loop over my iterate board call. I thought about implementing this within my iterate function on App.js but I wasn't sure if that would result in an infinite loop that ignored input from <Controls> or not. Instead I decided to implement my loop on "componentDidUpdate" on the board. Within this function I checked to see if the passed value of isRunning is true. If true, I used "setTimeout" to trigger a delay of this.state.delay (a hardcoded value) at which point the iterate function would be called again (which would inevitably trigger another <Board> component update).

This worked, however the loop keeps running when the board hits a static steady-state (ie remains unchanging). As a final act, I modified my Game of Life function that generates the new iteration of the board to check to see if the newBoard had the same values as the all board. I return this boolean in addition to the new board. Now, in my App.js iterate function where I modify this.state values, I set isRunning = didChange. If the board gets to a point where there is no change, the loop will break itself.