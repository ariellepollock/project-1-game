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

// track game state (to eventually restart game)
let gameStarted = false

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
function initItmClick() {
    items.forEach(item => {
        item.addEventListener('click', changeZIndex)
    })
}

// renderIdol -> show "found" idol and activate getWinner + renderResults)

// setup timer -> set how timer state progresses, if else if
function startTimer() {
    timeInt = setInterval(updateTime, 1000)
}

function winMessage() {
    const resultMessage = document.querySelector('.gameRules h2')
    resultMessage.textContent = 'Your tribe wins immunity!'

    clearInterval(timeInt) // stop timer
}

function updateTime() {
    // timer logic
    const minutes = Math.floor(timeRemain / 60)
    let seconds = timeRemain % 60

    seconds = seconds < 10 ? `0${seconds}` : seconds

    timeDisplay.textContent = `0${minutes}:${seconds}`

    if (timeRemain === 0) {
        clearInterval(timeInt)
        lossMessage()
    } else {
        timeRemain--
    }
}

function lossMessage() {
    const resultMessage = document.querySelector('.gameRules h2')
    resultMessage.textContent = 'Got nothing for ya, grab your stuff head back to camp.'
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
    // check if game has been initialized
    if (!gameStarted || !timeInt) return

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

// reset game function
function resetGame() {
    clearInterval(timeInt) // clear timer
    timeRemain = 120 // reset time
    timeDisplay.textContent = '02:00' // reset displayed time
    clickedItms = 0 // reset items back to board
    startButton.textContent = 'SURVIVORS READY? GO!' // reset button message
    startButton.style.backgroundColor = '#011320' // reset button color
    // reset win/loss message
    const resultMessage = document.querySelector('.gameRules h2')
    resultMessage.textContent = '' // reset to empty string aka no message

    // reset item styles and found item styles
    items.forEach(item => {
        item.style.zIndex = '0'
    })

    foundItms.forEach(found => {
        found.classList.remove('foundVisible')
        found.style.position = 'absolute'

        found.style.left = 'initial'
        found.style.top = 'initial'
    })
}


/*------ EVENT LISTENERS ------*/

// when item is clicked
document.querySelector('.viewport').addEventListener('click', changeZIndex)

// align found items when browser changes
window.addEventListener('resize', () => {
    const updatedShadowPos = document.getElementById(`${shadowId}Shadow`).getBoundingClientRect()
    foundEl.style.left = `${updatedShadowPos.left + window.scrollX}px`
    foundEl.style.top = `${updatedShadowPos.top + window.scrollY}px`
})


// when start button is clicked
startButton.addEventListener('click', () => {
    if (!gameStarted) {
        startTimer()
        initItmClick()
        startButton.textContent = 'GO BACK & START OVER!'
        startButton.style.backgroundColor = '#026ab2'
    } else {
        // reset game board
        resetGame()
    }
    gameStarted = !gameStarted // game state    
})

// when extra item is clicked
// when idol is clicked
// when snake is clicked