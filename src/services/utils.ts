export {
  times,
  memoize
} from 'lodash';

export const browserTick = (callback: FrameRequestCallback) => {
  requestAnimationFrame(callback);
};
