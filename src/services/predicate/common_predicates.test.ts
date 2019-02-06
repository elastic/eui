import { always, never, isNil, isUndefined, isNull } from './common_predicates';

describe('common predicates', () => {
  test('always', () => {
    [undefined, null, 'a', 1, true, false, Date.now(), {}, [], /.*/].forEach(
      value => {
        expect(always(value)).toBe(true);
      }
    );
  });

  test('never', () => {
    [undefined, null, 'a', 1, true, false, Date.now(), {}, [], /.*/].forEach(
      value => {
        expect(never(value)).toBe(false);
      }
    );
  });

  test('isUndefined', () => {
    [undefined].forEach(value => {
      expect(isUndefined(value)).toBe(true);
    });
    [null, 'a', 1, true, false, Date.now(), {}, [], /.*/].forEach(value => {
      expect(isUndefined(value)).toBe(false);
    });
  });

  test('isNull', () => {
    [null].forEach(value => {
      expect(isNull(value)).toBe(true);
    });
    [undefined, 'a', 1, true, false, Date.now(), {}, [], /.*/].forEach(
      value => {
        expect(isNull(value)).toBe(false);
      }
    );
  });

  test('isNil', () => {
    [undefined, null].forEach(value => {
      expect(isNil(value)).toBe(true);
    });
    ['a', 1, true, false, Date.now(), {}, [], /.*/].forEach(value => {
      expect(isNil(value)).toBe(false);
    });
  });
});
