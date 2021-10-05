/*
GAME FUNCTION AND RULES
- Player must guess a number between a min and max
- Player gets a certain amount of guesses
- Notify player of guesses remaining 
- Notify player of the correct answer if loose
- Let player choose  to pla y again
*/

// Game Values
let min = 1,
    max = 10,
    winningNum = getRandomNum(min, max),
    gussesLeft = 3;
    
//UI Elements
const gameWrapper = document.querySelector('#game'),
      minNum = document.querySelector('.min-num'),
      maxNum = document.querySelector('.max-num'),
      guessBtn = document.querySelector('#guess-btn'),
      guessInput = document.querySelector('#guess-input'),
      message = document.querySelector('.message');

//Assign UI min and max 
minNum.textContent = min;
maxNum.textContent = max; 


    // Play again event listener
    gameWrapper.addEventListener('mousedown', function(e){
       if(e.target.className === 'play-again'){
            window.location.reload();
       }
    })
         
    

//Listen for guess-btn (submit btn)


guessBtn.addEventListener('click', function(){
    let guess = parseInt(guessInput.value);
    console.log(guess);
//Validate
    if (isNaN(guess) || guess < min || guess > max ){
        setMessage(`Please enter a number between ${min} and ${max}`, 'black')
    }

//Check if Won    
if (guess === winningNum){
    //GAME OVER - WON
    gameOver(true, `${winningNum} is correct, YOU WINNNN!!`, 'green');
    //   //Disabled input
    // guessInput.disabled = true
    // //Change input border color
    // guessInput.style.borderColor = 'green'
    // //setMessage
    // setMessage(`${winningNum} is correct, YOU WINNNN!!`, 'green')
}else{
//Wrong Number
  gussesLeft -= 1;
  if(gussesLeft === 0){
  //GAME OVER - LOST   
    //    //Disabled input
    //    guessInput.disabled = true
    //    //Change input border color
    //    guessInput.style.borderColor = 'red';
    //    //setMessage
    //    setMessage(`Game over, you lost. The correct number was ${winningNum}`, 'red');
gameOver(false, `Game over, you lost. The correct number was ${winningNum}`, 'red');

  }else{
      //Game continues - answere wrong

           //Change input border color
           guessInput.style.borderColor = 'red';

      //Clear Input
      guessInput.value = '';
     //Tell user its a wrong numnber      
      setMessage(`${guess} is not correct, ${gussesLeft} guesses left`, 'red');
  }
}

})


//Game Over
function gameOver(won, msg){
    let color;
    won === true ? color = 'green' : color = 'red'; 
      //Disabled input
      guessInput.disabled = true
      //Change input border color
      guessInput.style.borderColor = color;
      //Set text color
      message.style.color = color;
      //setMessage
      setMessage(msg);

  
      //Play Again
      guessBtn.value = 'Play Again'
      guessBtn.className += 'play-again';
}


//Get winning number
function getRandomNum(min, max){
return Math.floor(Math.random()*(max-min+1)+min);
}


//SetMessage 
function setMessage(msg, color){
    message.style.color = color;
    message.textContent = msg;
}