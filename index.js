import { Tetromino } from "./Tetromino.js";
import { Stack } from "./Stack.js";
let app = new Vue({
  el: "#app",
  data: function() {
    const tetromino = new Tetromino();
    const stack = new Stack();
    return {
      tetromino,
      stack
    };
  },
  mounted: function() {
      window.addEventListener("keydown", this.moveTetromino);
  },
  destroyed() {
      window.removeEventListener("keydown", this.moveTetromino);
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
      }
    }
  },
});
