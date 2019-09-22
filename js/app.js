/*
 * Create a list that holds all of your cards
 */let icons = [
     'fa fa-diamond', 'fa fa-diamond',
     'fa fa-paper-plane-o', 'fa fa-paper-plane-o',
     'fa fa-anchor', 'fa fa-anchor',
     'fa fa-bolt', 'fa fa-bolt',
     'fa fa-cube', 'fa fa-cube',
     'fa fa-leaf', 'fa fa-leaf',
     'fa fa-bomb', 'fa fa-bomb',
     'fa fa-bicycle', 'fa fa-bicycle'
 ];

let cardDeck = document.querySelector('.deck');
let cards = [...icons];

let movesCounter = document.querySelector('.moves');
let moves = 0;

//arrays for the opened and matched
let openedCards = [];
let matchedCards = []; //use for ending game

//ratings
let starContainer = document.querySelector('.stars');
let star = `<li><i class="fa fa-star"></i></li>`;





//start the game
function startGame() {
    cards = shuffle(cards);
    for(let i = 0; i < cards.length; i++) {
        const card = document.createElement("li");
        card.classList.add('card');
        card.innerHTML = `<i class='${cards[i]}'></i>`;
        card.classList.add("show");//testing
        cardDeck.appendChild(card);


        // Add Click Event to each Card
        click(card);
        movesCounter.innerHTML = 0;
        starContainer.innerHTML = star + star + star;
    }
};


// Click Function
function click(moop) {

    // Card Click Event
    moop.addEventListener("click", function() {

        const currentCard = this;
        const previousCard = openedCards[0];

        // We have an existing OPENED card
        if(openedCards.length === 1) {

            moop.classList.add("open", "show", "disable");
            openedCards.push(this);

            // We should compare our 2 opened cards!
            compareCards(currentCard, previousCard);

        } else {
        // We don't have any opened cards
            currentCard.classList.add("open", "show", "disable");
            openedCards.push(this);
        }

    });
}



function compareCards( first, second) {
    if (first.innerHTML === second.innerHTML) {
        first.classList.add("match");
        second.classList.add("match");
        first.classList.remove("open","show");
        second.classList.remove("open","show");

        matchedCards.push(first, second);
        openedCards = [];
    } else {
        setTimeout(function () {
            first.classList.remove("open", "show", "disable");
            second.classList.remove("open", "show", "disable");
            openedCards = [];
        }, 500);


    }
    countMoves();
    rateGame();
    gameOver();

}




//count the moves
function countMoves(){
    moves++;
    movesCounter.innerHTML = moves;
};


//rate the game
function rateGame() {
    if(moves < 10) {
        starContainer.innerHTML = star + star + star;
    } else if(moves < 15) {
        starContainer.innerHTML = star + star;
    } else {
        starContainer.innerHTML = star;
    }
};

//game over
function gameOver() {
    if(cards.length === matchedCards.length) {
        alert('game over');
    }
};


//restart game
let restartButton = document.querySelector('.restart');

function restartGame(){
    restartButton.addEventListener('click', function(){
        alert('restart');
        cardDeck.innerHTML = "";
        matchedCards = [];
        moves = 0;

        startGame();
    })
};

restartGame();

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}


//start the game
startGame();
