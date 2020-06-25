import TYPES from "./types.js";
import { makeMovedTetromino, makeTurnedTetromino } from "./temp_tetromino.js";

export class Tetromino {
  constructor() {
    //TODO: [FN-15] Implement preview next Tetromino
    this.type = Math.floor(Math.random() * 7);
    this.color = TYPES[this.type].color;
    this.parts = JSON.parse(JSON.stringify(TYPES[this.type].parts));
  }
  /**
   * @description Move the Tetromino left, right and down
   * @param {event} event - a keyboard-event
   */
  move(event, stack) {
    switch (event.key) {
      case "ArrowLeft":
      case "4":
      case "a":
        if (this._doesFit(makeMovedTetromino(this, -1, 0), stack))
          this.parts.forEach(part => part.col--);
        break;
      case "ArrowRight":
      case "6":
      case "d":
        if (this._doesFit(makeMovedTetromino(this, 1, 0), stack))
          this.parts.forEach(part => part.col++);
        break;
      case "ArrowDown":
      case "2":
      case "x":
        if (this._doesFit(makeMovedTetromino(this, 0, 1), stack))
          this.parts.forEach(part => part.row++);
        // move not possible!
        else {
          return false;
        }
        break;
      case "ArrowUp":
      case "8":
      case "w":
        // if (this.color != "#fcf914") this._turn(stack);
        if (this.color != "#fcf914") {
          const tempTetromino = makeTurnedTetromino(this);
          if (this._doesFit(tempTetromino, stack))
            this.parts.forEach((part, index) => {
              part.row = tempTetromino[index].row;
              part.col = tempTetromino[index].col;
            });
        }
    }
    return true;
  }
  /**
   * @description Checks if an intended move is possible
   * @param {object} tempTetromino
   * @param {object} stack
   * @returns {boolean} true if move is possible
   */
  _doesFit(tempTetromino, stack) {
    let res = true;
    tempTetromino.some(tPart => {
      if (tPart.row > 20) res = false;
      if (tPart.col < 1 || tPart.col > 10) res = false;
      if (
        stack.parts.some(
          sPart => sPart.row == tPart.row && sPart.col == tPart.col
        )
      )
        res = false;
    });
    return res;
  }
}
