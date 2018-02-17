export {
  times,
  memoize
} from 'lodash';

export const browserTick = (callback) => {
  requestAnimationFrame(callback);
};
