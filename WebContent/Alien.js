// Class alien
var Alien = function (game, HP, index) {
    Phaser.Sprite.call(this, game, 80 * index + 32 * Math.random()
        + Math.random() * 48, 20, 'invader');
    this.anchor.set(0.5);
    game.physics.enable(this, Phaser.Physics.ARCADE);
    // Alien's HP
    this.HP = HP;
    this.timer = index * 100;
    this.bulletSpeed = 200;
    this.rate = 1000;

    this.animations.add('fly', [0, 1, 2, 3], 20, true);
    this.play('fly');
    this.body.velocity.set(48 + Math.random() * 48, 50 + Math.random() * 50);
};

Alien.prototype = Object.create(Phaser.Sprite.prototype);
Alien.prototype.constructor = Alien;

Alien.prototype.move = function (game) {
    if (this.body.x >= game.world.width - this.body.width || this.body.x <= 0) {
        this.body.velocity.x = -this.body.velocity.x;
    }
    if (this.body.y >= game.world.height - this.body.height || this.body.y <= 0) {
        this.body.velocity.y = -this.body.velocity.y;
    }
};