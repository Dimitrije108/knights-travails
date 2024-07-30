#!/usr/bin/env node
import KnightsTravails from "./KnightsTravails.mjs";

const knightsTravails = new KnightsTravails();
console.log(knightsTravails.knightMoves([1, 3], [5, 0]));
