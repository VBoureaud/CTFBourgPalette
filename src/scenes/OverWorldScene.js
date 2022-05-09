import {BaseScene} from "./base.js";
import './interactive/factory.js';  // This has to run before the first scene in order to add the commands

import TilesetImage from "../assets/tilesets/tileset_extruded.png";
import OverWorld from "../assets/maps/overworld_v.json";
import Player from "../assets/atlas/player.json";
import PlayerImg from "../assets/atlas/player.png";

export default class OverWorldScene extends BaseScene {

  constructor() {
    super('OverWorldScene');
  }
  
  preload() {
    // The keys have to be unique! Otherwise they will not be preloaded again.
    // this.load.image("OverworldTiles", "./assets/prod/tilesets_and_maps/tileset.png");
    this.load.image("TilesetImage", TilesetImage);
    this.load.tilemapTiledJSON("OverWorldMap", OverWorld);
    this.load.atlas("atlas", PlayerImg, Player);
  }

  create() {
    super.create("OverWorldMap");

    // Resize the world and camera bounds
    this.physics.world.setBounds(0, 0, 1920, 1088);
    this.cameras.main.setBounds(0, 0, 1920, 1088);

    this.collide_with_world();  // Has to be called after the rest of the colliders are defined
  }

}
