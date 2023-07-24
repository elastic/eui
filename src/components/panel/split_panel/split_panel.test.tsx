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

import { EuiSplitPanel } from './split_panel';

describe('EuiSplitPanel', () => {
  test('is rendered', () => {
    const { container } = render(<EuiSplitPanel.Outer {...requiredProps} />);

    expect(container.firstChild).toMatchSnapshot();
  });

  describe('inner children', () => {
    test('are rendered', () => {
      const { container } = render(
        <EuiSplitPanel.Outer>
          <EuiSplitPanel.Inner />
        </EuiSplitPanel.Outer>
      );

      expect(container.firstChild).toMatchSnapshot();
    });
  });

  test('accepts panel props', () => {
    const { container } = render(
      <EuiSplitPanel.Outer color="primary">
        <EuiSplitPanel.Inner color="success" {...requiredProps} />
      </EuiSplitPanel.Outer>
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  test('renders as row', () => {
    const { container } = render(<EuiSplitPanel.Outer direction="row" />);

    expect(container.firstChild).toMatchSnapshot();
  });

  describe('responsive', () => {
    // @ts-ignore innerWidth might be read only but we can still override it for the sake of testing
    beforeAll(() => (window.innerWidth = 520));
    afterAll(() => 1024); // reset to jsdom's default

    test('is rendered at small screens', () => {
      const { container } = render(<EuiSplitPanel.Outer />);

      expect(container.firstChild).toMatchSnapshot();
    });

    test('can be false', () => {
      const { container } = render(<EuiSplitPanel.Outer responsive={false} />);

      expect(container.firstChild).toMatchSnapshot();
    });
  });

  describe('responsive', () => {
    // @ts-ignore innerWidth might be read only but we can still override it for the sake of testing
    beforeAll(() => (window.innerWidth = 1000));
    afterAll(() => 1024); // reset to jsdom's default

    test('can be changed to different breakpoints', () => {
      const { container } = render(
        <EuiSplitPanel.Outer responsive={['m', 'l']} />
      );

      expect(container.firstChild).toMatchSnapshot();
    });
  });
});
