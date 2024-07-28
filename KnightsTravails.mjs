#!/usr/bin/env node

class Node {
  constructor(data) {
    this.data = data;
    this.moves = [];
  }
  // Check for out of bounds move
  inBounds(value) {
    return value < 0 || value > 7 ? false : true;
  }
  // Add all possible knight moves
  addMoves() {
    const row = this.data[0];
    const column = this.data[1];
    const moves = [
      [1, 2],
      [1, -2],
      [-1, 2],
      [-1, -2],
      [2, 1],
      [2, -1],
      [-2, 1],
      [-2, -1],
    ];

    moves.forEach(([i, j]) => {
      if (this.inBounds(row + i) && this.inBounds(column + j)) {
        this.moves.push([row + i, column + j]);
      }
    });
  }
}

class ChessBoard {
  constructor() {
    this.board = this.makeBoard();
  }

  makeBoard() {
    let arr = [];
    for (let i = 0; i <= 7; i++) {
      for (let j = 0; j <= 7; j++) {
        let square = new Node([i, j]);
        arr.push(square);
      }
    }
    return arr;
  }

  find(value) {
    for (let node of this.board) {
      if (JSON.stringify(node.data) === JSON.stringify(value)) {
        return node;
      }
    }
    return "Value not found";
  }
}

const test = new ChessBoard();
console.log(test.board);
const testMoves = test.find([4, 7]);
testMoves.addMoves();
console.log(testMoves.moves);
