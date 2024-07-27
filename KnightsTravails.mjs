#!/usr/bin/env node

class Node {
  constructor(data) {
    this.data = data;
    this.moves = [];
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
}

const test = new ChessBoard();
console.log(test.board);
