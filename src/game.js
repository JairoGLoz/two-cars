var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
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

function preload(){

    // load car assets
    this.load.image('red_car', 'assets/sprites/red_car.png');
    this.load.image('yellow_car', 'assets/sprites/yellow_car.png');
}

function create(){
    //this.add.image(400, 300, 'red_car');
    //this.add.image(700, 300, 'yellow_car');
}

function update(){

    // detecting touches
    if (this.input.pointer1.isDown){
        touchFunction(300, 200, this, 'red_car');
    }

    this.input.on('pointerdown', function (pointer) {

        touchFunction(pointer.x, pointer.y, this, 'yellow_car');

    }, this);

}

function touchFunction(x, y, context, car){
    context.add.image(x, y, car);
}