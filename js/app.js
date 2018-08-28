"use strict";
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



class Enemy extends Entity {
    constructor(x = 0, y = 0, speed = 1, sprite = 'images/enemy-bug.png') {
       super(x,y,speed,sprite);
    }
    // Update the enemy's position
    // Parameter: dt, a time delta between ticks
    update(dt) {
     // Detect collision if the enemy in area range of the player
        if(Math.abs(player.x-this.x)<=20 && Math.abs(player.y-this.y)<50){
            setTimeout(() => {
                //Resets the player to the start position
                player.reset(200,400);                
            }, 500);            
        }    
        this.x += this.x * (this.speed * dt);      
    };
    // Draw the enemy on the screen
    render() {
        super.render();
    };

};

class Player extends Entity {
    constructor(x = 200, y = 400, speed = 1, sprite = 'images/char-boy.png') {
        super(x, y, speed, sprite);
    }
    // Update the player's position
    update() {    
        //Check if the Player reached the water, the game should rest and winner popup appears
        if(this.y<=-15){            
            document.getElementById("win-wrapper").classList.remove("hide");
            super.reset(200,200);
        }
    }
    //Draw the player on the screen
    render() {
        super.render();
    }
    //Handle the keboard navigation arrows to move the player on the allowed area on the screen
    handleInput(keycode) {
        switch(keycode){
            case 'right':
            (this.x<400)?this.x+=30*this.speed:this.x;
            break;         
            case 'left':
            (this.x>0)?this.x-=30*this.speed:this.x;
            break
            case 'up':
            (this.y>0)?this.y-=30*this.speed:this.y;
            break
            case 'down':
            (this.y<400)?this.y+=30*this.speed:this.y;
            break
            default:
            break;
            
        }      

    }
   
}
//Restart the game
function playAgain(){      
    init();   
    
}
//Prepare Enemies with random locations and speed
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

// listens for key presses and sends the keys to your
document.addEventListener('keyup', function (e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };
    player.handleInput(allowedKeys[e.keyCode]);
});