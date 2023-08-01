/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import { fireEvent } from '@testing-library/react';
import { render } from '../../../test/rtl';
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
    const { container } = render(<EuiSelectableSearch {...baseProps} />);
    expect(container.firstChild).toMatchSnapshot();
  });

  it('renders aria props if a listId is present', () => {
    const { container } = render(
      <EuiSelectableSearch {...baseProps} listId="list" />
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  it('renders placeholder, value, name, and other remaining EuiFieldSearch props', () => {
    const { container } = render(
      <EuiSelectableSearch
        {...baseProps}
        placeholder="start typing"
        value="typed"
        name="testName"
        id="testId"
        className="testClass"
      />
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  it("calls the onChange callback when the EuiFieldSearch's change event fires", () => {
    const { container } = render(<EuiSelectableSearch {...baseProps} />);

    fireEvent.change(container.querySelector('input')!, {
      target: { value: 'h' },
    });
    expect(onChange).toHaveBeenCalledWith('h', [{ label: 'hello' }]);
  });
});
