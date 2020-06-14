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
    /**
     * @description Test if the Tetromino touches a border
     * @param {number} value - the value to test for, in other words: the border
     * @param {string} border - "col" or "row"
     * @returns {boolean} - true if border is broken
     */
    const _testBorders = (value, border = "col") => {
      return this.parts.some(part => {
        return part[border] == value;
      });
    };

    switch (event.key) {
      case "ArrowLeft":
      case "4":
      case "a":
        this.parts.forEach(part => part.col--);
        break;
      case "ArrowRight":
      case "6":
      case "d":
        this.parts.forEach(part => part.col++);
        break;
      case "ArrowDown":
      case "2":
      case "x":
        this.parts.forEach(part => part.row++);
        break;
      case "ArrowUp":
      case "8":
      case "w":
        this._turn();
    }
    // reposition tetromino to respect borders
    while (_testBorders(0)) this.parts.forEach(part => part.col++);
    while (_testBorders(11)) this.parts.forEach(part => part.col--);
    while (_testBorders(0, "row")) this.parts.forEach(part => part.row++);
    while (_testBorders(21, "row")) this.parts.forEach(part => part.row--);
  }

  /**
   * @description Turn a tetromino
   * @param {undefined}
   */
  _turn() {
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
      [this.parts[i].col, this.parts[i].row] = [
        addedVector.col,
        addedVector.row
      ];
    }
  }
}
