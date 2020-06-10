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
}
