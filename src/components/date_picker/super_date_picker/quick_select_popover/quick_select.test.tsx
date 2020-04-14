import React from 'react';
import { shallow } from 'enzyme';

import { EuiQuickSelect } from './quick_select';

const noop = () => {};
const defaultProps = {
  applyTime: noop,
  end: 'now',
  start: 'now-15m',
};

// Mock the htmlIdGenerator to generate predictable ids for snapshot tests
jest.mock('../../../../services/accessibility/html_id_generator', () => ({
  htmlIdGenerator: () => () => 'htmlId',
}));

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
          timeUnits: 'M',
          timeValue: 32,
        }}
      />
    );

    expect(component).toMatchSnapshot();
  });
});
