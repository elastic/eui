/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import { render } from '../../../../test/rtl';
import { RenderI18nTimeOptions } from '../time_options';

import { EuiQuickSelect } from './quick_select';

const noop = () => {};
const defaultProps = {
  applyTime: noop,
  end: 'now',
  start: 'now-15m',
};

describe('EuiQuickSelect', () => {
  test('is rendered', () => {
    const { container } = render(
      <RenderI18nTimeOptions>
        {(timeOptions) => (
          <EuiQuickSelect {...defaultProps} timeOptions={timeOptions} />
        )}
      </RenderI18nTimeOptions>
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  test('prevQuickSelect', () => {
    const { container } = render(
      <RenderI18nTimeOptions>
        {(timeOptions) => (
          <EuiQuickSelect
            {...defaultProps}
            timeOptions={timeOptions}
            prevQuickSelect={{
              timeTense: 'Next',
              timeUnits: 'M',
              timeValue: 32,
            }}
          />
        )}
      </RenderI18nTimeOptions>
    );

    expect(container.firstChild).toMatchSnapshot();
  });
});
