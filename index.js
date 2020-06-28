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
    return {
      tetromino,
      stack,
      gameOver,
      timeOutHandler,
      speed
    };
  },
  mounted: function() {
      window.addEventListener("keydown", this.moveTetromino);
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
        // clean completed lines
        this.stack.cleanRows(this.tetromino);
        // progress with a new Tetromino
        this.tetromino = new Tetromino();
        if (!this.tetromino.doesFit(this.tetromino.parts, this.stack)) {
          this.tetromino.parts = [];
          this.gameOver = true;
        }
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
    }
  },
});
