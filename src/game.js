var config = {
    type: Phaser.AUTO,
    width: window.innerWidth,
    height: window.innerHeight,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 },
            debug: false
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

var game = new Phaser.Game(config);

var gameAspectRatio = 1.78;

var left_car;
var right_car;

var left_left;
var left_right;
var right_left;
var right_right;

function preload(){

    // load car assets
    this.load.image('left_car', 'assets/sprites/red_car.png');
    this.load.image('right_car', 'assets/sprites/yellow_car.png');
}

/**
 * Resizes the game area to the desired ratio
 * @param desiredRatio
 */
function resizeGameToRatio(desiredRatio){
    if (window.innerHeight >= window.innerWidth){
        // width must be that of window
        var gameWidth = window.innerWidth;
        var gameHeight = gameWidth * 1.78;

        game.resize(gameWidth, gameHeight);
    }else{
        // height must be that of window
        var gameHeight = window.innerHeight;
        var gameWidth = gameHeight / 1.78;

        game.resize(gameWidth, gameHeight);
    }
}// end of resizeGameToRatio

function create(){
    resizeGameToRatio(gameAspectRatio);
    
    left_left = game.canvas.width / 8 * 1;
    left_right = game.canvas.width / 8 * 3;
    right_left = game.canvas.width / 8 * 5;
    right_right = game.canvas.width / 8 * 7;

    var initial_y = game.canvas.height - 40; // todo: change that 40 for something more generic

    // add cars
    left_car = this.physics.add.sprite(left_left, initial_y, 'left_car');
    right_car = this.physics.add.sprite(right_left,initial_y, 'right_car');

    this.input.on('pointerdown', function (pointer) {

        touchFunction(pointer.x, pointer.y, this, 'yellow_car');

    }, this);
}

function update(){

}

function touchFunction(x, y, context, car){

    if (x >=  ( game.canvas.width / 2 ) ){
        // touch on right side of the game area
        toggleCarPosition('right');
    }else{
        // touch on left side of game area
        toggleCarPosition('left');
    }
}// end of touchFunction

function toggleCarPosition(car){
    if(car === 'right'){

        if (right_car.x === right_left){
            right_car.x = right_right;
        }else{
            right_car.x = right_left;
        }

    }else if(car === 'left'){

        if (left_car.x === left_left){
            left_car.x = left_right;
        }else{
            left_car.x = left_left;
        }

    }
}// end of toggleCarPosition