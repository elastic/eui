/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import { render } from '../../test/rtl';
import { shouldRenderCustomStyles } from '../../test/internal';
import { requiredProps } from '../../test';

import { EuiTextTruncate } from './text_truncate';

describe('EuiTextTruncate', () => {
  const props = {
    text: 'Hello world',
    width: 50,
  } as const;

  shouldRenderCustomStyles(<EuiTextTruncate {...props} />);

  it('renders', () => {
    const { container } = render(
      <EuiTextTruncate {...props} {...requiredProps} />
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  it('does not render a resize observer if a width is passed', () => {
    const onResize = jest.fn();
    render(<EuiTextTruncate {...props} width={100} onResize={onResize} />);
    expect(onResize).not.toHaveBeenCalled();
  });

  it('renders a resize observer when no width is passed', () => {
    const onResize = jest.fn();
    render(
      <EuiTextTruncate {...props} width={undefined} onResize={onResize} />
    );
    expect(onResize).toHaveBeenCalledWith(0);
  });

  // We can't unit test the actual truncation logic in JSDOM, because
  // JSDOM doesn't have `offsetWidth`. See the Cypress spec tests instead
});
