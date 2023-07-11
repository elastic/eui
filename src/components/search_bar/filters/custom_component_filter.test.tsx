/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { useEffect } from 'react';
import { render } from '../../../test/rtl';
import { requiredProps } from '../../../test';

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

  it('renders the provided component', () => {
    const { container, getByTestSubject } = render(
      <CustomComponentFilter {...props} />
    );
    expect(getByTestSubject('customComponent').textContent).toEqual(
      'Custom component'
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  it('passes down the Query instance and the onChange handler', () => {
    render(<CustomComponentFilter {...props} />);
    expect(props.onChange).toHaveBeenCalledWith(props.query);
  });
});
