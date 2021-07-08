/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import { shallow } from 'enzyme';
import { EuiCopy } from './copy';
import { requiredProps } from '../../test';

describe('EuiCopy', () => {
  test('is rendered', () => {
    const component = shallow(
      <EuiCopy textToCopy="some text" {...requiredProps}>
        {(copy) => <button onClick={copy}>Click to copy input text</button>}
      </EuiCopy>
    );
    expect(component).toMatchSnapshot();
  });

  describe('props', () => {
    test('beforeMessage', () => {
      const component = shallow(
        <EuiCopy textToCopy="some text" beforeMessage="copy this">
          {(copy) => <button onClick={copy}>Click to copy input text</button>}
        </EuiCopy>
      );
      expect(component.state('tooltipText')).toBe('copy this');
    });

    test('afterMessage', () => {
      const component = shallow<EuiCopy>(
        <EuiCopy textToCopy="some text" afterMessage="successfuly copied">
          {(copy) => <button onClick={copy}>Click to copy input text</button>}
        </EuiCopy>
      );
      const instance = component.instance();
      expect(instance.props.afterMessage).toBe('successfuly copied');
    });
  });
});
