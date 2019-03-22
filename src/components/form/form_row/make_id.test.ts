import makeId from './make_id';

describe('makeId', () => {
  let ids: Map<string, boolean>;
  beforeEach(() => {
    ids = new Map<string, boolean>();
  });

  test('returns a string of length 8', () => {
    expect(makeId()).toHaveLength(8);
  });

  // Could be slow so adding a [SLOW] tag for use with --testNamePattern=<regex>
  test('returns a random string - [SLOW]', () => {
    for (let i = 0; i < 60000; i += 1) {
      const id: string = makeId();
      expect(ids.has(id)).toBeFalsy();
      ids.set(id, true);
    }
  });
});
