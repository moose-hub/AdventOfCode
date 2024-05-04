import { movements } from "./data";

interface Movements {
  direction: string;
  steps: number;
}

// Parse large puzzle input into usable input
// Split each line into an array of objects {direction, steps}
// map to create new array?
function parsePuzzleInput(input : String): Movements[] {
  return input.split("\n").map((line) => {
    const instructions = line.trim().split(" ");
    return { direction: instructions[0], steps: parseInt(instructions[1], 10) };
  });
}

export const instructions = parsePuzzleInput(movements);

// establish starting coordinates of head and tail
// define what happens to coordinates based on directions
// tail will follow head and remain adjacent, so tail visisted = +1 on head movement

export function simulateMovement(movements : Movements[]) {
  let head = { x: 0, y: 0 };
  let tail = { x: 0, y: 0 };
  let visited = new Set();
  visited.add(`${tail.x},${tail.y}`);

  interface Directions {
    [key: string]: { x: number; y: number };
  }

  const directions: Directions = {
    U: { x: 0, y: 1 },
    D: { x: 0, y: -1 },
    L: { x: -1, y: 0 },
    R: { x: 1, y: 0 },
  };
  // Loop through each object in the "movements" array.
  // Loop again based on number of steps in the movement item
  // Add value to the head/tail coordinates with each movement
  // --- head x += the value of whatever movement direction
  // Add value to visited count if tail moves. If we use Set, it can only contain unique values

//   console.log(`Initial State:, ${JSON.stringify({ head, tail })}`);

  movements.forEach((movement, index) => {
    // console.log(`processing movement ${index + 1}:`);
    for (let i = 0; i < movement.steps; i++) {
      // head.x (currently x: 0)
      // += directions[movement.direction].x (+= directions["U"].x)
      head.x += directions[movement.direction].x;
      head.y += directions[movement.direction].y;

    //   console.log(`Moved head to:`, JSON.stringify({ head }));
      // Loop again to check if the tail needs to move. Maybe it remains diagonally adjacent
      // --- example: head x and y must not be > 1 away from tail x and y
      // --- if they are, check which one and move tail by that amount
      // (head.x - tail.x) > 1 = tail.x += 1
      // (head.y - tail.y) > 1 = tail.x += 1 && tail.y += 1

      // Horizontal tail movement
      // Math.abs to get the distance of head -> tail

      // Math.sign to move incrementally by 1 or -1 for each direction
      // Diag tail movement
      while (Math.abs(head.x - tail.x) > 1 || Math.abs(head.y - tail.y) > 1) {
        if (Math.abs(head.x - tail.x) > 1) {
            if (head.y != tail.y) {
                tail.y += Math.sign(head.y - tail.y);
            }
            tail.x += Math.sign(head.x - tail.x);
        }
        if (Math.abs(head.y - tail.y) > 1) {
            if (head.x != tail.x) {
                tail.x += Math.sign(head.x - tail.x);
            }
            tail.y += Math.sign(head.y - tail.y);
        }
        // console.log(`Moved tail to:`, {x: tail.x, y: tail.y});
      }

      const key = `${tail.x},${tail.y}`;
      visited.add(key);
    //   console.log(`Visited coordinates: ${key}`);
    //   console.log(`UP's: ${visited.size}`)
    }
  });

//   console.log(`Final State:`, JSON.stringify({ head, tail }));
//   console.log(`Total unique positions visited: ${visited.size}`);
  return visited.size;
}

// const testInstructions = [
//   { direction: "L", steps: 2 },
//   { direction: "U", steps: 2 },
//   { direction: "R", steps: 2 },
//   { direction: "L", steps: 1 },
//   { direction: "R", steps: 1 },
// ];
// console.log(`test run: ${simulateMovement(testInstructions)}`);

  const tailVisited = simulateMovement(instructions);

  console.log(`The number of unique positions the tail visited is: ${tailVisited}`)