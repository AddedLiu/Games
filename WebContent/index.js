var game = new Phaser.Game(800, 600, Phaser.AUTO, 'phaser-game');

var PhaserGame = function() {

	this.background = null;
	// Player sprite
	this.player = null;

	// Aliens group.
	this.aliens = null;
	this.speed = 300;

	// weapons
	this.weapon1;
	this.weapon2;
	this.weapon3;
	this.enemyWeapon;

	// Some controls to play the game with
	this.cursors;
	this.fireButton;

	// The score
	this.scoreString = '';
	this.scoreText;
	this.score = 0;

	// Boss state
	this.bossHP = 200;
	this.boss;

	// Explosions sprite, which play the kaboom animation.
	this.explosions;

	// Ufo sprite.
	this.ufo;
	// Ufo tiomer, ufo refresh time
	this.ufoTimer = 29000;

	// Lives text, which equals ("X0%d", lives)
	this.livesString = '';
	this.livesText;

};

PhaserGame.prototype = {

	init : function() {

		this.game.renderer.renderSession.roundPixels = true;
		this.physics.startSystem(Phaser.Physics.ARCADE);

	},

	preload : function() {
		this.load.image('background', 'assets/starfield.jpg');
		this.load.image('player', 'assets/thrust_ship2.png');
		this.load.image('bullet2', 'assets/bullet0.png');
		this.load.image('bullet9', 'assets/bullet1.png');
		this.load.image('bullet10', 'assets/bullet2.png');
		this.load.spritesheet('invader', 'assets/invader32x32x4.png', 32, 32);
		this.load.spritesheet('kaboom', 'assets/explode.png', 128, 128);
		this.load.image('boss', 'assets/boss1.png');
		this.game.load.image('ufo', 'assets/ufo.png');
		this.load.image('enemyBullet', 'assets/enemy-bullet.png');

	},

	create : function() {

		this.background = this.add.tileSprite(0, 0, this.game.width,
				this.game.height, 'background');
		this.background.autoScroll(0, 40);

		this.weapon1 = new Weapon.SingleBullet(this.game);
		this.weapon3 = new Weapon.Rockets(this.game);
		this.weapon2 = new Weapon.ScaleBullet(this.game);
		this.enemyWeapon = new Weapon.EnemyBullet(this.game);

		this.player = new Player(this.game);
		// And some controls to play the game with
		this.cursors = this.input.keyboard.createCursorKeys();
		this.fireButton = this.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
		// An explosion pool
		this.explosions = this.game.add.group();
		this.explosions.createMultiple(30, 'kaboom');
		this.explosions.forEach(this.setupInvader, this.game);
		// The score
		this.scoreString = 'Score : ';
		this.scoreText = this.game.add.text(10, 10, this.scoreString
				+ this.score, {
			font : '34px Arial',
			fill : '#fff'
		});
		// Lives tag
		this.livesString = 'Lives:';
		this.game.add.text(this.game.world.width - 100, 10, 'Lives : ', {
			font : '34px Arial',
			fill : '#fff'
		});
		// Lives sprite
		var ship = this.game.add.sprite(700, 80, 'player');
		ship.anchor.setTo(0.5, 0.5);
		// Lives text
		this.livesText = this.game.add.text(this.game.world.width - 70, 60,
				'X0' + this.player.lives, {
					font : '34px Arial',
					fill : '#fff'
				});

		// Boss
		this.createBoss();

	},

	fireBullet : function() {
		if (this.player.bulletLV === 1)
			this.weapon1.fire(this.player);
		else if (this.player.bulletLV === 2)
			this.weapon2.fire(this.player);
		else if (this.player.bulletLV === 3)
			this.weapon3.fire(this.player);

	},
	fireRocket : function() {

		this.weapon2.fire(this.player);

	},

	fireSpreadShot : function() {

		this.weapon3.fire(this.player);

	},

	// Create boss if it must be.
createBoss : function() {
		this.boss = this.game.add.sprite(0, 0, 'boss');
		this.boss.anchor.setTo(0, 0);
		this.game.physics.enable(this.boss, Phaser.Physics.ARCADE);
		this.game.add.tween(this.boss).to({
			x : 468
		}, 2000, Phaser.Easing.Linear.None, true, 0, 1000, true);
		this.boss.timer = 0;
		this.boss.bulletSpeed = 400;
		this.boss.rate = 200;
	},

	update : function() {
		this.player.body.velocity.setTo(0, 0);
		var maxSpeed = 200;
		if (this.player.alive) {
			// Enable eight direction
			if (this.cursors.left.isDown) {
				this.player.body.velocity.x = -maxSpeed;
			} else if (this.cursors.right.isDown) {
				this.player.body.velocity.x = maxSpeed;
			}
			if (this.cursors.up.isDown) {
				this.player.body.velocity.y = -maxSpeed;
			} else if (this.cursors.down.isDown) {
				this.player.body.velocity.y = maxSpeed;
			}

			// Create ufo sprite.
			if (game.time.now > this.ufoTimer) {
				this.createUfo();
			}

			if (this.fireButton.isDown) {
				if (this.player.bulletLV === 1
						&& game.time.now > this.weapon1.timer)
					this.fireBullet();
				else if (this.player.bulletLV === 2
						&& game.time.now > this.weapon2.timer)
					this.fireRocket();
				else if (this.player.bulletLV === 3
						&& game.time.now > this.weapon3.timer)
					this.fireSpreadShot();
			}
			if (this.game.time.now > this.boss.timer) {
				this.enemyfire(this.boss);
			}

			if (this.ufo) {
				this.game.physics.arcade.overlap(this.weapon1, this.ufo,
						this.collisionHandlerUfo, null, this);
			}
		}
	},
	enemyfire : function(source) {

		this.enemyWeapon.fire(source);

	},

	collisionHandlerUfo : function(bullet, ufo) {
		ufo.kill();
		bullet.kill();
		// Increase the score
		var score = 20;
		this.setScore(score);
		// And create an explosion
		var explosion = this.explosions.getFirstExists(false);
		explosion.reset(ufo.body.x, ufo.body.y);
		explosion.play('kaboom', 30, false, true);
		// Bug
		// list = parseInt((Math.random() * 10)) % 5;
		// switch (list) {
		// case 0:
		// createPowerfulBuller();
		// break;
		// case 1:
		// changeToFireState();
		// break;
		// case 2:
		// changeToIceState();
		// break;
		// case 3:
		// changeToLightningState();
		// break;
		// case 4:
		// getOneUP();
		// default:
		// break;
		// }

	},

	// Setting kaboom animation
	setupInvader : function(invader) {
		invader.anchor.x = 0.5;
		invader.anchor.y = 0.5;
		invader.animations.add('kaboom');
	},
	// Create ufo when nessarry.
	createUfo : function() {
		this.ufo = this.game.add.sprite(400, 0, 'ufo');
		this.ufo.anchor.setTo(0, 0);
		this.game.physics.enable(this.ufo, Phaser.Physics.ARCADE);
		this.game.physics.arcade.moveToObject(this.ufo, this.player, 240);
		this.ufoTimer = game.time.now + 30000;
		// alienTimer = game.time.now + 5000;
	},
	// Set Score
	setScore : function(score) {
		this.score += score;
		this.scoreText.text = this.scoreString + this.score;
	}

};
// Class Player
var Player = function(game) {
	Phaser.Sprite.call(this, game, 400, 500, 'player');
	this.anchor.set(0.5);
	game.physics.arcade.enable(this);
	this.body.collideWorldBounds = true;
	game.add.existing(this);
	// Player's live
	this.lives = 3;
	// Player's weapon
	this.bulletLV = 2;
};

Player.prototype = Object.create(Phaser.Sprite.prototype);
Player.prototype.constructor = Player;

Player.prototype.getDamage = function() {
	if (this.bulletLV === 1)
		return 1;
	else if (this.bulletLV === 2)
		return 2;
	else if (this.bulletLV === 3)
		return 4;
};

Player.prototype.setLives = function(live) {
	this.lives += live;
	if (this.lives > 9)
		this.lives = 9;
	else if (this.lives < 1)
		this.kill();
};

// Class Bullet
var Bullet = function(game, key) {

	Phaser.Sprite.call(this, game, 0, 0, key);

	this.texture.baseTexture.scaleMode = PIXI.scaleModes.NEAREST;

	this.anchor.set(0.5);

	this.checkWorldBounds = true;
	this.outOfBoundsKill = true;
	this.exists = false;

	this.tracking = false;
	this.scaleSpeed = 0;

};

Bullet.prototype = Object.create(Phaser.Sprite.prototype);
Bullet.prototype.constructor = Bullet;

Bullet.prototype.fire = function(x, y, angle, speed, gx, gy) {

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

Bullet.prototype.update = function() {

	if (this.tracking) {
		this.rotation = Math.atan2(this.body.velocity.y, this.body.velocity.x);
	}

	if (this.scaleSpeed > 0) {
		this.scale.x += this.scaleSpeed;
		this.scale.y += this.scaleSpeed;
	}

};

var Weapon = {};

// //////////////////////////////////////////////////
// A single bullet is fired in front of the ship //
// //////////////////////////////////////////////////

Weapon.SingleBullet = function(game) {

	Phaser.Group.call(this, game, game.world, 'Single Bullet', false, true,
			Phaser.Physics.ARCADE);

	this.nextFire = 0;
	this.bulletSpeed = -400;
	this.fireRate = 100;
	this.timer = 0;

	for (var i = 0; i < 64; i++) {
		this.add(new Bullet(game, 'bullet2'), true);
	}

	return this;

};

Weapon.SingleBullet.prototype = Object.create(Phaser.Group.prototype);
Weapon.SingleBullet.prototype.constructor = Weapon.SingleBullet;

Weapon.SingleBullet.prototype.fire = function(source) {

	var x = source.x;
	var y = source.y - 8;

	this.getFirstExists(false).fire(x, y, 0, this.bulletSpeed, 0, 0);
	this.timer = game.time.now + 200;

};

// /////////////////////////////////////////////////////////////////
// Rockets that visually track the direction they're heading in //
// /////////////////////////////////////////////////////////////////

Weapon.Rockets = function(game) {

	Phaser.Group.call(this, game, game.world, 'Rockets', false, true,
			Phaser.Physics.ARCADE);

	this.bulletSpeed = -400;
	this.timer = 0;

	for (var i = 0; i < 32; i++) {
		this.add(new Bullet(game, 'bullet10'), true);
	}
	return this;

};

Weapon.Rockets.prototype = Object.create(Phaser.Group.prototype);
Weapon.Rockets.prototype.constructor = Weapon.Rockets;

Weapon.Rockets.prototype.fire = function(source) {

	var x = source.x;
	var y = source.y - 8;

	this.getFirstExists(false).fire(x, y, 0, this.bulletSpeed, 0, 0);
	this.timer = game.time.now + 200;
};

// //////////////////////////////////////////////////////////////////////
// A single bullet that scales in size as it moves across the screen //
// //////////////////////////////////////////////////////////////////////

Weapon.ScaleBullet = function(game) {

	Phaser.Group.call(this, game, game.world, 'Scale Bullet', false, true,
			Phaser.Physics.ARCADE);

	this.bulletSpeed = -400;
	this.timer = 0;

	for (var i = 0; i < 32; i++) {
		this.add(new Bullet(game, 'bullet9'), true);
	}
	return this;

};

Weapon.ScaleBullet.prototype = Object.create(Phaser.Group.prototype);
Weapon.ScaleBullet.prototype.constructor = Weapon.ScaleBullet;

Weapon.ScaleBullet.prototype.fire = function(source) {

	var x = source.x;
	var y = source.y - 8;

	this.getFirstExists(false).fire(x, y, 0, this.bulletSpeed, 0, 0);
	this.timer = game.time.now + 200;

};

Weapon.EnemyBullet = function(game) {
	Phaser.Group.call(this, game, game.world, 'Enemy Bullet', false, true,
			Phaser.Physics.ARCADE);

	for (var i = 0; i < 64; i++) {
		this.add(new Bullet(game, 'enemyBullet'), true);
	}
	return this;
};
Weapon.EnemyBullet.prototype = Object.create(Phaser.Group.prototype);
Weapon.EnemyBullet.prototype.constructor = Weapon.EnemyBullet;

Weapon.EnemyBullet.prototype.fire = function(source) {
	var x = source.body.x + source.body.width/2;
	var y = source.body.y + source.body.height;

	this.getFirstExists(false).fire(x, y, 0, source.bulletSpeed, 0, 0);
	source.timer = game.time.now + source.rate;

};

game.state.add('Game', PhaserGame, true);
