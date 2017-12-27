import { shallow } from 'enzyme/build/index';
import { link } from './link';

describe('Value Renderer', () => {
  describe('link', () => {

    const value = 'value';

    test('onClick missing - error', () => {
      expect(() => link({})).toThrow();
    });

    test('simple onClick', () => {
      const component = shallow(link({
        onClick: () => undefined
      })(value));
      expect(component).toMatchSnapshot();
    });

    test('with content and color', () => {
      const component = shallow(link({
        color: 'warning',
        content: (value) => value.toUpperCase(),
        onClick: () => undefined
      })(value));
      expect(component).toMatchSnapshot();
    });

  });
});
