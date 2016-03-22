var Weapon = {};

// Player weapon
Weapon.BulletOne = function(game) {

	Phaser.Group.call(this, game, game.world, 'Bullet One', false, true,
			Phaser.Physics.ARCADE);

	this.bulletSpeed = -400;
	this.timer = 0;
	this.damage = 1;
	this.score = 20;

	for (var i = 0; i < 64; i++) {
		this.add(new Bullet(game, this, 'bullet1'), true);
	}

	return this;

};

Weapon.BulletOne.prototype = Object.create(Phaser.Group.prototype);
Weapon.BulletOne.prototype.constructor = Weapon.BulletOne;

Weapon.BulletOne.prototype.fire = function(source) {

	var x = source.x;
	var y = source.y - 8;

	this.getFirstExists(false).fire(x, y, 0, this.bulletSpeed, 0, 0);
	this.timer = game.time.now + 200;

};

Weapon.BulletTwo = function(game) {

	Phaser.Group.call(this, game, game.world, 'Bullet Two', false, true,
			Phaser.Physics.ARCADE);

	this.bulletSpeed = -400;
	this.timer = 0;
	this.damage = 2;
	this.score = 40;

	for (var i = 0; i < 32; i++) {
		this.add(new Bullet(game, this, 'bullet3'), true);
	}
	return this;

};

Weapon.BulletTwo.prototype = Object.create(Phaser.Group.prototype);
Weapon.BulletTwo.prototype.constructor = Weapon.BulletTwo;

Weapon.BulletTwo.prototype.fire = function(source) {

	var x = source.x;
	var y = source.y - 8;

	this.getFirstExists(false).fire(x, y, 0, this.bulletSpeed, 0, 0);
	this.timer = game.time.now + 200;
};

Weapon.BulletThree = function(game) {

	Phaser.Group.call(this, game, game.world, 'Bullet Three', false, true,
			Phaser.Physics.ARCADE);

	this.bulletSpeed = -400;
	this.timer = 0;
	this.damage = 4;
	this.score = 80;

	for (var i = 0; i < 32; i++) {
		this.add(new Bullet(game, this, 'bullet2'), true);
	}
	return this;

};

Weapon.BulletThree.prototype = Object.create(Phaser.Group.prototype);
Weapon.BulletThree.prototype.constructor = Weapon.BulletThree;

Weapon.BulletThree.prototype.fire = function(source) {

	var x = source.x;
	var y = source.y - 8;

	this.getFirstExists(false).fire(x, y, 0, this.bulletSpeed, 0, 0);
	this.timer = game.time.now + 200;

};

Weapon.PR = function(game) {
	Phaser.Group.call(this, game, game.world, 'Player Rockets', false, true,
			Phaser.Physics.ARCADE);

	this.bulletSpeed = 600;
	this.timer = 0;
	this.damage = 2;
	this.score = 0;

	for (var i = 0; i < 32; i++) {
		this.add(new Rocket(game, this, 'bullet10'), true);
	}
	return this;
};

Weapon.PR.prototype = Object.create(Phaser.Group.prototype);
Weapon.PR.prototype.constructor = Weapon.PR;


Weapon.PR.prototype.fire = function (game, source, target) {
	var x = source.body.x + source.body.width / 2;
	var y = source.body.y + source.body.height;
	var rocket = this.getFirstExists(false);
	rocket.fire(game, x, y, 90, this.bulletSpeed, source, target);
	source.rocketTimer = game.time.now + 1000;
	return rocket;
};

// Enemy weapon
Weapon.EnemyBullet = function(game) {
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

Weapon.EnemyBullet.prototype.fire = function(source) {
	var x = source.body.x + source.body.width / 2;
	var y = source.body.y + source.body.height;

	this.getFirstExists(false).fire(x, y, 0, source.bulletSpeed, 0, 0);
	source.timer = game.time.now + source.rate;

};

Weapon.BossRockets = function(game) {
	Phaser.Group.call(this, game, game.world, 'Boss Rockets', false, true,
			Phaser.Physics.ARCADE);

	this.bulletSpeed = 250;
	this.timer = 0;
	this.damage = 1;
	this.score = 0;

	for (var i = 0; i < 32; i++) {
		this.add(new Rocket(game, this, 'bullet10'), true);
	}
	return this;

};

Weapon.BossRockets.prototype = Object.create(Phaser.Group.prototype);
Weapon.BossRockets.prototype.constructor = Weapon.BossRockets;

Weapon.BossRockets.prototype.fire = function (game, source, target) {
	var x = source.body.x + source.body.width / 2;
	var y = source.body.y + source.body.height;
	var rocket = this.getFirstExists(false);
	rocket.fire(game, x, y, 90, this.bulletSpeed, source, target);
	source.rocketTimer = game.time.now + 3000;
	return rocket;
};
