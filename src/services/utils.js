export {
  times
} from 'lodash';

export const browserTick = (callback) => {
  setTimeout(callback, 0);
};
