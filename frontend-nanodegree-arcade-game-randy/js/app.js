//Constants
var LEN_X = 101;
var LEN_Y = 83;
var PLAYER_START_X_POS = 202;
var PLAYER_START_Y_POS = 420;
var PLAYER_MIN_X_POS = 0;
var PLAYER_MIN_Y_POS = -40;

var PLAYER_MAX_X_POS = 4 * LEN_X;
var PLAYER_MAX_Y_POS = 5 * LEN_Y;


var ENEMY_MAX_X_POS = 5 * LEN_X;


// Enemies our player must avoid
var Enemy = function(startX,startY) {
    // Variables applied to each of our instances go here,

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = startX;
    this.y = startY;
    this.height = 50;
    this.width = 101;
    this.speed = Math.floor(Math.random() *5 +1) *100;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    if (this.x > ENEMY_MAX_X_POS) {
        this.x = -(Math.floor((Math.random() * 5) + 1) * LEN_X);
        this.y = Math.floor((Math.random() * 3) + 1) * LEN_Y;
    }else {
        this.x = this.x + (this.speed * dt);
    }
    var bugXLeftRange = this.x - 50;
    var bugXRightRange = this.x + 50;
    var bugYTopRange = this.y -50;
    var bugYBottomRange = this.y + 50;

//Collision detection
    if (player.x > bugXLeftRange && player.x < bugXRightRange && player.y > bugYTopRange && player.y < bugYBottomRange) {

    player.reset();
    alert ('OOPS! Yer done!  Hit RETURN to Restart');
    }

};

//Reset enemies
Enemy.prototype.reset = function() {
    this.x = x;
    this.y = y;
    this.sprite = 'images/enemy-bug.png';
};


// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Player class
var Player = function(x,y) {
    this.sprite = 'images/char-boy.png';
    this.x = PLAYER_START_X_POS;
    this.y = PLAYER_START_Y_POS;
    this.height = 50;
    this.width = 50;
    };

Player.setSprite = function() {
    this.sprite = $('.active').attr('src');
};

//player reaches the water and wins
Player.prototype.update = function(dt) {
    if (this.y <= 20) {
        player.reset();
        alert('YAAAY!  Ya win!');
    }
};

//Draw the player on the screen
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

//Handle input from arrow keys
Player.prototype.handleInput = function(direction) {
    if (direction === 'left' && this.x >25) {
        this.x -= 100;
    }
    if (direction === 'up' && this.y > 0) {
        this.y -= 61;
        }
    if (direction === 'right' && this.x < 400) {
        this.x += 100;
    }
    if (direction === 'down' && this.y < 400) {
        this.y += 82.5;
    }

};


//Reset player to start position
Player.prototype.reset = function(){
    this.x = PLAYER_START_X_POS;
    this.y = PLAYER_START_Y_POS;

};


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

var enemyBottom = new Enemy(-50, 363, 1);
var enemyMiddle = new Enemy(-50, 242, 2);
var enemyTop = new Enemy(-50, 121, 3);
var allEnemies = [];
allEnemies.push(enemyBottom, enemyMiddle, enemyTop);


var player = new Player();



// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
