var Award = {};

Award.BulletUP = function (game, sprite) {

    Phaser.Sprite.call(this, game, sprite.body.x, sprite.body.y, 'bulletUP');
    this.anchor.set(0.5);
    game.physics.arcade.enable(this);
    game.add.existing(this);
    
//    this.body.velocity.setTo(0, 0);
//    return this;

};

Award.BulletUP.prototype = Object.create(Phaser.Sprite.prototype);
Award.BulletUP.prototype.constructor = Award.BulletUP;

//Award.BulletUP.prototype.update = function (game) {
//
//	if (this.body.x >= game.world.width - this.body.width || this.body.x <= 0) {
//        this.body.velocity.x = -this.body.velocity.x;
//    }
//    if (this.body.y >= game.world.height - this.body.height || this.body.y <= 0) {
//        this.body.velocity.y = -this.body.velocity.y;
//    }

//};

Award.BulletUP.prototype.getBulletUP = function(player) {
	this.kill();
	player.setBulletLV(1);
	
};

//Award.OneUP = function (game) {
//
//	Phaser.sprite.call(this, game, game.ufo.body.x, 
//    		game.ufo.body.y, 'player');
//	this.scale.set(0.75);
//	this.anchor.setTo(0, 0);
//	game.physics.enable(this, Phaser.Physics.ARCADE);
//    return this;
//
//};
//
//Award.OneUP.prototype = Object.create(Phaser.Sprite.prototype);
//Award.OneUP.prototype.constructor = Award.OneUP;
//
//Award.OneUP.prototype.fire = function (source) {
//
//    var x = source.x;
//    var y = source.y - 8;
//
//    this.getFirstExists(false).fire(x, y, 0, this.bulletSpeed, 0, 0);
//    this.timer = game.time.now + 200;
//};
//
//// //////////////////////////////////////////////////////////////////////
//// A single bullet that scales in size as it moves across the screen //
//// //////////////////////////////////////////////////////////////////////
//
//Award.ScaleBullet = function (game) {
//
//    Phaser.Group.call(this, game, game.world, 'Scale Bullet', false, true,
//        Phaser.Physics.ARCADE);
//
//    this.bulletSpeed = -400;
//    this.timer = 0;
//    this.damage = 4;
//    this.score = 80;
//
//    for (var i = 0; i < 32; i++) {
//        this.add(new Bullet(game, this, 'bullet9'), true);
//    }
//    return this;
//
//};
//
//Award.ScaleBullet.prototype = Object.create(Phaser.Sprite.prototype);
//Award.ScaleBullet.prototype.constructor = Award.ScaleBullet;
//
//Award.ScaleBullet.prototype.fire = function (source) {
//
//    var x = source.x;
//    var y = source.y - 8;
//
//    this.getFirstExists(false).fire(x, y, 0, this.bulletSpeed, 0, 0);
//    this.timer = game.time.now + 200;
//
//};
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