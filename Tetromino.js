export class Tetromino {
  constructor(type = "I") {
    this.type = type;
    this.color = "#7cebf7";
    this.parts = [
      { id: 0, row: 1, col: 4 },
      { id: 1, row: 1, col: 3 },
      { id: 2, row: 1, col: 5 },
      { id: 3, row: 1, col: 6 }
    ];
  }
  /**
   * @description Move the Tetromino left, right and down
   * @param {event} event - a keyboard-event
   */
  move(event) {
    const tempTetromino = [];
    /**
     * @description Test if the Tetromino touches a border
     * @param {number} value - the value to test for, in other words: the border
     * @returns {boolean} - true if border is broken
     */
    const _testBorders = value => {
      return this.parts.some(part => {
        return part.col == value;
      });
    };

    switch (event.key) {
      case "ArrowLeft":
      case "4":
      case "a":
        if (!_testBorders(1)) this.parts.forEach(part => part.col--);
        break;
      case "ArrowRight":
      case "6":
      case "d":
        if (!_testBorders(10)) this.parts.forEach(part => part.col++);
        break;
      case "ArrowDown":
      case "2":
      case "x":
        // try to move down and check if it would fit
        this.parts.forEach(part => {
          tempTetromino.push({ row: part.row + 1, col: part.col });
        });
        if (this._doesFit(tempTetromino))
          tempTetromino.forEach((part, index) => {
            this.parts[index].row = part.row;
            this.parts[index].col = part.col;
          });
        break;
      case "ArrowUp":
      case "8":
      case "w":
        this._turn();
    }
  }

  /**
   * @description Turn a tetromino
   * @param {undefined}
   */
  _turn() {
    const tempTetromino = [];
    /**
     * @description Subtract vectors of tetromino-parts
     * @param {object} part - minuend
     * @param {object} basis - subtrahend
     * @returns {object} - difference vector
     */
    const _vectorSub = (part, basis) => {
      return { col: part.col - basis.col, row: part.row - basis.row };
    };
    /**
     * @description Add vectors of tetromino-parts
     * @param {object} part - summand
     * @param {object} basis - summand
     * @returns {object} - difference vector
     */
    const _vectorAdd = (part, basis) => {
      return { col: part.col + basis.col, row: part.row + basis.row };
    };
    tempTetromino.push({ row: this.parts[0].row, col: this.parts[0].col });
    for (let i = 1; i < 4; i++) {
      // normalize to parts[0]
      const normalizedVector = _vectorSub(this.parts[i], this.parts[0]);
      // actually turn around parts[0]
      const turnedVector = {
        col: -normalizedVector.row,
        row: normalizedVector.col
      };
      const addedVector = _vectorAdd(this.parts[0], turnedVector);
      // add turned vector to parts[0] which is the new col/row for parts[i]
      tempTetromino.push({ row: addedVector.row, col: addedVector.col });
    }
    // Reposition if need be:
    // Step 1: Collect corrections
    const corr = { col: 0, row: 0 };
    tempTetromino.forEach(part => {
      if (part.col < 1) corr.col++;
      if (part.col > 10) corr.col--;
      if (part.row < 1) corr.row++;
      if (part.row > 20) corr.row--;
    });
    // Step 2: Correct it
    tempTetromino.forEach(part => {
      part.col += corr.col;
      part.row += corr.row;
    });
    // if the turned Tetromino fits, actually apply it
    if (this._doesFit(tempTetromino))
      tempTetromino.forEach((part, index) => {
        this.parts[index].row = part.row;
        this.parts[index].col = part.col;
      });
  }
  _doesFit(tempTetromino) {
    return !tempTetromino.some(part => part.row > 20);
  }
}
