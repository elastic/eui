import { EuiBadgeAccessibilityRules } from './badge_accessibility_rules';
import { RuleTester } from "@typescript-eslint/rule-tester";

const languageOptions = {
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
  },
};

const ruleTester = new RuleTester();

ruleTester.run('EuiBadgeAccessibilityRules', EuiBadgeAccessibilityRules, {
  valid: [
    {
      name: 'different callbacks for iconOnClick and onClick',
      code: `
        const a = () => {};
        const b = () => {};
        <EuiBadge iconOnClick={a} onClick={b} iconOnClickAriaLabel="Remove icon" onClickAriaLabel="Click badge" />
      `,
      languageOptions,
    },
    {
      name: 'only iconOnClick with aria label',
      code: `
        const a = () => {};
        <EuiBadge iconOnClick={a} iconOnClickAriaLabel="Remove icon" />
      `,
      languageOptions,
    },
    {
      name: 'only onClick with aria label',
      code: `
        const b = () => {};
        <EuiBadge onClick={b} onClickAriaLabel="Click badge" />
      `,
      languageOptions,
    },
    {
      name: 'no click handlers or aria labels',
      code: `<EuiBadge />`,
      languageOptions,
    },
    {
      name: 'non-EuiBadge is ignored',
      code: `<div iconOnClick={a} iconOnClickAriaLabel="x" onClick={b} onClickAriaLabel="y" />`,
      languageOptions,
    },
  ],
  invalid: [
    {
      name: 'same callback for iconOnClick and onClick gets iconOnClick removed',
      code: `
        const cb = () => {};
        <EuiBadge iconOnClick={cb} onClick={cb} />
      `,
      errors: [{ messageId: 'sameCallback' }],
      output: `
        const cb = () => {};
        <EuiBadge  onClick={cb} />
      `,
      languageOptions,
    },
    {
      name: 'iconOnClickAriaLabel without iconOnClick is removed',
      code: `<EuiBadge iconOnClickAriaLabel="Remove icon" />`,
      errors: [{ messageId: 'iconOnClickAriaLabelWithoutIconOnClick' }],
      output: `<EuiBadge  />`,
      languageOptions,
    },
    {
      name: 'onClickAriaLabel without onClick is removed',
      code: `<EuiBadge onClickAriaLabel="Click badge" />`,
      errors: [{ messageId: 'onClickAriaLabelWithoutOnClick' }],
      output: `<EuiBadge  />`,
      languageOptions,
    },
    {
      name: 'removes only aria props when respective handlers are missing',
      code: `<EuiBadge iconOnClickAriaLabel="Remove icon" onClickAriaLabel="Click badge" />`,
      errors: [
        { messageId: 'iconOnClickAriaLabelWithoutIconOnClick' },
        { messageId: 'onClickAriaLabelWithoutOnClick' },
      ],
      output: `<EuiBadge   />`,
      languageOptions,
    },
  ],
});
