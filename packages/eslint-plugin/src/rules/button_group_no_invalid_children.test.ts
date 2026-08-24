/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import dedent from 'dedent';
import { RuleTester } from '@typescript-eslint/rule-tester';
import {
  ButtonGroupNoInvalidChildren,
  VALID_BUTTONS,
  SEGMENTED_VALID_BUTTONS,
} from './button_group_no_invalid_children';

const languageOptions = {
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
  },
};

const DEFAULT_ALLOWED = Array.from(VALID_BUTTONS).join(', ');
const SEGMENTED_ALLOWED = Array.from(SEGMENTED_VALID_BUTTONS).join(', ');

const ruleTester = new RuleTester();

ruleTester.run(
  'button-group-no-invalid-children',
  ButtonGroupNoInvalidChildren,
  {
    valid: [
      // Direct children
      {
        name: 'EuiButton child',
        code: dedent`
          <EuiButtonGroup legend="Actions">
            <EuiButton>Save</EuiButton>
          </EuiButtonGroup>
        `,
        languageOptions,
      },
      {
        name: 'EuiButtonEmpty child',
        code: dedent`
          <EuiButtonGroup legend="Actions">
            <EuiButtonEmpty color="text">Cancel</EuiButtonEmpty>
          </EuiButtonGroup>
        `,
        languageOptions,
      },
      {
        name: 'EuiButtonIcon child',
        code: dedent`
          <EuiButtonGroup legend="Actions">
            <EuiButtonIcon iconType="trash" aria-label="Delete" />
          </EuiButtonGroup>
        `,
        languageOptions,
      },
      {
        name: 'mixed valid direct children',
        code: dedent`
          <EuiButtonGroup legend="Actions">
            <EuiButton fill>Save</EuiButton>
            <EuiButtonEmpty color="text">Cancel</EuiButtonEmpty>
            <EuiButtonIcon iconType="trash" aria-label="Delete" />
          </EuiButtonGroup>
        `,
        languageOptions,
      },

      // Wrappers
      {
        name: 'EuiButtonIcon wrapped in EuiToolTip',
        code: dedent`
          <EuiButtonGroup legend="Actions">
            <EuiButton>Save</EuiButton>
            <EuiToolTip content="Delete">
              <EuiButtonIcon iconType="trash" aria-label="Delete" />
            </EuiToolTip>
          </EuiButtonGroup>
        `,
        languageOptions,
      },
      {
        name: 'EuiButton wrapped in EuiToolTip',
        code: dedent`
          <EuiButtonGroup legend="Actions">
            <EuiToolTip content="Save document">
              <EuiButton>Save</EuiButton>
            </EuiToolTip>
          </EuiButtonGroup>
        `,
        languageOptions,
      },
      {
        name: 'EuiPopover as direct child — JSX children (panel content) are not validated',
        code: dedent`
          <EuiButtonGroup legend="Actions">
            <EuiButton>Normal</EuiButton>
            <EuiPopover button={<EuiButton>Open</EuiButton>} isOpen={false} closePopover={() => {}}>
              <EuiFlexGroup>Panel content with non-button elements</EuiFlexGroup>
            </EuiPopover>
          </EuiButtonGroup>
        `,
        languageOptions,
      },
      {
        name: 'EuiPopover with EuiToolTip-wrapped trigger in button prop is accepted',
        code: dedent`
          <EuiButtonGroup legend="Actions">
            <EuiPopover
              button={<EuiToolTip content="Tip"><EuiButtonIcon iconType="trash" aria-label="Delete" /></EuiToolTip>}
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
        name: 'EuiPopover button prop as a resolved variable with valid button is accepted',
        code: dedent`
          const trigger = <EuiButton>Open</EuiButton>;
          <EuiButtonGroup legend="Actions">
            <EuiPopover button={trigger} isOpen={false} closePopover={() => {}}>
              Panel content
            </EuiPopover>
          </EuiButtonGroup>
        `,
        languageOptions,
      },
      {
        name: 'EuiPopover button prop as a conditional with valid buttons is accepted',
        code: dedent`
          <EuiButtonGroup legend="Actions">
            <EuiPopover
              button={isIcon ? <EuiButtonIcon iconType="boxesVertical" aria-label="More" /> : <EuiButton>More</EuiButton>}
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
        name: 'EuiCopy with valid render-prop button is accepted',
        code: dedent`
          <EuiButtonGroup legend="Actions">
            <EuiButton>Normal</EuiButton>
            <EuiCopy textToCopy="text">
              {(copy) => <EuiButton onClick={copy}>Copy</EuiButton>}
            </EuiCopy>
          </EuiButtonGroup>
        `,
        languageOptions,
      },
      {
        name: 'EuiCopy block-body render prop with valid button is accepted',
        code: dedent`
          <EuiButtonGroup legend="Actions">
            <EuiCopy textToCopy="text">
              {(copy) => { return <EuiButton onClick={copy}>Copy</EuiButton>; }}
            </EuiCopy>
          </EuiButtonGroup>
        `,
        languageOptions,
      },

      // Fragments
      {
        name: 'shorthand fragment wrapping valid buttons',
        code: dedent`
          <EuiButtonGroup legend="Actions">
            <>
              <EuiButton>Save</EuiButton>
              <EuiButtonEmpty color="text">Cancel</EuiButtonEmpty>
            </>
          </EuiButtonGroup>
        `,
        languageOptions,
      },
      {
        name: '<Fragment> wrapping valid buttons',
        code: dedent`
          <EuiButtonGroup legend="Actions">
            <Fragment>
              <EuiButton>Save</EuiButton>
            </Fragment>
          </EuiButtonGroup>
        `,
        languageOptions,
      },
      {
        name: '<React.Fragment> wrapping valid buttons',
        code: dedent`
          <EuiButtonGroup legend="Actions">
            <React.Fragment>
              <EuiButton>Save</EuiButton>
              <EuiButtonIcon iconType="trash" aria-label="Delete" />
            </React.Fragment>
          </EuiButtonGroup>
        `,
        languageOptions,
      },
      {
        name: 'nested fragments wrapping valid buttons',
        code: dedent`
          <EuiButtonGroup legend="Actions">
            <>
              <Fragment>
                <EuiButton>Save</EuiButton>
              </Fragment>
            </>
          </EuiButtonGroup>
        `,
        languageOptions,
      },
      {
        name: 'fragment wrapping valid button inside EuiToolTip',
        code: dedent`
          <EuiButtonGroup legend="Actions">
            <EuiToolTip content="tip">
              <>
                <EuiButtonIcon iconType="trash" aria-label="Delete" />
              </>
            </EuiToolTip>
          </EuiButtonGroup>
        `,
        languageOptions,
      },
      {
        name: 'conditional inside EuiToolTip with valid branches',
        code: dedent`
          <EuiButtonGroup legend="Actions">
            <EuiToolTip content="tip">
              {isIcon
                ? <EuiButtonIcon iconType="trash" aria-label="Delete" />
                : <EuiButton>Delete</EuiButton>}
            </EuiToolTip>
          </EuiButtonGroup>
        `,
        languageOptions,
      },
      {
        name: 'variable inside EuiToolTip resolves to a valid button',
        code: dedent`
          const icon = <EuiButtonIcon iconType="trash" aria-label="Delete" />;
          <EuiButtonGroup legend="Actions">
            <EuiToolTip content="Delete">
              {icon}
            </EuiToolTip>
          </EuiButtonGroup>
        `,
        languageOptions,
      },

      // Text nodes
      {
        name: 'whitespace text nodes between buttons are silently ignored',
        code: dedent`
          <EuiButtonGroup legend="Actions">
            {' '}
            <EuiButton>Save</EuiButton>
            {' '}
          </EuiButtonGroup>
        `,
        languageOptions,
      },

      // Conditional rendering
      {
        name: '{condition && <EuiButton />} is valid',
        code: dedent`
          <EuiButtonGroup legend="Actions">
            <EuiButton>Save</EuiButton>
            {canDelete && <EuiButtonIcon iconType="trash" aria-label="Delete" />}
          </EuiButtonGroup>
        `,
        languageOptions,
      },
      {
        name: 'ternary with both valid branches',
        code: dedent`
          <EuiButtonGroup legend="Actions">
            {isAdmin ? <EuiButton>Delete</EuiButton> : <EuiButtonEmpty>Cancel</EuiButtonEmpty>}
          </EuiButtonGroup>
        `,
        languageOptions,
      },
      {
        name: 'ternary with null alternate branch',
        code: dedent`
          <EuiButtonGroup legend="Actions">
            <EuiButton>Save</EuiButton>
            {canDelete ? <EuiButtonIcon iconType="trash" aria-label="Delete" /> : null}
          </EuiButtonGroup>
        `,
        languageOptions,
      },
      {
        name: '{unresolvable || <EuiButton />} — unresolvable left side is skipped, valid right side passes',
        code: dedent`
          <EuiButtonGroup legend="Actions">
            {fallback || <EuiButton>Save</EuiButton>}
          </EuiButtonGroup>
        `,
        languageOptions,
      },
      {
        name: '{unresolvable ?? <EuiButton />} — unresolvable left side is skipped, valid right side passes',
        code: dedent`
          <EuiButtonGroup legend="Actions">
            {fallback ?? <EuiButton>Save</EuiButton>}
          </EuiButtonGroup>
        `,
        languageOptions,
      },
      {
        name: '{resolvedButton || <EuiButton />} — valid resolved left side passes',
        code: dedent`
          const resolvedButton = <EuiButtonEmpty color="text">Cancel</EuiButtonEmpty>;
          <EuiButtonGroup legend="Actions">
            {resolvedButton || <EuiButton>Save</EuiButton>}
          </EuiButtonGroup>
        `,
        languageOptions,
      },

      // Array notation
      {
        name: 'array of valid buttons',
        code: dedent`
          <EuiButtonGroup legend="Actions">
            {[
              <EuiButton key="save">Save</EuiButton>,
              <EuiButtonEmpty key="cancel" color="text">Cancel</EuiButtonEmpty>,
            ]}
          </EuiButtonGroup>
        `,
        languageOptions,
      },
      {
        name: 'array containing a valid wrapper (EuiToolTip)',
        code: dedent`
          <EuiButtonGroup legend="Actions">
            {[
              <EuiButton key="save">Save</EuiButton>,
              <EuiToolTip key="delete" content="Delete">
                <EuiButtonIcon iconType="trash" aria-label="Delete" />
              </EuiToolTip>,
            ]}
          </EuiButtonGroup>
        `,
        languageOptions,
      },

      // Variable resolution
      {
        name: 'const variable holding a valid button is resolved and accepted',
        code: dedent`
          const button = <EuiButton>Save</EuiButton>;
          <EuiButtonGroup legend="Actions">
            {button}
          </EuiButtonGroup>
        `,
        languageOptions,
      },
      {
        name: 'const variable holding a valid button array is resolved and accepted',
        code: dedent`
          const buttons = [
            <EuiButton key="save">Save</EuiButton>,
            <EuiButtonEmpty key="cancel" color="text">Cancel</EuiButtonEmpty>,
          ];
          <EuiButtonGroup legend="Actions">
            {buttons}
          </EuiButtonGroup>
        `,
        languageOptions,
      },
      {
        name: 'reassigned variable is skipped — cannot be safely resolved',
        code: dedent`
          let button = <EuiText>Not a button</EuiText>;
          button = <EuiButton>Save</EuiButton>;
          <EuiButtonGroup legend="Actions">
            {button}
          </EuiButtonGroup>
        `,
        languageOptions,
      },

      // Local arrow-function
      {
        name: 'local arrow-fn component with valid return is resolved transparently',
        code: dedent`
          const ActionButtons = () => <EuiButton>Save</EuiButton>;
          <EuiButtonGroup legend="Actions">
            <ActionButtons />
          </EuiButtonGroup>
        `,
        languageOptions,
      },
      {
        name: 'local arrow-fn component returning a fragment of valid buttons',
        code: dedent`
          const ActionButtons = () => (
            <>
              <EuiButton>Save</EuiButton>
              <EuiButtonEmpty color="text">Cancel</EuiButtonEmpty>
            </>
          );
          <EuiButtonGroup legend="Actions">
            <ActionButtons />
          </EuiButtonGroup>
        `,
        languageOptions,
      },
      {
        name: 'local block-body arrow-fn component with valid return is resolved and accepted',
        code: dedent`
          const ActionButtons = () => { return <EuiButton>Save</EuiButton>; };
          <EuiButtonGroup legend="Actions">
            <ActionButtons />
          </EuiButtonGroup>
        `,
        languageOptions,
      },
      {
        name: 'local block-body arrow-fn component with early return is resolved and accepted',
        code: dedent`
          const ActionButtons = ({ isIcon }) => {
            if (isIcon) return <EuiButtonIcon iconType="plus" aria-label="Add" />;
            return <EuiButton>Add</EuiButton>;
          };
          <EuiButtonGroup legend="Actions">
            <ActionButtons />
          </EuiButtonGroup>
        `,
        languageOptions,
      },

      // Static bail-outs (not resolvable at analysis time)
      {
        name: 'function call child — cannot statically resolve',
        code: dedent`
          <EuiButtonGroup legend="Actions">
            {renderButtons()}
          </EuiButtonGroup>
        `,
        languageOptions,
      },
      {
        name: 'options API (self-closing) is ignored',
        code: dedent`
          <EuiButtonGroup
            legend="Actions"
            options={[{ id: '1', label: 'One' }]}
            idSelected="1"
            onChange={() => {}}
          />
        `,
        languageOptions,
      },

      // Variants
      {
        name: 'variant="default" with valid children is accepted',
        code: dedent`
          <EuiButtonGroup legend="Actions" variant="default">
            <EuiButton>Save</EuiButton>
            <EuiButtonEmpty color="text">Cancel</EuiButtonEmpty>
          </EuiButtonGroup>
        `,
        languageOptions,
      },
      {
        name: 'variant="segmented" with EuiButton children is accepted',
        code: dedent`
          <EuiButtonGroup legend="Actions" variant="segmented">
            <EuiButton>Save</EuiButton>
            <EuiButton>Cancel</EuiButton>
          </EuiButtonGroup>
        `,
        languageOptions,
      },
      {
        name: 'variant="segmented" with EuiButtonIcon children is accepted',
        code: dedent`
          <EuiButtonGroup legend="Actions" variant="segmented">
            <EuiButtonIcon iconType="trash" aria-label="Delete" />
            <EuiButtonIcon iconType="pencil" aria-label="Edit" />
          </EuiButtonGroup>
        `,
        languageOptions,
      },
      {
        name: 'variant="segmented" with EuiToolTip wrapping EuiButton is accepted',
        code: dedent`
          <EuiButtonGroup legend="Actions" variant="segmented">
            <EuiButton>Save</EuiButton>
            <EuiToolTip content="Delete">
              <EuiButton color="danger">Delete</EuiButton>
            </EuiToolTip>
          </EuiButtonGroup>
        `,
        languageOptions,
      },
      {
        name: 'variant="segmented" with EuiToolTip wrapping EuiButtonIcon is accepted',
        code: dedent`
          <EuiButtonGroup legend="Actions" variant="segmented">
            <EuiToolTip content="Delete">
              <EuiButtonIcon iconType="trash" aria-label="Delete" />
            </EuiToolTip>
          </EuiButtonGroup>
        `,
        languageOptions,
      },
      {
        name: 'variant="segmented" with EuiPopover wrapping EuiButton trigger is accepted',
        code: dedent`
          <EuiButtonGroup legend="Actions" variant="segmented">
            <EuiButton>Save</EuiButton>
            <EuiPopover button={<EuiButton>More</EuiButton>} isOpen={false} closePopover={() => {}}>
              <p>Panel content</p>
            </EuiPopover>
          </EuiButtonGroup>
        `,
        languageOptions,
      },
      {
        name: 'variant="segmented" with EuiPopover wrapping EuiButtonIcon trigger is accepted',
        code: dedent`
          <EuiButtonGroup legend="Actions" variant="segmented">
            <EuiPopover button={<EuiButtonIcon iconType="menu" aria-label="More" />} isOpen={false} closePopover={() => {}}>
              <p>Panel content</p>
            </EuiPopover>
          </EuiButtonGroup>
        `,
        languageOptions,
      },
      {
        name: 'variant="segmented" with EuiPopover and EuiToolTip-wrapped trigger is accepted',
        code: dedent`
          <EuiButtonGroup legend="Actions" variant="segmented">
            <EuiPopover
              button={<EuiToolTip content="More"><EuiButton>More</EuiButton></EuiToolTip>}
              isOpen={false}
              closePopover={() => {}}
            >
              <p>Panel content</p>
            </EuiPopover>
          </EuiButtonGroup>
        `,
        languageOptions,
      },
      {
        name: 'variant="segmented" with EuiCopy wrapping EuiButton is accepted',
        code: dedent`
          <EuiButtonGroup legend="Actions" variant="segmented">
            <EuiButton>Save</EuiButton>
            <EuiCopy textToCopy="text">
              {(copy) => <EuiButton onClick={copy}>Copy</EuiButton>}
            </EuiCopy>
          </EuiButtonGroup>
        `,
        languageOptions,
      },
      {
        name: 'variant="segmented" with EuiButton children inside a fragment is accepted',
        code: dedent`
          <EuiButtonGroup legend="Actions" variant="segmented">
            <>
              <EuiButton>Save</EuiButton>
              <EuiButton>Cancel</EuiButton>
            </>
          </EuiButtonGroup>
        `,
        languageOptions,
      },
      {
        name: 'variant="segmented" with spread props on child — cannot statically be determined',
        code: dedent`
          <EuiButtonGroup legend="Actions" variant="segmented">
            <EuiButton {...buttonProps} />
          </EuiButtonGroup>
        `,
        languageOptions,
      },
      {
        name: 'variant="selection" is not yet validated — invalid children pass through',
        code: dedent`
          <EuiButtonGroup legend="Actions" variant="selection">
            <div>Not a button</div>
          </EuiButtonGroup>
        `,
        languageOptions,
      },
      {
        name: 'dynamic variant is conservatively skipped — invalid children pass through',
        code: dedent`
          <EuiButtonGroup legend="Actions" variant={myVariant}>
            <div>Not a button</div>
          </EuiButtonGroup>
        `,
        languageOptions,
      },
      {
        name: 'spread props on child — cannot statically determine',
        code: dedent`
          <EuiButtonGroup legend="Actions">
            <EuiButton {...buttonProps} />
          </EuiButtonGroup>
        `,
        languageOptions,
      },
      {
        name: 'spread props on wrapper child — cannot statically determine',
        code: dedent`
          <EuiButtonGroup legend="Actions">
            <EuiToolTip content="tip">
              <EuiButtonIcon {...iconProps} />
            </EuiToolTip>
          </EuiButtonGroup>
        `,
        languageOptions,
      },
      {
        name: 'map() with expression-body valid button is accepted',
        code: dedent`
          <EuiButtonGroup legend="Actions">
            {buttons.map((b) => <EuiButton key={b.id}>{b.label}</EuiButton>)}
          </EuiButtonGroup>
        `,
        languageOptions,
      },
      {
        name: 'map() with expression-body spread props is skipped — cannot statically determine element identity',
        code: dedent`
          <EuiButtonGroup legend="Actions">
            {buttons.map((b) => <EuiButton key={b.id} {...b} />)}
          </EuiButtonGroup>
        `,
        languageOptions,
      },
      {
        name: 'map() with block-body single return of valid button is accepted',
        code: dedent`
          <EuiButtonGroup legend="Actions">
            {buttons.map((b) => {
              return <EuiButton onClick={b.onClick}>{b.label}</EuiButton>;
            })}
          </EuiButtonGroup>
        `,
        languageOptions,
      },
      {
        name: 'map() with block-body early null return and valid button is accepted',
        code: dedent`
          <EuiButtonGroup legend="Actions">
            {buttons.map((b) => {
              if (b.hidden) return null;
              return <EuiButton onClick={b.onClick}>{b.label}</EuiButton>;
            })}
          </EuiButtonGroup>
        `,
        languageOptions,
      },
      {
        name: 'map() with block-body if/else returning different valid buttons is accepted',
        code: dedent`
          <EuiButtonGroup legend="Actions">
            {buttons.map((b) => {
              if (b.type === 'icon') return <EuiButtonIcon key={b.id} iconType={b.icon} aria-label={b.label} />;
              return <EuiButton key={b.id}>{b.label}</EuiButton>;
            })}
          </EuiButtonGroup>
        `,
        languageOptions,
      },
      {
        name: 'variable holding a map() result with valid buttons is accepted',
        code: dedent`
          const buttons = items.map((item) => <EuiButton key={item.id}>{item.label}</EuiButton>);
          <EuiButtonGroup legend="Actions">
            {buttons}
          </EuiButtonGroup>
        `,
        languageOptions,
      },
      {
        name: 'member-expression child (e.g. namespace component) is skipped',
        code: dedent`
          <EuiButtonGroup legend="Actions">
            <Icons.Pencil aria-label="Edit" />
          </EuiButtonGroup>
        `,
        languageOptions,
      },

      // Switch statement
      {
        name: 'local arrow-fn with switch returning valid buttons is accepted',
        code: dedent`
          const ActionButton = ({ variant }) => {
            switch (variant) {
              case 'icon': return <EuiButtonIcon iconType="plus" aria-label="Add" />;
              default: return <EuiButton>Add</EuiButton>;
            }
          };
          <EuiButtonGroup legend="Actions">
            <ActionButton />
          </EuiButtonGroup>
        `,
        languageOptions,
      },
    ],

    invalid: [
      // Direct children
      {
        name: 'plain div child',
        code: dedent`
          <EuiButtonGroup legend="Actions">
            <div>Not a button</div>
          </EuiButtonGroup>
        `,
        languageOptions,
        errors: [
          {
            messageId: 'invalidChild',
            data: { name: 'div', allowed: DEFAULT_ALLOWED },
          },
        ],
      },
      {
        name: 'EuiFlexGroup child',
        code: dedent`
          <EuiButtonGroup legend="Actions">
            <EuiFlexGroup>
              <EuiButton>Save</EuiButton>
            </EuiFlexGroup>
          </EuiButtonGroup>
        `,
        languageOptions,
        errors: [
          {
            messageId: 'invalidUnresolvableChild',
            data: { name: 'EuiFlexGroup', allowed: DEFAULT_ALLOWED },
          },
        ],
      },
      {
        name: 'multiple invalid children reported individually',
        code: dedent`
          <EuiButtonGroup legend="Actions">
            <span>text</span>
            <EuiButton>Valid</EuiButton>
            <EuiText>Also invalid</EuiText>
          </EuiButtonGroup>
        `,
        languageOptions,
        errors: [
          {
            messageId: 'invalidChild',
            data: { name: 'span', allowed: DEFAULT_ALLOWED },
          },
          {
            messageId: 'invalidUnresolvableChild',
            data: { name: 'EuiText', allowed: DEFAULT_ALLOWED },
          },
        ],
      },

      // EuiCopy
      {
        name: 'invalid element returned by EuiCopy render prop',
        code: dedent`
          <EuiButtonGroup legend="Actions">
            <EuiCopy textToCopy="text">
              {(copy) => <EuiText onClick={copy}>Not a button</EuiText>}
            </EuiCopy>
          </EuiButtonGroup>
        `,
        languageOptions,
        errors: [
          {
            messageId: 'invalidUnresolvableWrapperChild',
            data: {
              name: 'EuiText',
              wrapper: 'EuiCopy',
              allowed: DEFAULT_ALLOWED,
            },
          },
        ],
      },
      {
        name: 'EuiCopy block-body render prop with invalid return is reported',
        code: dedent`
          <EuiButtonGroup legend="Actions">
            <EuiCopy textToCopy="text">
              {(copy) => { return <EuiText>Not a button</EuiText>; }}
            </EuiCopy>
          </EuiButtonGroup>
        `,
        languageOptions,
        errors: [
          {
            messageId: 'invalidUnresolvableWrapperChild',
            data: {
              name: 'EuiText',
              wrapper: 'EuiCopy',
              allowed: DEFAULT_ALLOWED,
            },
          },
        ],
      },
      {
        name: 'EuiCopy block-body render prop with invalid branch in if/else is reported',
        code: dedent`
          <EuiButtonGroup legend="Actions">
            <EuiCopy textToCopy="text">
              {(copy) => {
                if (isBad) return <EuiText>Not a button</EuiText>;
                return <EuiButton onClick={copy}>Copy</EuiButton>;
              }}
            </EuiCopy>
          </EuiButtonGroup>
        `,
        languageOptions,
        errors: [
          {
            messageId: 'invalidUnresolvableWrapperChild',
            data: {
              name: 'EuiText',
              wrapper: 'EuiCopy',
              allowed: DEFAULT_ALLOWED,
            },
          },
        ],
      },

      // EuiPopover
      {
        name: 'invalid element in EuiPopover button prop',
        code: dedent`
          <EuiButtonGroup legend="Actions">
            <EuiPopover button={<EuiText>Not a button</EuiText>} isOpen={false} closePopover={() => {}}>
              Panel content
            </EuiPopover>
          </EuiButtonGroup>
        `,
        languageOptions,
        errors: [
          {
            messageId: 'invalidUnresolvablePopoverButton',
            data: { name: 'EuiText', allowed: DEFAULT_ALLOWED },
          },
        ],
      },
      {
        name: 'HTML element in EuiPopover button prop',
        code: dedent`
          <EuiButtonGroup legend="Actions">
            <EuiPopover button={<div>Not a button</div>} isOpen={false} closePopover={() => {}}>
              Panel content
            </EuiPopover>
          </EuiButtonGroup>
        `,
        languageOptions,
        errors: [
          {
            messageId: 'invalidPopoverButton',
            data: { name: 'div', allowed: DEFAULT_ALLOWED },
          },
        ],
      },
      {
        name: 'EuiToolTip in EuiPopover button prop with invalid child',
        code: dedent`
          <EuiButtonGroup legend="Actions">
            <EuiPopover
              button={<EuiToolTip content="Tip"><EuiText>Not a button</EuiText></EuiToolTip>}
              isOpen={false}
              closePopover={() => {}}
            >
              Panel content
            </EuiPopover>
          </EuiButtonGroup>
        `,
        languageOptions,
        errors: [
          {
            messageId: 'invalidUnresolvablePopoverButton',
            data: { name: 'EuiText', allowed: DEFAULT_ALLOWED },
          },
        ],
      },
      {
        name: 'EuiPopover button prop as resolved variable with invalid element is reported',
        code: dedent`
          const trigger = <EuiText>Not a button</EuiText>;
          <EuiButtonGroup legend="Actions">
            <EuiPopover button={trigger} isOpen={false} closePopover={() => {}}>
              Panel content
            </EuiPopover>
          </EuiButtonGroup>
        `,
        languageOptions,
        errors: [
          {
            messageId: 'invalidUnresolvablePopoverButton',
            data: { name: 'EuiText', allowed: DEFAULT_ALLOWED },
          },
        ],
      },
      {
        name: 'EuiPopover button prop as conditional with one invalid branch is reported',
        code: dedent`
          <EuiButtonGroup legend="Actions">
            <EuiPopover
              button={isIcon ? <EuiButtonIcon iconType="boxesVertical" aria-label="More" /> : <EuiText>Bad</EuiText>}
              isOpen={false}
              closePopover={() => {}}
            >
              Panel content
            </EuiPopover>
          </EuiButtonGroup>
        `,
        languageOptions,
        errors: [
          {
            messageId: 'invalidUnresolvablePopoverButton',
            data: { name: 'EuiText', allowed: DEFAULT_ALLOWED },
          },
        ],
      },

      // Invalid wrapper children
      {
        name: 'non-button inside EuiToolTip',
        code: dedent`
          <EuiButtonGroup legend="Actions">
            <EuiToolTip content="tip">
              <EuiFlexGroup>
                <EuiButtonIcon iconType="trash" aria-label="Delete" />
              </EuiFlexGroup>
            </EuiToolTip>
          </EuiButtonGroup>
        `,
        languageOptions,
        errors: [
          {
            messageId: 'invalidUnresolvableWrapperChild',
            data: {
              name: 'EuiFlexGroup',
              wrapper: 'EuiToolTip',
              allowed: DEFAULT_ALLOWED,
            },
          },
        ],
      },

      // EuiToolTip
      {
        name: 'conditional inside EuiToolTip with one invalid branch',
        code: dedent`
          <EuiButtonGroup legend="Actions">
            <EuiToolTip content="tip">
              {isIcon
                ? <EuiButtonIcon iconType="trash" aria-label="Delete" />
                : <EuiText>Not a button</EuiText>}
            </EuiToolTip>
          </EuiButtonGroup>
        `,
        languageOptions,
        errors: [
          {
            messageId: 'invalidUnresolvableWrapperChild',
            data: {
              name: 'EuiText',
              wrapper: 'EuiToolTip',
              allowed: DEFAULT_ALLOWED,
            },
          },
        ],
      },
      {
        name: 'variable inside EuiToolTip resolves to an invalid element',
        code: dedent`
          const icon = <EuiText>Not a button</EuiText>;
          <EuiButtonGroup legend="Actions">
            <EuiToolTip content="Delete">
              {icon}
            </EuiToolTip>
          </EuiButtonGroup>
        `,
        languageOptions,
        errors: [
          {
            messageId: 'invalidUnresolvableWrapperChild',
            data: {
              name: 'EuiText',
              wrapper: 'EuiToolTip',
              allowed: DEFAULT_ALLOWED,
            },
          },
        ],
      },

      // Fragments
      {
        name: 'shorthand fragment wrapping invalid element',
        code: dedent`
          <EuiButtonGroup legend="Actions">
            <>
              <EuiButton>Save</EuiButton>
              <EuiText>Not allowed</EuiText>
            </>
          </EuiButtonGroup>
        `,
        languageOptions,
        errors: [
          {
            messageId: 'invalidUnresolvableChild',
            data: { name: 'EuiText', allowed: DEFAULT_ALLOWED },
          },
        ],
      },
      {
        name: '<Fragment> wrapping invalid element',
        code: dedent`
          <EuiButtonGroup legend="Actions">
            <Fragment>
              <div>Not a button</div>
            </Fragment>
          </EuiButtonGroup>
        `,
        languageOptions,
        errors: [
          {
            messageId: 'invalidChild',
            data: { name: 'div', allowed: DEFAULT_ALLOWED },
          },
        ],
      },
      {
        name: '<React.Fragment> wrapping invalid element',
        code: dedent`
          <EuiButtonGroup legend="Actions">
            <React.Fragment>
              <EuiText>Not allowed</EuiText>
            </React.Fragment>
          </EuiButtonGroup>
        `,
        languageOptions,
        errors: [
          {
            messageId: 'invalidUnresolvableChild',
            data: { name: 'EuiText', allowed: DEFAULT_ALLOWED },
          },
        ],
      },
      {
        name: 'fragment inside EuiToolTip wrapping invalid element',
        code: dedent`
          <EuiButtonGroup legend="Actions">
            <EuiToolTip content="tip">
              <>
                <EuiText>Not a button</EuiText>
              </>
            </EuiToolTip>
          </EuiButtonGroup>
        `,
        languageOptions,
        errors: [
          {
            messageId: 'invalidUnresolvableWrapperChild',
            data: {
              name: 'EuiText',
              wrapper: 'EuiToolTip',
              allowed: DEFAULT_ALLOWED,
            },
          },
        ],
      },

      // Conditional children
      {
        name: '{condition && <EuiText />} right side is flagged',
        code: dedent`
          <EuiButtonGroup legend="Actions">
            <EuiButton>Save</EuiButton>
            {show && <EuiText>Not allowed</EuiText>}
          </EuiButtonGroup>
        `,
        languageOptions,
        errors: [
          {
            messageId: 'invalidUnresolvableChild',
            data: { name: 'EuiText', allowed: DEFAULT_ALLOWED },
          },
        ],
      },
      {
        name: 'ternary with one invalid branch',
        code: dedent`
          <EuiButtonGroup legend="Actions">
            {isAdmin ? <EuiButton>Delete</EuiButton> : <EuiText>No access</EuiText>}
          </EuiButtonGroup>
        `,
        languageOptions,
        errors: [
          {
            messageId: 'invalidUnresolvableChild',
            data: { name: 'EuiText', allowed: DEFAULT_ALLOWED },
          },
        ],
      },
      {
        name: 'ternary with both invalid branches reported separately',
        code: dedent`
          <EuiButtonGroup legend="Actions">
            {show ? <EuiText>A</EuiText> : <EuiBadge>B</EuiBadge>}
          </EuiButtonGroup>
        `,
        languageOptions,
        errors: [
          {
            messageId: 'invalidUnresolvableChild',
            data: { name: 'EuiText', allowed: DEFAULT_ALLOWED },
          },
          {
            messageId: 'invalidUnresolvableChild',
            data: { name: 'EuiBadge', allowed: DEFAULT_ALLOWED },
          },
        ],
      },

      {
        name: '{unresolvable || <EuiText />} invalid right side is flagged',
        code: dedent`
          <EuiButtonGroup legend="Actions">
            {fallback || <EuiText>Not a button</EuiText>}
          </EuiButtonGroup>
        `,
        languageOptions,
        errors: [
          {
            messageId: 'invalidUnresolvableChild',
            data: { name: 'EuiText', allowed: DEFAULT_ALLOWED },
          },
        ],
      },
      {
        name: '{unresolvable ?? <EuiText />} invalid right side is flagged',
        code: dedent`
          <EuiButtonGroup legend="Actions">
            {fallback ?? <EuiText>Not a button</EuiText>}
          </EuiButtonGroup>
        `,
        languageOptions,
        errors: [
          {
            messageId: 'invalidUnresolvableChild',
            data: { name: 'EuiText', allowed: DEFAULT_ALLOWED },
          },
        ],
      },
      {
        name: '{resolvedInvalidButton || <EuiButton />} resolved invalid left side is flagged',
        code: dedent`
          const resolvedButton = <EuiText>Not a button</EuiText>;
          <EuiButtonGroup legend="Actions">
            {resolvedButton || <EuiButton>Save</EuiButton>}
          </EuiButtonGroup>
        `,
        languageOptions,
        errors: [
          {
            messageId: 'invalidUnresolvableChild',
            data: { name: 'EuiText', allowed: DEFAULT_ALLOWED },
          },
        ],
      },

      // Unresolvable custom component
      {
        name: 'unresolvable custom component inside EuiToolTip uses invalidUnresolvableWrapperChild',
        code: dedent`
          <EuiButtonGroup legend="Actions">
            <EuiToolTip content="tip">
              <SaveButton />
            </EuiToolTip>
          </EuiButtonGroup>
        `,
        languageOptions,
        errors: [
          {
            messageId: 'invalidUnresolvableWrapperChild',
            data: {
              name: 'SaveButton',
              wrapper: 'EuiToolTip',
              allowed: DEFAULT_ALLOWED,
            },
          },
        ],
      },
      {
        name: 'unresolvable custom component inside EuiCopy render prop uses invalidUnresolvableWrapperChild',
        code: dedent`
          <EuiButtonGroup legend="Actions">
            <EuiCopy textToCopy="text">
              {(copy) => <SaveButton onClick={copy} />}
            </EuiCopy>
          </EuiButtonGroup>
        `,
        languageOptions,
        errors: [
          {
            messageId: 'invalidUnresolvableWrapperChild',
            data: {
              name: 'SaveButton',
              wrapper: 'EuiCopy',
              allowed: DEFAULT_ALLOWED,
            },
          },
        ],
      },

      // Variable resolution
      {
        name: 'const variable holding an invalid element is resolved and reported',
        code: dedent`
          const button = <EuiText>Not a button</EuiText>;
          <EuiButtonGroup legend="Actions">
            {button}
          </EuiButtonGroup>
        `,
        languageOptions,
        errors: [
          {
            messageId: 'invalidUnresolvableChild',
            data: { name: 'EuiText', allowed: DEFAULT_ALLOWED },
          },
        ],
      },
      {
        name: 'const variable holding an array with an invalid element is resolved and reported',
        code: dedent`
          const buttons = [
            <EuiButton key="save">Save</EuiButton>,
            <EuiText key="bad">Not a button</EuiText>,
          ];
          <EuiButtonGroup legend="Actions">
            {buttons}
          </EuiButtonGroup>
        `,
        languageOptions,
        errors: [
          {
            messageId: 'invalidUnresolvableChild',
            data: { name: 'EuiText', allowed: DEFAULT_ALLOWED },
          },
        ],
      },

      // Local arrow-function
      {
        name: 'local arrow-fn component with invalid return is resolved and reported at the invalid element',
        code: dedent`
          const ActionButtons = () => <EuiText>Not a button</EuiText>;
          <EuiButtonGroup legend="Actions">
            <ActionButtons />
          </EuiButtonGroup>
        `,
        languageOptions,
        errors: [
          {
            messageId: 'invalidUnresolvableChild',
            data: { name: 'EuiText', allowed: DEFAULT_ALLOWED },
          },
        ],
      },
      {
        name: 'local block-body arrow-fn component with invalid return is resolved and reported at the invalid element',
        code: dedent`
          const ActionButtons = () => { return <EuiText>Not a button</EuiText>; };
          <EuiButtonGroup legend="Actions">
            <ActionButtons />
          </EuiButtonGroup>
        `,
        languageOptions,
        errors: [
          {
            messageId: 'invalidUnresolvableChild',
            data: { name: 'EuiText', allowed: DEFAULT_ALLOWED },
          },
        ],
      },
      {
        name: 'local block-body arrow-fn component with invalid branch is resolved and reported',
        code: dedent`
          const ActionButtons = ({ isInvalid }) => {
            if (isInvalid) return <EuiText>Bad</EuiText>;
            return <EuiButton>Good</EuiButton>;
          };
          <EuiButtonGroup legend="Actions">
            <ActionButtons />
          </EuiButtonGroup>
        `,
        languageOptions,
        errors: [
          {
            messageId: 'invalidUnresolvableChild',
            data: { name: 'EuiText', allowed: DEFAULT_ALLOWED },
          },
        ],
      },
      {
        name: 'imported custom component cannot be resolved — uses invalidUnresolvableChild message',
        code: dedent`
          <EuiButtonGroup legend="Actions">
            <SaveButton />
          </EuiButtonGroup>
        `,
        languageOptions,
        errors: [
          {
            messageId: 'invalidUnresolvableChild',
            data: { name: 'SaveButton', allowed: DEFAULT_ALLOWED },
          },
        ],
      },

      // Array notation
      {
        name: 'array containing an invalid element',
        code: dedent`
          <EuiButtonGroup legend="Actions">
            {[
              <EuiButton key="save">Save</EuiButton>,
              <EuiText key="bad">Not allowed</EuiText>,
            ]}
          </EuiButtonGroup>
        `,
        languageOptions,
        errors: [
          {
            messageId: 'invalidUnresolvableChild',
            data: { name: 'EuiText', allowed: DEFAULT_ALLOWED },
          },
        ],
      },
      {
        name: 'array containing a wrapper (EuiToolTip) with an invalid inner element',
        code: dedent`
          <EuiButtonGroup legend="Actions">
            {[
              <EuiToolTip key="bad" content="tip">
                <EuiText>Not a button</EuiText>
              </EuiToolTip>,
            ]}
          </EuiButtonGroup>
        `,
        languageOptions,
        errors: [
          {
            messageId: 'invalidUnresolvableWrapperChild',
            data: {
              name: 'EuiText',
              wrapper: 'EuiToolTip',
              allowed: DEFAULT_ALLOWED,
            },
          },
        ],
      },

      // .map()
      {
        name: 'map() with expression-body returning invalid element is reported',
        code: dedent`
          <EuiButtonGroup legend="Actions">
            {buttons.map((b) => <div key={b.id}>{b.label}</div>)}
          </EuiButtonGroup>
        `,
        languageOptions,
        errors: [
          {
            messageId: 'invalidChild',
            data: { name: 'div', allowed: DEFAULT_ALLOWED },
          },
        ],
      },
      {
        name: 'map() with block-body returning invalid element is reported',
        code: dedent`
          <EuiButtonGroup legend="Actions">
            {buttons.map((b) => {
              return <div key={b.id}>{b.label}</div>;
            })}
          </EuiButtonGroup>
        `,
        languageOptions,
        errors: [
          {
            messageId: 'invalidChild',
            data: { name: 'div', allowed: DEFAULT_ALLOWED },
          },
        ],
      },
      {
        name: 'map() with block-body invalid branch is reported',
        code: dedent`
          <EuiButtonGroup legend="Actions">
            {buttons.map((b) => {
              if (b.type === 'bad') return <EuiText key={b.id}>{b.label}</EuiText>;
              return <EuiButton key={b.id}>{b.label}</EuiButton>;
            })}
          </EuiButtonGroup>
        `,
        languageOptions,
        errors: [
          {
            messageId: 'invalidUnresolvableChild',
            data: { name: 'EuiText', allowed: DEFAULT_ALLOWED },
          },
        ],
      },
      {
        name: 'variable holding map() result with invalid element is reported',
        code: dedent`
          const buttons = items.map((item) => <div key={item.id}>{item.label}</div>);
          <EuiButtonGroup legend="Actions">
            {buttons}
          </EuiButtonGroup>
        `,
        languageOptions,
        errors: [
          {
            messageId: 'invalidChild',
            data: { name: 'div', allowed: DEFAULT_ALLOWED },
          },
        ],
      },

      // Spread on wrapper
      {
        name: 'EuiToolTip with spread props still validates its children',
        code: dedent`
          <EuiButtonGroup legend="Actions">
            <EuiToolTip content="tip" {...tooltipProps}>
              <EuiText>Not a button</EuiText>
            </EuiToolTip>
          </EuiButtonGroup>
        `,
        languageOptions,
        errors: [
          {
            messageId: 'invalidUnresolvableWrapperChild',
            data: {
              name: 'EuiText',
              wrapper: 'EuiToolTip',
              allowed: DEFAULT_ALLOWED,
            },
          },
        ],
      },
      {
        name: 'EuiCopy with spread props still validates its render-prop child',
        code: dedent`
          <EuiButtonGroup legend="Actions">
            <EuiCopy textToCopy="text" {...copyProps}>
              {(copy) => <EuiText onClick={copy}>Not a button</EuiText>}
            </EuiCopy>
          </EuiButtonGroup>
        `,
        languageOptions,
        errors: [
          {
            messageId: 'invalidUnresolvableWrapperChild',
            data: {
              name: 'EuiText',
              wrapper: 'EuiCopy',
              allowed: DEFAULT_ALLOWED,
            },
          },
        ],
      },

      // Switch statement
      {
        name: 'local arrow-fn with switch containing invalid branch is reported',
        code: dedent`
          const ActionButton = ({ variant }) => {
            switch (variant) {
              case 'bad': return <EuiText>Not a button</EuiText>;
              default: return <EuiButton>Good</EuiButton>;
            }
          };
          <EuiButtonGroup legend="Actions">
            <ActionButton />
          </EuiButtonGroup>
        `,
        languageOptions,
        errors: [
          {
            messageId: 'invalidUnresolvableChild',
            data: { name: 'EuiText', allowed: DEFAULT_ALLOWED },
          },
        ],
      },

      // variant="segmented"
      {
        name: 'variant="segmented" with unsupported button component is reported',
        code: dedent`
          <EuiButtonGroup legend="Actions" variant="segmented">
            <EuiButtonEmpty color="text">Cancel</EuiButtonEmpty>
          </EuiButtonGroup>
        `,
        languageOptions,
        errors: [
          {
            messageId: 'invalidChild',
            data: { name: 'EuiButtonEmpty', allowed: SEGMENTED_ALLOWED },
          },
        ],
      },
      {
        name: 'variant="segmented" with plain HTML child is reported',
        code: dedent`
          <EuiButtonGroup legend="Actions" variant="segmented">
            <div>Not a button</div>
          </EuiButtonGroup>
        `,
        languageOptions,
        errors: [
          {
            messageId: 'invalidChild',
            data: { name: 'div', allowed: SEGMENTED_ALLOWED },
          },
        ],
      },
      {
        name: 'variant="segmented" with unsupported component is reported',
        code: dedent`
          <EuiButtonGroup legend="Actions" variant="segmented">
            <EuiButton>Save</EuiButton>
            <EuiText>Not allowed</EuiText>
          </EuiButtonGroup>
        `,
        languageOptions,
        errors: [
          {
            messageId: 'invalidUnresolvableChild',
            data: { name: 'EuiText', allowed: SEGMENTED_ALLOWED },
          },
        ],
      },
      {
        name: 'variant="segmented" with unsupported component inside a fragment is reported',
        code: dedent`
          <EuiButtonGroup legend="Actions" variant="segmented">
            <>
              <EuiButton>Save</EuiButton>
              <EuiButtonEmpty color="text">Cancel</EuiButtonEmpty>
            </>
          </EuiButtonGroup>
        `,
        languageOptions,
        errors: [
          {
            messageId: 'invalidChild',
            data: { name: 'EuiButtonEmpty', allowed: SEGMENTED_ALLOWED },
          },
        ],
      },
      {
        name: 'variant="segmented" with unresolvable custom component is reported',
        code: dedent`
          <EuiButtonGroup legend="Actions" variant="segmented">
            <SaveButton />
          </EuiButtonGroup>
        `,
        languageOptions,
        errors: [
          {
            messageId: 'invalidUnresolvableChild',
            data: { name: 'SaveButton', allowed: SEGMENTED_ALLOWED },
          },
        ],
      },
      {
        name: 'variant="segmented" with unsupported component inside EuiToolTip is reported',
        code: dedent`
          <EuiButtonGroup legend="Actions" variant="segmented">
            <EuiToolTip content="Cancel">
              <EuiButtonEmpty color="text">Cancel</EuiButtonEmpty>
            </EuiToolTip>
          </EuiButtonGroup>
        `,
        languageOptions,
        errors: [
          {
            messageId: 'invalidWrapperChild',
            data: {
              name: 'EuiButtonEmpty',
              wrapper: 'EuiToolTip',
              allowed: SEGMENTED_ALLOWED,
            },
          },
        ],
      },
      {
        name: 'variant="segmented" with unresolvable custom component inside EuiToolTip is reported',
        code: dedent`
          <EuiButtonGroup legend="Actions" variant="segmented">
            <EuiToolTip content="tip">
              <SaveButton />
            </EuiToolTip>
          </EuiButtonGroup>
        `,
        languageOptions,
        errors: [
          {
            messageId: 'invalidUnresolvableWrapperChild',
            data: {
              name: 'SaveButton',
              wrapper: 'EuiToolTip',
              allowed: SEGMENTED_ALLOWED,
            },
          },
        ],
      },
      {
        name: 'variant="segmented" with EuiPopover using an unsupported component as trigger is reported',
        code: dedent`
          <EuiButtonGroup legend="Actions" variant="segmented">
            <EuiPopover button={<EuiButtonEmpty color="text">More</EuiButtonEmpty>} isOpen={false} closePopover={() => {}}>
              <p>Panel content</p>
            </EuiPopover>
          </EuiButtonGroup>
        `,
        languageOptions,
        errors: [
          {
            messageId: 'invalidPopoverButton',
            data: { name: 'EuiButtonEmpty', allowed: SEGMENTED_ALLOWED },
          },
        ],
      },
      {
        name: 'variant="segmented" with EuiPopover using invalid HTML element as trigger is reported',
        code: dedent`
          <EuiButtonGroup legend="Actions" variant="segmented">
            <EuiPopover button={<div>Not a button</div>} isOpen={false} closePopover={() => {}}>
              <p>Panel content</p>
            </EuiPopover>
          </EuiButtonGroup>
        `,
        languageOptions,
        errors: [
          {
            messageId: 'invalidPopoverButton',
            data: { name: 'div', allowed: SEGMENTED_ALLOWED },
          },
        ],
      },
      {
        name: 'variant="segmented" with EuiPopover and EuiToolTip wrapping an unsupported component as trigger is reported',
        code: dedent`
          <EuiButtonGroup legend="Actions" variant="segmented">
            <EuiPopover
              button={<EuiToolTip content="More"><EuiButtonEmpty>More</EuiButtonEmpty></EuiToolTip>}
              isOpen={false}
              closePopover={() => {}}
            >
              <p>Panel content</p>
            </EuiPopover>
          </EuiButtonGroup>
        `,
        languageOptions,
        errors: [
          {
            messageId: 'invalidPopoverButton',
            data: { name: 'EuiButtonEmpty', allowed: SEGMENTED_ALLOWED },
          },
        ],
      },
      {
        name: 'variant="segmented" with EuiCopy wrapping an unsupported component is reported',
        code: dedent`
          <EuiButtonGroup legend="Actions" variant="segmented">
            <EuiCopy textToCopy="text">
              {(copy) => <EuiButtonEmpty onClick={copy}>Copy</EuiButtonEmpty>}
            </EuiCopy>
          </EuiButtonGroup>
        `,
        languageOptions,
        errors: [
          {
            messageId: 'invalidWrapperChild',
            data: {
              name: 'EuiButtonEmpty',
              wrapper: 'EuiCopy',
              allowed: SEGMENTED_ALLOWED,
            },
          },
        ],
      },
      {
        name: 'variant="segmented" mixing EuiButton and EuiButtonIcon children is reported',
        code: dedent`
          <EuiButtonGroup legend="Actions" variant="segmented">
            <EuiButton>Save</EuiButton>
            <EuiButtonIcon iconType="trash" aria-label="Delete" />
          </EuiButtonGroup>
        `,
        languageOptions,
        errors: [{ messageId: 'invalidSegmentedMixedTypes' }],
      },
      {
        name: 'variant="segmented" mixing EuiButton and EuiButtonIcon inside a fragment is reported',
        code: dedent`
          <EuiButtonGroup legend="Actions" variant="segmented">
            <>
              <EuiButton>Save</EuiButton>
              <EuiButtonIcon iconType="trash" aria-label="Delete" />
            </>
          </EuiButtonGroup>
        `,
        languageOptions,
        errors: [{ messageId: 'invalidSegmentedMixedTypes' }],
      },
      {
        name: 'variant="segmented" mixing EuiButton and EuiButtonIcon via EuiToolTip is reported',
        code: dedent`
          <EuiButtonGroup legend="Actions" variant="segmented">
            <EuiButton>Save</EuiButton>
            <EuiToolTip content="Delete">
              <EuiButtonIcon iconType="trash" aria-label="Delete" />
            </EuiToolTip>
          </EuiButtonGroup>
        `,
        languageOptions,
        errors: [{ messageId: 'invalidSegmentedMixedTypes' }],
      },
      {
        name: 'variant="segmented" mixing EuiButton and EuiButtonIcon via EuiPopover trigger is reported',
        code: dedent`
          <EuiButtonGroup legend="Actions" variant="segmented">
            <EuiButton>Save</EuiButton>
            <EuiPopover button={<EuiButtonIcon iconType="menu" aria-label="More" />} isOpen={false} closePopover={() => {}}>
              <p>Panel content</p>
            </EuiPopover>
          </EuiButtonGroup>
        `,
        languageOptions,
        errors: [{ messageId: 'invalidSegmentedMixedTypes' }],
      },
      {
        name: 'variant="segmented" mixing EuiButton and EuiButtonIcon via EuiPopover with EuiToolTip-wrapped trigger is reported',
        code: dedent`
          <EuiButtonGroup legend="Actions" variant="segmented">
            <EuiButton>Save</EuiButton>
            <EuiPopover
              button={<EuiToolTip content="More"><EuiButtonIcon iconType="menu" aria-label="More" /></EuiToolTip>}
              isOpen={false}
              closePopover={() => {}}
            >
              <p>Panel content</p>
            </EuiPopover>
          </EuiButtonGroup>
        `,
        languageOptions,
        errors: [{ messageId: 'invalidSegmentedMixedTypes' }],
      },
      {
        name: 'variant="segmented" mixing EuiButton and EuiButtonIcon via EuiCopy render prop is reported',
        code: dedent`
          <EuiButtonGroup legend="Actions" variant="segmented">
            <EuiButtonIcon iconType="plus" aria-label="Add" />
            <EuiCopy textToCopy="text">
              {(copy) => <EuiButton onClick={copy}>Copy</EuiButton>}
            </EuiCopy>
          </EuiButtonGroup>
        `,
        languageOptions,
        errors: [{ messageId: 'invalidSegmentedMixedTypes' }],
      },
    ],
  }
);
