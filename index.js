import { Tetromino } from "./Tetromino.js";
let app = new Vue({
  el: "#app",
  data: function() {
    const tetromino = new Tetromino();
    return {
      tetromino
    }
  },
  mounted: function() {
      window.addEventListener("keydown", this.moveTetromino);
  },
  destroyed() {
      window.removeEventListener("keydown", this.moveTetromino);
  },
  methods: {
      moveTetromino: function(event) {
        this.tetromino.move(event);
      }
  },
});
