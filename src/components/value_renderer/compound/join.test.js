import { join } from './join';

describe('Value Renderer', () => {
  describe('join', () => {

    const array = [ 'a', 'b', 'c' ];
    const render = (value) => value;

    test('with default delimiter', () => {
      expect(join(render)(array)).toBe('a, b, c');
    });

    test('with custom delimiter', () => {
      expect(join(render, ' | ')(array)).toBe('a | b | c');
    });

  });
});
