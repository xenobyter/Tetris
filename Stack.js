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

  cleanRows(tetromino) {
    let rowsToDelete = [];
    const rowsToCheck = this.affectedRows(tetromino);
    rowsToCheck.forEach(row => {
      if (this.countParts(row) == 10) rowsToDelete.push(row);
    });
    rowsToDelete.forEach(row => this.deleteRow(row));
    this.moveRowsDown(rowsToDelete);
    return rowsToDelete.length;
  }

  countParts(row) {
    let count = 0;
    this.parts.forEach(part => {
      if (part.row == row) count++;
    });
    return count;
  }

  affectedRows(tetromino) {
    return [...new Set(tetromino.parts.map(part => part.row))];
  }

  deleteRow(row) {
    this.parts = this.parts.filter(part => part.row != row);
  }

  moveRowsDown(rows) {
    rows.forEach(row => {
      this.parts.forEach(part => {
        if (part.row <= row) part.row++;
      });
    });
  }
}
