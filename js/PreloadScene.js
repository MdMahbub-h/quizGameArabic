import { width, height } from "./constants.js";

class PreloadScene extends Phaser.Scene {
  constructor() {
    super({ key: "PreloadScene" });
  }

  preload() {
    // Load images
    this.load.image("backBtn", "assets/quiz/backBtn.png");
    this.load.image("bottomText", "assets/quiz/bottomText.png");
    this.load.image("coin", "assets/quiz/coin.png");
    this.load.image("clock", "assets/quiz/clock.png");
    this.load.image("correctOptionBg", "assets/quiz/correctOptionBg.png");
    this.load.image("wrongOptionBg", "assets/quiz/wrongOptionBg.png");
    this.load.image("optionBgHover", "assets/quiz/optionBgHover.png");
    this.load.image("letterBg", "assets/quiz/letterBg.png");
    this.load.image("letterBgAnswer", "assets/quiz/letterBgAnswer.png");
    this.load.image("crossBtn", "assets/quiz/crossBtn.png");
    this.load.image("exitPage", "assets/quiz/exitPage.png");
    this.load.image("firstPage", "assets/quiz/firstPage.png");
    this.load.image("firstPageBg", "assets/quiz/firstPageBg.png");
    this.load.image("jazi", "assets/quiz/jazi.png");
    this.load.image("optionBg", "assets/quiz/optionBg.png");
    this.load.image("pageBg", "assets/quiz/pageBg.png");
    this.load.image("quiz page", "assets/quiz/quiz page.png");
    this.load.image("quizCompletePage", "assets/quiz/quizCompletePage.png");
    this.load.image("startBtn", "assets/quiz/startBtn.png");
    this.load.image("yesBtn", "assets/quiz/yesBtn.png");

    this.load.audio("bgaudio", "assets/sounds/bgaudio.mp3");
    this.load.audio("congrats", "assets/sounds/congrats.mp3");

    // Loading bar or progress
    const progressBar = this.add.graphics();
    const progressBox = this.add.graphics();
    progressBox.fillStyle(0x222222, 0.8);
    progressBox.fillRect(width * 0.1, 700, width * 0.8, 50);

    const loadingText = this.make.text({
      x: width / 2,
      y: height / 2 - 50,
      text: "Loading...",
      style: {
        font: "20px monospace",
        fill: "#ffffff",
      },
    });
    loadingText.setOrigin(0.5, 0.5);

    const percentText = this.make.text({
      x: width / 2,
      y: height / 2 - 5,
      text: "0%",
      style: {
        font: "18px monospace",
        fill: "#ffffff",
      },
    });
    percentText.setOrigin(0.5, 0.5);

    this.load.on("progress", (value) => {
      percentText.setText(parseInt(value * 100) + "%");
      progressBar.clear();
      progressBar.fillStyle(0xffffff, 1);
      progressBar.fillRect(width * 0.1, 710, width * 0.8 * value, 30);
    });

    this.load.on("complete", () => {
      progressBar.destroy();
      progressBox.destroy();
      loadingText.destroy();
      percentText.destroy();
    });
  }

  create() {
    // Start the next scene
    this.scene.start("StartScene");
  }
}

export default PreloadScene;
