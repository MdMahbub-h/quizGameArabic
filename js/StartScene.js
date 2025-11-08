import { width, height } from "./constants.js";
import { onStart } from "../customization.js";

class StartScene extends Phaser.Scene {
  constructor() {
    super({ key: "StartScene" });
  }

  create() {
    // this.scene.start("GameScene");

    this.bg = this.add.image(width / 2, height / 2, "firstPageBg");
    this.jaziText = this.add.image(width / 2, height * 0.449, "jazi");
    const fontsToLoad = [
      "10px heavyItalic",
      "10px medium",
      "10px bold",
      "10px normal",
    ];
    Promise.all(fontsToLoad.map((f) => document.fonts.load(f))).then(() => {});
    this.startBtn = this.add.image(width / 2, height * 0.59, "startBtn");

    this.startBtn.setInteractive({ useHandCursor: true });
    this.startBtn.on("pointerdown", () => {
      this.startBtn.disableInteractive();
      this.tweens.add({
        targets: this.startBtn,
        scale: { from: 1, to: 0.85 },
        duration: 100,
        yoyo: true,
        ease: "Sine.easeInOut",
        onComplete: () => {
          this.startBtn.setInteractive({ useHandCursor: true });
          onStart();
          this.scene.start("GameScene");
        },
      });
    });
  }
}

export default StartScene;
