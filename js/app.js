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
    reset(x,y){
        this.x=x;
        this.y=y;
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
        //collision    
        if(Math.abs(player.x-this.x)<=20 && Math.abs(player.y-this.y)<50){
            setTimeout(() => {
                player.reset(200,400);                
            }, 500);            
        }    
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
        if(this.y<=-15){            
            document.getElementById("win-wrapper").classList.remove("hide");
            super.reset(200,200);
        }

    }
    render() {
        super.render();
    }
    handleInput(keycode) {
        switch(keycode){
            case 'right':
            if(this.x<400)
            this.x+=30*this.speed;
            break;         
            case 'left':
            if(this.x>0)
            this.x-=30*this.speed;
            break
            case 'up':
            if(this.y>0)
            this.y-=30*this.speed;
            break
            case 'down':
            if(this.y<400)
            this.y+=30*this.speed;
            break
            default:
            break;
            
        }
       

    }
   
}
function playAgain(){      
    init();
    
    
}
// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
function createEnemies(){
    for (var i = 0; i < 3; i++) {
        let speed = Math.floor(Math.random() * 4) + 1;
        let x = 1;
        let y = Math.floor(Math.random() * 3) ;
      //  console.log(x, y, speed)
        allEnemies.push(new Enemy(x, ((y + 1) * 83)-15, speed));
        }
}
const allEnemies = new Array();
createEnemies();
let interval = setInterval(function(){
    createEnemies();    
}, 3000);
const player = new Player();
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