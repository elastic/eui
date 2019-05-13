import React from 'react';
import { requiredProps } from '../../../test';
import { shallow } from 'enzyme';
import { IsFilter } from './is_filter';
import { Query } from '../query';

describe('IsFilter', () => {
  test('render', () => {
    const props = {
      ...requiredProps,
      index: 0,
      onChange: () => {},
      query: Query.parse(''),
      config: {
        type: 'is',
        field: 'open',
        name: 'Open',
      },
    };

    const component = shallow(<IsFilter {...props} />);

    expect(component).toMatchSnapshot();
  });
});
