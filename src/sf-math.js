/**
 * Maps a number from one scale to another.
 *
 * @param val
 * @param min1
 * @param max1
 * @param min2
 * @param max2
 * @returns {*}
 *
 * Example:
 * map(3, 0, 4, -1, 1)   // 0.5
 * map(3, 0, 10, 0, 100) // 30
 *
 * Use cases:
 * Very useful to convert values from/to multiple scales.
 */
export function map(val, min1, max1, min2, max2) {
  return lerp(norm(val, min1, max1), min2, max2);
}

/**
 * Linear interpolation.
 *
 * @param ratio
 * @param start
 * @param end
 * @returns {*}
 *
 * Example:
 * lerp(0.5, 0, 10);  // 5
 * lerp(0.75, 0, 10); // 7.5
 *
 * Use case:
 * Linear interpolation is commonly used to create animations of elements moving
 * from one point to another, where you simply update the current ratio
 * (which in this case represents time) and get back the position of the
 * element at that "frame".
 * The core idea of lerp is that you are using a number that goes from 0 to 1
 * to specify a ratio inside that scale. This concept can be applied to
 * convert numbers from different scales easily.
 */
export function lerp(ratio, start, end) {
  return start + (end - start) * ratio;
}

/**
 * Gets normalized ratio of value inside range.
 *
 * @param val int
 * @param min int
 * @param max int
 * @returns {number}
 *
 * Example:
 * norm(50, 0, 100); // 0.5
 * norm(75, 0, 100); // 0.75
 *
 * Use case:
 * Convert values between scales, used by map() internally. Direct opposite of lerp().
 */
export function norm(val, min, max) {
  return (val - min) / (max - min);
}

/**
 * Clamps value inside range.
 *
 * @param val
 * @param min
 * @param max
 * @returns {*}
 *
 * Example:
 * clamp(-5, 0, 10); // 0
 * clamp(7, 1, 10);  // 7
 * clamp(8, 1, 10);  // 8
 * clamp(10, 1, 10); // 10
 * clamp(11, 1, 10); // 10
 *
 * Use cases:
 * Any situation where you need to limit a number inside a range
 */
export function clamp(val, min, max) {
  return val < min ? min : (val > max ? max : val);
}
