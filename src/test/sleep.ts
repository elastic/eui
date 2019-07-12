// async timeout function for awaiting state or DOM updates
export function sleep(ms: number = 50) {
  return new Promise(resolve => {
    setTimeout(resolve, ms);
  });
}
