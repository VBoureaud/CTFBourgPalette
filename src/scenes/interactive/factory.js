import Phaser from 'phaser'

import {Sign} from "./sign.js";
import {Door} from "./door.js"
import {Player} from "./player.js";

// To be able to do scene.add.sign(...)
Phaser.GameObjects.GameObjectFactory.register('sign', function (x, y, text, direction) {
	return new Sign(this.scene, x, y, text, direction);
})

// To be able to do scene.add.door(...)
Phaser.GameObjects.GameObjectFactory.register('door', function (x, y, width, height, destination, link) {
	return new Door(this.scene, x, y, width, height, destination, link);
})

// To be able to do scene.add.player(...)
Phaser.GameObjects.GameObjectFactory.register('player', function (x, y, texture, frame) {
	return new Player(this.scene, x, y, texture, frame);
})
