/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import { render } from '../../../test/rtl';
import { EuiThemeProvider } from '../../../services';
import { requiredProps } from '../../../test';
import { shouldRenderCustomStyles } from '../../../test/internal';
import {
  appendIconComponentCache,
  clearIconComponentCache,
} from '../../icon/icon';
import { icon as logoElasticMono } from '../../icon/assets/logo_elastic_mono';
import { EuiHeader } from '../header';
import { EuiHeaderLogo } from './header_logo';

let mockUseActualIcon = false;

jest.mock('../../icon', () => {
  const React = jest.requireActual('react');
  const actualIcon = jest.requireActual('../../icon');
  const testEnvIcon = jest.requireActual('../../icon/icon.testenv');

  return {
    ...actualIcon,
    EuiIcon: (props: any) =>
      React.createElement(
        mockUseActualIcon ? actualIcon.EuiIcon : testEnvIcon.EuiIcon,
        props
      ),
  };
});

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
        // eslint-disable-next-line @elastic/eui/no-css-color -- the snapshot asserts this literal color
        style={{ color: 'red' }}
      />
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  it('renders the glyph logo in monochrome', () => {
    const { container } = render(<EuiHeaderLogo logoMono />);

    expect(container.querySelector('.euiHeaderLogo__icon')).toHaveAttribute(
      'data-euiicon-type',
      'logoElasticMono'
    );
  });

  it('renders the horizontal logo in monochrome', () => {
    const { container } = render(
      <EuiHeaderLogo logoType="horizontal" logoMono />
    );

    expect(container.querySelector('svg path')).toHaveAttribute(
      'fill',
      'currentColor'
    );
  });
});

describe('EuiHeaderLogo monochrome glyph', () => {
  beforeEach(() => {
    mockUseActualIcon = true;
    appendIconComponentCache({ logoElasticMono });
  });

  afterEach(() => {
    mockUseActualIcon = false;
    clearIconComponentCache('logoElasticMono');
  });

  it('uses the foreground color in a dark header in light mode', () => {
    const { getByRole } = render(
      <EuiThemeProvider colorMode="light">
        <EuiHeader theme="dark">
          <EuiHeaderLogo logoMono />
        </EuiHeader>
      </EuiThemeProvider>
    );

    const glyph = getByRole('img', { name: 'Elastic' });
    const path = glyph.querySelector('path');

    expect(path).toHaveAttribute('fill', 'currentColor');
    expect(path).not.toHaveClass('euiIcon__fillNegative');
  });
});
