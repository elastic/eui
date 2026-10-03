/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import { render } from '../../../test/rtl';
import { requiredProps } from '../../../test';
import { shouldRenderCustomStyles } from '../../../test/internal';

import { EuiHeaderLogo } from './header_logo';

describe('EuiHeaderLogo', () => {
  shouldRenderCustomStyles(<EuiHeaderLogo />);

  it('renders', () => {
    const { container } = render(<EuiHeaderLogo {...requiredProps} />);

    expect(container.firstChild).toMatchSnapshot();
  });

  it('renders href', () => {
    const { container } = render(<EuiHeaderLogo href="#" />);

    expect(container.firstChild).toMatchSnapshot();
  });

  it('renders href with rel', () => {
    const { container } = render(<EuiHeaderLogo href="#" rel="noreferrer" />);

    expect(container.firstChild).toMatchSnapshot();
  });

  it('ignores runtime iconType props and always renders the Elastic glyph icon', () => {
    const { container } = render(
      <EuiHeaderLogo {...({ iconType: 'logoKibana' } as unknown as {})} />
    );

    expect(container.querySelector('.euiHeaderLogo__icon')).toHaveAttribute(
      'data-euiicon-type',
      'logoElastic'
    );
    expect(container.querySelector('.euiHeaderLogo')).not.toHaveAttribute(
      'iconType'
    );
  });

  it('renders optional props', () => {
    const { container } = render(
      <EuiHeaderLogo
        logoType="horizontal"
        iconTitle="Moby Dick"
        style={{ color: 'red' }}
      />
    );

    expect(container.firstChild).toMatchSnapshot();
  });
});
