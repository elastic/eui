import _times from 'lodash/times';
import _memoize from 'lodash/memoize';

// wrap the lodash functions to avoid having lodash's TS type definition from being
// exported, which can conflict with the lodash namespace if other versions are used

/* eslint-disable import/export */
export function times<T>(count: number): number[];
export function times<T>(count: number, iteratee: (index: number) => T): T[];
export function times<T>(count: number, iteratee?: (index: number) => T) {
  if (iteratee === undefined) {
    return _times(count);
  }
  return _times(count, iteratee);
}
/* eslint-enable import/export */

// eslint-disable-next-line space-before-function-paren
export function memoize<T extends (...args: any[]) => any>(
  func: T,
  resolver?: (...args: any[]) => any
): (...args: Parameters<T>) => ReturnType<T> {
  return _memoize(func, resolver);
}

export const browserTick = (callback: FrameRequestCallback) => {
  requestAnimationFrame(callback);
};
