// read the directions and press start to see the clues AND start the timer
// read the first clue
// look for the item that belongs to the clue
// use the hint button if stuck (hint will provide more directions/details on where to find the item)
// when the item is found, click on it
// when the item is clicked a border will appear around the item to signal it's been found
// when the mouse is released from the click the item will fill in the gray silhouette next to its clue
// repeat steps 2-7 until all items have been found (unless immunity idol is found or player receives losing message)
// win message if all items have been found before the timer runs out
// win message if immunity idol is found (can be at any point in the game)
// better luck next time if timer runs out before all items have been found
// losing message if player trys to skip ahead, costs them by having to start over while the timer is still running



/*------ CONSTANTS ------*/
// const item1
// const item2
// const item3
// const item4
// const item5
// const item6
// const item7
// const item8
// const item9
// const item10
// const idol


/*------ STATE VARIABLES ------*/
// array iterator methods for state/location of items


/*------ CACHED DOM ELEMENTS ------*/



/*------ FUNCTIONS ------*/
// initializer -> set up initial state when button is pushed (with event listener)
// renderResults -> show "found" items
// renderIdol -> show "found" idol and activate getWinner + renderResults)
// renderCountdown -> display countdown to user
// setup timer -> set how timer state progresses, if else if

// handleChoice -> player selects move (pair with event listener)
function changeZIndex(element) {
    const elements = document.querySelector(cssElement)
    // loop here and set starting z index
    // set clicked element to ending z index
}

// startOver -> returns items to img (invoked if player invokes renderResults out of order)(timer continues to run)
// getWinner -> determine if player wins (if all renderResults are invoked OR if renderIdol is invoked)
// getLoser -> determines if player loses (if timer function ends before renderResults + renderIdol are invoked)


/*------ EVENT LISTENERS ------*/
// hover over start button
// when start button is clicked
// when item is clicked
elements.forEach(element => {
    element.addEventListener('click', function() {
        changeZIndex(this)
    })
})
// when idol is clicked