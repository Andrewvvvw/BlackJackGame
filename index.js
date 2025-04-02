let player = {}

let cards = []
let sum = 0
let hasBlackJack = false
let isAlive = false
let message = ""
let messageEl = document.getElementById("message-el")
let sumEl = document.getElementById("sum-el")
let cardsEl = document.getElementById("cards-el")
let playerEl = document.getElementById("player-el")

const startBtn = document.getElementById("start-btn")
const newCardBtn = document.getElementById("newCard-btn")
const submitNameBtn = document.getElementById("submitName-btn")

function getRandomCard() {
    let randomNumber = Math.floor( Math.random()*13 ) + 1
    if (randomNumber > 10) {
        return 10
    } else if (randomNumber === 1) {
        return 11
    } else {
        return randomNumber
    }
}

startBtn.addEventListener("click", function startGame() {
    isAlive = true
    hasBlackJack = false
    let firstCard = getRandomCard()
    let secondCard = getRandomCard()
    cards = [firstCard, secondCard]
    sum = firstCard + secondCard
    renderGame()
})

function renderGame() {
    cardsEl.textContent = "Cards: "
    for (let i = 0; i < cards.length; i++) {
        cardsEl.textContent += cards[i] + " "
    }
    
    sumEl.textContent = "Sum: " + sum
    if (sum <= 20) {
        message = "Do you want to draw a new card?"
    } else if (sum === 21) {
        message = "You've got Blackjack!"
        hasBlackJack = true
    } else {
        message = "You're out of the game!"
        isAlive = false
    }
    messageEl.textContent = message
}


newCardBtn.addEventListener("click", function newCard() {
    if (isAlive === true && hasBlackJack === false) {
        let card = getRandomCard()
        sum += card
        cards.push(card)
        renderGame()        
    }
})


window.onload = function () {
    document.getElementById("nameModal").style.display = "flex";
};

submitNameBtn.addEventListener("click", function saveName() {
    player.name = document.getElementById("playerName").value;
    player.chips = 200
    if (player.name.trim() !== "") {
        document.getElementById("nameModal").style.display = "none"; // Hide modal
        playerEl.textContent = player.name + ": $" + player.chips
    } else {
        alert("Please enter a valid name.");
    }
})
