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


let movesCounter = document.querySelector('.moves');
let moves = 0;

//arrays for the opened and matched
let openedCards = [];
let matchedCards = []; //use for ending game

//ratings
let starRating = document.querySelector('.stars');
let star = `<li><i class="fa fa-star"></i></li>`;

//restart
let restartButton = document.querySelector('.restart');
let restartModalButton = document.querySelector('.modal-restart');

//modal
let modal =  document.querySelector(".modal");


//start the game
function startGame() {
    let cards = shuffle(icons);
    for(let i = 0; i < cards.length; i++) {
        const card = document.createElement("li");
        card.classList.add('card');
        card.innerHTML = `<i class='${cards[i]}'></i>`;
        card.classList.add("show");//testing
        cardDeck.appendChild(card);

        // Add Click Event to each Card
        click(card);
        movesCounter.innerHTML = 0;
        starRating.innerHTML = star + star + star;
    }
};


// Click Function
function click(card) {

    // Card Click Event
    card.addEventListener("click", function() {

        const currentCard = this;
        const previousCard = openedCards[0];

        // if there is an existing OPENED card
        if(openedCards.length === 1) {
            card.classList.add("open", "show", "disable");
            openedCards.push(this);

            // compare the 2 opened cards
            compareCards(currentCard, previousCard);

        } else {
            // no opened cards
            currentCard.classList.add("open", "show", "disable");
            openedCards.push(this);
        }

    });
}


//Compare cards
function compareCards(first, second) {
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




//Count the moves
function countMoves(){
    moves++;
    movesCounter.innerHTML = moves;
};


//Rate the game
function rateGame() {
    if(moves < 10) {
        starRating.innerHTML = star + star + star;
    } else if(moves < 15) {
        starRating.innerHTML = star + star;
    } else {
        starRating.innerHTML = star;
    }
};

//End the game
function gameOver() {
    if(icons.length === matchedCards.length) {
        modal.classList.add("show");
        document.querySelector(".total-moves").innerHTML = moves;
        document.querySelector(".total-stars").innerHTML = starRating.innerHTML;


    }
};


//restart game

function reset(){
    cardDeck.innerHTML = "";
    matchedCards = [];
    moves = 0;
    startGame();
}

function restartGame(){
    restartButton.addEventListener('click', function(){
        reset();
    })
};

restartGame();

//modal restart
function restartModalGame(){
    restartModalButton.addEventListener('click', function(){
        reset();
        modal.classList.remove("show");
    })
};

 restartModalGame();





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
