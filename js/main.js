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
const toFoundMap = {
    item1: 'item1Found',
    item2: 'item2Found',
    item3: 'item3Found',
    item4: 'item4Found',
    item5: 'item5Found',
    item6: 'item6Found',
    item7: 'item7Found',
    item8: 'item8Found',
    item9: 'item9Found',
    item10: 'item10Found',
}

const toShadowMap = {
    'item1Shadow': 'item1Found',
    'item2Shadow': 'item2Found',
    'item3Shadow': 'item3Found',
    'item4Shadow': 'item4Found',
    'item5Shadow': 'item5Found',
    'item6Shadow': 'item6Found',
    'item7Shadow': 'item7Found',
    'item8Shadow': 'item8Found',
    'item9Shadow': 'item9Found',
    'item10Shadow': 'item10Found',
}

// count clicked items
let clickedItms = 0

/*------ CACHED DOM ELEMENTS ------*/
const items = document.querySelectorAll('.items')
const foundItms = document.querySelectorAll('.found')

// button and timer elements
const startButton = document.getElementById('startTimer')
const timeDisplay = document.getElementById('timer')

let timeRemain = 120;
let timeInt

/*------ FUNCTIONS ------*/
// initializer -> set up initial state when button is pushed (with event listener)
// renderIdol -> show "found" idol and activate getWinner + renderResults)

// renderCountdown -> display countdown to user
// setup timer -> set how timer state progresses, if else if
function startTimer() {
    timeInt = setInterval(updateTime, 1000)
}

function updateTime() {
    // timer logic
    const minutes = Math.floor(timeRemain / 60)
    let seconds = timeRemain % 60

    seconds = seconds < 10 ? `0${seconds}` : seconds

    timeDisplay.textContent = `0${minutes}:${seconds}`

    if (timeRemain === 0) {
        clearInterval(timeInt)
        if (clickedItms === Object.keys(toFoundMap).length) {
            winMessage()
        } else {
            lossMessage()
        }
    } else {
        timeRemain--
    }
}

function revealFoundEls() {
    foundItms.forEach(found => {
        found.classList.add('found')
    })
}

// positioning item to shadow location
function alignFound() {
    for (const shadowItm in toShadowMap) {
        const foundItm = document.getElementById(toFoundMap[shadowItm])
        const shadowPos = document.getElementById(shadowItm).getBoundingClientRect()
        if (foundItm) {
            foundItm.style.position = 'absolute'
            foundItm.style.left = `${shadowPos.left}px`
            foundItm.style.top = `${shadowPos.top}px`
        }
    }
}

// changeZIndex -> player selects board item (pair with event listener)
function changeZIndex(event) {
    const clickedItm = event.target
    if (!clickedItm.classList.contains('items')) return

    if (clickedItm.style.zIndex !== '-2') {
        clickedItm.style.zIndex = '-2'
        const matchFound = toFoundMap[clickedItm.id]
        if (matchFound) {
            revealItmFound(matchFound)
            const corrFound = document.getElementById(matchFound)
            if (corrFound) {
                corrFound.style.zIndex = '4'
                clickedItms++ // increment clicked items
            }
        }
    }

    // check if ALL items have been 'clicked'
    if (clickedItms === Object.keys(toFoundMap).length) {
        winMessage() // function for displaying win message
    }
}
alignFound()

// show found item
function revealItmFound(foundItmId) {
    const foundEl = document.getElementById(foundItmId)
    foundEl.classList.add('foundVisible')
    
    // get corresponding shadow item
    const shadowId = Object.keys(toFoundMap).find(key => toFoundMap[key] === foundItmId)
    const shadowPos = document.getElementById(`${shadowId}Shadow`).getBoundingClientRect()

    // position found item at shadow item location
    foundEl.style.position = 'absolute'
    foundEl.style.left = `${shadowPos.left + window.scrollX}px`
    foundEl.style.top = `${shadowPos.top + window.scrollY}px`
}

// startOver -> returns items to img (invoked if player invokes renderResults out of order)(timer continues to run)
// getWinner -> determine if player wins (if all renderResults are invoked OR if renderIdol is invoked)
// getLoser -> determines if player loses (if timer function ends before renderResults + renderIdol are invoked)


/*------ EVENT LISTENERS ------*/
// hover over start button

// when item is clicked
document.querySelector('.viewport').addEventListener('click', changeZIndex)

// align found items when browser changes
window.addEventListener('resize', () => {
    const updatedShadowPos = document.getElementById(`${shadowId}Shadow`).getBoundingClientRect()
    foundEl.style.left = `${updatedShadowPos.left + window.scrollX}px`
    foundEl.style.top = `${updatedShadowPos.top + window.scrollY}px`
})


// when start button is clicked
startButton.addEventListener('click', startTimer)

// when extra item is clicked
// when idol is clicked
// when snake is clicked