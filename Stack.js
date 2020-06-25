export class Stack {
  constructor() {
    this.parts = [];
  }

  push(tetromino) {
    tetromino.parts.forEach(part => {
      this.parts.push({
        color: tetromino.color,
        row: part.row,
        col: part.col
      });
    });
  }
}
