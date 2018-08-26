class Entity {
    constructor(x = 0, y = 0, speed = 1, sprite = 'images/enemy-bug.png') {
        this.x = x;
        this.y = y;
        this.speed = speed;
        this.sprite = sprite;
    }
    update(dt = {}) {
    }
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
}


// Enemies our player must avoid
class Enemy extends Entity {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    constructor(x = 0, y = 0, speed = 1, sprite = 'images/enemy-bug.png') {
        // The image/sprite for our enemies, this uses
        // a helper we've provided to easily load images
       super(x,y,speed,sprite);
    }
    // Update the enemy's position, required method for game
    // Parameter: dt, a time delta between ticks
    update(dt) {
        // You should multiply any movement by the dt parameter
        // which will ensure the game runs at the same speed for
        // all computers.
        this.x += this.x * (this.speed * dt);
    };

    // Draw the enemy on the screen, required method for game
    render() {
        super.render();
    };

};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

class Player extends Entity {
    constructor(x = 200, y = 400, speed = 1, sprite = 'images/char-boy.png') {
        super(x, y, speed, sprite);
    }
    update() {
        this.y -= 1 * (this.speed);

    }
    render() {
        super.render();

    }
    handleInput() {

    }
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
const allEnemies = new Array();
for (var i = 0; i < 3; i++) {
    let speed = Math.floor(Math.random() * 6) + 1;
    let x = Math.floor(Math.random() * 2) + 1;
    let y = Math.floor(Math.random() * 2) ;
    console.log(x, y, speed)
    allEnemies.push(new Enemy(x, ((y + 1) * 80), speed));
}
console.log(allEnemies)
const player = new Player();
console.log(player);
// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function (e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});