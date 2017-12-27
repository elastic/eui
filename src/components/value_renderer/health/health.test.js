import { shallow } from 'enzyme/build/index';
import { health } from './health';

describe('Value Renderer', () => {
  describe('health', () => {

    const value = 'value';

    test('color missing - error', () => {
      expect(() => health({})).toThrow();
    });

    // color must be a function
    test('non-function color - error', () => {
      expect(health({ color: 'success' })).toThrow();
    });

    test('color', () => {
      const component = shallow(health({
        color: (value) => value === 'value' ? 'danger' : 'success'
      })(value));
      expect(component).toMatchSnapshot();
    });

    test('color and content', () => {
      const component = shallow(health({
        content: (value) => value.toUpperCase(),
        color: (value) => value === 'value' ? 'danger' : 'success'
      })(value));
      expect(component).toMatchSnapshot();
    });

  });
});
