import React from 'react';
import { shallow } from 'enzyme';
import { requiredProps } from '../../../test';
import { Query } from '../../../services/query';
import { IsFilter } from './is_filter';

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
        name: 'Open'
      }
    };

    const component = shallow(
      <IsFilter {...props} />
    );

    expect(component).toMatchSnapshot();

  });

});
