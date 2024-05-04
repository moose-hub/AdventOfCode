import { describe, test, expect } from '@jest/globals';
import { simulateMovement } from '../RopeChallPart2';
import { directions } from '../RopeChallPart2';

describe("Test movement function to return unique positions visited", () => {
    test("Call simulateMovement with test instructions", () => {
        const testInstructions = directions;
        expect(simulateMovement(testInstructions)).toBe(6256);
    })
})