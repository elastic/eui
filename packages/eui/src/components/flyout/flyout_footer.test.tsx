/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import { requiredProps } from '../../test/required_props';
import { render } from '../../test/rtl';

import { EuiFlyoutFooter } from './flyout_footer';

describe('EuiFlyoutFooter', () => {
  test('forwards its ref to the footer element', () => {
    const ref = React.createRef<HTMLDivElement>();
    const { unmount } = render(<EuiFlyoutFooter ref={ref} />);

    expect(ref.current).toHaveClass('euiFlyoutFooter');
    unmount();
    expect(ref.current).toBeNull();
  });

  test('is rendered', () => {
    const { container } = render(<EuiFlyoutFooter {...requiredProps} />);

    expect(container.firstChild).toMatchSnapshot();
  });
});
