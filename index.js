import { Tetromino } from "./Tetromino.js";
import { Stack } from "./Stack.js";
let app = new Vue({
  el: "#app",
  data: function() {
    const tetromino = new Tetromino();
    const stack = new Stack();
    let gameOver = false;
    let timeOutHandler;
    let speed = 1000;
    let score = 0;
    let tetrominoCount = 0;
    return {
      tetromino,
      stack,
      gameOver,
      timeOutHandler,
      speed,
      score,
      tetrominoCount
    };
  },
  mounted: function() {
      window.addEventListener("keydown", this.moveTetromino);
      window.addEventListener("touchstart", this.touchhandler);
      this.forceMoveDown();
  },
  destroyed() {
      window.removeEventListener("keydown", this.moveTetromino);
      clearTimeout(this.timeOutHandler);
  },
  methods: {
    moveTetromino: function(event) {
      if (!this.tetromino.move(event, this.stack)) {
        // put Tetromino on stack
        this.stack.push(this.tetromino);
        this.score += 10;
        this.tetrominoCount++;
        this.speed = 1000 - Math.floor(this.tetrominoCount / 100) * 100;
        // clean completed lines
        let completedLines = this.stack.cleanRows(this.tetromino);
        this.score += completedLines == 4 ? 1000 : completedLines * 100;
        // progress with a new Tetromino
        this.tetromino = new Tetromino();
        if (!this.tetromino.doesFit(this.tetromino.parts, this.stack)) {
          this.tetromino.parts = [];
          this.gameOver = true;
          clearTimeout(this.timeOutHandler);
        }
      }
    },
    touchhandler: function(event) {
      function Rect(tetrominoParts) {
        let minX = Infinity;
        let minY = Infinity;
        let maxX = 0;
        let maxY = 0;
        tetrominoParts.forEach(part => {
          minX =
            part.getBoundingClientRect().left < minX
              ? part.getBoundingClientRect().left
              : minX;
          maxX =
            part.getBoundingClientRect().right > maxX
              ? part.getBoundingClientRect().right
              : maxX;
          minY =
            part.getBoundingClientRect().top < minY
              ? part.getBoundingClientRect().top
              : minY;
          maxY =
            part.getBoundingClientRect().bottom > maxY
              ? part.getBoundingClientRect().bottom
              : maxY;
        });
        return { minX, maxX, minY, maxY };
      }
      const tetrominoRect = Rect(this.$refs.activeTetromino);
      if (event.touches[0].clientY < tetrominoRect.minY) {
        this.moveTetromino(new KeyboardEvent("Turn", { key: "ArrowUp" }));
        return;
      }
      if (event.touches[0].clientY > tetrominoRect.maxY) {
        this.moveTetromino(new KeyboardEvent("Down", { key: "ArrowDown" }));
        return;
      }
      if (event.touches[0].clientX < tetrominoRect.minX) {
        this.moveTetromino(new KeyboardEvent("Left", { key: "ArrowLeft" }));
      }
      if (event.touches[0].clientX > tetrominoRect.minX) {
        this.moveTetromino(new KeyboardEvent("Right", { key: "ArrowRight" }));
      }
    },
    forceMoveDown: function() {
      const eventDown = new KeyboardEvent("forceMoveDown", {
        key: "ArrowDown"
      });
      this.timeOutHandler = setTimeout(() => {
        this.moveTetromino(eventDown);
        this.forceMoveDown(this.speed);
      }, this.speed);
    },
    restart: function() {
      this.speed = this.startSpeed;
      this.tetrominoCount = 0;
      this.score = 0;
      this.stack.parts = [];
      this.gameOver = false;
      this.tetromino = new Tetromino();
      this.timeOutHandler = 0;
      this.forceMoveDown();
    }
  },
});
