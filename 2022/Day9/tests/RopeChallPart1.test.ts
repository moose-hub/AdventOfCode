import { describe, test, expect } from '@jest/globals';
import { simulateMovement } from '../RopeChallPart1';
import { instructions } from '../RopeChallPart1';

describe("Test movement function to return unique positions visited", () => {
    test("Call simulateMovement with test instructions", () => {
        const testInstructions = instructions;
        expect(simulateMovement(testInstructions)).toBe(6256);
    })
}) 