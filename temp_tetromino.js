export function makeMovedTetromino(tetromino, colMove, rowMove) {
  let tempTetromino = [];
  tetromino.parts.forEach(part => {
    tempTetromino.push({
      row: part.row + rowMove,
      col: part.col + colMove
    });
  });
  return tempTetromino;
}

export function makeTurnedTetromino(tetromino) {
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
  tempTetromino.push({
    row: tetromino.parts[0].row,
    col: tetromino.parts[0].col
  });
  for (let i = 1; i < 4; i++) {
    // normalize to parts[0]
    const normalizedVector = _vectorSub(tetromino.parts[i], tetromino.parts[0]);
    // actually turn around parts[0]
    const turnedVector = {
      col: -normalizedVector.row,
      row: normalizedVector.col
    };
    const addedVector = _vectorAdd(tetromino.parts[0], turnedVector);
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
  return tempTetromino;
}
