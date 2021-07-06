var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
var x = canvas.width/2;
var y = canvas.height-30;
var dx = 2;
var dy = -2;
var ballRadius = 10;
var paddleHeight = 10;
var paddleWidth = 75;
var paddleX = (canvas.width-paddleWidth);
var rightPressed = false;
var leftPressed = false;
var brickRowCount = 5;
var brickColumnCount = 7;
var brickWidth = 75;
var brickHeight = 20;
var brickPadding = 10;
var brickOffsetTop = 27.5;
var brickOffsetLeft = 27.5;
var score = 0;
var lives = 3;

var bricks = [];
for(var c=0; c<brickColumnCount; c++) {
    bricks[c] = [];
    for(var r=0; r<brickRowCount; r++) {
        bricks[c][r] = {x: 0, y: 0, status: 1};
    }
}

function drawMenu() {
    ctx.font = "12px Lucida Sans Typewriter";
    ctx.fillStyle = "#000000";
    ctx.textAlign = "left";
    ctx.fillText("_______________________________  _____   ____  __.________   ____ ______________", 40, 124);
    ctx.fillText("\\______   \\______   \\_   _____/ /  _  \\ |    |/ _|\\_____  \\ |    |   \\__    ___/", 40, 136);
    ctx.fillText(" |    |  _/|       _/|    __)_ /  /_\\  \\|      <   /   |   \\|    |   / |    |   ", 40, 148);
    ctx.fillText(" |    |   \\|    |   \\|        |    |    \\    |  \\ /    |    \\    |  /  |    |   ", 40, 160);
    ctx.fillText(" |______  /|____|_  /_______  |____|__  /____|__ \\\\_______  /______/   |____|   ", 40, 172);
    ctx.fillText("        \\/        \\/        \\/        \\/        \\/        \\/                    ", 40, 184);
    ctx.font = "24px Arial";
    ctx.fillStyle = "#000000";
    ctx.textAlign = "center";
    ctx.fillText("Press Space to Play", 320, 360);
    ctx.font = "16px Arial";
    ctx.fillText("(Controls: Use Right and Left Arrows to Move)", 320, 450);    
}

drawMenu();

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);
document.addEventListener("mousemove", mouseMoveHandler, false);

function mouseMoveHandler(e) {
    var relativeX = e.clientX - canvas.offsetLeft;
    if(relativeX > 0 && relativeX < canvas.width) {
        paddleX = relativeX - paddleWidth/2;
    }
}

function keyDownHandler(e) {
    if(e.key == "Right" || e.key == "ArrowRight") {
        rightPressed = true;
    }
    else if(e.key == "Left" || e.key == "ArrowLeft") {
        leftPressed = true;
    }
}

function keyUpHandler(e) {
    if(e.key == "Right" || e.key == "ArrowRight") {
        rightPressed = false;
    }
    else if(e.key == "Left" || e.key == "ArrowLeft") {
        leftPressed = false;
    }
}

function collisionDetection() {
    for(var c=0; c<brickColumnCount; c++) {
        for(var r=0; r<brickRowCount; r++) {
            var b = bricks[c][r];
            if(b.status == 1) {
                if(x > b.x && x < b.x+brickWidth && y > b.y && y < b.y+brickHeight) {
                    dy = -dy;
                    b.status = 0;
                    score++;
                    if(score == brickRowCount*brickColumnCount) {
                        alert("YOU WIN");
                        document.location.reload()
                        }
                    }
                }
            }
        }
    }

function drawScore() {
    ctx.font = "14px Arial";
    ctx.fillStyle = "#000000";
    ctx.fillText("Score: "+score, 35, 18);
    }

function drawLives() {
    ctx.font = "14px Arial";
    ctx.fillStyle = "#000000";
    ctx.fillText("Lives: "+lives, canvas.width-32, 18);
    }

function drawBall() {
    ctx.beginPath();
        ctx.arc(x, y, ballRadius, 0, Math.PI*2);
        ctx.fillStyle = "#000000";
        ctx.fill();
    ctx.closePath();
}

function drawPaddle() {
    ctx. beginPath
        ctx.rect(paddleX, canvas.height-paddleHeight, paddleWidth, paddleHeight)
        ctx.fillStyle = "#000000";
        ctx.fill();
    ctx.closePath();
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
                    ctx.fillStyle = "#000000";
                    ctx.fill();
                ctx.closePath();
            }
        }
    }
}

document.addEventListener('keyup', event => {
    if (event.code === 'Space') {
        function draw() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            drawBricks();
            drawBall();
            drawPaddle();
            drawScore();
            drawLives();
            collisionDetection();
        
            x += dx;
            y += dy;
            if(y + dy < ballRadius) {
                dy = -dy;
            } else if(y + dy > canvas.height-ballRadius) {
                    if(x + ballRadius > paddleX && x - ballRadius < paddleX + paddleWidth) {
                        dy = -dy;
                    }
                else {
                    lives--;
                    if(!lives) {
                        alert("GAME OVER");
                        document.location.reload();
                    }
                    else {
                        x = canvas.width/2;
                        y = canvas.height-30;
                        dx = 3;
                        dy = -3;
                        paddleX = (canvas.width-paddleWidth)/2;
                    }
                }
            }
            if(x + dx < ballRadius || x + dx > canvas.width-ballRadius) {
                dx = -dx;
            }
            if(rightPressed) {
                paddleX += 7;
                if (paddleX + paddleWidth > canvas.width) {
                    paddleX = canvas.width - paddleWidth;
                }
            }
            else if(leftPressed) {
                paddleX -= 7;
                if (paddleX < 0) {
                    paddleX = 0;
                }
            }
            requestAnimationFrame(draw);
        }
        draw();
    }
  })

