export default function patchRandom() {
  const _mathRandom = Math.random;
  let x = 0;
  Math.random = () => x += 0.00001;

  // return a function to unpatch
  return () => {
    Math.random = _mathRandom;
  };
}
