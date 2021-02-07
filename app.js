/*
GAME FUNCTION 
-Player must guess a number between a min and max
- Player get a certain amount of guesses
- Notify player of gueses remaining
- Notify the player of correct answer if loose
- Let player choose to play again
*/


//Game values
let min = 1,
    max = 10,
    winingNum = getRandomNum(min, max),
    guessesLeft = 5;


//UI Elements
const game = document.getElementById('game'),
    minNum = document.querySelector('.min-num'),
    maxNum = document.querySelector('.max-num'),
    guessBtn = document.querySelector('#guess-btn'),
    guessInput = document.querySelector('#guess-input'),
    message = document.querySelector('.message');


//Assign UI min and max
minNum.textContent = min;
maxNum.textContent = max;

//Play Again Event Listener
game.addEventListener('mousedown', function(e) {
    if (e.target.className === 'play-again') {
        window.location.reload();
    }
});
//Listen for Guess 
guessBtn.addEventListener('click', function() {
    let guess = parseInt(guessInput.value);

    //Validate guess
    if (isNaN(guess) || guess < min || guess > max) {
        setMessage(`Please enter a number between ${min} and ${max}`, 'red');

    }


    //Check if guess equals winning number
    if (guess === winingNum) {
        //Game over - won
        gameOver(true, `${winingNum} is correct.YOU WON!`)
    } else {
        //Wrong guess 
        guessesLeft -= 1;

        if (guessesLeft === 0) {
            //Game over - lost
            gameOver(false, `Game Over, you lost. The correct answer is ${winingNum}`);
        } else {
            //Game continues - answer wrong

            //Red border
            guessInput.style.borderColor = 'red';

            //Cler input
            guessInput.value = '';

            //Notify user that answer was wrong
            setMessage(`${guess} is not correct, you have ${guessesLeft} guesses left`, 'red');

        }
    }
});

//Game over
function gameOver(won, msg) {
    let color;
    won === true ? color = '#4DAA57' : color = 'red';
    //Disable input
    guessInput.disabled = true;

    //border color
    guessInput.style.borderColor = color;

    //set text color
    message.style.color = color;

    //set message
    setMessage(msg);

    //Play Again
    guessBtn.value = 'Play Again';
    guessBtn.className += 'play-again';
}


//Get Wining Num Function
function getRandomNum(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

//Set Message
function setMessage(msg, color) {
    message.style.color = color;
    message.textContent = msg;
}