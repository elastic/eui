import { htmlIdGenerator } from '../../../../src/services';

export const makeId = htmlIdGenerator();

export const makeList = (number, start = 1) => Array.from({ length: number }, (v, k) => k + start).map(el => {
  return {
    content: `Item ${el}`,
    id: makeId()
  };
});
