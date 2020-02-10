export const throttle = (fn: (...args: any[]) => void, wait = 50) => {
  let time = Date.now();
  return (...args: any[]) => {
    if (time + wait - Date.now() < 0) {
      fn(...args);
      time = Date.now();
    }
  };
};
