//define html elements

const board = document.querySelector('#game-board');
const instrctionText = document.querySelector('#instrctuction-text');
const logo = document.querySelector('#logo');
const score = document.querySelector('#score');
const highScoreText = document.querySelector('#high-score');
//define game variables
const gridSize= 20;
let highScore = 0;
let snake = [
    { x: 10, y: 10 }
];


let food = generateFood();
let direction = 'right';
let gameInterval;
let gamespeedDelay = 200;
let gameStarted = false;
//draw the map , snake , food
function draw() {
    board.innerHTML = "";
    drawSnake();
    drawFood();
    updateScore();
}

// draw  snake

function drawSnake() {
    snake.forEach((segment) => {
        const snakeElement = createGameElement('div', 'snake');
        setPosition(snakeElement, segment);
        board.appendChild(snakeElement);

    });
}

function createGameElement(tag, className) {
    const element = document.createElement(tag);
    element.className = className;
    return element;
}


//set the position of the food or snake

function setPosition(element, position) {
    element.style.gridColumn = position.x;
    element.style.gridRow = position.y;

}





//draw the food function
function drawFood() {
    if(gameStarted){
        const foodElement = createGameElement('div', 'food');
        setPosition(foodElement, food);
        board.appendChild(foodElement);
    }
   
}


//generrate food 
function generateFood() {
    const x = Math.floor(Math.random() * gridSize) + 1;
    const y = Math.floor(Math.random() * gridSize) + 1;
    return { x, y };

}

//moving the snake

function move() {
    const head = { ...snake[0] };

    switch (direction) {
        case 'up':
            head.y--;
            break;
        case 'right':
            head.x++;
            break;
        case 'down':
            head.y++;
            break;
        case 'left':
            head.x--;
            break;
    }

    snake.unshift(head);

    if (head.x === food.x && head.y === food.y) {
        // Food eaten
        food = generateFood();
        increaseSpeed();
        // No need to clear the interval here

        // Increase snake size without popping the tail
        // (This effectively grows the snake when it eats food)
    } else {
        snake.pop(); // Continue moving by removing the tail
    }

    checkCollision();
    draw();
}




//start game function

function startGame() {
    gameStarted = true;// keep traks of game 
    instrctionText.style.display = "none";
    logo.style.display = "none";
    gameInterval = setInterval(() => {
        move();
         checkCollision();
        draw();

    }, gamespeedDelay);
}


//key press event

function handleKeyPress(event) {
    if (!gameStarted && event.code === 'Space' || event.key === 'Enter'){
        startGame();
    } else if (gameStarted) {
        switch (event.key) {
            case 'ArrowUp':
             if(direction !== 'down')   direction = 'up';
                break;
            case 'ArrowDown':
                if(direction !== 'up')  direction = 'down';
                break;
            case 'ArrowLeft':
                if(direction !== 'right') direction = 'left';
                break;
            case 'ArrowRight':
                if(direction !== 'left')  direction = 'right';
                break;


        }
    }
}

document.addEventListener('keydown', handleKeyPress);

function increaseSpeed(){
     
     if(gamespeedDelay > 150 ){
        gamespeedDelay -= 5;
     } else if(gamespeedDelay > 100){
        gamespeedDelay -=3;
     }else if(gamespeedDelay > 50){
        gamespeedDelay -=2;
     }else if(gamespeedDelay > 25){
        gamespeedDelay -=1;
     }
}


function checkCollision() {
    const head = snake[0];

    if (head.x < 1 || head.x > gridSize || head.y < 1 || head.y > gridSize) {
        resetGame();
    }

    for (let i = 1; i < snake.length; i++) {
        if (head.x === snake[i].x && head.y === snake[i].y) {
            resetGame();
        }
    }
}



function  resetGame(){
    upateHighScore();
    stopGame();

      snake = [{x:10 ,y:10}];
      food = generateFood();
      direction ='right';
      gamespeedDelay= 200;
      updateScore();

}

function updateScore(){
   const currentScore = snake.length - 1;
   score.textContent = currentScore.toString().padStart(3,'0');
}

function stopGame(){
    clearInterval(gameInterval);
    gameStarted = false;
    instrctionText.style.display = 'block';
    logo.style.display = 'block';
}

function upateHighScore(){
  
    const currentScore = snake.length - 1;
    if(currentScore > highScore){
     highScore = currentScore;
     highScoreText.textContent='High score:'+ highScore.toString().padStart(3,'0')
}
    highScoreText.style.display = 'block';
    alert("game over")
    
}


draw(); 


