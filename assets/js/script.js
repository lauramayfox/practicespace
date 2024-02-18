const cards = document.querySelectorAll('.farm-card');
const moveContainer = document.querySelector(".moves");

//to know which card flips first to match
let hasFlippedCard = false;
let firstCard, secondCard;
let lockBoard = false;
let moves = 0;

//score count feature javascript academy tut

 moves = 0;
 moveContainer.innerHtml = 0;
 
 function addMove() {
     moves++;
     moveContainer.innerHTML = moves;

 }



function flipCard() {
  if (lockBoard) return;
  if (this === firstCard) return;
  this.classList.add('flip');

  if (!hasFlippedCard) {
    // first click
    hasFlippedCard = true;
    firstCard = this;

    return;
   
  }

  // second click
  secondCard = this;

  checkForMatch();
}
  

function checkForMatch() {
  let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;

  isMatch ? disableCards() : unflipCards();

   // Add move to counter
   addMove();
}

function disableCards() {
  firstCard.removeEventListener('click', flipCard);
  secondCard.removeEventListener('click', flipCard);

  resetBoard();
}

function unflipCards() {
  lockBoard = true;

  setTimeout(() => {
    firstCard.classList.remove('flip');
    secondCard.classList.remove('flip');

    resetBoard();
  }, 1500);
}

function resetBoard() {
  [hasFlippedCard, lockBoard] = [false, false];
  [firstCard, secondCard] = [null, null];
}

(function shuffle() {
  cards.forEach(card => {
    let randomPos = Math.floor(Math.random() * 12);
    card.style.order = randomPos;
  });
})();
cards.forEach(card => card.addEventListener('click', flipCard));