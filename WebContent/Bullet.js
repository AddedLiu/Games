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

    // this.game.physics.arcade
    // .velocityFromAngle(angle, speed, this.body.velocity);
    this.body.velocity.y = speed;
    this.angle = angle;

    this.body.gravity.set(gx, gy);

};