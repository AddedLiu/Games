var Award = {};

Award.BulletUP = function (game, sprite) {

    Phaser.Sprite.call(this, game, sprite.body.x, sprite.body.y, 'bulletUP');
    this.anchor.set(0.5);
    game.physics.arcade.enable(this);
    game.add.existing(this);

    this.body.velocity.setTo(48, 50);

};

Award.BulletUP.prototype = Object.create(Phaser.Sprite.prototype);
Award.BulletUP.prototype.constructor = Award.BulletUP;

Award.BulletUP.prototype.move = function (game) {

    if (this.body.x >= game.world.width - this.body.width + 10 || this.body.x <= -10) {
        this.body.velocity.x = -this.body.velocity.x;
    }
    if (this.body.y >= game.world.height - this.body.height + 10 || this.body.y <= -10) {
        this.body.velocity.y = -this.body.velocity.y;
    }

};

Award.BulletUP.prototype.getBulletUP = function (player) {
    this.kill();
    player.setBulletLV(1);

};

Award.OneUP = function (game, sprite) {

    Phaser.Sprite.call(this, game, sprite.body.x, sprite.body.y, 'player');
    this.scale.set(0.75);
    this.anchor.setTo(0.5, 0.5);
    game.physics.enable(this, Phaser.Physics.ARCADE);
    this.body.velocity.setTo(60, 10);
    game.add.existing(this);
    return this;

};

Award.OneUP.prototype = Object.create(Phaser.Sprite.prototype);
Award.OneUP.prototype.constructor = Award.OneUP;

Award.OneUP.prototype.move = function (game) {

    if (this.body.x >= game.world.width - this.body.width || this.body.x <= 0) {
        this.body.velocity.x = -this.body.velocity.x;
    }
    if (this.body.y >= game.world.height - this.body.height || this.body.y <= 0) {
        this.body.velocity.y = -this.body.velocity.y;
    }

};

Award.Unbeatable = function (game, sprite) {

    Phaser.Sprite.call(this, game, sprite.body.x, sprite.body.y, 'unbeatable');

    this.anchor.set(0.5);
    game.physics.arcade.enable(this);
    game.add.existing(this);

    this.body.velocity.setTo(48, 50);

};

Award.Unbeatable.prototype = Object.create(Phaser.Sprite.prototype);
Award.Unbeatable.prototype.constructor = Award.Unbeatable;

Award.Unbeatable.prototype.move = function (game) {

    if (this.body.x >= game.world.width - this.body.width || this.body.x <= 0) {
        this.body.velocity.x = -this.body.velocity.x;
    }
    if (this.body.y >= game.world.height - this.body.height || this.body.y <= 0) {
        this.body.velocity.y = -this.body.velocity.y;
    }
};


Award.getRocket = function (game, sprite) {

    Phaser.Sprite.call(this, game, sprite.body.x, sprite.body.y, 'rocket');

    this.anchor.set(0.5);
    game.physics.arcade.enable(this);
    game.add.existing(this);

    this.body.velocity.setTo(48, 20);

};

Award.getRocket.prototype = Object.create(Phaser.Sprite.prototype);
Award.getRocket.prototype.constructor = Award.getRocket;

Award.getRocket.prototype.move = function (game) {

    if (this.body.x >= game.world.width - this.body.width || this.body.x <= 0) {
        this.body.velocity.x = -this.body.velocity.x;
    }
    if (this.body.y >= game.world.height - this.body.height || this.body.y <= 0) {
        this.body.velocity.y = -this.body.velocity.y;
    }
};
//
//Award.EnemyBullet = function (game) {
//    Phaser.Group.call(this, game, game.world, 'Enemy Bullet', false, true,
//        Phaser.Physics.ARCADE);
//
//    this.bulletSpeed = 400;
//    this.timer = 0;
//    this.damage = 1;
//    this.score = 0;
//
//    for (var i = 0; i < 200; i++) {
//        this.add(new Bullet(game, this, 'enemyBullet'), true);
//    }
//    return this;
//};
//Award.EnemyBullet.prototype = Object.create(Phaser.Group.prototype);
//Award.EnemyBullet.prototype.constructor = Award.EnemyBullet;
//
//Award.EnemyBullet.prototype.fire = function (source) {
//    var x = source.body.x + source.body.width / 2;
//    var y = source.body.y + source.body.height;
//
//    this.getFirstExists(false).fire(x, y, 0, source.bulletSpeed, 0, 0);
//    source.timer = game.time.now + source.rate;
//
//};