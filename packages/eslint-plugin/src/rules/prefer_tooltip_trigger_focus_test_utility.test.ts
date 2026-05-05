/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import dedent from 'dedent';
import { RuleTester } from '@typescript-eslint/rule-tester';

import { PreferTooltipTriggerFocusTestUtility } from './prefer_tooltip_trigger_focus_test_utility';

const languageOptions = {
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
  },
};

const ruleTester = new RuleTester();

ruleTester.run(
  'prefer-tooltip-trigger-focus-test-utility',
  PreferTooltipTriggerFocusTestUtility,
  {
    valid: [
      {
        // No tooltip signal in the it block, rule does not apply
        code: dedent`
          it('focuses', () => {
            fireEvent.focus(element);
          });
        `,
        languageOptions,
      },
      {
        // Uses the correct helper, no violation
        code: dedent`
          it('shows tooltip on focus', () => {
            focusEuiToolTipTrigger(element);
            queryByRole('tooltip');
          });
        `,
        languageOptions,
      },
      {
        // `fireEvent.blur` is not flagged
        code: dedent`
          it('hides tooltip on blur', () => {
            fireEvent.blur(element);
            queryByRole('tooltip');
          });
        `,
        languageOptions,
      },
      {
        // `someOtherObj.focus()` is not flagged
        code: dedent`
          it('shows tooltip', () => {
            someOtherObj.focus(element);
            queryByRole('tooltip');
          });
        `,
        languageOptions,
      },
      {
        // `fireEvent.focus` outside any it block, not tracked
        code: dedent`
          queryByRole('tooltip');
          fireEvent.focus(element);
        `,
        languageOptions,
      },
      {
        // `fireEvent.focus` in an it block without tooltip signal, not flagged
        code: dedent`
          it('focuses an input', () => {
            fireEvent.focus(input);
            getByRole('textbox');
          });
          it('shows tooltip on hover', () => {
            fireEvent.mouseOver(trigger);
            queryByRole('tooltip');
          });
        `,
        languageOptions,
      },
      {
        // `.euiToolTip` class selector present but no `fireEvent.focus` in that block, valid
        code: dedent`
          it('finds tooltip element', () => {
            document.querySelector('.euiToolTip');
          });
        `,
        languageOptions,
      },
      {
        // `.euiToolTipAnchor` in one block does not affect `fireEvent.focus` in a separate block
        code: dedent`
          it('renders tooltip when showTooltip=true', () => {
            const { container } = render(<ExtraActionsButton onClick={() => {}} showTooltip />);
            expect(container.querySelector('.euiToolTipAnchor')).not.toBeNull();
          });
          it('focuses the button', () => {
            const { getByTestId } = render(<ExtraActionsButton onClick={() => {}} />);
            fireEvent.focus(getByTestId('showExtraActionsButton'));
          });
        `,
        languageOptions,
      },
    ],

    invalid: [
      {
        // `queryByRole('tooltip')` in same it block, `fireEvent.focus` should be flagged
        code: dedent`
          it('shows tooltip on focus', () => {
            fireEvent.focus(element);
            queryByRole('tooltip');
          });
        `,
        languageOptions,
        errors: [{ messageId: 'preferTooltipTriggerFocusTestUtility' }],
      },
      {
        // `getByRole('tooltip')` in same it block, `fireEvent.focus` should be flagged
        code: dedent`
          it('shows tooltip on focus', () => {
            fireEvent.focus(element);
            getByRole('tooltip');
          });
        `,
        languageOptions,
        errors: [{ messageId: 'preferTooltipTriggerFocusTestUtility' }],
      },
      {
        // `screen.findByRole('tooltip')` in same it block, `fireEvent.focus` should be flagged
        code: dedent`
          it('shows tooltip on focus', async () => {
            fireEvent.focus(element);
            await screen.findByRole('tooltip');
          });
        `,
        languageOptions,
        errors: [{ messageId: 'preferTooltipTriggerFocusTestUtility' }],
      },
      {
        // test() block (alias for it), `fireEvent.focus` should be flagged
        code: dedent`
          test('shows tooltip on focus', () => {
            fireEvent.focus(element);
            queryByRole('tooltip');
          });
        `,
        languageOptions,
        errors: [{ messageId: 'preferTooltipTriggerFocusTestUtility' }],
      },
      {
        // tooltip query appears before `fireEvent.focus`, still flagged (whole-block analysis)
        code: dedent`
          it('shows tooltip on focus', () => {
            queryByRole('tooltip');
            fireEvent.focus(element);
          });
        `,
        languageOptions,
        errors: [{ messageId: 'preferTooltipTriggerFocusTestUtility' }],
      },
      {
        // Only the it block with a tooltip signal is flagged, not unrelated blocks
        code: dedent`
          it('focuses an input', () => {
            fireEvent.focus(input);
            getByRole('textbox');
          });
          it('shows tooltip on focus', () => {
            fireEvent.focus(trigger);
            queryByRole('tooltip');
          });
        `,
        languageOptions,
        errors: [{ messageId: 'preferTooltipTriggerFocusTestUtility' }],
      },
      {
        // Multiple `fireEvent.focus` calls in same tooltip it block, each flagged
        code: dedent`
          it('shows tooltip on focus', () => {
            queryByRole('tooltip');
            fireEvent.focus(triggerA);
            fireEvent.focus(triggerB);
          });
        `,
        languageOptions,
        errors: [
          { messageId: 'preferTooltipTriggerFocusTestUtility' },
          { messageId: 'preferTooltipTriggerFocusTestUtility' },
        ],
      },
      {
        // `.euiToolTip` class selector in same it block, `fireEvent.focus` should be flagged
        code: dedent`
          it('shows tooltip on focus', () => {
            fireEvent.focus(trigger);
            document.querySelector('.euiToolTip');
          });
        `,
        languageOptions,
        errors: [{ messageId: 'preferTooltipTriggerFocusTestUtility' }],
      },
      {
        // `.euiToolTipAnchor` through `closest()` in same it block, `fireEvent.focus` should be flagged
        code: dedent`
          it('shows tooltip on focus', () => {
            fireEvent.focus(trigger);
            trigger.closest('.euiToolTipAnchor');
          });
        `,
        languageOptions,
        errors: [{ messageId: 'preferTooltipTriggerFocusTestUtility' }],
      },
      {
        // `[class*="euiToolTip"]` wildcard selector in same it block, `fireEvent.focus` should be flagged
        code: dedent`
          it('shows tooltip on focus', () => {
            fireEvent.focus(trigger);
            trigger.closest('[class*="euiToolTip"]');
          });
        `,
        languageOptions,
        errors: [{ messageId: 'preferTooltipTriggerFocusTestUtility' }],
      },
    ],
  }
);
