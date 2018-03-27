import React from 'react';
import { requiredProps } from '../../test';
import { shallow } from 'enzyme';
import { EuiSearchBox } from './search_box';

describe('EuiSearchBox', () => {
  test('render - no config', () => {
    const props = {
      ...requiredProps,
      query: '',
      onSearch: () => {},
    };

    const component = shallow(<EuiSearchBox {...props} />);

    expect(component).toMatchSnapshot();
  });

  test('render - custom placeholder and incremental', () => {
    const props = {
      ...requiredProps,
      query: '',
      onSearch: () => {},
      placeholder: '...',
      incremental: true,
    };

    const component = shallow(<EuiSearchBox {...props} />);

    expect(component).toMatchSnapshot();
  });
});
