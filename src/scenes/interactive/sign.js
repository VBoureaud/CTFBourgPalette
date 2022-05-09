import Phaser from 'phaser';

export class Sign extends Phaser.GameObjects.Zone
{
	constructor(scene, x, y, text, direction) {
		super(scene, x, y, 32, 32);

		// Add the GameObject and collider to the scene
		scene.add.existing(this).setOrigin(0, 1);
		scene.physics.world.enable(this, 1);  // 1 is for static body

		// Direction
		this.direction = direction;

		// This assumes that the hitbox for the body is the same as the empty tile image (32 x 32), see door.js if not
		scene.physics.add.collider(scene.player, this, () => this.collideSign(scene.player));

		// By click or touch it activates within a given distance (clickRadius)
		// this.setInteractive().on('pointerdown', this.clickSign);
		this.clickRadius = 100;
		this.showByClick = false;
		this.text = text;
		this.activated = false;
	}

	collideSign(player) {
		if (!this.activated) {
			// Center hits from every direction
			if (this.direction === 'center') {
				this.showSignText();
			} else if (this.direction === 'left' && player.body.touching.left) {
				this.showSignText();
			} else if (this.direction === 'right' && player.body.touching.right) {
				this.showSignText();
			} else if (this.direction === 'up' && player.body.touching.up) {
				this.showSignText();
			} else if (this.direction === 'down' && player.body.touching.down) {
				this.showSignText();
			}
		}
	}

	showSignText() {
		this.scene.events.emit('sign', this.text);
		this.scene.showingSign = true;  // A property of the scene, see BaseScene's update
		this.activated = true;
	}

	playerMovement(moveleft, moveright, moveup, movedown) {
		// A check for activated is done in BaseScene before calling this
		if (this.showByClick) {
			// If the player activated the sign via pointerdown, then remove it only when she goes away
			if (Phaser.Math.Distance.BetweenPoints(this.getCenter(), this.scene.player) > this.clickRadius) {
				this.hideSignText();
			}
		} else {  // Otherwise, the player activated the sign via collision
			if (moveleft || moveright) {
				this.hideSignText();
			} else if (this.direction === 'up' &&  movedown) {
				this.hideSignText();
			} else if ((this.direction === 'down' || this.direction === 'center') && !movedown) {
				this.hideSignText();
			}
		}
	}

	hideSignText() {
		this.scene.events.emit('sign');
		this.scene.showingSign = false;  // A property of the scene, see BaseScene's update
		this.activated = false;
	}

}
