var Player = function (game) {
    Phaser.Sprite.call(this, game, 400, 500, 'player');
    this.anchor.set(0.5);
    game.physics.arcade.enable(this);
    this.body.collideWorldBounds = true;
    game.add.existing(this);
    // Player's live
    this.lives = 3;
    // Player's weapon
    this.bulletLV = 1;
};

Player.prototype = Object.create(Phaser.Sprite.prototype);
Player.prototype.constructor = Player;

Player.prototype.getDamage = function () {
    if (this.bulletLV === 1)
        return 1;
    else if (this.bulletLV === 2)
        return 2;
    else if (this.bulletLV === 3)
        return 4;
};

Player.prototype.setLives = function (live) {
    this.lives += live;
    if (this.lives > 9)
        this.lives = 9;
    else if (this.lives < 1)
        this.kill();
};