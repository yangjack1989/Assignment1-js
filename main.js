// Step 1a - Select and store the gameboard element
let  gameboard=document.querySelector("#gameboard");
// Step 1b - Select and store the score element
let score=document.querySelector("#score");
// Step 1c - Select and store the cards element
let card=document.querySelector("#cards");
// Step 1d - Select and store the message element
 let message=document.querySelector("#message");

 

// Step 2 - Create an array of cards
const cardValues = ['A', 2, 3, 4, 5, 6, 7, 8, 9, 10, 'J', 'Q', 'K'];
let deck = [];

// Step 2a - Create a function to shuffle the deck
function shuffleDeck () {
  // Step 2b - Create a placeholder array
  let  tmp =new Array();

  // Step 2c - Iterate through card values 4 times slice
  let i=0;
    // Step 2d - Using a conditional loop
    do {
      tmp[i]=['A', 2, 3, 4, 5, 6, 7, 8, 9, 10, 'J', 'Q', 'K'];
      
      console.log(deck)
    while(!tmp[i].length==0){
      // Step 2e - Select a random card from the array
      
      let j = Math.floor(Math.random() * tmp[i].length);
      
      let randomCard = tmp[i][j];
      
      // Step 2f - Add the card to the deck array
      deck.push(randomCard);
      tmp[i].splice(j,1);
      
    }  
    
    i+=1;
    
    }while (i<4) 
   
  } 
  
  


// Step 2g - Call the shuffleDeck function
shuffleDeck();


// Step 3a - Create an array to store 2 players

let players =["Player1", "Player2"];

// Step 3b - Create a variable to store the current player
let currentPlayer=0 ;

// Step 3c - Create a variable to store the first selected card
let  currentCard;

console.log(deck);
cardEle=[];

function createDiv(){
// Step 4 - Iterate through the deck and bind a click event to each one
for(let i=0 ;i<deck.length; i++){
  // Step 4a - Create a new div element to be a card
  
   cardEle[i] = document.createElement("div");

  // Step 3b - Add a 'card' class to the class list on the new div element
  cardEle[i].classList.add("card");
  
  
  // Step 3c - Add a data value to the card with the card's value in it
   cardEle[i].dataset.value=deck[i];
   cardEle[i].textContent=`${deck[i]}`;
   cardEle[i].dataset.id=0;
   document.getElementById("cards").appendChild(cardEle[i]);
  // Step 3c - Bind the cardSelected function
  // to the click event on the cardEle
 cardEle[i].addEventListener("click",cardSelected);

}

console.log(cardEle[0]);
}
createDiv();


let playerScore=[0,0];

// Step 5 - Create a function to store the logic
// for when a card is selected
function cardSelected (e) {
  
  // Step 5a - Check if there no picked card selected

    if (currentCard==null)
    {
      // Step 5b - Assign the card to currentCard
      
     
      e.target.className="picked";
      currentCard =e.target;
      currentCard.removeEventListener('click',cardSelected);
      console.log(e.target.className);
      console.log(currentCard);
      
      // Step 5c - Tell the player to select another card
      // (use string interpolation to show which player you're addressing)
      message.textContent= `${players[currentPlayer]}, please select another card`;
    }else{
    // Step 6 - Compare the cards 
      
      if(e.target.dataset.value===currentCard.dataset.value) {
      // Step 6b - Add a class to the 2 card elements
      // flipping them over
      
      e.target.classList.add('flipped');
      e.target.removeEventListener('click',cardSelected);
      currentCard.classList.remove('picked');
      currentCard.classList.add('flipped');
      deck.splice(0,2);
      // Step 6c - Add a point to the score for this player
      playerScore[currentPlayer]+=1;
      score.textContent=`${players[currentPlayer]}: ${playerScore[currentPlayer]}`;

      // Step 6d - Tell the player to go again
      // (use string interpolation to show which player you're addressing)
      message.textContent = `Congratulations! ${players[currentPlayer]}, please go again!`;
      currentCard=null;
      console.log(deck);
      } else {
      // Step 6e - Provide a fail message to the player
      currentCard.classList.remove('picked');
      currentCard.classList.add('card');
      currentCard.addEventListener('click',cardSelected);
      currentCard=null;
      message.textContent ="Oh, so sorry!!! But yer' not psychic!";
    

      // Step 6f - Using a ternary, change players
      currentPlayer = (currentPlayer === 0) ? 1 : 0;
  
      // Step 6g - Concatenate a message to the message element
      // advising player 2 that it's their turn now
      // (use string interpolation to show which player you're addressing)
      message.textContent= `${players[currentPlayer]}, your turn!`;
      
      currentCard=null;
      
    
    }
    }
  
  

  // Step 7 - Check if the board is full
   
  
   if (deck.length===0) {
    // Step 7a - Check if one of the players has won
    if (playerScore[0]>playerScore[1]) {
      // Step 7b - Tell the player they've won
      // (use string interpolation to show which player you're addressing)
      message.textContent = `${players[0]} you won!!! Congratulations!`;
    } else if (playerScore[0]<playerScore[1]){
      message.textContent = `${players[1]} you won!!! Congratulations!`;
    }
    else {
      // Step 7c - Tell the players that the game has ended in a tie
      message.textContent = "The game was a tie! Nice try!";
    }
  }
}


//Take it further - Reset the board allowing the user to play again (Worth 20% of the final grade)
 
 // Step 1 - You will need a reset button in index.html
 let reset= document.createElement("button");
 reset.textContent="Reset Game";
 document.querySelector(".container").appendChild(reset);
 // Step 2 - You will need to bind an event listenerthat detects the click and executes a function
 reset.addEventListener("click",function(e){
  //Step 3 -  You will need to reset all the pieces on the board
 deck=[];
  
  for(let i=0 ;i<52; i++){
  document.getElementById("cards").removeChild(cardEle[i]);
  }
  shuffleDeck();
  console.log(deck);
  createDiv();
  
  
 // Step 4 - You will need to reset the messages
 message.textContent="";
 score.textContent="";
 // Step 5 - You will need to reset the players
 playerScore=[0,0];
 currentCard=null;
 currentPlayer=0;
 
 })

