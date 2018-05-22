$("h1").text("Frogger The Idiot");
// Enemies our player must avoid
var Enemy = function(x,y) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = x;
    this.y = y;

};



// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    var speeds = [70, 100, 120, 300, 800]
    var speed = speeds[Math.floor(Math.random() * speeds.length )];
    this.x += speed * dt;
    if(this.x > 510){
      this.x -= 510;
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

var allEnemies = []

var enemy1 = new Enemy(-50,62);
allEnemies.push(enemy1);
var enemy3 = new Enemy(200,144);
allEnemies.push(enemy3);
var enemy6 = new Enemy(-400,230);
allEnemies.push(enemy6);

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var player = function(x,y){
  this.sprite = 'images/char-boy.png';
  this.x = x;
  this.y = y;
}
player.prototype.update = function(){
for(i = 0; i < allEnemies.length; i++){
  if(player.x <= (allEnemies[i].x + 70) && allEnemies[i].x <= (player.x + 50) && player.y <= (allEnemies[i].y + 70) && allEnemies[i].y <= (player.y + 60)) {
            player.losser();
            }
}
}
player.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};
var score = 0;
player.prototype.winner = function(){
  this.x = 200;
  this.y = 400;
   score = score + 500;
  $('p').text(score);
}
player.prototype.losser = function(){
  this.x = 200;
  this.y = 400;
}

player.prototype.handleInput = function(key){

switch(key){

  case'left':
  if(this.x > 0){
  this.x -= 101;
}
  break;

  case'right':
  if(this.x < 400){
    this.x += 101;
  }
  break;

  case'up':
  if(this.y > 68){
  this.y -= 83;
  }else{
  this.winner();
  }
  break;

  case'down':
  if(this.y < 400){
  this.y += 83;
  }
  return;
  }
};
// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player




var player = new player(200,400);
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
