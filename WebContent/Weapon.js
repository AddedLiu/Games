var Weapon = {};

// //////////////////////////////////////////////////
// A single bullet is fired in front of the ship //
// //////////////////////////////////////////////////

Weapon.SingleBullet = function (game) {

    Phaser.Group.call(this, game, game.world, 'Single Bullet', false, true,
        Phaser.Physics.ARCADE);

    this.bulletSpeed = -400;
    this.timer = 0;
    this.damage = 1;
    this.score = 20;

    for (var i = 0; i < 64; i++) {
        this.add(new Bullet(game, this, 'bullet2'), true);
    }

    return this;

};

Weapon.SingleBullet.prototype = Object.create(Phaser.Group.prototype);
Weapon.SingleBullet.prototype.constructor = Weapon.SingleBullet;

Weapon.SingleBullet.prototype.fire = function (source) {

    var x = source.x;
    var y = source.y - 8;

    this.getFirstExists(false).fire(x, y, 0, this.bulletSpeed, 0, 0);
    this.timer = game.time.now + 200;

};
// /////////////////////////////////////////////////////////////////
// Rockets that visually track the direction they're heading in //
// /////////////////////////////////////////////////////////////////

Weapon.Rockets = function (game) {

    Phaser.Group.call(this, game, game.world, 'Rockets', false, true,
        Phaser.Physics.ARCADE);

    this.bulletSpeed = -400;
    this.timer = 0;
    this.damage = 2;
    this.score = 40;

    for (var i = 0; i < 32; i++) {
        this.add(new Bullet(game, this, 'bullet10'), true);
    }
    return this;

};

Weapon.Rockets.prototype = Object.create(Phaser.Group.prototype);
Weapon.Rockets.prototype.constructor = Weapon.Rockets;

Weapon.Rockets.prototype.fire = function (source) {

    var x = source.x;
    var y = source.y - 8;

    this.getFirstExists(false).fire(x, y, 0, this.bulletSpeed, 0, 0);
    this.timer = game.time.now + 200;
};

// //////////////////////////////////////////////////////////////////////
// A single bullet that scales in size as it moves across the screen //
// //////////////////////////////////////////////////////////////////////

Weapon.ScaleBullet = function (game) {

    Phaser.Group.call(this, game, game.world, 'Scale Bullet', false, true,
        Phaser.Physics.ARCADE);

    this.bulletSpeed = -400;
    this.timer = 0;
    this.damage = 4;
    this.score = 80;

    for (var i = 0; i < 32; i++) {
        this.add(new Bullet(game, this, 'bullet9'), true);
    }
    return this;

};

Weapon.ScaleBullet.prototype = Object.create(Phaser.Group.prototype);
Weapon.ScaleBullet.prototype.constructor = Weapon.ScaleBullet;

Weapon.ScaleBullet.prototype.fire = function (source) {

    var x = source.x;
    var y = source.y - 8;

    this.getFirstExists(false).fire(x, y, 0, this.bulletSpeed, 0, 0);
    this.timer = game.time.now + 200;

};

Weapon.EnemyBullet = function (game) {
    Phaser.Group.call(this, game, game.world, 'Enemy Bullet', false, true,
        Phaser.Physics.ARCADE);

    this.bulletSpeed = 400;
    this.timer = 0;
    this.damage = 1;
    this.score = 0;

    for (var i = 0; i < 200; i++) {
        this.add(new Bullet(game, this, 'enemyBullet'), true);
    }
    return this;
};
Weapon.EnemyBullet.prototype = Object.create(Phaser.Group.prototype);
Weapon.EnemyBullet.prototype.constructor = Weapon.EnemyBullet;

Weapon.EnemyBullet.prototype.fire = function (source) {
    var x = source.body.x + source.body.width / 2;
    var y = source.body.y + source.body.height;

    this.getFirstExists(false).fire(x, y, 0, source.bulletSpeed, 0, 0);
    source.timer = game.time.now + source.rate;

};