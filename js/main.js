// read the directions and press start button to start the timer + the game
// hover over silhouettes to recieve clue as to what the item might be 
// when the item is "found", click on it
// when the item is clicked the item will show up in place of it's corresponding silhouette
// repeat steps 2-4 until all items have been found (unless immunity idol or snake are "found")
// click on extra items to display message: nice but not what you're looking for
// win message if all items have been found before the timer runs out
// win message if immunity idol is found (can be at any point in the game)
// better luck next time if timer runs out before all items have been found
// game over message if snake is found



/*------ CONSTANTS ------*/
// audio file to play during last x-seconds of countdown
const AUDIO = new Audio()


/*------ STATE VARIABLES ------*/
// array iterator methods for state/location of items


/*------ CACHED DOM ELEMENTS ------*/
const items = document.querySelectorAll('.items')
const foundItms = document.querySelectorAll('.found')

/*------ FUNCTIONS ------*/
// initializer -> set up initial state when button is pushed (with event listener)
// renderResults -> show "found" items
// renderIdol -> show "found" idol and activate getWinner + renderResults)
// renderCountdown -> display countdown to user
// setup timer -> set how timer state progresses, if else if

// changeFoundZIndex -> shadow item changes z-index to -2 (pair with changeZIndex function)
function revealFoundEls() {
    foundItms.forEach(found => {
        found.classList.add('found')
    })
}

// changeZIndex -> player selects board item (pair with event listener)
function changeZIndex() {
    if (this.style.zIndex !== '-2') {
        this.style.zIndex = '-2'
        revealItem1Found()
        if (this.id === 'item1') {
            const corrFound = document.getElementById('item1Found')
            if (corrFound) {
                corrFound.style.zIndex = '4'
            }
        }
    }
}

function revealItem1Found() {
    const foundEl = document.getElementById('item1Found')
    foundEl.style.display = 'block'
}



// startOver -> returns items to img (invoked if player invokes renderResults out of order)(timer continues to run)
// getWinner -> determine if player wins (if all renderResults are invoked OR if renderIdol is invoked)
// getLoser -> determines if player loses (if timer function ends before renderResults + renderIdol are invoked)


/*------ EVENT LISTENERS ------*/
// hover over start button
// when start button is clicked
// when item is clicked
items.forEach(item => {
    item.addEventListener('click', revealFoundEls)
})
// when extra item is clicked
// when idol is clicked
// when snake is clicked