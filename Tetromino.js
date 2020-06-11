export class Tetromino {
  constructor(type = "I") {
    this.type = type;
    this.color = "#7cebf7";
    this.parts = [
      { id: 0, row: 1, col: 3 },
      { id: 1, row: 1, col: 4 },
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
     */
    const testBorders = (value, border = "col") => {
      return this.parts.some(part => {
        return part[border] == value;
      });
    };
    switch (event.key) {
      case "ArrowLeft":
      case "4":
      case "a":
        if (!testBorders(1)) {
          this.parts.forEach(part => {
            part.col--;
          });
        }
        break;
      case "ArrowRight":
      case "6":
      case "d":
        if (!testBorders(10)) {
          this.parts.forEach(part => {
            part.col++;
          });
        }
        break;
      case "ArrowDown":
      case "2":
      case "x":
        if (!testBorders(20, "row")) {
          this.parts.forEach(part => {
            part.row++;
          });
        }
        break;
    }
  }
}
