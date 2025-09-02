/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import { render } from '../../test/rtl';
import { requiredProps } from '../../test';
import { testOnReactVersion } from '../../test/internal';
import { EuiThemeProvider } from '../../services';

import { EuiOverlayMask } from './overlay_mask';

describe('EuiOverlayMask', () => {
  it('renders', () => {
    const { baseElement } = render(
      <EuiOverlayMask {...requiredProps}>Content</EuiOverlayMask>
    );

    expect(baseElement).toMatchSnapshot();
  });

  it('does not override classes set by EuiPortal', () => {
    const { baseElement } = render(
      <EuiThemeProvider colorMode="inverse">
        <EuiOverlayMask>Content</EuiOverlayMask>
      </EuiThemeProvider>
    );

    expect(baseElement.querySelector('.euiOverlayMask')!.className).toContain(
      'euiColorMode-inverse'
    );
  });

  it('correctly removes stale classNames on prop update', () => {
    const { baseElement, rerender } = render(
      <EuiOverlayMask headerZindexLocation="above" className="hello">
        Content
      </EuiOverlayMask>
    );
    const getClassName = () =>
      baseElement.querySelector('.euiOverlayMask')!.className;

    expect(getClassName()).toMatchInlineSnapshot(
      `"euiOverlayMask css-rfqaz-euiOverlayMask-aboveHeader hello"`
    );

    rerender(
      <EuiOverlayMask headerZindexLocation="below" className="world">
        Content
      </EuiOverlayMask>
    );
    expect(getClassName()).toMatchInlineSnapshot(
      `"euiOverlayMask css-1qgdr70-euiOverlayMask-belowHeader world"`
    );
  });

  describe('props', () => {
    test('headerZindexLocation', () => {
      const { baseElement } = render(
        <EuiOverlayMask headerZindexLocation="below">Content</EuiOverlayMask>
      );

      expect(baseElement).toMatchSnapshot();
    });

    test('maskRef', () => {
      const maskRef = jest.fn();

      const { unmount } = render(
        <EuiOverlayMask maskRef={maskRef}>Content</EuiOverlayMask>
      );

      expect(maskRef).toHaveBeenCalledTimes(1);
      expect(maskRef.mock.calls[0][0]).toBeInstanceOf(HTMLDivElement);

      unmount();

      expect(maskRef).toHaveBeenCalledTimes(2);
      expect(maskRef.mock.calls[1][0]).toBeNull();
    });
  });

  // React 18 is really unhappy when RTL wants to unmount
  // it while the component is still updating.
  // TODO: https://github.com/elastic/eui/issues/6998
  // Note - this needs to be the last test in the suite, otherwise subsequent overlay masks stop working
  testOnReactVersion('17')(
    'throws if a non-string property value is passed',
    () => {
      // @ts-expect-error expected error
      expect(() => render(<EuiOverlayMask aria-hidden={true} />)).toThrow(
        'EuiOverlayMask property aria-hidden is not a string'
      );
    }
  );
});
