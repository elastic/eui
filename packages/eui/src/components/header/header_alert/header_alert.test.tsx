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

import { EuiBadge } from '../../badge';

import { EuiHeaderAlert } from './header_alert';

describe('EuiHeaderAlert', () => {
  shouldRenderCustomStyles(<EuiHeaderAlert title="title" date="date" />);

  it('renders title and date', () => {
    const { container } = render(
      <EuiHeaderAlert {...requiredProps} title="title" date="date" />
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  it('renders action', () => {
    const action = <button>Quietly take to the ship</button>;
    const { container } = render(
      <EuiHeaderAlert
        {...requiredProps}
        title="title"
        date="date"
        action={action}
      />
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  it('renders text', () => {
    const text = <p>Circumambulate the city</p>;
    const { container } = render(
      <EuiHeaderAlert
        {...requiredProps}
        title="title"
        date="date"
        text={text}
      />
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  it('renders badge', () => {
    const badge = <EuiBadge>badge</EuiBadge>;
    const { container } = render(
      <EuiHeaderAlert
        {...requiredProps}
        title="title"
        date="date"
        badge={badge}
      />
    );

    expect(container.firstChild).toMatchSnapshot();
  });
});
