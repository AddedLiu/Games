// Create an game object.
var game = new Phaser.Game(800, 600, Phaser.AUTO, 'phaser-example', {
    preload: preload,
    create: create,
    update: update
});

// Pre-load function, load image and aduio, don't remove.
function preload() {
    game.load.image('bullet', 'assets/bullet0.png');
    game.load.image('enemyBullet', 'assets/enemy-bullet.png');
    game.load.spritesheet('invader', 'assets/invader32x32x4.png', 32, 32);
    game.load.image('ship', 'assets/thrust_ship2.png');
    game.load.spritesheet('kaboom', 'assets/explode.png', 128, 128);
    game.load.image('starfield', 'assets/starfield.jpg');
    game.load.image('background', 'assets/background2.png');
    game.load.image('bulletUP', 'assets/aqua_ball.png');
    game.load.image('boss', 'assets/boss1.png');
    game.load.image('bulleter', 'assets/bullet1.png');
    game.load.image('bulletest', 'assets/bullet2.png');
    game.load.image('ufo', 'assets/ufo.png');
    // Fire state
    game.load.image('firestate', 'assets/red_ball.png');
    // Ice state
    game.load.image('icestate', 'assets/blue_ball.png');
    // Lightning state
    game.load.image('lightningstate', 'assets/purple_ball.png');
}
// Player sprite .
var player;
// Aliens group.
var aliens;
// Bullets group with LV:1;
var bullets;
// Bullets group with LV:2;
var bulleters;
// Bullets group with LV:3.
var bulletests;
// Bullet LV, same with before.
var bulletLV = 1;
// Boss's HP.
var bossHP = 200;
// Boss sprite.
var boss;
// Bullets damage with LV:1
var b1 = 1;
// Bullets damage with LV:2
var b2 = 2;
// Bullets damage with LV:3
var b3 = 4;
// Player's bullet time.
var bulletTime = 0;
// Keyboard listener.
var cursors;
// Fire button, [SPACE] key listener.
var fireButton;
// Explosions sprite, with play kaboom animation.
var explosions;
// Background.
var starfield;
// Player score.
var score = 0;
// Show player score on screen.
var scoreString = '';
// Score text, which equals ("Score: %d", score)
var scoreText;
// Lives sprite
var ship;
// Lives text, which equals ("X0%d", lives)
var livesText;
// Lives player have.
var lives = 3;
// 1UP
var oneUP;
// Enemy's bullet sprite.
var enemyBullet;
// Enemy's bullet group.
var enemyBullets;
// Enemy's firing timer.
var firingTimer = 0;
// State text, win or game over.
var stateText;
// Total aliens, boss appear after you defeat total aliens.
var totalAliens = 100;
// Alien timer, alien refresh time.
var alienTimer = 0;
// Ufo sprite.
var ufo;
// Ufo tiomer, ufo refresh time
var ufoTimer = 29000;
// Powerful bullte sprite.
var powerfulBullet;
// Player state
var playerState = 0;
// gift list
var list;

// Create function, don't remove.
function create() {
    game.physics.startSystem(Phaser.Physics.ARCADE);

    // The scrolling starfield background
    starfield = game.add.tileSprite(0, 0, 800, 600, 'starfield');

    // Our bullet group
    bullets = game.add.group();
    bullets.enableBody = true;
    bullets.physicsBodyType = Phaser.Physics.ARCADE;
    bullets.createMultiple(30, 'bullet');
    bullets.setAll('anchor.x', 0.5);
    bullets.setAll('anchor.y', 1);
    bullets.setAll('outOfBoundsKill', true);
    bullets.setAll('checkWorldBounds', true);

    bulleters = game.add.group();
    bulleters.enableBody = true;
    bulleters.physicsBodyType = Phaser.Physics.ARCADE;
    bulleters.createMultiple(30, 'bulleter');
    bulleters.setAll('anchor.x', 0.5);
    bulleters.setAll('anchor.y', 1);
    bulleters.setAll('outOfBoundsKill', true);
    bulleters.setAll('checkWorldBounds', true);

    bulletests = game.add.group();
    bulletests.enableBody = true;
    bulletests.physicsBodyType = Phaser.Physics.ARCADE;
    bulletests.createMultiple(150, 'bulletest');
    bulletests.setAll('anchor.x', 0.5);
    bulletests.setAll('anchor.y', 1);
    bulletests.setAll('outOfBoundsKill', true);
    bulletests.setAll('checkWorldBounds', true);

    // The enemy's bullets
    enemyBullets = game.add.group();
    enemyBullets.enableBody = true;
    enemyBullets.physicsBodyType = Phaser.Physics.ARCADE;
    enemyBullets.createMultiple(30, 'enemyBullet');
    enemyBullets.setAll('anchor.x', 0.5);
    enemyBullets.setAll('anchor.y', 1);
    enemyBullets.setAll('outOfBoundsKill', true);
    enemyBullets.setAll('checkWorldBounds', true);

    // The player!
    player = game.add.sprite(400, 500, 'ship');
//	player.game.add;
    player.anchor.setTo(0.5, 0.5);
    game.physics.enable(player, Phaser.Physics.ARCADE);
    player.body.collideWorldBounds = true;

    // The baddies!
    aliens = game.add.group();
    aliens.enableBody = true;
    aliens.physicsBodyType = Phaser.Physics.ARCADE;

    // Refresh ten aliens.
    createAliens();

    // The score
    scoreString = 'Score : ';
    scoreText = game.add.text(10, 10, scoreString + score, {
        font: '34px Arial',
        fill: '#fff'
    });
    // lives sprite
    ship = game.add.sprite(700, 80, 'ship');
    ship.anchor.setTo(0.5, 0.5);
    // Lives String
    game.add.text(game.world.width - 100, 10, 'Lives : ', {
        font: '34px Arial',
        fill: '#fff'
    });
    // Lives
    livesText = game.add.text(game.world.width - 70, 60, 'X0' + lives, {
        font: '34px Arial',
        fill: '#fff'
    });

    // State text
    stateText = game.add.text(game.world.centerX, game.world.centerY, ' ', {
        font: '84px Arial',
        fill: '#fff'
    });
    stateText.anchor.setTo(0.5, 0.5);
    stateText.visible = false;

    // An explosion pool
    explosions = game.add.group();
    explosions.createMultiple(30, 'kaboom');
    explosions.forEach(setupInvader, this);

    // And some controls to play the game with
    cursors = game.input.keyboard.createCursorKeys();
    fireButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

}

// Refresh ten aliens.
function createAliens() {
    aliens.x = 10;
    aliens.y = 10;
    for (var i = 0; i < 10; i++) {
        var alien = aliens.create(80 * i + 32 * Math.random() + Math.random()
            * 48, 10, 'invader');
        alien.anchor.setTo(0.5, 0.5);
        alien.animations.add('fly', [0, 1, 2, 3], 20, true);
        alien.play('fly');
        alien.body.moves = false;
        game.add.tween(alien).to({
                y: 550
            }, 1000 + Math.random() * 3000, Phaser.Easing.Linear.None, true, 0,
            1000, true);
        game.add.tween(alien).to({
                x: 800 - alien.body.x
            }, 1000 + Math.random() * 3000, Phaser.Easing.Linear.None, true, 0,
            1000, true);
    }
    alienTimer = game.time.now + 10000;
}

// Create boss if it must be.
function createBoss() {
    boss = game.add.sprite(0, 0, 'boss');
    boss.anchor.setTo(0, 0);
    game.physics.enable(boss, Phaser.Physics.ARCADE);
    game.add.tween(boss).to({
        x: 468
    }, 2000, Phaser.Easing.Linear.None, true, 0, 1000, true);
}

// Create ufo when nessarry.
function createUfo() {
    ufo = game.add.sprite(400, 0, 'ufo');
    ufo.anchor.setTo(0, 0);
    game.physics.enable(ufo, Phaser.Physics.ARCADE);
    game.physics.arcade.moveToObject(ufo, player, 240);
    ufoTimer = game.time.now + 30000;
    alienTimer = game.time.now + 5000;
}

// Create powerful bullet
function createPowerfulBuller() {
    powerfulBullet = game.add.sprite(ufo.x, ufo.y, 'bulletUP');
    powerfulBullet.anchor.setTo(0, 0);
    game.physics.enable(powerfulBullet, Phaser.Physics.ARCADE);
    game.add.tween(powerfulBullet).to({
        y: 800
    }, (600 - ufo.y) * 5, Phaser.Easing.Linear.None, true);
}
// Change to fire state
function changeToFireState() {

}
// Change to ice state
function changeToIceState() {

}
// Change to lightning state
function changeToLightningState() {

}
// OneUp
function getOneUP() {
    oneUP = game.add.sprite(ufo.x, ufo.y, 'ship');
    oneUP.scale.set(0.75);
    oneUP.anchor.setTo(0, 0);
    game.physics.enable(oneUP, Phaser.Physics.ARCADE);
}
// Setting kaboom animation
function setupInvader(invader) {
    invader.anchor.x = 0.5;
    invader.anchor.y = 0.5;
    invader.animations.add('kaboom');
}
// Make aliens decend.
function descend() {
    aliens.y += 10;
}
// update function, don't remove.
function update() {
    // Scroll the background
    starfield.tilePosition.y += 2;
    if (player.alive) {
        // Reset the player, then check for movement keys
        player.body.velocity.setTo(0, 0);
        // Enable eight direction
        if (cursors.left.isDown) {
            player.body.velocity.x = -200;
        } else if (cursors.right.isDown) {
            player.body.velocity.x = 200;
        }
        if (cursors.up.isDown) {
            player.body.velocity.y = -200;
        } else if (cursors.down.isDown) {
            player.body.velocity.y = 200;
        }
        // Player firing?
        if (fireButton.isDown) {
            fireBullet();
        }
        // Enemy firing.
        if (game.time.now > firingTimer) {
            enemyFires();
        }
        // Boss firing.
        if (game.time.now > firingTimer && boss) {
            bossFires();
        }
        // Refresh aline.
        if (game.time.now > alienTimer && totalAliens > 0) {
            createAliens();
        }
        // Create ufo sprite.
        if (game.time.now > ufoTimer) {
            createUfo();
        }
        // Run collision
        game.physics.arcade.overlap(bullets, aliens, collisionHandler, null,
            this);
        game.physics.arcade.overlap(bulleters, aliens, collisionHandler, null,
            this);
        game.physics.arcade.overlap(bulletests, aliens, collisionHandler, null,
            this);
        if (boss) {
            game.physics.arcade.overlap(bullets, boss, collisionHandlerb, null,
                this);
            game.physics.arcade.overlap(bulleters, boss, collisionHandlerb,
                null, this);
            game.physics.arcade.overlap(bulletests, boss, collisionHandlerb,
                null, this);
        }
        if (ufo) {
            game.physics.arcade.overlap(bullets, ufo, collisionHandleru, null,
                this);
            game.physics.arcade.overlap(bulleters, ufo, collisionHandleru,
                null, this);
            game.physics.arcade.overlap(bulletests, ufo, collisionHandleru,
                null, this);
        }
        game.physics.arcade.overlap(enemyBullets, player, enemyHitsPlayer,
            null, this);
        game.physics.arcade.overlap(powerfulBullet, player, powerfulPlayer,
            null, this);
        if (oneUP) {
            game.physics.arcade.overlap(oneUP, player, collisionHandlerOneUP,
                null, this);
        }
    }
}
// Player bullets with aliens collision.
function collisionHandler(bullet, alien) {
    // When a bullet hits an alien we kill them both
    bullet.kill();
    alien.kill();
    totalAliens -= 1;
    // Increase the score
    score += 20;
    scoreText.text = scoreString + score;
    // And create an explosion :)
    var explosion = explosions.getFirstExists(false);
    explosion.reset(alien.body.x, alien.body.y);
    explosion.play('kaboom', 30, false, true);
    if (totalAliens == 0) {
        createBoss();
    }
}
// Player bullet with boss collision.
function collisionHandlerb(boss, bullet) {
    // When a bullet hits an alien we kill them both
    bullet.kill();
    if (bossHP <= 0) {
        boss.kill();
        enemyBullets.callAll('kill', this);
        stateText.text = " You Won, \n Click to restart";
        stateText.visible = true;
        // the "click to restart" handler
        game.input.onTap.addOnce(restart, this);
        // And create an explosion :)
    } else if (bulletLV == 1) {
        bossHP -= b1;
        score += 40;
    } else if (bulletLV == 2) {
        bossHP -= b2;
        score += 80;
    } else if (bulletLV == 3) {
        bossHP -= b3;
        score += 120;
    }
    var explosion = explosions.getFirstExists(false);
    explosion.reset(bullet.body.x, boss.body.y + 282);
    explosion.play('kaboom', 30, false, true);
    // Increase the score
    scoreText.text = scoreString + score;
}
// Player bullet with ufo.
function collisionHandleru(ufo, bullet) {
    bullet.kill();
    ufo.kill();
    // Increase the score
    score += 20;
    scoreText.text = scoreString + score;
    // And create an explosion :)
    var explosion = explosions.getFirstExists(false);
    explosion.reset(ufo.body.x, ufo.body.y);
    explosion.play('kaboom', 30, false, true);
    // Bug
    list = parseInt((Math.random() * 10)) % 5;
    switch (list) {
        case 0:
            createPowerfulBuller();
            break;
        case 1:
            changeToFireState();
            break;
        case 2:
            changeToIceState();
            break;
        case 3:
            changeToLightningState();
            break;
        case 4:
            getOneUP();
        default:
            break;
    }

}
// Enemy bullets with player collision.
function enemyHitsPlayer(player, bullet) {
    // Kill the bullet.
    bullet.kill();
    // Set player's bulletLv to 1
    bulletLV = 1;
    lives -= 1;
    livesText.text = 'X0' + lives;
    // And create an explosion :)
    var explosion = explosions.getFirstExists(false);
    explosion.reset(player.body.x, player.body.y);
    explosion.play('kaboom', 30, false, true);
    // When the player dies
    if (lives < 1) {
        player.kill();
        enemyBullets.callAll('kill');
        stateText.text = " GAME OVER \n Click to restart";
        stateText.visible = true;
        // the "click to restart" handler
        game.input.onTap.addOnce(restart, this);
    }
}
// Become more powerful
function powerfulPlayer(powerfulBullet, player) {
    powerfulBullet.kill();
    bulletLV += 1;
    if (bulletLV > 3) {
        bulletLV = 3;
    }
}
// lives up
function collisionHandlerOneUP(oneUP, player) {
    oneUP.kill();
    lives += 1;
    if (lives > 9) {
        lives = 9;
    }
    livesText.text = 'X0' + lives;
}
// Aliens firing.
function enemyFires() {
    aliens.forEachAlive(function (alien) {
        // Grab the first bullet we can from the pool
        enemyBullet = enemyBullets.getFirstExists(false);
        if (enemyBullet && totalAliens > 0) {
            enemyBullet.reset(alien.body.x, alien.body.y);
            game.physics.arcade.moveToObject(enemyBullet, player, 240);
        }
    });
    if (totalAliens > 0)
        firingTimer = game.time.now + 2000;
}
// Boss firing.
function bossFires() {
    // Grab the first bullet we can from the pool
    enemyBullet = enemyBullets.getFirstExists(false);
    if (enemyBullet && bossHP > 0) {
        enemyBullet.reset(boss.body.x + 161, boss.body.y + 242);
        game.physics.arcade.moveToObject(enemyBullet, player, 240);
    }
    firingTimer = game.time.now + 200;
}
// Player firing.
function fireBullet() {
    // To avoid them being allowed to fire too fast we set a time limit
    if (bulletLV == 1) {
        if (game.time.now > bulletTime) {
            // Grab the first bullet we can from the pool
            bullet = bullets.getFirstExists(false);
            if (bullet) {
                // And fire it
                bullet.reset(player.x, player.y + 8);
                bullet.body.velocity.y = -400;
                bulletTime = game.time.now + 200;
            }
        }
    } else if (bulletLV == 2) {
        if (game.time.now > bulletTime) {
            // Grab the first bullet we can from the pool
            bulleter = bulleters.getFirstExists(false);
            if (bulleter) {
                // And fire it
                bulleter.reset(player.x, player.y + 8);
                bulleter.body.velocity.y = -400;
                bulletTime = game.time.now + 200;
            }
        }
    } else if (bulletLV == 3) {
        if (game.time.now > bulletTime) {
            // Grab the first bullet we can from the pool
            bulletest = bulletests.getFirstExists(false);
            if (bulletest) {
                // And fire it
                bulletest.reset(player.x, player.y + 8);
                bulletest.body.velocity.y = -400;
                bulletTime = game.time.now + 200;
            }
        }
    }
}
// Reset all bullet.
function resetBullet(bullet) {
    // Called if the bullet goes out of the screen
    bullet.kill();
}
// Restart game.
function restart() {
    // Reset boss if necessary
    if (boss) {
        boss.kill();
        bossHP = 200;
    }
    // Reset aliens number
    totalAliens = 100;
    // resets the life count
    lives.callAll('revive');
    // And brings the aliens back from the dead
    aliens.removeAll();
    createAliens();
    // revives the player
    player.revive();
    // hides the text
    stateText.visible = false;
    // reset score
    score = 0;
    scoreText.text = scoreString + score;
}