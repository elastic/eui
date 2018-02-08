import React from 'react';
import { requiredProps } from '../../../test';
import { shallow } from 'enzyme/build/index';
import { SearchBox } from './search_box';
import { Query } from './query';

describe('SearchBox', () => {

  test('render - no config', () => {

    const props = {
      ...requiredProps,
      config: {},
      query: Query.parse(''),
      onChange: () => {},
    };

    const component = shallow(
      <SearchBox {...props} />
    );

    expect(component).toMatchSnapshot();

  });

  test('render - custom placeholder and incremental', () => {

    const props = {
      ...requiredProps,
      config: {
        placeholder: '...',
        incremental: true
      },
      query: Query.parse(''),
      onChange: () => {},
    };

    const component = shallow(
      <SearchBox {...props} />
    );

    expect(component).toMatchSnapshot();

  });

});
