/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import { render, shallow } from 'enzyme';
import { requiredProps } from '../../../test/required_props';

import { EuiSelectableSearch } from './selectable_search';

describe('EuiSelectableSearch', () => {
  const onChange = jest.fn();
  const baseProps = {
    ...requiredProps,
    onChange,
    options: [{ label: 'hello' }, { label: 'world' }],
    value: '',
    isPreFiltered: false,
  };

  beforeEach(() => jest.clearAllMocks());

  test('is rendered', () => {
    const component = render(<EuiSelectableSearch {...baseProps} />);
    expect(component).toMatchSnapshot();
  });

  it('renders aria props if a listId is present', () => {
    const component = render(
      <EuiSelectableSearch {...baseProps} listId="list" />
    );
    expect(component).toMatchSnapshot();
  });

  it('renders placeholder, value, name, and other remaining EuiFieldSearch props', () => {
    const component = render(
      <EuiSelectableSearch
        {...baseProps}
        placeholder="start typing"
        value="typed"
        name="testName"
        id="testId"
        className="testClass"
      />
    );
    expect(component).toMatchSnapshot();
  });

  it("calls the onChange callback when the EuiFieldSearch's change event fires", () => {
    const component = shallow(<EuiSelectableSearch {...baseProps} />);
    component
      .find('EuiFieldSearch')
      .simulate('change', { target: { value: 'h' } });
    expect(onChange).toHaveBeenCalledWith('h', [{ label: 'hello' }]);
  });
});
