/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import { requiredProps } from '../../../test/required_props';
import { render } from '../../../test/rtl';
import { shouldRenderCustomStyles } from '../../../test/internal';

import { EuiHeaderSectionItem } from './header_section_item';

describe('EuiHeaderSectionItem', () => {
  shouldRenderCustomStyles(<EuiHeaderSectionItem>test</EuiHeaderSectionItem>);

  it('renders nothing if no children are present', () => {
    const { container } = render(<EuiHeaderSectionItem {...requiredProps} />);

    expect(container).toBeEmptyDOMElement();
  });

  it('renders with children', () => {
    const { container } = render(
      <EuiHeaderSectionItem {...requiredProps}>
        <span>Call me Ishmael.</span>
      </EuiHeaderSectionItem>
    );

    expect(container.firstChild).toMatchSnapshot();
  });
});
