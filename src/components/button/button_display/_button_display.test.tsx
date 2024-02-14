/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import { render } from '../../../test/rtl';
import { requiredProps } from '../../../test/required_props';
import { shouldRenderCustomStyles } from '../../../test/internal';

import { EuiButtonDisplay } from './_button_display';

describe('EuiButtonDisplay', () => {
  shouldRenderCustomStyles(<EuiButtonDisplay>Text</EuiButtonDisplay>, {
    childProps: ['contentProps', 'textProps'],
  });

  it('renders', () => {
    const { container } = render(
      <EuiButtonDisplay {...requiredProps}>Content</EuiButtonDisplay>
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  describe('minWidth', () => {
    it('applies a `defaultMinWidth` class and no inline styles by default', () => {
      const { container } = render(<EuiButtonDisplay />);

      expect(container.innerHTML).toContain('defaultMinWidth');
      expect(container.innerHTML).not.toContain('style');
    });

    it('applies an inline style & not the `defaultMinWidth` class if a custom minWidth is passed', () => {
      const { container } = render(<EuiButtonDisplay minWidth={200} />);

      expect(container.innerHTML).not.toContain('defaultMinWidth');
      expect(container.innerHTML).toContain('style="min-inline-size: 200px;"');
    });

    it('does not apply an inline style or `defaultMinWidth` if set to 0 or false', () => {
      const { container } = render(
        <>
          <EuiButtonDisplay minWidth={0} />
          <EuiButtonDisplay minWidth={false} />
        </>
      );

      expect(container.innerHTML).not.toContain('defaultMinWidth');
      expect(container.innerHTML).not.toContain('style');
    });
  });

  describe('element', () => {
    const elements = ['a', 'button', 'span'] as const;

    const getButtonElement = (container: HTMLElement) =>
      container.firstChild!.nodeName.toLowerCase();

    elements.forEach((element) => {
      test(element, () => {
        const { container } = render(
          <EuiButtonDisplay element={element} className="testing">
            Content
          </EuiButtonDisplay>
        );

        expect(getButtonElement(container)).toEqual(element);
      });
    });

    it('always renders a `button` element if disabled', () => {
      const { container } = render(
        <EuiButtonDisplay element="a" isDisabled>
          Content
        </EuiButtonDisplay>
      );

      expect(getButtonElement(container)).toEqual('button');
    });

    it('always renders an `a` element if a href is passed', () => {
      const { container } = render(
        <EuiButtonDisplay element="span" href="#">
          Content
        </EuiButtonDisplay>
      );

      expect(getButtonElement(container)).toEqual('a');
    });
  });

  describe('disabled behavior', () => {
    it('disables hrefs with javascript in them and renders a button instead of a link', () => {
      const { container } = render(
        // eslint-disable-next-line no-script-url
        <EuiButtonDisplay href="javascript:alert(0)" />
      );
      expect(container.querySelector('button[disabled]')).toBeTruthy();
    });

    it('disables buttons that are isLoading', () => {
      const { container } = render(<EuiButtonDisplay isLoading />);
      expect(container.querySelector('button[disabled]')).toBeTruthy();
    });

    it('disables buttons that are isDisabled', () => {
      const { container } = render(<EuiButtonDisplay isDisabled />);
      expect(container.querySelector('button[disabled]')).toBeTruthy();
    });

    it('disables buttons that pass the native disabled attr', () => {
      const { container } = render(<EuiButtonDisplay disabled />);
      expect(container.querySelector('button[disabled]')).toBeTruthy();
    });
  });

  it('only sets [aria-pressed] and [type] on buttons', () => {
    const { container } = render(
      <>
        <EuiButtonDisplay isSelected type="submit" />
        <EuiButtonDisplay href="#" isSelected type="submit" />
      </>
    );
    expect(container.querySelectorAll('[aria-pressed]')).toHaveLength(1);
    expect(container.querySelectorAll('[type="submit"]')).toHaveLength(1);
  });
});
