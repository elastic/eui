/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import { render } from 'enzyme';
import { requiredProps } from '../../../test/required_props';

import { EuiSplitPanel } from './split_panel';

describe('EuiSplitPanel', () => {
  test('is rendered', () => {
    const component = render(<EuiSplitPanel.Outer {...requiredProps} />);

    expect(component).toMatchSnapshot();
  });

  describe('inner children', () => {
    test('are rendered', () => {
      const component = render(
        <EuiSplitPanel.Outer>
          <EuiSplitPanel.Inner />
        </EuiSplitPanel.Outer>
      );

      expect(component).toMatchSnapshot();
    });
  });

  test('accepts panel props', () => {
    const component = render(
      <EuiSplitPanel.Outer color="primary">
        <EuiSplitPanel.Inner color="success" {...requiredProps} />
      </EuiSplitPanel.Outer>
    );

    expect(component).toMatchSnapshot();
  });

  test('renders as row', () => {
    const component = render(<EuiSplitPanel.Outer direction="row" />);

    expect(component).toMatchSnapshot();
  });

  describe('responsive', () => {
    // @ts-ignore innerWidth might be read only but we can still override it for the sake of testing
    beforeAll(() => (window.innerWidth = 520));
    afterAll(() => 1024); // reset to jsdom's default

    test('is rendered at small screens', () => {
      const component = render(<EuiSplitPanel.Outer />);

      expect(component).toMatchSnapshot();
    });

    test('can be false', () => {
      const component = render(<EuiSplitPanel.Outer responsive={false} />);

      expect(component).toMatchSnapshot();
    });
  });

  describe('responsive', () => {
    // @ts-ignore innerWidth might be read only but we can still override it for the sake of testing
    beforeAll(() => (window.innerWidth = 1000));
    afterAll(() => 1024); // reset to jsdom's default

    test('can be changed to different breakpoints', () => {
      const component = render(<EuiSplitPanel.Outer responsive={['m', 'l']} />);

      expect(component).toMatchSnapshot();
    });
  });
});
