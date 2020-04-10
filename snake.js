var snake;
var size = 20;
var food;
var snakeScore = 0;

// create canvas and new object, snake
function setup(){
  createCanvas(600, 600);
  snake = new Snake();
  frameRate(10);
  foodLocation();
}

// have food spawn randomly
function foodLocation(){
  var column = floor(width / size);
  var row = floor(height / size);
  food = createVector(floor(random(column)), floor(random(row)));
  food.mult(size);
  // update score
  var snakeScore = document.getElementById('score').innerHTML;
  snakeScore++;
  document.getElementById('score').innerHTML = snakeScore;
}

// call update and show
function draw(){
  background(25);
  snake.update();
  snake.show();
  snake.dead();

  if (snake.eat(food)){
    foodLocation();
  }

  // food color, draw food
  fill(43, 93, 255);
  rect(food.x, food.y, size, size);
}

// add keys to move the snake
function keyPressed(){
  if (keyCode === UP_ARROW){
    snake.move(0, -1);
  } else if (keyCode === DOWN_ARROW){
    snake.move(0, 1);
  } else if (keyCode === RIGHT_ARROW){
    snake.move(1, 0);
  } else if (keyCode === LEFT_ARROW){
    snake.move(-1, 0);
  }
}

function Snake(){
  this.x = 0;
  this.y = 0;
  this.x_speed = 1;
  this.y_speed = 0;
  this.totalLength = 0;
  this.end = [];

// if snake eats,
  this.eat = function(pos){
    var distance = dist(this.x, this.y, pos.x, pos.y);
    if (distance < 1){
      this.totalLength++;
      return true;
    }else{
      return false;
    }
  }

// moves the snake based off keysPressed
  this.move = function(x, y){
    this.x_speed = x;
    this.y_speed = y;
  }

  // conditions for game over
  this.dead = function(){
    for (let i = 0; i < this.end.length; i++){
      let pos = this.end[i];
      let distance = dist(this.x, this.y, pos.x, pos.y);
      if (distance < 1){
        textSize(60);
        text('GAME OVER', 125, 300);
        delayTime(0.5);
        this.totalLength = 0;
        this.end = [];
      }
    }
  }

// update the snake's x and y value
// gives the snake coordinates to indicate which way to move
  this.update = function(){
    if (this.totalLength === this.end.length){
    // adds length onto snake if snake eats
    for (let i = 0; i < this.end.length - 1; i++){
      this.end[i] = this.end[i + 1];
    }
  }
    this.end[this.totalLength - 1] = createVector(this.x, this.y);

    this.x = this.x + this.x_speed * size;
    this.y = this.y + this.y_speed * size;
    // constrain the border of the canvas
    this.x = constrain(this.x, 0, width - size);
    this.y = constrain(this.y, 0, height - size);


  }

  this.show = function(){
    // draw snake
    fill(34, 255, 0);
    for (let i = 0; i < this.end.length; i++){
      rect(this.end[i].x, this.end[i].y, size, size);
    }
    // draw food
    rect(this.x, this.y, size, size);
  }
}
