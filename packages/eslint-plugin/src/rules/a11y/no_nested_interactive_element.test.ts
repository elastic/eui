/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import dedent from 'dedent';
import { RuleTester } from '@typescript-eslint/rule-tester';
import { NoNestedInteractiveElement } from './no_nested_interactive_element';

const languageOptions = {
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
  },
};

const ruleTester = new RuleTester();

ruleTester.run('no-nested-interactive-element', NoNestedInteractiveElement, {
  valid: [
    {
      name: 'plain text inside a button',
      code: dedent`
        <EuiButton onClick={onClick}>Save</EuiButton>
      `,
      languageOptions,
    },
    {
      name: 'non-interactive content inside a button',
      code: dedent`
        <EuiButton onClick={onClick}>
          <EuiIcon type="check" />
          <EuiText>Save</EuiText>
        </EuiButton>
      `,
      languageOptions,
    },
    {
      name: 'non-clickable badge inside a link',
      code: dedent`
        <EuiLink href="/docs">
          Docs <EuiBadge color="hollow">new</EuiBadge>
        </EuiLink>
      `,
      languageOptions,
    },
    {
      name: 'buttons as siblings',
      code: dedent`
        <EuiFlexGroup>
          <EuiButton>Save</EuiButton>
          <EuiButtonEmpty>Cancel</EuiButtonEmpty>
        </EuiFlexGroup>
      `,
      languageOptions,
    },
    {
      name: 'composite components may contain controls',
      code: dedent`
        <EuiBasicTable columns={columns} items={items}>
          <EuiButton>Refresh</EuiButton>
        </EuiBasicTable>
      `,
      languageOptions,
    },
    {
      name: 'non-clickable card with a footer button',
      code: dedent`
        <EuiCard title="Title" description="Description" footer={<EuiButton>Go</EuiButton>} />
      `,
      languageOptions,
    },
    {
      name: 'clickable card with non-interactive content',
      code: dedent`
        <EuiCard title="Title" description="Description" onClick={onClick}>
          <EuiText>More detail</EuiText>
        </EuiCard>
      `,
      languageOptions,
    },
    {
      name: 'list group item extra action renders a sibling control',
      code: dedent`
        <EuiListGroupItem
          label="Item"
          onClick={onClick}
          extraAction={{ iconType: 'trash', 'aria-label': 'Delete' }}
        />
      `,
      languageOptions,
    },
    {
      name: 'selectable card with a footer action',
      code: dedent`
        <EuiCard
          title="Title"
          description="Description"
          selectable={{ onClick: onSelect }}
          footer={<EuiButtonEmpty onClick={onDetails}>Details</EuiButtonEmpty>}
        />
      `,
      languageOptions,
    },
    {
      name: 'string content prop',
      code: dedent`
        <EuiListGroupItem label="Item" onClick={onClick} />
      `,
      languageOptions,
    },
    {
      name: 'dynamic content cannot be statically analyzed',
      code: dedent`
        <EuiButton onClick={onClick}>{renderLabel()}</EuiButton>
      `,
      languageOptions,
    },
  ],
  invalid: [
    {
      name: 'link inside a button',
      code: dedent`
        <EuiButton onClick={onClick}>
          Read the <EuiLink href="/docs">docs</EuiLink>
        </EuiButton>
      `,
      errors: [{ messageId: 'nestedInteractive' }],
      languageOptions,
    },
    {
      name: 'native button inside a link',
      code: dedent`
        <EuiLink href="/docs">
          <button onClick={onClick}>Dismiss</button>
        </EuiLink>
      `,
      errors: [{ messageId: 'nestedInteractive' }],
      languageOptions,
    },
    {
      name: 'interactive element behind a layout wrapper',
      code: dedent`
        <EuiFacetButton quantity={5}>
          <EuiFlexGroup>
            <EuiFlexItem>
              <EuiButtonIcon iconType="cross" aria-label="Clear" />
            </EuiFlexItem>
          </EuiFlexGroup>
        </EuiFacetButton>
      `,
      errors: [{ messageId: 'nestedInteractive' }],
      languageOptions,
    },
    {
      name: 'clickable badge inside a button',
      code: dedent`
        <EuiButtonEmpty onClick={onClick}>
          Filters <EuiBadge onClick={onBadgeClick}>3</EuiBadge>
        </EuiButtonEmpty>
      `,
      errors: [{ messageId: 'nestedInteractive' }],
      languageOptions,
    },
    {
      name: 'control in a list group item label',
      code: dedent`
        <EuiListGroupItem onClick={onClick} label={<EuiLink href="/docs">Docs</EuiLink>} />
      `,
      errors: [{ messageId: 'nestedInteractive' }],
      languageOptions,
    },
    {
      name: 'control in a key pad menu item label',
      code: dedent`
        <EuiKeyPadMenuItem label={<EuiButtonIcon iconType="gear" aria-label="Settings" />}>
          <EuiIcon type="dashboardApp" size="l" />
        </EuiKeyPadMenuItem>
      `,
      errors: [{ messageId: 'nestedInteractive' }],
      languageOptions,
    },
    {
      name: 'two nested controls are reported separately',
      code: dedent`
        <EuiTab onClick={onClick}>
          Metrics
          <EuiButtonIcon iconType="pin" aria-label="Pin" />
          <EuiButtonIcon iconType="cross" aria-label="Close" />
        </EuiTab>
      `,
      errors: [
        { messageId: 'nestedInteractive' },
        { messageId: 'nestedInteractive' },
      ],
      languageOptions,
    },
    {
      name: 'tooltip wrapper does not hide the nested control',
      code: dedent`
        <EuiButton onClick={onClick}>
          Save
          <EuiToolTip content="Undo">
            <EuiButtonIcon iconType="editorUndo" aria-label="Undo" />
          </EuiToolTip>
        </EuiButton>
      `,
      errors: [{ messageId: 'nestedInteractive' }],
      languageOptions,
    },
    {
      name: 'control resolved through a local variable',
      code: dedent`
        const action = <EuiLink href="/docs">Docs</EuiLink>;
        const el = <EuiButton onClick={onClick}>Save {action}</EuiButton>;
      `,
      errors: [{ messageId: 'nestedInteractive' }],
      languageOptions,
    },
    {
      name: 'control resolved through a local arrow-function component',
      code: dedent`
        const Docs = () => <EuiLink href="/docs">Docs</EuiLink>;
        const el = (
          <EuiButton onClick={onClick}>
            Save <Docs />
          </EuiButton>
        );
      `,
      errors: [{ messageId: 'nestedInteractive' }],
      languageOptions,
    },
    {
      name: 'footer button inside a clickable card',
      code: dedent`
        <EuiCard
          title="Title"
          description="Description"
          onClick={onClick}
          footer={<EuiButton>Go</EuiButton>}
        />
      `,
      errors: [{ messageId: 'clickableCardContent' }],
      languageOptions,
    },
    {
      name: 'link in the children of a card with href',
      code: dedent`
        <EuiCard title="Title" description="Description" href="/app">
          <EuiLink href="/docs">Learn more</EuiLink>
        </EuiCard>
      `,
      errors: [{ messageId: 'clickableCardContent' }],
      languageOptions,
    },
  ],
});
