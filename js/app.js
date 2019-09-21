/*
 * Create a list that holds all of your cards
 */let icons = [
     'fa fa-diamond',
     'fa fa-diamond',
     'fa fa-paper-plane-o',
     'fa fa-paper-plane-o',
     'fa fa-anchor',
     'fa fa-anchor',
     'fa fa-bolt',
     'fa fa-bolt',
     'fa fa-cube',
     'fa fa-cube',
     'fa fa-leaf',
     'fa fa-leaf',
     'fa fa-bomb',
     'fa fa-bomb',
     'fa fa-bicycle',
     'fa fa-bicycle'
 ];

let cardDeck = document.querySelector('.deck');
let cards = [...icons];

let movesCounter = document.querySelector('.moves');
let moves = 0;


//start the game
function init() {
    cards = shuffle(cards);
    for(let i = 0; i < cards.length; i++) {
        const card = document.createElement("li");
        card.classList.add("card");
        card.classList.add("show"); //testing
        card.innerHTML = `<i class="${cards[i]}"></i>`;
        cardDeck.appendChild(card);

        card.addEventListener('click', function () {
            console.log(`The ${i} clicked!`);
            countMoves();
          });

        movesCounter.innerHTML = 0;


    }
};






//arrays for the opened and matched
let openedCards = [];
let matchedCards = [];


//count the moves
function countMoves(){
    moves++;
    movesCounter.innerHTML = moves;
};

//


//rate the game


//game over


//restart game
function resetGame() {
};

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

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
init();
