import React from 'react';
import { shallow } from 'enzyme';

import { EuiQuickSelect } from './quick_select';

const noop = () => {};
const defaultProps = {
  applyTime: noop,
  start: 'now-15m',
  end: 'now',
};
describe('EuiQuickSelect', () => {
  test('is rendered', () => {
    const component = shallow(<EuiQuickSelect {...defaultProps} />);

    expect(component).toMatchSnapshot();
  });

  test('prevQuickSelect', () => {
    const component = shallow(
      <EuiQuickSelect
        {...defaultProps}
        prevQuickSelect={{
          timeTense: 'Next',
          timeValue: 32,
          timeUnits: 'M',
        }}
      />
    );

    expect(component).toMatchSnapshot();
  });
});
