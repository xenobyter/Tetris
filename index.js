import { Tetromino } from "./Tetromino.js";
let app = new Vue({
  el: "#app",
  data: function() {
    const tetromino = new Tetromino();
    return {
      tetromino
    }
  },
});
