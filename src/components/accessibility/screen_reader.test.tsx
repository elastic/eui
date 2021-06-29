/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0; you may not use this file except in compliance with the Elastic License
 * 2.0.
 */

import React from 'react';
import { render } from 'enzyme';

import { EuiScreenReaderOnly } from './screen_reader';

describe('EuiScreenReaderOnly', () => {
  describe('adds an accessibility class to a child element', () => {
    test('when used with no props', () => {
      const $paragraph = render(
        <EuiScreenReaderOnly>
          <p>
            This paragraph is not visibile to sighted users but will be read by
            screenreaders.
          </p>
        </EuiScreenReaderOnly>
      );

      expect($paragraph).toMatchSnapshot();
    });
    test('and combines other classNames (foo, bar) given as props on the child', () => {
      const $paragraph = render(
        <EuiScreenReaderOnly>
          <p className="foo bar">
            This paragraph is not visibile to sighted users but will be read by
            screenreaders.
          </p>
        </EuiScreenReaderOnly>
      );

      expect($paragraph).toMatchSnapshot();
    });
  });

  test('will show on focus', () => {
    const component = render(
      <EuiScreenReaderOnly showOnFocus>
        <a href="#">Link</a>
      </EuiScreenReaderOnly>
    );

    expect(component).toMatchSnapshot();
  });
});
