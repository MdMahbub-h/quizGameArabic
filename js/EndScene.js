import { width, height } from "./constants.js";
import { onComplete } from "../customization.js";

class EndScene extends Phaser.Scene {
  constructor() {
    super({ key: "EndScene" });
  }

  init(data) {
    this.score = data.score;
  }

  create() {
    this.endBg = this.add.image(width / 2, height / 2, "quizCompletePage");
    this.scoreText = this.add
      .text(width / 2 - 30, 850, `${this.score}`, {
        fontFamily: "heavyItalic",
        fontSize: " 40px",
        color: "black",
      })
      .setOrigin(0.5, 0);
    this.backBtn = this.add
      .image(width / 2, height * 0.593, "backBtn")
      .setOrigin(0.5, 0.5)
      .setInteractive({ useHandCursor: true });
    this.backBtn.on("pointerdown", () => {
      this.tweens.add({
        targets: this.backBtn,
        scale: { from: 1, to: 0.9 },
        duration: 100,
        yoyo: true,
        ease: "Sine.easeInOut",
        onComplete: () => {
          this.endBg.destroy();
          this.scoreText.destroy();
          this.backBtn.destroy();
          onComplete(this.score);
          this.scene.start("StartScene");
        },
      });
    });
  }
}

export default EndScene;
