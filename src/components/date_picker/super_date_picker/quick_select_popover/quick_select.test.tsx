/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import { shallow } from 'enzyme';

import { EuiQuickSelect } from './quick_select';
import { RenderI18nTimeOptions } from '../time_options';

const noop = () => {};
const defaultProps = {
  applyTime: noop,
  end: 'now',
  start: 'now-15m',
};

describe('EuiQuickSelect', () => {
  test('is rendered', () => {
    const component = shallow(
      <RenderI18nTimeOptions>
        {(timeOptions) => (
          <EuiQuickSelect {...defaultProps} timeOptions={timeOptions} />
        )}
      </RenderI18nTimeOptions>
    ).dive();

    expect(component).toMatchSnapshot();
  });

  test('prevQuickSelect', () => {
    const component = shallow(
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
    ).dive();

    expect(component).toMatchSnapshot();
  });
});
