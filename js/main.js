// read the directions and press button to start the timer + the game
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

// control extra items clickability
let eItemClickable = false

// control instant win/loss items clickability
let instItemClickable = true

let itemsClickable = true

/*------ CACHED DOM ELEMENTS ------*/
// get all elements with x class
const items = document.querySelectorAll('.items')
const foundItms = document.querySelectorAll('.found')
const shadowItms = document.querySelectorAll('.shadow')

// get paragraph element
const hidePgraph = document.getElementById('hidePgraph')

// button and timer elements
const startButton = document.getElementById('startTimer')
const timeDisplay = document.getElementById('timer')

let timeRemain = 120;
let timeInt


/*------ FUNCTIONS ------*/
// disable game interactions outside of start button
function disableGame() {
    items.forEach(item => {
        item.removeEventListener('click', changeZIndex)
    })

    const instantLossEl = document.getElementById('instantLoss')
    const instantWinEl = document.getElementById('instantWin')

    if (instantLossEl) {
        instantLossEl.removeEventListener('click', instantLoss)
    }

    if (instantWinEl) {
        instantWinEl.removeEventListener('click', instantWin)
    }

    disableExtraClick()
}

// enable/disable extra items
function enableExtraClick() {
    const coconut = document.getElementById('eItem2')
    const spoon = document.getElementById('eItem3')

    coconut.addEventListener('click', handleEItemClick)
    spoon.addEventListener('click', handleEItemClick)
}

function disableExtraClick() {
    const coconut = document.getElementById('eItem2')
    const spoon = document.getElementById('eItem3')

    coconut.removeEventListener('click', handleEItemClick)
    spoon.removeEventListener('click', handleEItemClick)
}

function handleEItemClick(event) {
    const clickedItem = event.target
    const resultMessage = document.querySelector('.gameRules h2')

    if (clickedItem.id === 'eItem2' && eItemClickable) {
        eItmMessage('Yummy but not needed, keep gathering items.<br>')
        const image = document.createElement('img')
        image.src = 'assets/coconut.png'
        resultMessage.appendChild(image)
    }

    if (clickedItem.id === 'eItem3' && eItemClickable) {
        eItmMessage('Not the most useful utensil...keep gathering.<br>')
        const image = document.createElement('img')
        image.src = 'assets/spoon.png'
        resultMessage.appendChild(image)
    }

    function eItmMessage(message) {
        resultMessage.innerHTML = message
        const lineBreak = document.createElement('br')
        resultMessage.appendChild(lineBreak)
        // hide game rules paragraph
        hidePgraph.style.display = 'none'
    }
}

// Functions to hide and show the start button
function hideButton() {
    startButton.style.display = 'none'
}

function showButton() {
    startButton.style.display = 'block'
}

// initializer -> set up initial state when button is pushed (with event listener)
function initItmClick() {
    items.forEach(item => {
        item.addEventListener('click', changeZIndex)
    })
}

// function to show hint message
function hintHover(hintMessage) {
    hintMessage.style.display = 'block'
}

// function to hide hint message
function hintHide(hintMessage) {
    hintMessage.style.display = 'none'
}

// setup timer -> set how timer state progresses
function startTimer() {
    timeInt = setInterval(updateTime, 1000)
}

// win message function
function winMessage() {
    const resultMessage = document.querySelector('.gameRules h2')
    resultMessage.textContent = 'Your tribe wins immunity!'

    // hide paragraph when winMessage is called
    hidePgraph.style.display = 'none'

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

// loss message function
function lossMessage() {
    const resultMessage = document.querySelector('.gameRules h2')
    resultMessage.textContent = 'Got nothing for ya, grab your stuff head back to camp.'

    // hide paragraph when lossMessage is called
    hidePgraph.style.display = 'none'
    // show button to play again
    showButton()
}

function revealFoundEls() {
    foundItms.forEach(found => {
        found.classList.add('found')
    })
}

// positioning found item to shadow location
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

// changeZIndex -> player handle and changing z-index of items
function changeZIndex(event) {
    // check if game has been initialized
    if (!gameStarted || !timeInt || !itemsClickable) return

    const clickedItm = event.target
    if (clickedItm.classList.contains('items')) {
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
            showButton() // show button to play again
            itemsClickable = false
            disableInstClickable()
        }
    }
}

alignFound()

function resetZIndex() {
    foundItmsCtr.style.zIndex = ''

    shadowItmsCtr.querySelectorAll('.shadow').forEach(shadowItm => {
        shadowItm.style.zIndex = ''
    })
}

// disable instant items after instant win/loss
function disableInstClickable() {
    const snakeBite = document.getElementById('instantLoss')
    const idol = document.getElementById('instantWin')

    if (snakeBite && instItemClickable) {
        snakeBite.removeEventListener('click', instantLoss)
        instItemClickable = false
    }

    if (idol && instItemClickable) {
        idol.removeEventListener('click', instantWin)
        instItemClickable = false
    }
}

// show found item
function revealItmFound(foundItmId) {
    const foundEl = document.getElementById(foundItmId)
    foundEl.classList.add('foundVisible')
    
    // get corresponding shadow item
    const shadowId = Object.keys(toFoundMap).find(key => toFoundMap[key] === foundItmId)

    // get element position and size, use .getBoundingClientRect() method
    const shadowPos = document.getElementById(`${shadowId}Shadow`).getBoundingClientRect()

    // position found item at shadow items location
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

    hidePgraph.style.display = 'block' // reset hidden paragraph

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

    itemsClickable = true
    eItemClickable = true

    disableExtraClick()
    enableExtraClick()

    // Reattach event listeners for the extra items
    const coconut = document.getElementById('eItem2');
    const spoon = document.getElementById('eItem3');

    coconut.addEventListener('click', () => {
        if (eItemClickable) {
            // Logic for coconut click
        }
    })

    spoon.addEventListener('click', () => {
        if (eItemClickable) {
            // Logic for spoon click
        }
    })
}

// instant loss function -> when snake is clicked
function instantLoss() {
    const snakeBite = document.getElementById('instantLoss')
    snakeBite.addEventListener('click', () => {
        if (instItemClickable && clickedItms !== Object.keys(toFoundMap).length) {
            clearInterval(timeInt) // stop timer

            // instant loss message in h2 tag
            const resultMessage = document.querySelector('.gameRules h2')
            resultMessage.innerHTML = "Well that's a bummer, a snake bite is serious, we're removing you from the game.<br><br>"

            // add snake image to message
            const image = document.createElement('img')
            image.src = 'assets/snake.png'
            resultMessage.appendChild(image)

            // hide game rules paragraph
            hidePgraph.style.display = 'none'

            // disable interactions after loss
            showButton()
            itemsClickable = false
            disableInstClickable()
        }
    })
}

// instant win function -> when idol is found
function instantWin() {
    const idol = document.getElementById('instantWin')
    idol.addEventListener('click', () => {
        if (instItemClickable && clickedItms !== Object.keys(toFoundMap).length) {
            clearInterval(timeInt) // stop timer

            // instant win message in h2 tag
            const resultMessage = document.querySelector('.gameRules h2')
            resultMessage.innerHTML = "WOW!! That bird almost got away. Nice job finding a hidden immunity idol, you win!!<br><br>"

            // add idol image to message
            const image = document.createElement('img')
            image.src = 'assets/idol.png'
            image.style.height = '12vh' // set height of idol image

            resultMessage.appendChild(image)

            // hide game rules paragraph
            hidePgraph.style.display = 'none'

            // disable interactions after win
            showButton()
            itemsClickable = false
            disableInstClickable()
        }
    })
}

// item that's not needed function -> when extra item is selected
function extraItemMessage() {
    const coconut = document.getElementById('eItem2')
    const spoon = document.getElementById('eItem3')
    const resultMessage = document.querySelector('.gameRules h2')

    // coconut message
    coconut.addEventListener('click', () => {
        if (eItemClickable) {
            eItmMessage('Yummy but not needed, keep gathering items.<br>')
            const image = document.createElement('img')
            image.src = 'assets/coconut.png'
            resultMessage.appendChild(image)
        }
    })

    // spoon message
    spoon.addEventListener('click', () => {
        if (eItemClickable) {
            eItmMessage('Not the most useful utensil...keep gathering.<br>')
            const image = document.createElement('img')
            image.src = 'assets/spoon.png'
            resultMessage.appendChild(image)
        }
    })

    // update text content + hide paragraph
    function eItmMessage(message) {
        resultMessage.innerHTML = message
        const lineBreak = document.createElement('br')
        resultMessage.appendChild(lineBreak)
        // hide game rules paragraph
        hidePgraph.style.display = 'none'
    }
}

/*------ EVENT LISTENERS ------*/
// when mouse moves over/off
shadowItms.forEach(item => {
    const hintMessage = item.querySelector('.hintMessage')

    item.addEventListener('mouseover', () => {
        hintHover(hintMessage)
    })

    item.addEventListener('mouseout', () => {
        hintHide(hintMessage)
    })
})

// when item is clicked
document.querySelector('.viewport').addEventListener('click', changeZIndex)

// when start button is clicked
startButton.addEventListener('click', () => {
    if (!gameStarted) {
        startTimer()
        initItmClick()
        startButton.textContent = 'START OVER'
        startButton.style.backgroundColor = '#026ab2'

        eItemClickable = true

        if (eItemClickable) {
            enableExtraClick()
            extraItemMessage()
        }

        // instant items clickability after button is clicked
        instItemClickable = true

        // hide button when game starts
        hideButton()

        // call instantLoss function here to enable only after button is clicked
        instantLoss()

        // call extra item message here
        extraItemMessage()

        // call instantWin function here
        instantWin()

    } else {

        // reset game board
        resetGame()

        // show start button when game is reset
        showButton()

        // disable extra item clickability when game is reset
        eItemClickable = false
        // disable instant win/loss clickability when game is reset
        instItemClickable = false
    }
    gameStarted = !gameStarted // game state    
})
