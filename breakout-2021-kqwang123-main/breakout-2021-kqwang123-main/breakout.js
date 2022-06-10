var animate = window.requestAnimationFrame ||
  window.webkitRequestAnimationFrame ||
  window.mozRequestAnimationFrame ||
  function(callback) { window.setTimeout(callback, 1000/60) };

var canvas = document.createElement('canvas');
var width = 800;
var height = 500;
canvas.width = width;
canvas.height = height;
var ctx = canvas.getContext('2d');
window.onload = function() {
    document.body.appendChild(canvas);
    loadStart();
};

var brickRowCount = 5;
var brickColumnCount = 10;
var brickWidth = 75;
var brickHeight = 50;
var brickPadding = 0;
var brickOffsetTop = 50;
var brickOffsetLeft = 25;
var bricks = [];

var level = 1;
const level2 = [
  [0, 1, 1, 0, 0],
  [1, 1, 1, 1, 0],
  [1, 1, 1, 1, 0],
  [1, 1, 1, 1, 0],
  [1, 3, 2, 1, 0],
  [1, 4, 2, 1, 0],
  [1, 1, 1, 1, 0],
  [1, 1, 1, 1, 0],
  [1, 1, 1, 1, 0],
  [0, 1, 1, 0, 0]
];
const level3 = [
  [1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1],
  [0, 0, 0, 0, 0],
  [3, 3, 3, 3, 3],
  [0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0],
  [2, 2, 2, 2, 2],
  [0, 0, 0, 0, 0],
  [1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1]
];
const level4 = [
  [1, 1, 1, 1, 1],
  [1, 0, 0, 0, 1],
  [1, 0, 1, 0, 1],
  [1, 0, 1, 0, 1],
  [1, 0, 3, 0, 1],
  [1, 0, 4, 0, 1],
  [1, 0, 1, 0, 1],
  [1, 0, 1, 0, 1],
  [1, 0, 0, 0, 1],
  [1, 1, 1, 1, 1]
];
const level5 = [
  [0, 1, 0, 1, 0],
  [1, 2, 1, 3, 1],
  [0, 1, 1, 1, 0],
  [1, 1, 1, 1, 1],
  [0, 1, 4, 1, 0],
  [0, 1, 4, 1, 0],
  [1, 1, 1, 1, 1],
  [0, 1, 1, 1, 0],
  [1, 2, 1, 3, 1],
  [0, 1, 0, 1, 0]
];

var balls = new Set();
var ballMultiplier = 0;

function Brick(x, y, upgrade, status) {

  this.x = x;
  this.y = y;
  this.status = status;
  this.upgrade = upgrade; 

}
function drawBricks() {
  for(var c=0; c<brickColumnCount; c++) {
    for(var r=0; r<brickRowCount; r++) {
      if(bricks[c][r].status == 1) {
        var brickX = (c*(brickWidth+brickPadding))+brickOffsetLeft;
        var brickY = (r*(brickHeight+brickPadding))+brickOffsetTop;
        bricks[c][r].x = brickX;
        bricks[c][r].y = brickY;
        ctx.beginPath();
        ctx.rect(brickX, brickY, brickWidth, brickHeight);
        if (bricks[c][r].upgrade == 1)
          ctx.fillStyle = "#FF0000";
        else if (bricks[c][r].upgrade == 2)
          ctx.fillStyle = "#00FF00";
        else if (bricks[c][r].upgrade == 3)
          ctx.fillStyle = "#0000FF";
        else
          ctx.fillStyle = "#0095DD";
        ctx.fill();
        ctx.closePath();
        ctx.rect(brickX, brickY, brickWidth, brickHeight);
        ctx.fillStyle = "#000000";
        ctx.strokeRect(brickX, brickY, brickWidth, brickHeight);
      }
    }
  }
}
function collisionDetection(ball) {
  var top_x = ball.x;
  var top_y = ball.y;
  var bottom_x = ball.x;
  var bottom_y = ball.y;
  for(var c=0; c<brickColumnCount; c++) {
    for(var r=0; r<brickRowCount; r++) {
      var b = bricks[c][r];
      if(b.status == 1) {
        if(top_y < b.y+brickHeight-5 && bottom_y > b.y+5 && top_x < b.x+brickWidth && bottom_x > b.x) {
          ball.x_speed = -ball.x_speed;
          b.status = 0;
          if (bricks[c][r].upgrade == 1) {
            player.paddle.width = player.paddle.width+50;
          }
          else if (bricks[c][r].upgrade == 2) {
            balls.add(new Ball(400, 450));
          }
          else if (bricks[c][r].upgrade == 3) {
            for (let ballz of balls) {
              if (ballz.x_speed>0)
                ballz.x_speed = ballz.x_speed+2;
              else
                ballz.x_speed = ballz.x_speed-2;
              if (ballz.y_speed > 0)
                ballz.y_speed = ballz.y_speed+2;
              else
                ballz.y_speed = ballz.y_speed-2;
              ballMultiplier = ballMultiplier+2;
            }
          }
          else
            ctx.fillStyle = "#0095DD";
        }
        else if(top_y < b.y+brickHeight && bottom_y > b.y && top_x < b.x+brickWidth-5 && bottom_x > b.x+5) {
          ball.y_speed = -ball.y_speed;
          b.status = 0;
          if (bricks[c][r].upgrade == 1) {
            player.paddle.width = player.paddle.width+50;
          }
          else if (bricks[c][r].upgrade == 2) {
            balls.add(new Ball(400, 450));
          }
          else if (bricks[c][r].upgrade == 3) {
            for (let ballz of balls) {
              if (ballz.x_speed>0)
                ballz.x_speed = ballz.x_speed+2;
              else
                ballz.x_speed = ballz.x_speed-2;
              if (ballz.y_speed > 0)
                ballz.y_speed = ballz.y_speed+2;
              else
                ballz.y_speed = ballz.y_speed-2;
              ballMultiplier = ballMultiplier+2;
            }
          }
          else
            ctx.fillStyle = "#0095DD";
        }
        else if(top_y < b.y+brickHeight-5 && bottom_y > b.y+5 && top_x < b.x+brickWidth-5 && bottom_x > b.x+5) {
          ball.y_speed = -ball.y_speed;
          ball.x_speed = -ball.x_speed;
          b.status = 0;
          if (bricks[c][r].upgrade == 1) {
            player.paddle.width = player.paddle.width+50;
          }
          else if (bricks[c][r].upgrade == 2) {
            balls.add(new Ball(400, 450));
          }
          else if (bricks[c][r].upgrade == 3) {
            for (let ballz of balls) {
              if (ballz.x_speed>0)
                ballz.x_speed = ballz.x_speed+2;
              else
                ballz.x_speed = ballz.x_speed-2;
              if (ballz.y_speed > 0)
                ballz.y_speed = ballz.y_speed+2;
              else
                ballz.y_speed = ballz.y_speed-2;
              ballMultiplier = ballMultiplier+2;
            }
          }
          else
            ctx.fillStyle = "#0095DD";
        }
      }
    }
  }
  var noBricks = true;
  for(var c=0; c<brickColumnCount; c++) {
    for(var r=0; r<brickRowCount; r++) {
      if(bricks[c][r].status == 1)
        noBricks = false;
    }
  }
  if (noBricks) {
    for (let deleteBall of balls)
      balls.delete(deleteBall);
    level++;
    reset();
  }
}
function resetBricks() {
  if (level == 1) {
    for(var c=0; c<brickColumnCount; c++) {
      bricks[c] = [];
      for(var r=0; r<brickRowCount; r++) {
          bricks[c][r] = new Brick (0, 0, 0, 1);
      }
    }
  }
  else if (level == 2) {
    for(var c=0; c<brickColumnCount; c++) {
      bricks[c] = [];
      for(var r=0; r<brickRowCount; r++) {
        if (level2[c][r] == 0)
          bricks[c][r] = new Brick (0, 0, 0, 0);
        else if (level2[c][r] == 1)
          bricks[c][r] = new Brick (0, 0, 0, 1);
        else if (level2[c][r] == 2)
          bricks[c][r] = new Brick (0, 0, 1, 1);
        else if (level2[c][r] == 3)
          bricks[c][r] = new Brick (0, 0, 2, 1);
        else if (level2[c][r] == 4)
          bricks[c][r] = new Brick (0, 0, 3, 1);
      }
    }
  }
  else if (level == 3) {
    for(var c=0; c<brickColumnCount; c++) {
      bricks[c] = [];
      for(var r=0; r<brickRowCount; r++) {
        if (level3[c][r] == 0)
          bricks[c][r] = new Brick (0, 0, 0, 0);
        else if (level3[c][r] == 1)
          bricks[c][r] = new Brick (0, 0, 0, 1);
        else if (level3[c][r] == 2)
          bricks[c][r] = new Brick (0, 0, 1, 1);
        else if (level3[c][r] == 3)
          bricks[c][r] = new Brick (0, 0, 2, 1);
        else if (level3[c][r] == 4)
          bricks[c][r] = new Brick (0, 0, 3, 1);
      }
    }
  }
  else if (level == 4) {
    for(var c=0; c<brickColumnCount; c++) {
      bricks[c] = [];
      for(var r=0; r<brickRowCount; r++) {
        if (level4[c][r] == 0)
          bricks[c][r] = new Brick (0, 0, 0, 0);
        else if (level4[c][r] == 1)
          bricks[c][r] = new Brick (0, 0, 0, 1);
        else if (level4[c][r] == 2)
          bricks[c][r] = new Brick (0, 0, 1, 1);
        else if (level4[c][r] == 3)
          bricks[c][r] = new Brick (0, 0, 2, 1);
        else if (level4[c][r] == 4)
          bricks[c][r] = new Brick (0, 0, 3, 1);
      }
    }
  }
  else if (level == 5) {
    for(var c=0; c<brickColumnCount; c++) {
      bricks[c] = [];
      for(var r=0; r<brickRowCount; r++) {
        if (level5[c][r] == 0)
          bricks[c][r] = new Brick (0, 0, 0, 0);
        else if (level5[c][r] == 1)
          bricks[c][r] = new Brick (0, 0, 0, 1);
        else if (level5[c][r] == 2)
          bricks[c][r] = new Brick (0, 0, 1, 1);
        else if (level5[c][r] == 3)
          bricks[c][r] = new Brick (0, 0, 2, 1);
        else if (level5[c][r] == 4)
          bricks[c][r] = new Brick (0, 0, 3, 1);
      }
    }
  }
  console.log(bricks[0]);
  console.log(bricks[1]);
  console.log(bricks[2]);
  console.log(bricks[3]);
  console.log(bricks[4]);
  drawBricks();
}

var loadStart = function() {  
  resetBricks();
  animate(step);  
}
var step = function() {
  update();
  render();
  animate(step);
};

function Paddle(x, y, width, height) {
  this.x = x;
  this.y = y;
  this.width = width;
  this.height = height;
}
Paddle.prototype.render = function() {
  ctx.fillStyle = "#0000FF";
  ctx.fillRect(this.x, this.y, this.width, this.height);
};
Paddle.prototype.reset = function() {
  this.x = 400;
  this.y = 460;
  this.width = 100;
}

function Player() { this.paddle = new Paddle(350, 460, 100, 10); }
Player.prototype.render = function() {
  this.paddle.render();
};

function Ball(x, y) {
  this.x = x;
  this.y = y;
  this.x_speed = 3+ballMultiplier;
  this.y_speed = -3-ballMultiplier;
  this.radius = 5;
}
Ball.prototype.render = function() {
  ctx.beginPath();
  ctx.arc(this.x, this.y, this.radius, 2 * Math.PI, false);
  ctx.fillStyle = "#FFFFFF";
  ctx.fill();
};
Ball.prototype.update = function(paddle1) {
  this.x += this.x_speed;
  this.y += this.y_speed;
  var top_x = this.x - 5;
  var top_y = this.y - 5;
  var bottom_x = this.x + 5;
  var bottom_y = this.y + 5;
  
  if(this.x - 5 < 0) { // hitting the left wall
    this.x = 5;
    this.x_speed = -this.x_speed;
  } else if(this.x + 5 > 800) { // hitting the right wall
    this.x = 795;
    this.x_speed = -this.x_speed;
  }
  else if(this.y - 5 < 0) { 
    this.y = 5;
    this.y_speed = -this.y_speed;
  }
  
  if(this.y > 500) {
    balls.delete(this);
    console.log(balls);
    if (balls.size == 0) {
      this.x_speed = 3;
      this.y_speed = -3;
      this.x = 400;
      this.y = 450;
      level = 1;
      reset();
    }
  }
  
  if(top_y > 300) {
    if(top_y < (paddle1.y + paddle1.height) && bottom_y > paddle1.y && top_x < (paddle1.x + paddle1.width) && bottom_x > paddle1.x) {
      // hit the player's paddle
      this.y_speed = -this.y_speed;
      this.y += this.y_speed;
    }
  } 
};

document.addEventListener("mousemove", mouseMoveHandler, false);
function mouseMoveHandler(e) {
  var relativeX = e.clientX - 5;
  if(relativeX > 0 && relativeX < canvas.width) {
    player.paddle.x = relativeX - player.paddle.width/2;
  }
}

var player = new Player();
balls.add(new Ball(400, 450));

var render = function() {
  ctx.fillStyle = "#000000";
  ctx.fillRect(0, 0, width, height);
  player.render();
  for (let ball of balls) {
    ball.render();
  }
  drawBricks();
};
var update = function() {
  drawBricks();
  for (let ball of balls) {
    collisionDetection(ball);
    ball.update(player.paddle);
  }
};
var reset = function() {
  player.paddle.reset();
  resetBricks();
  ballMultiplier = 0;
  balls.add(new Ball(400, 450));
}
