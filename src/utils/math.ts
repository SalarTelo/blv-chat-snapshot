export function Clamp(value: number, min: number, max: number) {
  let minVal;
  let maxVal;
  if (min > max) {
    minVal = max;
    maxVal = min;
  } else {
    minVal = min;
    maxVal = max;
  }

  if (value > maxVal) return maxVal;
  if (value < minVal) return minVal;

  return value;
}
