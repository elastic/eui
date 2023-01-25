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
    childProps: ['textProps'],
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

  describe('link vs button behavior', () => {
    describe('links', () => {
      it('renders valid links as <a> tags', () => {
        const { container } = render(<EuiButtonDisplay href="#" />);
        expect(container.querySelector('a')).toBeTruthy();
        expect(container.querySelector('button')).toBeFalsy();
      });

      it('removes the `type` prop from links', () => {
        const { container } = render(
          <EuiButtonDisplay href="#" type="button" />
        );
        expect(container.querySelector('a')?.getAttribute('type')).toBeNull();
      });

      it('inserts `rel=noreferrer`', () => {
        const { queryByTestSubject } = render(
          <>
            <EuiButtonDisplay
              href="https://elastic.co"
              data-test-subj="rel"
              rel="noreferrer"
            />
            <EuiButtonDisplay
              href="https://elastic.co"
              data-test-subj="norel"
            />
          </>
        );

        expect(queryByTestSubject('rel')?.getAttribute('rel')).toEqual(
          'noreferrer'
        );
        expect(queryByTestSubject('norel')?.getAttribute('rel')).toEqual(
          'noreferrer'
        );
      });

      it('inserts `rel=noopener` for all target=_blank links', () => {
        const { queryByTestSubject } = render(
          <>
            <EuiButtonDisplay
              href="https://elastic.co"
              target="_blank"
              data-test-subj="blank"
            />
          </>
        );

        expect(queryByTestSubject('blank')?.getAttribute('rel')).toEqual(
          'noopener noreferrer'
        );
      });
    });

    describe('buttons', () => {
      it('removes the `href`, `rel` and `target` props from buttons', () => {
        const { container } = render(
          <EuiButtonDisplay
            isDisabled
            href="#"
            rel="noopener"
            target="_blank"
          />
        );
        expect(container.querySelector('a')).toBeFalsy();
        const button = container.querySelector('button')!;

        expect(button).toBeTruthy();
        expect(button.getAttribute('href')).toBeNull();
        expect(button.getAttribute('rel')).toBeNull();
        expect(button.getAttribute('target')).toBeNull();
      });

      it('only sets [disabled] and [aria-pressed] on buttons', () => {
        const { container } = render(
          <>
            <EuiButtonDisplay isDisabled isSelected />
            <EuiButtonDisplay href="#" isSelected />
          </>
        );
        expect(container.querySelectorAll('[disabled]')).toHaveLength(1);
        expect(container.querySelectorAll('[aria-pressed]')).toHaveLength(1);
      });
    });
  });
});
