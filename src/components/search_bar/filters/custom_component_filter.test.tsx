/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { useEffect } from 'react';
import { requiredProps } from '../../../test';
import { mount } from 'enzyme';
import { Query } from '../query';
import {
  CustomComponentFilter,
  CustomComponentFilterProps,
  CustomComponentProps,
} from './custom_component_filter';

const CustomComponent: React.FC<CustomComponentProps> = ({
  query,
  onChange,
}) => {
  useEffect(() => {
    onChange?.(query);
  }, [onChange, query]);

  return <div data-test-subj="customComponent">Custom component</div>;
};

describe('CustomComponentFilter', () => {
  const props: CustomComponentFilterProps = {
    ...requiredProps,
    index: 0,
    query: Query.parse(''),
    onChange: jest.fn(),
    config: {
      type: 'custom_component',
      component: CustomComponent,
    },
  };

  test('render', () => {
    const component = mount(<CustomComponentFilter {...props} />);
    expect(component).toMatchSnapshot();
  });

  test('render the provided component', () => {
    const component = mount(<CustomComponentFilter {...props} />);

    expect(component.find('[data-test-subj="customComponent"]').text()).toEqual(
      'Custom component'
    );
  });

  test('passes down the Query instance and the onChange handler', () => {
    mount(<CustomComponentFilter {...props} />);
    expect(props.onChange).toHaveBeenCalled();
    expect(props.onChange).toHaveBeenCalledWith(props.query);
  });
});
