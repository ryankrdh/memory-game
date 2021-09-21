/*

Part Two - Implementing clicks and matches
Clicking a card should change the background color to be the color of the class it has.
Users should only be able to change at most two cards at a time.
Clicking on two matching cards should be a “match” — those cards should stay face up.
When clicking two cards that are not a match, they should stay turned over for at least 1 second before they hide the color again. You should make sure to use a setTimeout so that you can execute code after one second.

Part Three - Gotchas
Make sure this works only if you click on two different cards — clicking the same card twice shouldn’t count as a match!)
Make sure that you can not click too quickly and guess more than two cards at a time.

Further Study
Add a button that when clicked will start the game
Add a button that when clicked will restart the game once it has ended
For every guess made, increment a score variable and display the score while the game is played
Store the lowest-scoring game in local storage, so that players can see a record of the best game played.
Allow for any number of cards to appear
Instead of hard-coding colors, try something different like random colors or even images!

*/

const gameContainer = document.getElementById('game');
let cardOne = null; // keeps track of the first card flipped.
let cardTwo = null; // keeps track of the second card flipped.
let cardsFlipped = 0; // this will determine when the game ends.
let noClicking = false; // this will be toggled on and off preventing no more than two cards flipped.

const COLORS = [
  'red',
  'blue',
  'green',
  'orange',
  'purple',
  'red',
  'blue',
  'green',
  'orange',
  'purple',
];

// here is a helper function to shuffle an array
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates if you want ot research more
function shuffle(array) {
  let counter = array.length;

  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter);

    // Decrease counter by 1
    counter--;

    // And swap the last element with it
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

let shuffledColors = shuffle(COLORS);

// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivsForColors(colorArray) {
  for (let color of colorArray) {
    // create a new div
    const newDiv = document.createElement('div');

    // give it a class attribute for the value we are looping over
    newDiv.classList.add(color);

    // call a function handleCardClick when a div is clicked on
    newDiv.addEventListener('click', handleCardClick);

    // append the div to the element with an id of game
    gameContainer.append(newDiv);
  }
}

// TODO: Implement this function!
function handleCardClick(event) {
  // you can use event.target to see which element was clicked
  console.log('you just clicked', event.target);

  // First, make sure the cards are clickable.
  if (noClicking) return;
  // If the card is already flipped, do nothing.
  if (event.target.classList.contains('flipped')) return;

  // save the current clicked card in a variable.
  let currentCard = event.target;
  // Setting the background color of the card.
  currentCard.style.backgroundColor = currentCard.classList[0];

  // First flip of the card
  if (!cardOne || !cardTwo) {
    // change the status of the first flipped card to flipped
    currentCard.classList.add('flipped');
    // Assigning the flipped cards to each variable.
    cardOne = cardOne || currentCard;
    // If the user only flipped one card, cardTwo will not be assigned yet.
    cardTwo = currentCard === cardOne ? null : currentCard;
  }

  // confirms that two cards are flipped.
  if (cardOne && cardTwo) {
    // prevent no more clicking of additional cards
    noClicking = true;
    // create new variables with the class names of the cards to see if they match.
    // console.log(cardOne.className, cardTwo.className);
    let choice1 = cardOne.className;
    let choice2 = cardTwo.className;

    // if both cards match
    if (choice1 === choice2) {
      // put +2 counters on cards flipped to know when we can end the game.
      cardsFlipped += 2;
      // remove the ability to click on the cards that are matched.
      cardOne.removeEventListener('click', handleCardClick);
      cardTwo.removeEventListener('click', handleCardClick);
      // resets the cardOne and cardTwo variables for the next round.
      cardOne = null;
      cardTwo = null;
      // allow the player to click on cards again
      noClicking = false;
    } else {
      // If the cards don't match. start timer.
      setTimeout(function () {
        // erase the color of the chosen card back to none.
        cardOne.style.backgroundColor = '';
        cardTwo.style.backgroundColor = '';
        // remove the class 'flipped'
        cardOne.classList.remove('flipped');
        cardTwo.classList.remove('flipped');
        // resets the cardOne and cardTwo variables for the next round. ** Make sure to set to null after everything else **
        cardOne = null;
        cardTwo = null;
        // allow the player to click on cards again
        noClicking = false;
      }, 1000); // cards will stay flipped up for one second.
    }
    // if both cards don't match. wait once second. refresh.
  }
  // if all cards are flipped. game is over
  if (cardsFlipped === COLORS.length) {
    alert('game over!');
  }
}

// when the DOM loads
createDivsForColors(shuffledColors);
