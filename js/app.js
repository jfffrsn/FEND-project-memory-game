// Icons for the cards
let icons = [
     'fas fa-cat', 'fas fa-cat',
     'fas fa-dragon', 'fas fa-dragon',
     'fas fa-fish', 'fas fa-fish',
     'fas fa-spider', 'fas fa-spider',
     'fas fa-hippo', 'fas fa-hippo',
     'fas fa-crow', 'fas fa-crow',
     'fas fa-frog', 'fas fa-frog',
     'fas fa-skull-crossbones', 'fas fa-skull-crossbones'
 ];


 // Cards
let cardDeck = document.querySelector('.deck');
let cards = [...icons];

// Moves
let movesCounter = document.querySelector('.moves');
let moves = 0;

// Arrays for the opened and matched
let openedCards = [];
let matchedCards = []; //use for ending game

// Ratings
let starRating = document.querySelector('.stars');
let star = `<li><i class="fas fa-star"></i></li>`;

// Timer
let gameTimer = document.querySelector('.timer');
let gameTimerOn = false; // on/off switch
let time = 0;
let minutes = 0;
let seconds = 0;
let timer;

// Restart
let restartButton = document.querySelector('.restart');
let restartModalButton = document.querySelector('.modal-restart');

// Modal
let modal =  document.querySelector(".modal");


// Start the game
function startGame() {
    shuffle(cards);
    for(let i = 0; i < cards.length; i++) {
        const card = document.createElement("li");
        card.classList.add('card');
        card.innerHTML = `<i class='${cards[i]}'></i>`;
        //card.classList.add("show");//testing
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
            // Start the timer on the first click
            if (gameTimerOn === false) {
                startTimer();
                gameTimerOn = true;
            }
            if(openedCards.length < 2) {
                const currentCard = this;
                const previousCard = openedCards[0];
                    // If there is an existing OPENED card
                    if(openedCards.length === 1) {
                        card.className = "card open show disable animated flipInY";
                        openedCards.push(this);
                    // Compare the 2 OPENED cards
                        compareCards(currentCard, previousCard);
                    } else {
                    // No OPENED cards
                        card.className = "card open show disable animated flipInY";
                        openedCards.push(this);
                    }
            }
        });
}

//Compare cards
function compareCards(first, second) {
    if (first.innerHTML === second.innerHTML) {
        first.className = "card match animated tada disable";
        second.className = "card match animated tada disable";
        matchedCards.push(first, second);
        openedCards = [];
    } else {
        setTimeout(function () {
            first.className = "card animated shake";
            second.className = "card animated shake";
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

// Rate the game
function rateGame() {
    if(moves < 20) {
        starRating.innerHTML = star + star + star;
    } else if(moves < 30) {
        starRating.innerHTML = star + star;
    } else {
        starRating.innerHTML = star;
    }
};

// End the game
function gameOver() {
    if(icons.length === matchedCards.length) {
        modal.classList.add("show");
        document.querySelector(".total-moves").innerHTML = moves;
        document.querySelector(".total-stars").innerHTML = starRating.innerHTML;
        document.querySelector(".total-time").innerHTML = gameTimer.innerHTML;
        clearInterval(timer);
        timerOn = false;
    }
};

// Restart the game
function reset(){
    cardDeck.innerHTML = "";
    matchedCards = [];
    openedCards = [];
    moves = 0;
    clearInterval(timer);
    gameTimerOn = false;
    gameTimer.innerHTML = "00:00";
    time = 0;
    minutes = 0;
    seconds = 0;
    startGame();
}

function restartGame(){
    restartButton.addEventListener('click', function(){
        reset();
    });
};

restartGame();

// Restart the game from the modal
function restartModalGame(){
    restartModalButton.addEventListener('click', function(){
        reset();
        modal.classList.remove("show");
    })
};

 restartModalGame();


// Timer
function startTimer() {
    timer = setInterval(function() {
    time++;
    minutes = ("0" + Math.floor(time / 60)).slice(-2);
    seconds = ("0" + time % 60).slice(-2);
    gameTimer.innerHTML = `${minutes}:${seconds}`;
  }, 1000);
}

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

// Start the game
startGame();
