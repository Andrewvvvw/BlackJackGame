
let player = {}

let cards = []
let playerSum = 0
let hasBlackJack = false
let isAlive = false
let dealerIsAlive = true
let message = ""
let currentBet = 10
let dealerSum = 0
let gameResult = "defeat"

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
    if(player.chips >= currentBet){
        dealerIsAlive = true
        isAlive = true
        hasBlackJack = false
        let firstCard = getRandomCard()
        let secondCard = getRandomCard()
        cards = [firstCard, secondCard]
        playerSum = firstCard + secondCard
        dealerSum = getRandomCard()
        player.chips -= currentBet
        renderBalance()
        renderGame()
    }
    else 
        messageEl.textContent = "You don't have money to play!"
})

function renderBalance()
{
    playerEl.textContent = player.name + ": $" + player.chips
}

function renderGame() {
    cardsEl.textContent = "Cards: "
    for (let i = 0; i < cards.length; i++) {
        cardsEl.textContent += cards[i] + " "
    }
    
    sumEl.textContent = "Sum: " + playerSum
    if (playerSum <= 20) {
        message = "Do you want to draw a new card?"
    } else if (playerSum === 21) {
                message = "You've got Blackjack!"
                hasBlackJack = true
                gameResult = "win"
                determineRewards()
                renderBalance()
            }
            else {
                message = "You're out of the game!"
                gameResult = "defeat"
                isAlive = false
            }
    messageEl.textContent = message

}

function getDealerCards()
{
    while(dealerSum < 17){
        dealerSum += getRandomCard()
    }
    if(dealerSum > 21){
        dealerIsAlive = false
    }

}

function determineRewards()
{
    if(gameResult === "win"){
        player.chips += (3 / 2 * currentBet)
    }
    else{
        if(gameResult === "draw"){
            player.chips += currentBet
        }
    }
}

endGameBtn.addEventListener("click", function(){
    if (isAlive === true && hasBlackJack === false) {
        getDealerCards()
        if( dealerIsAlive === false){
            message = `You won, dealer got ${dealerSum}!`
            messageEl.textContent = message
            gameResult = "win"
        }
        else{
                if(21 - dealerSum < 21 - playerSum){
                    message = `You lost, dealer got ${dealerSum}!`
                    messageEl.textContent = message
                }
                else if(21 - dealerSum > 21 - playerSum){
                        message = `You won, dealer got ${dealerSum}!`
                        messageEl.textContent = message
                        gameResult = "win"
                    }
                    else {
                        message = `It's a draw, dealer got ${dealerSum}!`
                        messageEl.textContent = message
                        gameResult = "draw"
                    }
        }
        isAlive = false
        determineRewards()
        renderBalance()
    }
    
})

newCardBtn.addEventListener("click", function() {
    if (isAlive === true && hasBlackJack === false) {
        let card = getRandomCard()
        playerSum += card
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
        betEl.textContent = `Bet $${currentBet}`
    } else {
        alert("Please enter a valid name.");
    }
})
