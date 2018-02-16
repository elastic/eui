export {
  times
} from 'lodash';

export const browserTick = (callback) => {
  requestAnimationFrame(callback);
};
