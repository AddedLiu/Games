var game = new Phaser.Game(800, 600, Phaser.AUTO, 'phaser-game');

var PhaserGame = function() {
	// Background
	this.background = null;
	// Player sprite
	this.player = null;

	// Enemy group.
	this.enemy = null;

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

	// Boss sprite
	this.boss = null;

	// Explosions sprite, which play the kaboom animation.
	this.explosions = null;

	// Ufo sprite.
	this.ufo = null;

	// Award
	this.award1 = null;
	this.award2 = null;
	this.award3 = null;
	// Ufo tiomer, ufo refresh time
	this.ufoTimer = 29000;

	// Update timer
	this.updateTimer = 10000;

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
		this.load.image('ufo', 'assets/ufo.png');
		this.load.image('enemyBullet', 'assets/enemy-bullet.png');
		this.load.image('bulletUP', 'assets/aqua_ball.png');
		this.load.image('unbeatable', 'assets/red_ball.png');

	},

	create : function() {

		this.background = this.add.tileSprite(0, 0, this.game.width,
				this.game.height, 'background');
		this.background.autoScroll(0, 40);
		// Weapon
		this.weapon1 = new Weapon.SingleBullet(this.game);
		this.weapon3 = new Weapon.Rockets(this.game);
		this.weapon2 = new Weapon.ScaleBullet(this.game);
		this.enemyWeapon = new Weapon.EnemyBullet(this.game);

		// Enemy group
		this.enemy = this.game.add.group();
		this.enemy.enableBody = true;
		this.enemy.physicsBodyType = Phaser.Physics.ARCADE;
		// this.enemy.x = 0;
		// this.enemy.y = 100;

		// Player
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
		// Alien
		this.createAlien(3);
		// this.createBoss(200);

	},

	fireBullet : function() {

		this.weapon1.fire(this.player);

	},
	fireRocket : function() {

		this.weapon2.fire(this.player);

	},

	fireSpreadShot : function() {

		this.weapon3.fire(this.player);

	},

	// Create boss if it must be.
	createBoss : function(HP) {
		this.boss = this.game.add.sprite(0, 0, 'boss');
		this.boss.anchor.setTo(0, 0);
		this.game.physics.enable(this.boss, Phaser.Physics.ARCADE);
		this.boss.timer = 0;
		this.boss.bulletSpeed = 400;
		this.boss.rate = 200;
		this.boss.HP = HP;
		this.boss.body.velocity.setTo(180, 0);
		this.boss.UpdateTimer = 270000;
	},

	bossMove : function() {
		if (this.boss.body.x >= this.game.world.width - this.boss.body.width
				|| this.boss.body.x <= 0)
			this.boss.body.velocity.x = -this.boss.body.velocity.x;
		if (this.boss.body.y >= this.game.world.height - this.boss.body.height
				|| this.boss.body.y <= 0)
			this.boss.body.velocity.y = -this.boss.body.velocity.y;
	},

	createAlien : function(HP) {
		var i = 0;
		for (i; i < 10; i++) {
			this.enemy.add(new Alien(this.game, HP, i));
		}
		this.updateTimer = game.time.now + 10000;
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
			if (!this.player.unbeatable)
				this.game.physics.arcade.overlap(this.enemyWeapon, this.player,
						this.enemyHit, null, this);
			else if (game.time.now > this.player.unbeatableTimer)
				this.player.recover();

			if (this.ufo) {
				if (!this.player.unbeatable)
					this.game.physics.arcade.overlap(this.player, this.ufo,
							this.collide, null, this);
				else if (game.time.now > this.player.unbeatableTimer)
					this.player.recover();
				this.game.physics.arcade.overlap(this.weapon1, this.ufo,
						this.collisionHandlerUfo, null, this);
				this.game.physics.arcade.overlap(this.weapon2, this.ufo,
						this.collisionHandlerUfo, null, this);
				this.game.physics.arcade.overlap(this.weapon3, this.ufo,
						this.collisionHandlerUfo, null, this);
			}
			if (this.boss) {
				if (this.boss.alive) {
					this.updateTimer = game.time.now + 10000;
					this.bossMove();

					if (game.time.now > this.boss.timer) {
						this.enemyFire(this.boss);
					}
					if (!this.player.unbeatable)
						this.game.physics.arcade.overlap(this.player,
								this.boss, this.collide, null, this);
					else if (game.time.now > this.player.unbeatableTimer)
						this.player.recover();
					this.game.physics.arcade.overlap(this.weapon1, this.boss,
							this.hitEnemy, null, this);
					this.game.physics.arcade.overlap(this.weapon2, this.boss,
							this.hitEnemy, null, this);
					this.game.physics.arcade.overlap(this.weapon3, this.boss,
							this.hitEnemy, null, this);
				}
			}
			if (this.enemy.countLiving() > 0) {
				this.enemy.forEachAlive(function(alien) {
					alien.move(this.game);
					if (game.time.now > alien.timer) {
						this.enemyFire(alien);
					}
				}, this);
				if (!this.player.unbeatable)
					this.game.physics.arcade.overlap(this.player, this.enemy,
							this.collide, null, this);
				else if (game.time.now > this.player.unbeatableTimer)
					this.player.recover();
				this.game.physics.arcade.overlap(this.enemy, this.weapon1,
						this.hitEnemy, null, this);
				this.game.physics.arcade.overlap(this.enemy, this.weapon2,
						this.hitEnemy, null, this);
				this.game.physics.arcade.overlap(this.enemy, this.weapon3,
						this.hitEnemy, null, this);
			}
			if (game.time.now > this.updateTimer) {
				if (this.boss) {
					if (!this.boss.alive)
						this.createAlien(3);
				} else if (!this.boss) {
					this.createAlien(3);
					if (game.time.now > 91000) {
						this.createBoss(200);
					}
				}
			}

			if (this.award1) {
				this.award1.move(this.game);
				this.game.physics.arcade.overlap(this.player, this.award1,
						this.collideaward1, null, this);
			}

			if (this.award2) {
				this.award2.move(this.game);
				this.game.physics.arcade.overlap(this.player, this.award2,
						this.collideaward2, null, this);
			}

			if (this.award3) {
				this.award3.move(this.game);
				this.game.physics.arcade.overlap(this.player, this.award3,
						this.collideaward3, null, this);
			}

		} else
			this.game.physics.arcade.isPaused = true;
	},
	enemyFire : function(source) {
		if (source.alive)
			this.enemyWeapon.fire(source);

	},
	enemyHit : function(player, bullet) {
		player.setLives(-1);
		this.showLives();
		bullet.kill();

		player.bulletLV = 1;
		player.becomeUnbeatable(1500);

		var explosion = this.explosions.getFirstExists(false);
		explosion.reset(player.body.x, player.body.y);
		explosion.play('kaboom', 30, false, true);
	},

	collisionHandlerUfo : function(ufo, bullet) {
		ufo.kill();
		bullet.kill();
		// Increase the score
		var score = 20;
		this.showScore(score);
		// And create an explosion
		var explosion = this.explosions.getFirstExists(false);
		explosion.reset(ufo.body.x, ufo.body.y);
		explosion.play('kaboom', 30, false, true);
		list = parseInt((Math.random() * 10)) % 1;
		var list = parseInt(Math.random() * 10) % 3;
		switch (list) {
		case 0:
			if (this.award1)
				this.award1.kill();
			this.award1 = new Award.BulletUP(this.game, ufo);
			break;
		case 1:
			if (this.award2)
				this.award2.kill();
			this.award2 = new Award.OneUP(this.game, ufo);
			break;
		case 2:
			if (this.award3)
				this.award3.kill();
			this.award3 = new Award.Unbeatable(this.game, ufo);
			break;
		case 3:
			changeToLightningState();
			break;
		case 4:
			changeToFireState();
		}

	},
	hitEnemy : function(enemy, bullet) {

		enemy.HP -= bullet.damage;
		if (enemy.HP <= 0)
			enemy.kill();
		this.showScore(bullet.score);

		var explosion = this.explosions.getFirstExists(false);
		explosion.reset(bullet.body.x, enemy.body.y + enemy.body.height);
		explosion.play('kaboom', 30, false, true);
		bullet.kill();
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
	},
	// Set Score
	showScore : function(score) {
		this.score += score;
		this.scoreText.text = this.scoreString + this.score;
	},
	// Show lives
	showLives : function() {
		this.livesText.text = "X0" + this.player.lives;
	},
	collide : function(player, enemy) {
		player.setLives(-1);
		this.showLives();

		player.bulletLV = 1;
		player.becomeUnbeatable(1500);

		var explosion = this.explosions.getFirstExists(false);
		explosion.reset(player.body.x, player.body.y);
		explosion.play('kaboom', 30, false, true);
	},

	collideaward1 : function(player, award) {
		var score = 1000;
		this.showScore(score);
		award.getBulletUP(player);
		award.kill();
	},
	collideaward2 : function(player, award) {
		var score = 100;
		this.showScore(score);
		player.getOneup();
		award.kill();
		this.showLives();
	},
	collideaward3 : function(player, award) {
		var score = 100;
		this.showScore(score);
		player.becomeUnbeatable(10000);
		award.kill();
	},

};

game.state.add('Game', PhaserGame, true);
