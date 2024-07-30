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
// Inside the visited array find the first visited move that
// connects to/is a move of the previous move and return it
const findPrevMove = (node, arr) => {
  for (const visited of arr) {
    for (const move of node.moves) {
      if (chessboard.compareValues(visited.data, move)) {
        return visited;
      }
    }
  }
};
// Checks the visited array so queue doesn't have duplicates
const checkVisited = (node, arr) => {
  for (const visited of arr) {
    if (chessboard.compareValues(node.data, visited.data)) {
      return false;
    }
  }
  return true;
};
// Start from the back/end of the visited array
// and reconstruct the shortest possible path
const getShortestPath = (arr) => {
  const start = arr.pop();
  const shortestPath = [start.data];
  const queue = [start];

  while (queue.length > 0) {
    const node = queue.shift();

    if (chessboard.compareValues(arr[0].data, node.data)) {
      return shortestPath.reverse();
    }

    const prevMove = findPrevMove(node, arr);
    shortestPath.push(prevMove.data);
    queue.push(prevMove);
  }
  return shortestPath;
};

const knightMoves = (start, end) => {
  const startNode = chessboard.find(start);

  const queue = [startNode];
  const visited = [startNode];

  while (queue.length > 0) {
    const node = queue.shift();
    // Check if the move value equals end value
    if (chessboard.compareValues(node.data, end)) {
      visited.forEach((move) => console.log(move.data));
      const result = getShortestPath(visited);
      console.log(
        `You made it in ${result.length - 1} move(s)! Here's your path:`
      );
      result.forEach((move) => console.log(move));
      return;
    }
    // Add possible moves to the queue
    node.moves.forEach((move) => {
      const newNode = chessboard.find(move);
      if (checkVisited(newNode, visited)) {
        // Save to visited nodes so they don't get added to the queue again
        queue.push(newNode);
        visited.push(newNode);
      }
    });
  }
};

console.log(knightMoves([0, 0], [7, 7]));
