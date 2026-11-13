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
import {
  appendIconComponentCache,
  clearIconComponentCache,
} from '../../icon/icon';
import { icon as logoElasticMono } from '../../icon/assets/logo_elastic_mono';
import { EuiHeader } from '../header';
import { EuiHeaderLogo } from './header_logo';

jest.mock('../../icon', () => jest.requireActual('../../icon'));

describe('EuiHeaderLogo monochrome glyph', () => {
  beforeEach(() => {
    appendIconComponentCache({ logoElasticMono });
  });

  afterEach(() => {
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
