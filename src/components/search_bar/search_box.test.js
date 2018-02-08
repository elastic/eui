import React from 'react';
import { requiredProps } from '../../test';
import { shallow } from 'enzyme/build/index';
import { EuiSearchBox } from './search_box';
import { Query } from './query';

describe('EuiSearchBox', () => {

  test('render - no config', () => {

    const props = {
      ...requiredProps,
      query: Query.parse(''),
      onChange: () => {},
    };

    const component = shallow(
      <EuiSearchBox {...props} />
    );

    expect(component).toMatchSnapshot();

  });

  test('render - custom placeholder and incremental', () => {

    const props = {
      ...requiredProps,
      query: Query.parse(''),
      onChange: () => {},
      placeholder: '...',
      incremental: true
    };

    const component = shallow(
      <EuiSearchBox {...props} />
    );

    expect(component).toMatchSnapshot();

  });

});
