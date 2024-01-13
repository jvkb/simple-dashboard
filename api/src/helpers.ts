/**
 * Helper function to generate a randomized number in a range
 * @param {number} min
 * @param {number} max
 * @returns {number}
 */
export function getRandomNumber(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
