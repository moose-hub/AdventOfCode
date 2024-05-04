import { movements } from "./data.js";
// Rope is longer, not 2 knots (Head & Tail)
// but now ten knots (Head, 1, 2, 3, 4, 5, 6, 7, 8, 9)

interface Directions {
  direction: string;
  steps: number;
}

interface Knot {
  x: number;
  y: number;
}

function parsePuzzleInput(input: String): Directions[] {
  return input.split("\n").map((line) => {
    const instructions = line.trim().split(" ");
    return { direction: instructions[0], steps: parseInt(instructions[1], 10) };
  });
}

export const directions = parsePuzzleInput(movements);

function move(direction: string, knot: Knot) {
  switch (direction) {
    case "U":
      knot.y += 1;
      break;
    case "D":
      knot.y -= 1;
      break;
    case "R":
      knot.x += 1;
      break;
    case "L":
      knot.x -= 1;
      break;
  }
}

export function simulateMovement(movements: Directions[]): Number {
  let knots: Knot[] = Array(10)
    .fill(null)
    .map(() => ({ x: 0, y: 0 }));
  // add initial starting point
  let visited = new Set<string>([`${knots[9].x},${knots[9].y}`]);

  // loop over each movement
  // for each step in the movement, move each knot
  // call move function on each index of the knot array
  movements.forEach((movement) => {
    for (let step = 0; step < movement.steps; step++) {
      // move the head first
      move(movement.direction, knots[0]);

      for (let i = 1; i < knots.length; i++) {
        const prevKnot = knots[i - 1];
        const currentKnot = knots[i];

        while (
          Math.abs(prevKnot.x - currentKnot.x) > 1 ||
          Math.abs(prevKnot.y - currentKnot.y) > 1
        ) {
          if(Math.abs(prevKnot.x - currentKnot.x) > 1) {
            if(prevKnot.y !== currentKnot.y) {
              move(prevKnot.y > currentKnot.y ? "U" : "D", currentKnot);
            }
            move(prevKnot.x > currentKnot.x ? "R" : "L", currentKnot);
          }
          if(Math.abs(prevKnot.y - currentKnot.y) > 1) {
            if (prevKnot.x !== currentKnot.x) {
              move(prevKnot.x > currentKnot.x ? "R" : "L", currentKnot);
            }
            move(prevKnot.y > currentKnot.y ? "U" : "D", currentKnot);
          }
          
        }
      }
      visited.add(`${knots[9].x}, ${knots[9].y}`);
    }
  });

  return visited.size;
}

export const testInstructions = `
R 5
U 8
L 8
D 3
R 17
D 10
L 25
U 20`;

const parsedTestInstructions = parsePuzzleInput(testInstructions);
console.log(simulateMovement(parsedTestInstructions));

console.log(simulateMovement(directions));
