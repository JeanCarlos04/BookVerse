import { describe, it, expect } from "vitest";

const findMax = (arr: number[]) => {
  let max = arr[0];

  for (const nums of arr) {
    if (nums > max) {
      max = nums;
    }
  }

  return max;
};

describe("findMax", () => {
  it("should apper the max number of the array", () => {
    expect(findMax([2, 4, 62, 1, 4, 535, 24])).toBe(535);
  });
});
