import { width, height } from "./constants.js";
import { questions, quizDuration, onExit } from "../customization.js";

class GameScene extends Phaser.Scene {
  constructor() {
    super({ key: "GameScene" });
  }
  create() {
    this.questions = questions;
    this.currentQuestionIndex = 0;
    this.score = 0;
    this.paused = false;

    // this.scene.start("EndScene", { score: this.score });

    this.createUi();
    this.createQuiz();
  }

  createQuiz() {
    this.optionBgs = [];
    this.optionTexts = [];
    this.question = this.questions[this.currentQuestionIndex];

    this.answerChecking = false;

    this.optionBgTexture = [
      "optionBg",
      "optionBgHover",
      "correctOptionBg",
      "wrongOptionBg",
    ];
    this.letterColors = [0x4f2e6c, 0xffffff];
    this.optionColors = [0x000000, 0xffffff];

    this.questionTitle = this.add
      .text(width / 2, 485, ` سؤال  ${this.currentQuestionIndex + 1} `, {
        fontFamily: "heavyItalic",
        fontSize: " 44px",
        color: "black",
        padding: {
          top: 10,
          bottom: 10,
          left: 20,
          right: 20,
        },
      })
      .setOrigin(0.5);
    this.questionText = this.add
      .text(width / 2, 580, `${this.question.question}`, {
        fontFamily: "medium",
        fontSize: " 50px",
        color: "black",
        align: "center",
        lineSpacing: 5,
      })
      .setOrigin(0.5, 0);

    const startY = 895;
    const gap = 140;
    const letters = ["أ", "ب", "ج", "د"];

    for (let i = 0; i < 4; i++) {
      // Create rounded rectangle background
      let optionBg = this.add.image(
        width / 2,
        startY + i * gap + 50,
        this.optionBgTexture[0]
      );

      const letter = letters[i];
      const option = this.question.options[i];

      // Create temporary text to measure widths
      let tempLetter = this.add.text(0, 0, letter, {
        fontFamily: "bold",
        fontSize: "40px",
      });
      let tempOption = this.add.text(0, 0, option, {
        fontFamily: "bold",
        fontSize: "40px",
      });

      const totalWidth = tempLetter.width + 15 + tempOption.width; // 15px gap between them
      const centerX = width / 2 + totalWidth / 2; // left edge of combined text
      const centerY = startY + i * gap + 50;
      let centerY2 = startY + i * gap + 50;
      tempLetter.destroy();
      tempOption.destroy();
      if (i == 2) {
        centerY2 = startY + i * gap + 50 - 5;
      }
      if (i == 0) {
        centerY2 = startY + i * gap + 50 + 3;
      }

      let letterBg = this.add.image(centerX + 4, centerY, "letterBg");
      let letterText = this.add
        .text(centerX + 4, centerY2, letter, {
          fontFamily: "bold",
          fontSize: "24px",
          color: Phaser.Display.Color.IntegerToColor(this.letterColors[1]).rgba,
        })
        .setOrigin(0.5, 0.5);
      let optionText = this.add
        .text(centerX + tempLetter.width - totalWidth, centerY, option, {
          fontFamily: "bold",
          fontSize: "36px",
          color: Phaser.Display.Color.IntegerToColor(this.optionColors[0]).rgba,
        })
        .setOrigin(0, 0.5);

      optionBg
        .setInteractive({ useHandCursor: true })
        .on("pointerover", () => {
          if (!this.answerChecking && !this.paused) {
            optionBg.setTexture(this.optionBgTexture[1]);
          }
        })
        .on("pointerout", () => {
          if (!this.answerChecking && !this.paused) {
            optionBg.setTexture(this.optionBgTexture[0]);
          }
        })
        .on("pointerdown", () => {
          if (!this.answerChecking && !this.paused) {
            this.tweens.add({
              targets: optionBg,
              scale: { from: 1, to: 0.9 },
              duration: 100,
              yoyo: true,
              ease: "Sine.easeInOut",
              onComplete: () => {
                this.checkAnswer(i);
              },
            });
          }
        });

      this.optionBgs.push(optionBg);
      this.optionTexts.push({ letterBg, letterText, optionText });
    }

    this.feedbackText = this.add
      .text(width / 2, height - 100, "", {
        fontFamily: "Arial",
        fontSize: "28px",
        color: "#421964ff",
        align: "center",
      })
      .setOrigin(0.5);
  }

  checkAnswer(selectedIndex) {
    this.answerChecking = true;
    if (selectedIndex === this.question.answer) {
      this.score += 1000;
      this.scoreText.setText(this.score);
      this.optionBgs[selectedIndex].setTexture(this.optionBgTexture[2]);
      this.optionTexts[selectedIndex].letterBg.setTexture("letterBgAnswer");
      this.optionTexts[selectedIndex].letterText.setColor(
        Phaser.Display.Color.IntegerToColor(this.letterColors[0]).rgba
      );
      this.optionTexts[selectedIndex].optionText.setColor(
        Phaser.Display.Color.IntegerToColor(this.optionColors[1]).rgba
      );
    } else {
      this.optionBgs[selectedIndex].setTexture(this.optionBgTexture[3]);
      this.optionTexts[selectedIndex].letterBg.setTexture("letterBgAnswer");
      this.optionTexts[selectedIndex].letterText.setColor(
        Phaser.Display.Color.IntegerToColor(this.letterColors[0]).rgba
      );
      this.optionTexts[selectedIndex].optionText.setColor(
        Phaser.Display.Color.IntegerToColor(this.optionColors[1]).rgba
      );

      this.optionBgs[this.question.answer].setTexture(this.optionBgTexture[2]);
      this.optionTexts[this.question.answer].letterBg.setTexture(
        "letterBgAnswer"
      );
      this.optionTexts[this.question.answer].letterText.setColor(
        Phaser.Display.Color.IntegerToColor(this.letterColors[0]).rgba
      );
      this.optionTexts[this.question.answer].optionText.setColor(
        Phaser.Display.Color.IntegerToColor(this.optionColors[1]).rgba
      );
    }

    // Move to next this.question after short delay
    this.time.delayedCall(2000, () => {
      this.currentQuestionIndex++;
      if (this.currentQuestionIndex >= this.questions.length) {
        this.scene.start("EndScene", { score: this.score });
      } else {
        this.showNextQuestion();
      }
    });
  }

  showNextQuestion() {
    // Clear current question UI elements
    if (this.questionTitle) this.questionTitle.destroy();
    if (this.questionText) this.questionText.destroy();
    if (this.feedbackText) this.feedbackText.destroy();

    // Destroy option backgrounds and texts
    if (this.optionBgs) {
      this.optionBgs.forEach((bg) => bg.destroy());
      this.optionBgs = [];
    }
    if (this.optionTexts) {
      this.optionTexts.forEach((obj) => {
        if (obj.letterBg) obj.letterBg.destroy();
        if (obj.letterText) obj.letterText.destroy();
        if (obj.optionText) obj.optionText.destroy();
      });
      this.optionTexts = [];
    }

    // Create the next question
    this.createQuiz();
  }

  createUi() {
    this.bg = this.add.image(width / 2, height / 2, "pageBg");
    this.crossBtn = this.add.image(width * 0.92, height * 0.07, "crossBtn");
    this.crossBtn.setInteractive({ useHandCursor: true });
    this.crossBtn.on("pointerdown", () => {
      if (!this.answerChecking) {
        this.tweens.add({
          targets: this.crossBtn,
          scale: { from: 1, to: 0.85 },
          duration: 100,
          yoyo: true,
          ease: "Sine.easeInOut",
          onComplete: () => {
            this.pauseMenu();
          },
        });
      }
    });
    this.cardBg = this.add.graphics();
    this.cardBg.fillStyle(0xffffff, 1);
    this.cardBg.fillRoundedRect(
      width * 0.04,
      height * 0.103,
      width * 0.92,
      height * 0.76,
      width * 0.075
    );

    this.timerBg = this.createRoundedRect(70, 215, 210, 85, 42, 0xf2f2f6, 1);
    this.scoreBg = this.createRoundedRect(470, 215, 240, 85, 42, 0xf2f2f6, 1);
    this.questionBg = this.createRoundedRect(
      220,
      442,
      300,
      85,
      42,
      0xf2f2f6,
      1
    );
    this.timerIcon = this.add.image(210, 235, "clock").setOrigin(0, 0);
    this.coinIcon = this.add.image(640, 233, "coin").setOrigin(0, 0);

    this.quizDuration = quizDuration;
    this.timerText = this.add
      .text(145, 238, ``, {
        fontFamily: "heavyItalic",
        fontSize: " 38px",
        color: "black",
      })
      .setOrigin(0.5, 0);
    const formatTime = (seconds) => {
      const minutes = Math.floor(seconds / 60);
      const secs = seconds % 60;
      return `${minutes}:${secs.toString().padStart(2, "0")}`;
    };
    this.timerText.setText(formatTime(this.quizDuration));
    this.timeEvent = this.time.addEvent({
      delay: 1000,
      callback: () => {
        if (!this.paused) {
          this.quizDuration--;
          this.timerText.setText(formatTime(this.quizDuration));
          if (this.quizDuration <= 0) {
            this.timeEvent.remove(false);
            this.onTimeUp();
          }
        }
      },
      loop: true,
    });

    this.scoreText = this.add
      .text(560, 238, `${this.score}`, {
        fontFamily: "heavyItalic",
        fontSize: " 38px",
        color: "black",
      })
      .setOrigin(0.5, 0);
    this.footerImage = this.add.image(width / 2, 1575, "bottomText");
    // this.timerBg = this.createRoundedRect(80, 250, 200, 80, 40, 0xf2f2f6, 1);
  }

  onTimeUp() {
    this.scene.start("EndScene", { score: this.score });
  }
  createRoundedRect(
    x,
    y,
    width,
    height,
    radius = 20,
    color = 0xffffff,
    alpha = 1
  ) {
    const rect = this.add.graphics();
    rect.fillStyle(color, alpha);
    rect.fillRoundedRect(x, y, width, height, radius);
    return rect;
  }

  pauseMenu() {
    this.paused = true;
    this.pauseBg = this.add.image(width / 2, height / 2, "exitPage");
    this.yesBtn = this.add
      .image(width / 2, height * 0.527, "yesBtn")
      .setOrigin(0.5, 0.5)
      .setInteractive({ useHandCursor: true });
    this.yesBtn.on("pointerdown", () => {
      this.tweens.add({
        targets: this.yesBtn,
        scale: { from: 1, to: 0.9 },
        duration: 100,
        yoyo: true,
        ease: "Sine.easeInOut",
        onComplete: () => {
          this.paused = false;
          this.pauseBg.destroy();
          this.yesBtn.destroy();
          this.pauseCrossBtn.destroy();
          onExit();
          this.scene.start("StartScene");
        },
      });
    });
    this.pauseCrossBtn = this.add.image(
      width * 0.92,
      height * 0.07,
      "crossBtn"
    );
    this.pauseCrossBtn.setInteractive({ useHandCursor: true });
    this.pauseCrossBtn.on("pointerdown", () => {
      this.tweens.add({
        targets: this.pauseCrossBtn,
        scale: { from: 1, to: 0.85 },
        duration: 100,
        yoyo: true,
        ease: "Sine.easeInOut",
        onComplete: () => {
          this.paused = false;
          this.pauseBg.destroy();
          this.yesBtn.destroy();
          this.pauseCrossBtn.destroy();
        },
      });
    });
  }
}

export default GameScene;
