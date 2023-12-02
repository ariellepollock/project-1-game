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
}


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
    const minutes = Math.floor(timeRemain / 60)
    let seconds = timeRemain % 60

    seconds = seconds < 10 ? `0${seconds}` : seconds

    timeDisplay.textContent = `0${minutes}:${seconds}`

    if (timeRemain === 0) {
        clearInterval(timeInt)
        alert('Loss Message!') // placeholder alert
    } else {
        timeRemain--
    }
}

function revealFoundEls() {
    foundItms.forEach(found => {
        found.classList.add('found')
    })
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
            }
        }
    }
}

// show found item
function revealItmFound(foundItmId) {
    const foundEl = document.getElementById(foundItmId)
    foundEl.style.display = 'block'
}



// startOver -> returns items to img (invoked if player invokes renderResults out of order)(timer continues to run)
// getWinner -> determine if player wins (if all renderResults are invoked OR if renderIdol is invoked)
// getLoser -> determines if player loses (if timer function ends before renderResults + renderIdol are invoked)


/*------ EVENT LISTENERS ------*/
// hover over start button
// when start button is clicked
// when item is clicked
//items.forEach(item => {
//    item.addEventListener('click', changeZIndex)
//})

document.querySelector('.viewport').addEventListener('click', changeZIndex)

startButton.addEventListener('click', startTimer)
// when extra item is clicked
// when idol is clicked
// when snake is clicked