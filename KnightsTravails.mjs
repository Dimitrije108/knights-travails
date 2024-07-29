#!/usr/bin/env node

class Node {
  constructor(data) {
    this.data = data;
    this.moves = this.addMoves();
  }
  // Check for out of bounds move
  inBounds(value) {
    return value < 0 || value > 7 ? false : true;
  }
  // Add all possible knight moves
  addMoves() {
    const arr = [];
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
        arr.push([row + i, column + j]);
      }
    });
    return arr;
  }
}

class ChessBoard {
  constructor() {
    this.board = this.makeBoard();
  }

  makeBoard() {
    const arr = [];
    for (let i = 0; i <= 7; i++) {
      for (let j = 0; j <= 7; j++) {
        const square = new Node([i, j]);
        arr.push(square);
      }
    }
    return arr;
  }
  // Compare two squares/fields
  compareValues(first, second) {
    if (JSON.stringify(first) === JSON.stringify(second)) {
      return true;
    }
    return false;
  }
  // Return node if value is present
  find(value) {
    for (let node of this.board) {
      if (this.compareValues(node.data, value)) {
        return node;
      }
    }
    return false;
  }
}

const chessboard = new ChessBoard();

const knightMoves = (start, end) => {
  const startNode = chessboard.find(start);

  const queue = [startNode];
  const visited = [];

  while (queue.length > 0) {
    const node = queue.shift();
    // Save the node to visited nodes
    visited.push(node);
    // Check if move value is the end value
    if (chessboard.compareValues(node.data, end)) {
      console.log(
        `You made it in ${visited.length - 1} move(s)! Here's your path:`
      );
      visited.forEach((node) => console.log(node.data));
      return;
    }
    // Add possible moves to the queue
    node.moves.forEach((move) => {
      const newNode = chessboard.find(move);
      if (!visited.includes(newNode)) {
        queue.push(newNode);
      }
    });
  }
};

console.log(knightMoves([0, 0], [3, 3]));

// const test = new ChessBoard();
// console.log(test.board);
// const testMoves = test.find([4, 7]);
// testMoves.addMoves();
// console.log(testMoves.moves);
