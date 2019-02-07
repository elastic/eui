import times from 'lodash/times';
import memoize from 'lodash/memoize';

export { times, memoize };

export const browserTick = (callback: FrameRequestCallback) => {
  requestAnimationFrame(callback);
};
