let player = {}

let cards = []
let sum = 0
let hasBlackJack = false
let isAlive = false
let message = ""
let currentBet = 10
let dealerSum = 0

const messageEl = document.getElementById("message-el")
const sumEl = document.getElementById("sum-el")
const cardsEl = document.getElementById("cards-el")
const playerEl = document.getElementById("player-el")
const betEl = document.getElementById("bet-el")

const newGameBtn = document.getElementById("newGame-btn")
const newCardBtn = document.getElementById("newCard-btn")
const submitNameBtn = document.getElementById("submitName-btn")
const endGameBtn = document.getElementById("endGame-btn")

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

newGameBtn.addEventListener("click", function startGame() {
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


endGameBtn.addEventListener("click", function(){
    if (isAlive === true && hasBlackJack === false) {
        dealerSum = Math.floor( Math.random()*19 ) + 2
        if(21 - dealerSum < 21 - sum){
            message = `You lost, dealer got ${dealerSum}!`
            messageEl.textContent = message
        }
        else if(21 - dealerSum > 21 - sum){
                message = `You won, dealer got ${dealerSum}!`
                messageEl.textContent = message
            }
            else {
                message = `It's a draw, dealer got ${dealerSum}!`
                messageEl.textContent = message
            }
        isAlive = false
    }
})

newCardBtn.addEventListener("click", function() {
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

submitNameBtn.addEventListener("click", function() {
    player.name = document.getElementById("playerName").value;
    player.chips = 200
    if (player.name.trim() !== "") {
        document.getElementById("nameModal").style.display = "none"; // Hide modal
        playerEl.textContent = player.name + ": $" + player.chips
        betEl.textContent = `Bet: $ ${currentBet}`
    } else {
        alert("Please enter a valid name.");
    }
})
