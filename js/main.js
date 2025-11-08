import PreloadScene from "./PreloadScene.js";
import StartScene from "./StartScene.js";
import GameScene from "./GameScene.js";
import EndScene from "./EndScene.js";
import { width, height } from "./constants.js";

const config = {
  parent: "game",
  type: Phaser.AUTO,
  width: width,
  height: height,

  border: 2,
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
  },
  dom: {
    createContainer: true,
  },

  input: {
    activePointers: 3,
  },
  physics: {
    default: "arcade",
    arcade: {
      debug: false,
    },
  },
  scene: [PreloadScene, GameScene, StartScene, EndScene],
};

const game = new Phaser.Game(config);
