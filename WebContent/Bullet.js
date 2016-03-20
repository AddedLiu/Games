// Class Bullet
var Bullet = function (game, weapon, key) {

    Phaser.Sprite.call(this, game, 0, 0, key);

    this.texture.baseTexture.scaleMode = PIXI.scaleModes.NEAREST;
    this.anchor.set(0.5);

    this.checkWorldBounds = true;
    this.outOfBoundsKill = true;
    this.exists = false;

    this.damage = weapon.damage;
    this.score = weapon.score;

};

Bullet.prototype = Object.create(Phaser.Sprite.prototype);
Bullet.prototype.constructor = Bullet;

Bullet.prototype.fire = function (x, y, angle, speed, gx, gy) {

    gx = gx || 0;
    gy = gy || 0;

    this.reset(x, y);
    this.scale.set(1);
    this.body.velocity.y = speed;
    this.angle = angle;

    this.body.gravity.set(gx, gy);

};

//Class Rocket
var Rocket = function (game, weapon, key) {

    Phaser.Sprite.call(this, game, 0, 0, key);

    this.texture.baseTexture.scaleMode = PIXI.scaleModes.NEAREST;
    this.anchor.set(0.5);

    this.checkWorldBounds = true;
    this.outOfBoundsKill = false;
    this.exists = false;
    this.timer = 0;
    this.damage = weapon.damage;
    this.score = weapon.score;

};

Rocket.prototype = Object.create(Phaser.Sprite.prototype);
Rocket.prototype.constructor = Rocket;

Rocket.prototype.fire = function (game, x, y, angle, speed, source, target) {

    this.reset(x, y);
    this.scale.set(1);
    this.speed = speed;
    this.rotation = game.physics.arcade.angleBetween(source, target);
    game.physics.arcade.moveToObject(this, target, this.speed);

};