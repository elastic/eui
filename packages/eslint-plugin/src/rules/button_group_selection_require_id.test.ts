/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import dedent from 'dedent';
import { RuleTester } from '@typescript-eslint/rule-tester';
import { ButtonGroupSelectionRequireId } from './button_group_selection_require_id';

const languageOptions = {
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
  },
};

const ruleTester = new RuleTester();

ruleTester.run(
  'button-group-selection-require-id',
  ButtonGroupSelectionRequireId,
  {
    valid: [
      // Direct children with id
      {
        name: 'EuiButton child with id',
        code: dedent`
          <EuiButtonGroup legend="Format" variant="selection">
            <EuiButton id="bold">Bold</EuiButton>
            <EuiButton id="italic">Italic</EuiButton>
          </EuiButtonGroup>
        `,
        languageOptions,
      },
      {
        name: 'EuiButtonIcon child with id',
        code: dedent`
          <EuiButtonGroup legend="Format" variant="selection">
            <EuiButtonIcon id="bold" iconType="bold" aria-label="Bold" />
            <EuiButtonIcon id="italic" iconType="italic" aria-label="Italic" />
          </EuiButtonGroup>
        `,
        languageOptions,
      },

      // Non-selection variants
      {
        name: 'options API (self-closing)',
        code: dedent`
          <EuiButtonGroup
            legend="Format"
            variant="selection"
            options={[{ id: '1', label: 'One' }]}
            idSelected="1"
            onChange={() => {}}
          />
        `,
        languageOptions,
      },
      {
        name: 'variant="default"',
        code: dedent`
          <EuiButtonGroup legend="Format" variant="default">
            <EuiButton>No id needed here</EuiButton>
          </EuiButtonGroup>
        `,
        languageOptions,
      },
      {
        name: 'variant="segmented"',
        code: dedent`
          <EuiButtonGroup legend="Format" variant="segmented">
            <EuiButton>No id needed here</EuiButton>
          </EuiButtonGroup>
        `,
        languageOptions,
      },
      {
        name: 'no variant',
        code: dedent`
          <EuiButtonGroup legend="Format">
            <EuiButton>No id needed here</EuiButton>
          </EuiButtonGroup>
        `,
        languageOptions,
      },
      {
        name: 'dynamic variant',
        code: dedent`
          <EuiButtonGroup legend="Format" variant={myVariant}>
            <EuiButton>No id needed here</EuiButton>
          </EuiButtonGroup>
        `,
        languageOptions,
      },

      // Wrappers
      {
        name: 'EuiButton wrapped in EuiToolTip with id',
        code: dedent`
          <EuiButtonGroup legend="Format" variant="selection">
            <EuiButton id="bold">Bold</EuiButton>
            <EuiToolTip content="Italic text">
              <EuiButton id="italic">Italic</EuiButton>
            </EuiToolTip>
          </EuiButtonGroup>
        `,
        languageOptions,
      },
      {
        name: 'EuiButtonIcon wrapped in EuiToolTip with id',
        code: dedent`
          <EuiButtonGroup legend="Format" variant="selection">
            <EuiToolTip content="Bold">
              <EuiButtonIcon id="bold" iconType="bold" aria-label="Bold" />
            </EuiToolTip>
          </EuiButtonGroup>
        `,
        languageOptions,
      },
      {
        name: 'EuiPopover with EuiButton trigger with id',
        code: dedent`
          <EuiButtonGroup legend="Format" variant="selection">
            <EuiButton id="bold">Bold</EuiButton>
            <EuiPopover button={<EuiButton id="more">More</EuiButton>} isOpen={false} closePopover={() => {}}>
              Panel content
            </EuiPopover>
          </EuiButtonGroup>
        `,
        languageOptions,
      },
      {
        name: 'EuiPopover with EuiToolTip-wrapped trigger with id',
        code: dedent`
          <EuiButtonGroup legend="Format" variant="selection">
            <EuiPopover
              button={<EuiToolTip content="More"><EuiButtonIcon id="more" iconType="boxesVertical" aria-label="More" /></EuiToolTip>}
              isOpen={false}
              closePopover={() => {}}
            >
              Panel content
            </EuiPopover>
          </EuiButtonGroup>
        `,
        languageOptions,
      },
      {
        name: 'EuiCopy render prop returning EuiButton with id',
        code: dedent`
          <EuiButtonGroup legend="Format" variant="selection">
            <EuiButton id="bold">Bold</EuiButton>
            <EuiCopy textToCopy="text">
              {(copy) => <EuiButton id="copy" onClick={copy}>Copy</EuiButton>}
            </EuiCopy>
          </EuiButtonGroup>
        `,
        languageOptions,
      },
      {
        name: 'EuiCopy block-body render prop with id',
        code: dedent`
          <EuiButtonGroup legend="Format" variant="selection">
            <EuiCopy textToCopy="text">
              {(copy) => { return <EuiButton id="copy" onClick={copy}>Copy</EuiButton>; }}
            </EuiCopy>
          </EuiButtonGroup>
        `,
        languageOptions,
      },

      // Fragments
      {
        name: 'shorthand fragment wrapping buttons with id',
        code: dedent`
          <EuiButtonGroup legend="Format" variant="selection">
            <>
              <EuiButton id="bold">Bold</EuiButton>
              <EuiButton id="italic">Italic</EuiButton>
            </>
          </EuiButtonGroup>
        `,
        languageOptions,
      },
      {
        name: '<Fragment> wrapping buttons with id',
        code: dedent`
          <EuiButtonGroup legend="Format" variant="selection">
            <Fragment>
              <EuiButton id="bold">Bold</EuiButton>
            </Fragment>
          </EuiButtonGroup>
        `,
        languageOptions,
      },
      {
        name: '<React.Fragment> wrapping buttons with id',
        code: dedent`
          <EuiButtonGroup legend="Format" variant="selection">
            <React.Fragment>
              <EuiButton id="bold">Bold</EuiButton>
              <EuiButton id="italic">Italic</EuiButton>
            </React.Fragment>
          </EuiButtonGroup>
        `,
        languageOptions,
      },

      // Conditional rendering
      {
        name: '{condition && <EuiButton id />}',
        code: dedent`
          <EuiButtonGroup legend="Format" variant="selection">
            <EuiButton id="bold">Bold</EuiButton>
            {showItalic && <EuiButton id="italic">Italic</EuiButton>}
          </EuiButtonGroup>
        `,
        languageOptions,
      },
      {
        name: 'ternary with both branches having id',
        code: dedent`
          <EuiButtonGroup legend="Format" variant="selection">
            {isIcon
              ? <EuiButtonIcon id="bold" iconType="bold" aria-label="Bold" />
              : <EuiButton id="bold">Bold</EuiButton>}
          </EuiButtonGroup>
        `,
        languageOptions,
      },
      {
        name: 'ternary with null alternate branch',
        code: dedent`
          <EuiButtonGroup legend="Format" variant="selection">
            <EuiButton id="bold">Bold</EuiButton>
            {showItalic ? <EuiButton id="italic">Italic</EuiButton> : null}
          </EuiButtonGroup>
        `,
        languageOptions,
      },
      {
        name: '{unresolvable || <EuiButton id />}',
        code: dedent`
          <EuiButtonGroup legend="Format" variant="selection">
            {fallback || <EuiButton id="bold">Bold</EuiButton>}
          </EuiButtonGroup>
        `,
        languageOptions,
      },
      {
        name: '{unresolvable ?? <EuiButton id />}',
        code: dedent`
          <EuiButtonGroup legend="Format" variant="selection">
            {fallback ?? <EuiButton id="bold">Bold</EuiButton>}
          </EuiButtonGroup>
        `,
        languageOptions,
      },

      // Variable resolution
      {
        name: 'const variable holding a button with id is resolved and accepted',
        code: dedent`
          const button = <EuiButton id="bold">Bold</EuiButton>;
          <EuiButtonGroup legend="Format" variant="selection">
            {button}
          </EuiButtonGroup>
        `,
        languageOptions,
      },
      {
        name: 'const variable holding a button array with id is resolved and accepted',
        code: dedent`
          const buttons = [
            <EuiButton key="bold" id="bold">Bold</EuiButton>,
            <EuiButton key="italic" id="italic">Italic</EuiButton>,
          ];
          <EuiButtonGroup legend="Format" variant="selection">
            {buttons}
          </EuiButtonGroup>
        `,
        languageOptions,
      },
      {
        name: 'reassigned variable',
        code: dedent`
          let button = <EuiButton>No id</EuiButton>;
          button = <EuiButton id="bold">Bold</EuiButton>;
          <EuiButtonGroup legend="Format" variant="selection">
            {button}
          </EuiButtonGroup>
        `,
        languageOptions,
      },

      // Local arrow-function components
      {
        name: 'local arrow-fn returning button with id',
        code: dedent`
          const FormatButton = () => <EuiButton id="bold">Bold</EuiButton>;
          <EuiButtonGroup legend="Format" variant="selection">
            <FormatButton />
          </EuiButtonGroup>
        `,
        languageOptions,
      },
      {
        name: 'local block-body arrow-fn returning button with id',
        code: dedent`
          const FormatButton = () => { return <EuiButton id="bold">Bold</EuiButton>; };
          <EuiButtonGroup legend="Format" variant="selection">
            <FormatButton />
          </EuiButtonGroup>
        `,
        languageOptions,
      },

      // map()
      {
        name: 'map() with expression-body button with id',
        code: dedent`
          <EuiButtonGroup legend="Format" variant="selection">
            {buttons.map((b) => <EuiButton key={b.id} id={b.id}>{b.label}</EuiButton>)}
          </EuiButtonGroup>
        `,
        languageOptions,
      },
      {
        name: 'map() with block-body button with id',
        code: dedent`
          <EuiButtonGroup legend="Format" variant="selection">
            {buttons.map((b) => {
              return <EuiButton key={b.id} id={b.id}>{b.label}</EuiButton>;
            })}
          </EuiButtonGroup>
        `,
        languageOptions,
      },

      // Spread bail-outs
      {
        name: 'spread props on child',
        code: dedent`
          <EuiButtonGroup legend="Format" variant="selection">
            <EuiButton {...buttonProps} />
          </EuiButtonGroup>
        `,
        languageOptions,
      },
      {
        name: 'spread props on child inside EuiToolTip',
        code: dedent`
          <EuiButtonGroup legend="Format" variant="selection">
            <EuiToolTip content="Bold">
              <EuiButtonIcon {...iconProps} />
            </EuiToolTip>
          </EuiButtonGroup>
        `,
        languageOptions,
      },

      // Function call — not resolvable
      {
        name: 'function call child',
        code: dedent`
          <EuiButtonGroup legend="Format" variant="selection">
            {renderButtons()}
          </EuiButtonGroup>
        `,
        languageOptions,
      },

      // Non-button children
      {
        name: 'non-button children without id',
        code: dedent`
          <EuiButtonGroup legend="Format" variant="selection">
            <div>Not a button</div>
          </EuiButtonGroup>
        `,
        languageOptions,
      },
    ],

    invalid: [
      // Direct children missing id
      {
        name: 'EuiButton without id',
        code: dedent`
          <EuiButtonGroup legend="Format" variant="selection">
            <EuiButton>Bold</EuiButton>
          </EuiButtonGroup>
        `,
        languageOptions,
        errors: [{ messageId: 'missingId', data: { name: 'EuiButton' } }],
      },
      {
        name: 'EuiButtonIcon without id',
        code: dedent`
          <EuiButtonGroup legend="Format" variant="selection">
            <EuiButtonIcon iconType="bold" aria-label="Bold" />
          </EuiButtonGroup>
        `,
        languageOptions,
        errors: [{ messageId: 'missingId', data: { name: 'EuiButtonIcon' } }],
      },
      {
        name: 'multiple children without id',
        code: dedent`
          <EuiButtonGroup legend="Format" variant="selection">
            <EuiButton id="bold">Bold</EuiButton>
            <EuiButton>Italic</EuiButton>
            <EuiButton>Underline</EuiButton>
          </EuiButtonGroup>
        `,
        languageOptions,
        errors: [
          { messageId: 'missingId', data: { name: 'EuiButton' } },
          { messageId: 'missingId', data: { name: 'EuiButton' } },
        ],
      },

      // Wrappers — button inside missing id
      {
        name: 'EuiToolTip wrapping button without id',
        code: dedent`
          <EuiButtonGroup legend="Format" variant="selection">
            <EuiToolTip content="Bold">
              <EuiButton>Bold</EuiButton>
            </EuiToolTip>
          </EuiButtonGroup>
        `,
        languageOptions,
        errors: [{ messageId: 'missingId', data: { name: 'EuiButton' } }],
      },
      {
        name: 'EuiToolTip with spread props on wrapper but button inside missing id',
        code: dedent`
          <EuiButtonGroup legend="Format" variant="selection">
            <EuiToolTip content="Bold" {...tooltipProps}>
              <EuiButton>Bold</EuiButton>
            </EuiToolTip>
          </EuiButtonGroup>
        `,
        languageOptions,
        errors: [{ messageId: 'missingId', data: { name: 'EuiButton' } }],
      },
      {
        name: 'EuiPopover button prop without id',
        code: dedent`
          <EuiButtonGroup legend="Format" variant="selection">
            <EuiPopover button={<EuiButton>More</EuiButton>} isOpen={false} closePopover={() => {}}>
              Panel content
            </EuiPopover>
          </EuiButtonGroup>
        `,
        languageOptions,
        errors: [{ messageId: 'missingId', data: { name: 'EuiButton' } }],
      },
      {
        name: 'EuiPopover with EuiToolTip-wrapped trigger without id',
        code: dedent`
          <EuiButtonGroup legend="Format" variant="selection">
            <EuiPopover
              button={<EuiToolTip content="More"><EuiButtonIcon iconType="boxesVertical" aria-label="More" /></EuiToolTip>}
              isOpen={false}
              closePopover={() => {}}
            >
              Panel content
            </EuiPopover>
          </EuiButtonGroup>
        `,
        languageOptions,
        errors: [{ messageId: 'missingId', data: { name: 'EuiButtonIcon' } }],
      },
      {
        name: 'EuiCopy render prop returning button without id',
        code: dedent`
          <EuiButtonGroup legend="Format" variant="selection">
            <EuiCopy textToCopy="text">
              {(copy) => <EuiButton onClick={copy}>Copy</EuiButton>}
            </EuiCopy>
          </EuiButtonGroup>
        `,
        languageOptions,
        errors: [{ messageId: 'missingId', data: { name: 'EuiButton' } }],
      },

      // Fragments
      {
        name: 'fragment wrapping button without id',
        code: dedent`
          <EuiButtonGroup legend="Format" variant="selection">
            <>
              <EuiButton id="bold">Bold</EuiButton>
              <EuiButton>Italic</EuiButton>
            </>
          </EuiButtonGroup>
        `,
        languageOptions,
        errors: [{ messageId: 'missingId', data: { name: 'EuiButton' } }],
      },

      // Conditional rendering
      {
        name: '{condition && <EuiButton />}',
        code: dedent`
          <EuiButtonGroup legend="Format" variant="selection">
            <EuiButton id="bold">Bold</EuiButton>
            {showItalic && <EuiButton>Italic</EuiButton>}
          </EuiButtonGroup>
        `,
        languageOptions,
        errors: [{ messageId: 'missingId', data: { name: 'EuiButton' } }],
      },
      {
        name: 'ternary with one branch without id',
        code: dedent`
          <EuiButtonGroup legend="Format" variant="selection">
            {isIcon
              ? <EuiButtonIcon id="bold" iconType="bold" aria-label="Bold" />
              : <EuiButton>Bold</EuiButton>}
          </EuiButtonGroup>
        `,
        languageOptions,
        errors: [{ messageId: 'missingId', data: { name: 'EuiButton' } }],
      },
      {
        name: '{unresolvable || <EuiButton />}',
        code: dedent`
          <EuiButtonGroup legend="Format" variant="selection">
            {fallback || <EuiButton>Bold</EuiButton>}
          </EuiButtonGroup>
        `,
        languageOptions,
        errors: [{ messageId: 'missingId', data: { name: 'EuiButton' } }],
      },

      // Variable resolution
      {
        name: 'const variable holding button without id',
        code: dedent`
          const button = <EuiButton>Bold</EuiButton>;
          <EuiButtonGroup legend="Format" variant="selection">
            {button}
          </EuiButtonGroup>
        `,
        languageOptions,
        errors: [{ messageId: 'missingId', data: { name: 'EuiButton' } }],
      },

      // Local arrow-function components
      {
        name: 'local arrow-fn returning button without id',
        code: dedent`
          const FormatButton = () => <EuiButton>Bold</EuiButton>;
          <EuiButtonGroup legend="Format" variant="selection">
            <FormatButton />
          </EuiButtonGroup>
        `,
        languageOptions,
        errors: [{ messageId: 'missingId', data: { name: 'EuiButton' } }],
      },

      // map()
      {
        name: 'map() with expression-body button without id',
        code: dedent`
          <EuiButtonGroup legend="Format" variant="selection">
            {buttons.map((b) => <EuiButton key={b.id}>{b.label}</EuiButton>)}
          </EuiButtonGroup>
        `,
        languageOptions,
        errors: [{ messageId: 'missingId', data: { name: 'EuiButton' } }],
      },
      {
        name: 'map() with block-body button without id',
        code: dedent`
          <EuiButtonGroup legend="Format" variant="selection">
            {buttons.map((b) => {
              return <EuiButton key={b.id}>{b.label}</EuiButton>;
            })}
          </EuiButtonGroup>
        `,
        languageOptions,
        errors: [{ messageId: 'missingId', data: { name: 'EuiButton' } }],
      },
    ],
  }
);
