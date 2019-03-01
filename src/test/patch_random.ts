const originalMathRandom = Math.random;

export function patchRandom() {
  let x = 0;
  Math.random = () => (x += 0.00001);
}

export function unpatchRandom() {
  Math.random = originalMathRandom;
}
