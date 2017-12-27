import { booleanIcon } from './boolean_icon';
import { shallow } from 'enzyme/build/index';

describe('Value Renderer', () => {
  describe('booleanIcon', () => {

    test('no config - true', () => {
      const component = shallow(booleanIcon(true));
      expect(component).toMatchSnapshot();
    });

    test('no config - false', () => {
      const component = shallow(booleanIcon(false));
      expect(component).toMatchSnapshot();
    });

    test('with config - true : faceHappy : success', () => {
      const component = shallow(booleanIcon.with({ yes: 'faceHappy', color: 'success' })(true));
      expect(component).toMatchSnapshot();
    });

    test('with config - false : faceSad : danger', () => {
      const component = shallow(booleanIcon.with({ no: 'faceSad', color: 'danger' })(false));
      expect(component).toMatchSnapshot();
    });

  });
});
