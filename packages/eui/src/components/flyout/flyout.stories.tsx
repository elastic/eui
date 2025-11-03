/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { useRef, useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import {
  EuiButton,
  EuiButtonEmpty,
  EuiCallOut,
  EuiCodeBlock,
  EuiSpacer,
  EuiText,
  EuiTitle,
  EuiForm,
  EuiFormRow,
  EuiFieldText,
  EuiSelect,
  EuiSwitch,
  EuiComboBox,
  EuiFlexGroup,
  EuiFlexItem,
  EuiListGroup,
  EuiListGroupItem,
  EuiBreadcrumbs,
  EuiBasicTable,
  EuiPanel,
} from '../index';

import {
  EuiFlyout,
  EuiFlyoutProps,
  EuiFlyoutBody,
  EuiFlyoutHeader,
  EuiFlyoutFooter,
  EuiFlyoutResizable,
} from './index';
import {
  EuiFlyoutManager,
  EuiFlyoutMain,
  EuiFlyoutChild,
} from './manager';
import { LOKI_SELECTORS } from '../../../.storybook/loki';

const meta: Meta<EuiFlyoutProps> = {
  title: 'Layout/EuiFlyout/EuiFlyout',
  component: EuiFlyout,
  argTypes: {
    as: { control: 'text' },
    // TODO: maxWidth has multiple types
  },
  args: {
    // Component defaults
    as: 'div',
    type: 'overlay',
    side: 'right',
    size: 'm',
    paddingSize: 'l',
    pushAnimation: false,
    pushMinBreakpoint: 'l',
    closeButtonPosition: 'inside',
    hideCloseButton: false,
    ownFocus: true,
  },
  parameters: {
    loki: {
      // Flyout content is rendered in a portal
      chromeSelector: LOKI_SELECTORS.portal,
    },
  },
};

export default meta;
type Story = StoryObj<EuiFlyoutProps>;

const onClose = action('onClose');

const StatefulFlyout = (
  props: Partial<Omit<EuiFlyoutProps, 'children'> & { onToggle: (open: boolean) => void }> & {
    children?: React.ReactNode | ((close: () => void) => React.ReactNode);
  }
) => {
  const { onToggle, children, ...rest } = props;
  const [_isOpen, setIsOpen] = useState(true);

  const handleToggle = (open: boolean) => {
    setIsOpen(open);
    onToggle?.(open);
  };

  const handleClose = () => {
    handleToggle(false);
    onClose();
  };

  return (
    <>
      <EuiButton size="s" onClick={() => handleToggle(!_isOpen)}>
        Toggle flyout
      </EuiButton>
      {_isOpen && (
        <EuiFlyout {...rest} onClose={handleClose}>
          {typeof children === 'function' ? children(handleClose) : children}
        </EuiFlyout>
      )}
    </>
  );
};

export const Playground: Story = {
  render: ({ ...args }) => (
    <StatefulFlyout {...args} onToggle={(open) => !open && onClose()}>
      {(close) => (
        <>
          <EuiFlyoutHeader hasBorder>
            <EuiTitle size="m">
              <h2>Flyout header</h2>
            </EuiTitle>
          </EuiFlyoutHeader>
          <EuiFlyoutBody>Flyout body</EuiFlyoutBody>
          <EuiFlyoutFooter>
            <EuiFlexGroup justifyContent="spaceBetween">
              <EuiFlexItem grow={false}>
                <EuiButtonEmpty iconType="cross" onClick={close}>
                  Cancel
                </EuiButtonEmpty>
              </EuiFlexItem>
              <EuiFlexItem grow={false}>
                <EuiButton fill>Save changes</EuiButton>
              </EuiFlexItem>
            </EuiFlexGroup>
          </EuiFlyoutFooter>
        </>
      )}
    </StatefulFlyout>
  ),
};

export const PushFlyouts: Story = {
  parameters: {
    controls: {
      include: ['pushAnimation', 'pushMinBreakpoint', 'side', 'size', 'type'],
    },
    loki: {
      chromeSelector: LOKI_SELECTORS.default,
    },
  },
  args: {
    type: 'push',
    pushAnimation: false,
    pushMinBreakpoint: 'm',
  },
  render: ({ ...args }) => {
    const [isOpen, setIsOpen] = useState(false);
    const fillerText = (
      <EuiText>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed eu
          condimentum ipsum, nec ornare metus. Sed egestas elit nec placerat
          suscipit. Cras pulvinar nisi eget enim sodales fringilla. Aliquam
          lobortis lorem at ornare aliquet.
        </p>
      </EuiText>
    );
    return (
      <div style={{padding: '24px'}}>
        <EuiButton size="s" onClick={() => setIsOpen(!isOpen)}>
          Toggle flyout
        </EuiButton>
        {isOpen && (
          <EuiFlyout
            {...args}
            onClose={() => {
              setIsOpen(false);
              onClose();
            }}
          >
            <EuiFlyoutBody>{fillerText}</EuiFlyoutBody>
          </EuiFlyout>
        )}
        <EuiSpacer size="m" />
        <EuiPanel>
          <EuiText><p>The content will resized to fit the flyout.</p></EuiText>
        </EuiPanel>
      </div>
    );
  },
};

export const Resizable: Story = {
  parameters: {
    codeSnippet: {
      snippet: `const [isOpen, setIsOpen] = useState(false);
const titleId = 'resizableFlyoutTitle';

<>
  <EuiButton onClick={() => setIsOpen(true)}>
    Open resizable flyout
  </EuiButton>

  {isOpen && (
    <EuiFlyoutResizable
      aria-labelledby={titleId}
      onClose={() => setIsOpen(false)}
      minWidth={420}
      maxWidth={800}
    >
      <EuiFlyoutHeader hasBorder>
        <EuiTitle size="m">
          <h2 id={titleId}>Document details</h2>
        </EuiTitle>
        <EuiSpacer size="s" />
        <EuiText size="s" color="subdued">
          <p>
            Drag the left edge of the flyout to resize when you need
            more space for wide content.
          </p>
        </EuiText>
      </EuiFlyoutHeader>

      <EuiFlyoutBody>
        <EuiText size="s">
          <p>
            Resizable flyouts are useful when content width is
            unpredictable, like long field values or JSON payloads.
          </p>
        </EuiText>
        <EuiSpacer />
        <EuiCodeBlock
          language="json"
          fontSize="s"
          isCopyable
          overflowHeight={200}
        >
          {\`{
  "id": "a2f9c4d1-39c2-4f89-a81e-93a3f42c1b7e",
  "user": {
    "name": "elastic-observability",
    "email": "alerts@example.com"
  },
  "message": "The flyout width may need to grow to keep this readable.",
  "tags": ["alert", "observability", "resizable"]
}\`}
        </EuiCodeBlock>
      </EuiFlyoutBody>

      <EuiFlyoutFooter>
        <EuiFlexGroup justifyContent="flexEnd" gutterSize="s" responsive={false}>
          <EuiFlexItem grow={false}>
            <EuiButtonEmpty onClick={() => setIsOpen(false)}>
              Close
            </EuiButtonEmpty>
          </EuiFlexItem>
        </EuiFlexGroup>
      </EuiFlyoutFooter>
    </EuiFlyoutResizable>
  )}
</>`,
    },
  },
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    const titleId = 'resizableFlyoutTitle';

    return (
      <>
        <EuiButton onClick={() => setIsOpen(true)}>
          Open resizable flyout
        </EuiButton>

        {isOpen && (
          <EuiFlyoutResizable
            aria-labelledby={titleId}
            minWidth={420}
            maxWidth={800}
            onClose={(event) => {
              setIsOpen(false);
              onClose(event);
            }}
          >
            <EuiFlyoutHeader hasBorder>
              <EuiTitle size="m">
                <h2 id={titleId}>Document details</h2>
              </EuiTitle>
              <EuiSpacer size="s" />
              <EuiText size="s" color="subdued">
                <p>
                  Drag the left edge of the flyout to resize when you
                  need more space for wide content.
                </p>
              </EuiText>
            </EuiFlyoutHeader>

            <EuiFlyoutBody>
              <EuiText size="s">
                <p>
                  Resizable flyouts are useful when content width is
                  unpredictable, like long field values or JSON payloads.
                </p>
              </EuiText>
              <EuiSpacer />
              <EuiCodeBlock
                language="json"
                fontSize="s"
                isCopyable
                overflowHeight={200}
              >
                {`{
  "id": "a2f9c4d1-39c2-4f89-a81e-93a3f42c1b7e",
  "user": {
    "name": "elastic-observability",
    "email": "alerts@example.com"
  },
  "message": "The flyout width may need to grow to keep this readable.",
  "tags": ["alert", "observability", "resizable"]
}`}
              </EuiCodeBlock>
            </EuiFlyoutBody>

            <EuiFlyoutFooter>
              <EuiFlexGroup
                justifyContent="flexEnd"
                gutterSize="s"
                responsive={false}
              >
                <EuiFlexItem grow={false}>
                  <EuiButtonEmpty onClick={() => setIsOpen(false)}>
                    Close
                  </EuiButtonEmpty>
                </EuiFlexItem>
              </EuiFlexGroup>
            </EuiFlyoutFooter>
          </EuiFlyoutResizable>
        )}
      </>
    );
  },
};

export const ResizableWithPush: Story = {
  parameters: {
    codeSnippet: {
      snippet: `const [isOpen, setIsOpen] = useState(false);
const titleId = 'resizablePushFlyoutTitle';

<>
  <EuiButton onClick={() => setIsOpen(true)}>
    Open resizable push flyout
  </EuiButton>

  {isOpen && (
    <EuiFlyoutResizable
      type="push"
      aria-labelledby={titleId}
      onClose={() => setIsOpen(false)}
      minWidth={420}
      maxWidth={800}
    >
      <EuiFlyoutHeader hasBorder>
        <EuiTitle size="m">
          <h2 id={titleId}>Document details</h2>
        </EuiTitle>
        <EuiSpacer size="s" />
        <EuiText size="s" color="subdued">
          <p>
            This resizable flyout pushes page content instead of
            overlaying it. Drag the left edge to resize.
          </p>
        </EuiText>
      </EuiFlyoutHeader>

      <EuiFlyoutBody>
        <EuiText size="s">
          <p>
            Combine resizable with push type when you want users to
            reference page content while viewing flyout details.
          </p>
        </EuiText>
        <EuiSpacer />
        <EuiCodeBlock
          language="json"
          fontSize="s"
          isCopyable
          overflowHeight={200}
        >
{\`{
  "id": "a2f9c4d1-39c2-4f89-a81e-93a3f42c1b7e",
  "user": {
    "name": "elastic-observability",
    "email": "alerts@example.com"
  },
  "message": "The flyout width may need to grow to keep this readable.",
  "tags": ["alert", "observability", "resizable"]
}\`}
        </EuiCodeBlock>
      </EuiFlyoutBody>

      <EuiFlyoutFooter>
        <EuiFlexGroup justifyContent="flexEnd" gutterSize="s" responsive={false}>
          <EuiFlexItem grow={false}>
            <EuiButtonEmpty onClick={() => setIsOpen(false)}>
              Close
            </EuiButtonEmpty>
          </EuiFlexItem>
        </EuiFlexGroup>
      </EuiFlyoutFooter>
    </EuiFlyoutResizable>
  )}
</>`,
    },
  },
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    const titleId = 'resizablePushFlyoutTitle';

    return (
      <>
        <EuiButton onClick={() => setIsOpen(true)}>
          Open resizable push flyout
        </EuiButton>

        {isOpen && (
          <EuiFlyoutResizable
            type="push"
            aria-labelledby={titleId}
            minWidth={420}
            maxWidth={800}
            onClose={(event) => {
              setIsOpen(false);
              onClose(event);
            }}
          >
            <EuiFlyoutHeader hasBorder>
              <EuiTitle size="m">
                <h2 id={titleId}>Document details</h2>
              </EuiTitle>
              <EuiSpacer size="s" />
              <EuiText size="s" color="subdued">
                <p>
                  This resizable flyout pushes page content instead of
                  overlaying it. Drag the left edge to resize.
                </p>
              </EuiText>
            </EuiFlyoutHeader>

            <EuiFlyoutBody>
              <EuiText size="s">
                <p>
                  Combine resizable with push type when you want users to
                  reference page content while viewing flyout details.
                </p>
              </EuiText>
              <EuiSpacer />
              <EuiCodeBlock
                language="json"
                fontSize="s"
                isCopyable
                overflowHeight={200}
              >
                {`{
  "id": "a2f9c4d1-39c2-4f89-a81e-93a3f42c1b7e",
  "user": {
    "name": "elastic-observability",
    "email": "alerts@example.com"
  },
  "message": "The flyout width may need to grow to keep this readable.",
  "tags": ["alert", "observability", "resizable"]
}`}
              </EuiCodeBlock>
            </EuiFlyoutBody>

            <EuiFlyoutFooter>
              <EuiFlexGroup
                justifyContent="flexEnd"
                gutterSize="s"
                responsive={false}
              >
                <EuiFlexItem grow={false}>
                  <EuiButtonEmpty onClick={() => setIsOpen(false)}>
                    Close
                  </EuiButtonEmpty>
                </EuiFlexItem>
              </EuiFlexGroup>
            </EuiFlyoutFooter>
          </EuiFlyoutResizable>
        )}
      </>
    );
  },
};

export const ManualReturnFocus: Story = {
  parameters: {
    controls: {
      include: ['focusTrapProps'],
    },
  },
  args: {
    children: (
      <>
        <EuiFlyoutHeader hasBorder>
          <EuiTitle size="m">
            <h2>Flyout header</h2>
          </EuiTitle>
        </EuiFlyoutHeader>
        <EuiFlyoutBody>Flyout body</EuiFlyoutBody>
        <EuiFlyoutFooter>
          <EuiButton fill>Flyout footer</EuiButton>
        </EuiFlyoutFooter>
      </>
    ),
  },
  render: function Render({ ...args }) {
    const manualTriggerRef = useRef<HTMLButtonElement>(null);

    return (
      <>
        <EuiButton size="s" buttonRef={manualTriggerRef}>
          Manual trigger
        </EuiButton>
        <EuiSpacer size="s" />
        <StatefulFlyout
          {...args}
          focusTrapProps={{
            ...args.focusTrapProps,
            returnFocus: (returnTo: Element) => {
              if (manualTriggerRef.current) {
                manualTriggerRef.current?.focus();
                return false;
              }

              if (returnTo && returnTo !== document.body) {
                return true;
              }

              return false;
            },
          }}
        />
      </>
    );
  },
};

export const HighContrast: Story = {
  tags: ['vrt-only'],
  globals: { highContrastMode: true },
  args: {
    children: (
      <>
        <EuiFlyoutHeader hasBorder>
          <EuiTitle size="m">
            <h2>Flyout header</h2>
          </EuiTitle>
        </EuiFlyoutHeader>
        <EuiFlyoutBody banner={<EuiCallOut>Flyout banner</EuiCallOut>}>
          Flyout body
        </EuiFlyoutBody>
        <EuiFlyoutFooter>
          <EuiButton fill>Flyout footer</EuiButton>
        </EuiFlyoutFooter>
      </>
    ),
  },
};

// Pattern stories

export const BasicBodyOnly: Story = {
  parameters: {
    codeSnippet: {
      snippet: `const [isOpen, setIsOpen] = useState(false);

<>
  <EuiButton onClick={() => setIsOpen(true)}>Open flyout</EuiButton>
  {isOpen && (
    <EuiFlyout
      aria-label="Quick reference flyout"
      onClose={() => setIsOpen(false)}
    >
      <EuiFlyoutBody>
        <EuiText>
          <p>
            Use this minimal flyout for quick supporting content that doesn't
            require a header or footer.
          </p>
          <ul>
            <li>Show brief contextual help or tips.</li>
            <li>Display read-only details or metadata.</li>
          </ul>
        </EuiText>
        <EuiSpacer />
      </EuiFlyoutBody>
    </EuiFlyout>
  )}
</>`,
    },
  },
  render: () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <>
        <EuiButton onClick={() => setIsOpen(true)}>Open flyout</EuiButton>
        {isOpen && (
          <EuiFlyout
            aria-label="Quick reference flyout"
            onClose={() => {
              setIsOpen(false);
              onClose();
            }}
          >
            <EuiFlyoutBody>
              <EuiText>
                <p>
                  Use this minimal flyout for quick supporting content that
                  doesn't require a header or footer.
                </p>
                <ul>
                  <li>Show brief contextual help or tips.</li>
                  <li>Display read-only details or metadata.</li>
                </ul>
              </EuiText>
              <EuiSpacer />
            </EuiFlyoutBody>
          </EuiFlyout>
        )}
      </>
    );
  },
};


export const WithHeader: Story = {
  parameters: {
    codeSnippet: {
      snippet: `const [isOpen, setIsOpen] = useState(false);
const titleId = 'flyoutWithHeaderTitle';

<>
  <EuiButton onClick={() => setIsOpen(true)}>Open flyout</EuiButton>
  {isOpen && (
    <EuiFlyout aria-labelledby={titleId} onClose={() => setIsOpen(false)}>
      <EuiFlyoutHeader hasBorder>
        <EuiTitle size="m">
          <h2 id={titleId}>Keyboard shortcuts</h2>
        </EuiTitle>
        <EuiSpacer size="s" />
        <EuiText size="s" color="subdued">
          <p>
            A recommended minimal accessible flyout pattern for
            read-only reference content.
          </p>
        </EuiText>
      </EuiFlyoutHeader>
      <EuiFlyoutBody>
        <EuiText>
          <p>
            Use a header when you need a clear title and context, even if there
            are no footer actions.
          </p>
          <ul>
            <li><strong>Ctrl + /</strong> – Toggle help</li>
            <li><strong>Ctrl + K</strong> – Open command palette</li>
            <li><strong>Ctrl + F</strong> – Search within the page</li>
          </ul>
          <p>
            Users can close the flyout with the default close button when
            they&apos;re done.
          </p>
        </EuiText>
      </EuiFlyoutBody>
    </EuiFlyout>
  )}
</>`,
    },
  },
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    const titleId = 'flyoutWithHeaderTitle';

    return (
      <>
        <EuiButton onClick={() => setIsOpen(true)}>Open flyout</EuiButton>
        {isOpen && (
          <EuiFlyout
            aria-labelledby={titleId}
            onClose={() => {
              setIsOpen(false);
              onClose();
            }}
          >
            <EuiFlyoutHeader hasBorder>
              <EuiTitle size="m">
                <h2 id={titleId}>Keyboard shortcuts</h2>
              </EuiTitle>
              <EuiSpacer size="s" />
              <EuiText size="s" color="subdued">
                <p>
                  A recommended minimal accessible flyout pattern for
                  read-only reference content.
                </p>
              </EuiText>
            </EuiFlyoutHeader>
            <EuiFlyoutBody>
              <EuiText>
                <p>
                  Use a header when you need a clear title and context, even if
                  there are no footer actions.
                </p>
                <ul>
                  <li>
                    <strong>Ctrl + /</strong> – Toggle help
                  </li>
                  <li>
                    <strong>Ctrl + K</strong> – Open command palette
                  </li>
                  <li>
                    <strong>Ctrl + F</strong> – Search within the page
                  </li>
                </ul>
                <p>
                  Users can close the flyout with the default close button when
                  they&apos;re done.
                </p>
              </EuiText>
            </EuiFlyoutBody>
          </EuiFlyout>
        )}
      </>
    );
  },
};

export const WithHeaderAndFooter: Story = {
  parameters: {
    codeSnippet: {
      snippet: `const [isOpen, setIsOpen] = useState(false);
const titleId = 'flyoutWithFooterTitle';

<>
  <EuiButton onClick={() => setIsOpen(true)}>Open flyout</EuiButton>
  {isOpen && (
    <EuiFlyout aria-labelledby={titleId} onClose={() => setIsOpen(false)}>
      <EuiFlyoutHeader hasBorder>
        <EuiTitle size="m">
          <h2 id={titleId}>Edit dashboard</h2>
        </EuiTitle>
      </EuiFlyoutHeader>
      <EuiFlyoutBody>
        <EuiFormRow label="Title" helpText="Give your dashboard a name">
          <EuiFieldText defaultValue="My Dashboard" />
        </EuiFormRow>
        <EuiFormRow label="Description">
          <EuiFieldText placeholder="Optional description" />
        </EuiFormRow>
        <EuiFormRow label="Tags">
          <EuiComboBox
            placeholder="Select or create tags"
            options={[
              { label: 'analytics' },
              { label: 'monitoring' },
              { label: 'reporting' },
            ]}
          />
        </EuiFormRow>
        <EuiFormRow label="Refresh interval">
          <EuiSelect
            options={[
              { value: 'off', text: 'Off' },
              { value: '5s', text: '5 seconds' },
              { value: '30s', text: '30 seconds' },
              { value: '1m', text: '1 minute' },
            ]}
            defaultValue="off"
          />
        </EuiFormRow>
        <EuiFormRow label="Time range">
          <EuiSelect
            options={[
              { value: '15m', text: 'Last 15 minutes' },
              { value: '1h', text: 'Last 1 hour' },
              { value: '24h', text: 'Last 24 hours' },
              { value: '7d', text: 'Last 7 days' },
            ]}
            defaultValue="15m"
          />
        </EuiFormRow>
        <EuiFormRow>
          <EuiSwitch label="Show time picker" checked={true} onChange={() => {}} />
        </EuiFormRow>
      </EuiFlyoutBody>
      <EuiFlyoutFooter>
        <EuiFlexGroup justifyContent="spaceBetween">
          <EuiFlexItem grow={false}>
            <EuiButtonEmpty onClick={() => setIsOpen(false)}>Cancel</EuiButtonEmpty>
          </EuiFlexItem>
          <EuiFlexItem grow={false}>
            <EuiButton fill onClick={() => setIsOpen(false)}>
              Save changes
            </EuiButton>
          </EuiFlexItem>
        </EuiFlexGroup>
      </EuiFlyoutFooter>
    </EuiFlyout>
  )}
</>`,
    },
  },
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    const titleId = 'flyoutWithFooterTitle';

    return (
      <>
        <EuiButton onClick={() => setIsOpen(true)}>Open flyout</EuiButton>
        {isOpen && (
          <EuiFlyout
            aria-labelledby={titleId}
            onClose={() => {
              setIsOpen(false);
              onClose();
            }}
          >
            <EuiFlyoutHeader hasBorder>
              <EuiTitle size="m">
                <h2 id={titleId}>Edit dashboard</h2>
              </EuiTitle>
            </EuiFlyoutHeader>
            <EuiFlyoutBody>
              <EuiFormRow label="Title" helpText="Give your dashboard a name">
                <EuiFieldText defaultValue="My Dashboard" />
              </EuiFormRow>
              <EuiFormRow label="Description">
                <EuiFieldText placeholder="Optional description" />
              </EuiFormRow>
              <EuiFormRow label="Tags">
                <EuiComboBox
                  placeholder="Select or create tags"
                  options={[
                    { label: 'analytics' },
                    { label: 'monitoring' },
                    { label: 'reporting' },
                  ]}
                />
              </EuiFormRow>
              <EuiFormRow label="Refresh interval">
                <EuiSelect
                  options={[
                    { value: 'off', text: 'Off' },
                    { value: '5s', text: '5 seconds' },
                    { value: '30s', text: '30 seconds' },
                    { value: '1m', text: '1 minute' },
                  ]}
                  defaultValue="off"
                />
              </EuiFormRow>
              <EuiFormRow label="Time range">
                <EuiSelect
                  options={[
                    { value: '15m', text: 'Last 15 minutes' },
                    { value: '1h', text: 'Last 1 hour' },
                    { value: '24h', text: 'Last 24 hours' },
                    { value: '7d', text: 'Last 7 days' },
                  ]}
                  defaultValue="15m"
                />
              </EuiFormRow>
              <EuiFormRow>
                <EuiSwitch
                  label="Show time picker"
                  checked={true}
                  onChange={() => {}}
                />
              </EuiFormRow>
            </EuiFlyoutBody>
            <EuiFlyoutFooter>
              <EuiFlexGroup justifyContent="spaceBetween">
                <EuiFlexItem grow={false}>
                  <EuiButtonEmpty
                    onClick={() => {
                      setIsOpen(false);
                      onClose();
                    }}
                  >
                    Cancel
                  </EuiButtonEmpty>
                </EuiFlexItem>
                <EuiFlexItem grow={false}>
                  <EuiButton
                    fill
                    onClick={() => {
                      console.log('Dashboard saved');
                      setIsOpen(false);
                      onClose();
                    }}
                  >
                    Save changes
                  </EuiButton>
                </EuiFlexItem>
              </EuiFlexGroup>
            </EuiFlyoutFooter>
          </EuiFlyout>
        )}
      </>
    );
  },
};

export const WithBanner: Story = {
  parameters: {
    codeSnippet: {
      snippet: `const [isOpen, setIsOpen] = useState(false);
const titleId = 'flyoutWithBannerTitle';

<>
  <EuiButton onClick={() => setIsOpen(true)}>Edit notification settings</EuiButton>
  {isOpen && (
    <EuiFlyout aria-labelledby={titleId} onClose={() => setIsOpen(false)}>
      <EuiFlyoutHeader hasBorder>
        <EuiTitle size="m">
          <h2 id={titleId}>Edit notification settings</h2>
        </EuiTitle>
        <EuiSpacer size="s" />
        <EuiText size="s" color="subdued">
          <p>Changes affect how alerts are delivered to this user.</p>
        </EuiText>
      </EuiFlyoutHeader>

      <EuiFlyoutBody
        banner={
          <EuiCallOut
            size="s"
            color="warning"
            iconType="alert"
            title="Updates apply immediately to live alerts."
          >
            <p>Double-check the email and severity before saving.</p>
          </EuiCallOut>
        }
      >
        <EuiForm component="form">
          <EuiFormRow label="Notification email">
            <EuiFieldText placeholder="user@example.com" />
          </EuiFormRow>
          <EuiSpacer />
          <EuiFormRow label="Alert severity">
            <EuiSelect
              options={[
                { value: 'low', text: 'Low' },
                { value: 'medium', text: 'Medium' },
                { value: 'high', text: 'High' },
              ]}
              defaultValue="medium"
            />
          </EuiFormRow>
        </EuiForm>
      </EuiFlyoutBody>

      <EuiFlyoutFooter>
        <EuiFlexGroup justifyContent="spaceBetween" alignItems="center">
          <EuiFlexItem grow={false}>
            <EuiText size="s" color="subdued">
              <p>Use the banner for important, contextual notices.</p>
            </EuiText>
          </EuiFlexItem>
          <EuiFlexItem grow={false}>
            <EuiFlexGroup gutterSize="s" responsive={false}>
              <EuiFlexItem grow={false}>
                <EuiButtonEmpty onClick={() => setIsOpen(false)}>
                  Cancel
                </EuiButtonEmpty>
              </EuiFlexItem>
              <EuiFlexItem grow={false}>
                <EuiButton onClick={() => setIsOpen(false)} fill>
                  Save changes
                </EuiButton>
              </EuiFlexItem>
            </EuiFlexGroup>
          </EuiFlexItem>
        </EuiFlexGroup>
      </EuiFlyoutFooter>
    </EuiFlyout>
  )}
</>`,
    },
  },
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    const titleId = 'flyoutWithBannerTitle';

    return (
      <>
        <EuiButton onClick={() => setIsOpen(true)}>
          Edit notification settings
        </EuiButton>

        {isOpen && (
          <EuiFlyout
            aria-labelledby={titleId}
            onClose={() => {
              setIsOpen(false);
              onClose();
            }}
          >
            <EuiFlyoutHeader hasBorder>
              <EuiTitle size="m">
                <h2 id={titleId}>Edit notification settings</h2>
              </EuiTitle>
              <EuiSpacer size="s" />
              <EuiText size="s" color="subdued">
                <p>Changes affect how alerts are delivered to this user.</p>
              </EuiText>
            </EuiFlyoutHeader>

            <EuiFlyoutBody
              banner={
                <EuiCallOut
                  size="s"
                  color="warning"
                  iconType="alert"
                  title="Updates apply immediately to live alerts."
                >
                  <p>Double-check the email and severity before saving.</p>
                </EuiCallOut>
              }
            >
              <EuiForm component="form">
                <EuiFormRow label="Notification email">
                  <EuiFieldText placeholder="user@example.com" />
                </EuiFormRow>
                <EuiSpacer />
                <EuiFormRow label="Alert severity">
                  <EuiSelect
                    options={[
                      { value: 'low', text: 'Low' },
                      { value: 'medium', text: 'Medium' },
                      { value: 'high', text: 'High' },
                    ]}
                    defaultValue="medium"
                  />
                </EuiFormRow>
              </EuiForm>
            </EuiFlyoutBody>

            <EuiFlyoutFooter>
              <EuiFlexGroup justifyContent="spaceBetween">
                <EuiFlexItem grow={false}>
                  <EuiButtonEmpty
                    onClick={() => {
                      setIsOpen(false);
                      onClose();
                    }}
                  >
                    Cancel
                  </EuiButtonEmpty>
                </EuiFlexItem>
                <EuiFlexItem grow={false}>
                  <EuiButton
                    fill
                    onClick={() => {
                      console.log('Dashboard saved');
                      setIsOpen(false);
                      onClose();
                    }}
                  >
                    Save changes
                  </EuiButton>
                </EuiFlexItem>
              </EuiFlexGroup>
            </EuiFlyoutFooter>
          </EuiFlyout>
        )}
      </>
    );
  },
};

export const MenuAndContent: Story = {
  parameters: {
    codeSnippet: {
      snippet: `const [isOpen, setIsOpen] = useState(false);
const [selectedSection, setSelectedSection] = useState('general');
const titleId = 'menuFlyoutTitle';

const sections = [
  {
    id: 'general',
    label: 'General',
    title: 'General settings',
    description: 'Configure basic application settings',
    fields: (
      <>
        <EuiFormRow label="Application name">
          <EuiFieldText defaultValue="My App" />
        </EuiFormRow>
        <EuiFormRow label="Language">
          <EuiSelect
            options={[
              { value: 'en', text: 'English' },
              { value: 'es', text: 'Spanish' },
            ]}
            defaultValue="en"
          />
        </EuiFormRow>
      </>
    ),
  },
  // Add more sections as needed
];

const currentSection = sections.find((s) => s.id === selectedSection) || sections[0];

<>
  <EuiButton onClick={() => setIsOpen(true)}>Open settings menu</EuiButton>
  {isOpen && (
    <EuiFlyout size="m" aria-labelledby={titleId} onClose={() => setIsOpen(false)}>
      <EuiFlyoutHeader hasBorder>
        <EuiTitle size="m">
          <h2 id={titleId}>Application settings</h2>
        </EuiTitle>
      </EuiFlyoutHeader>
      <EuiFlyoutBody>
        <EuiFlexGroup gutterSize="l">
          <EuiFlexItem grow={false} style={{ minWidth: 160 }}>
            <EuiListGroup flush>
              {sections.map((section) => (
                <EuiListGroupItem
                  key={section.id}
                  label={section.label}
                  isActive={selectedSection === section.id}
                  onClick={() => setSelectedSection(section.id)}
                />
              ))}
            </EuiListGroup>
          </EuiFlexItem>
          <EuiFlexItem>
            <EuiTitle size="s">
              <h3>{currentSection.title}</h3>
            </EuiTitle>
            <EuiSpacer size="s" />
            <EuiText size="s" color="subdued">
              <p>{currentSection.description}</p>
            </EuiText>
            <EuiSpacer />
            {currentSection.fields}
          </EuiFlexItem>
        </EuiFlexGroup>
      </EuiFlyoutBody>
      <EuiFlyoutFooter>
        <EuiFlexGroup justifyContent="spaceBetween">
          <EuiFlexItem grow={false}>
            <EuiButtonEmpty onClick={() => setIsOpen(false)}>Cancel</EuiButtonEmpty>
          </EuiFlexItem>
          <EuiFlexItem grow={false}>
            <EuiButton fill onClick={() => setIsOpen(false)}>
              Save changes
            </EuiButton>
          </EuiFlexItem>
        </EuiFlexGroup>
      </EuiFlyoutFooter>
    </EuiFlyout>
  )}
</>`,
    },
  },
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedSection, setSelectedSection] = useState('general');
    const titleId = 'menuFlyoutTitle';

    const sections = [
      {
        id: 'general',
        label: 'General',
        title: 'General settings',
        description: 'Configure basic application settings',
        fields: (
          <>
            <EuiFormRow label="Application name">
              <EuiFieldText defaultValue="My App" />
            </EuiFormRow>
            <EuiFormRow label="Language">
              <EuiSelect
                options={[
                  { value: 'en', text: 'English' },
                  { value: 'es', text: 'Spanish' },
                  { value: 'fr', text: 'French' },
                ]}
                defaultValue="en"
              />
            </EuiFormRow>
          </>
        ),
      },
      {
        id: 'notifications',
        label: 'Notifications',
        title: 'Notification preferences',
        description: 'Manage how you receive notifications',
        fields: (
          <>
            <EuiFormRow>
              <EuiSwitch
                label="Email notifications"
                checked={true}
                onChange={() => {}}
              />
            </EuiFormRow>
            <EuiFormRow>
              <EuiSwitch
                label="Push notifications"
                checked={false}
                onChange={() => {}}
              />
            </EuiFormRow>
            <EuiFormRow label="Notification frequency">
              <EuiSelect
                options={[
                  { value: 'realtime', text: 'Real-time' },
                  { value: 'hourly', text: 'Hourly digest' },
                  { value: 'daily', text: 'Daily digest' },
                ]}
                defaultValue="realtime"
              />
            </EuiFormRow>
          </>
        ),
      },
      {
        id: 'advanced',
        label: 'Advanced',
        title: 'Advanced settings',
        description: 'Configure advanced options',
        fields: (
          <>
            <EuiFormRow>
              <EuiSwitch
                label="Developer mode"
                checked={false}
                onChange={() => {}}
              />
            </EuiFormRow>
            <EuiFormRow>
              <EuiSwitch
                label="Beta features"
                checked={false}
                onChange={() => {}}
              />
            </EuiFormRow>
            <EuiFormRow label="API timeout (seconds)">
              <EuiFieldText defaultValue="30" type="number" />
            </EuiFormRow>
          </>
        ),
      },
    ];

    const currentSection =
      sections.find((s) => s.id === selectedSection) || sections[0];

    return (
      <>
        <EuiButton onClick={() => setIsOpen(true)}>
          Open settings menu
        </EuiButton>
        {isOpen && (
          <EuiFlyout
            size="m"
            aria-labelledby={titleId}
            onClose={() => {
              setIsOpen(false);
              onClose();
            }}
          >
            <EuiFlyoutHeader hasBorder>
              <EuiTitle size="m">
                <h2 id={titleId}>Application settings</h2>
              </EuiTitle>
            </EuiFlyoutHeader>
            <EuiFlyoutBody>
              <EuiFlexGroup gutterSize="l">
                <EuiFlexItem grow={false} style={{ minWidth: 160 }}>
                  <EuiListGroup flush>
                    {sections.map((section) => (
                      <EuiListGroupItem
                        key={section.id}
                        label={section.label}
                        isActive={selectedSection === section.id}
                        onClick={() => setSelectedSection(section.id)}
                      />
                    ))}
                  </EuiListGroup>
                </EuiFlexItem>
                <EuiFlexItem>
                  <EuiTitle size="s">
                    <h3>{currentSection.title}</h3>
                  </EuiTitle>
                  <EuiSpacer size="s" />
                  <EuiText size="s" color="subdued">
                    <p>{currentSection.description}</p>
                  </EuiText>
                  <EuiSpacer />
                  {currentSection.fields}
                </EuiFlexItem>
              </EuiFlexGroup>
            </EuiFlyoutBody>
            <EuiFlyoutFooter>
              <EuiFlexGroup justifyContent="spaceBetween">
                <EuiFlexItem grow={false}>
                  <EuiButtonEmpty
                    onClick={() => {
                      setIsOpen(false);
                      onClose();
                    }}
                  >
                    Cancel
                  </EuiButtonEmpty>
                </EuiFlexItem>
                <EuiFlexItem grow={false}>
                  <EuiButton
                    fill
                    onClick={() => {
                      console.log('Settings saved');
                      setIsOpen(false);
                      onClose();
                    }}
                  >
                    Save changes
                  </EuiButton>
                </EuiFlexItem>
              </EuiFlexGroup>
            </EuiFlyoutFooter>
          </EuiFlyout>
        )}
      </>
    );
  },
};

export const ParentChildWithHistory: Story = {
  parameters: {
    codeSnippet: {
      snippet: `const [isOpen, setIsOpen] = useState(false);
const [selectedRule, setSelectedRule] = useState<string | null>(null);
const mainTitleId = 'parentFlyoutTitle';
const childTitleId = 'childFlyoutTitle';

const rules = [
  { id: '1', name: 'High CPU usage alert', status: 'Active' },
  { id: '2', name: 'Memory threshold warning', status: 'Active' },
];

const selectedRuleData = rules.find((r) => r.id === selectedRule);

const columns = [
  { field: 'name', name: 'Rule name' },
  { field: 'status', name: 'Status' },
  {
    name: 'Actions',
    render: (rule) => (
      <EuiButton size="s" onClick={() => setSelectedRule(rule.id)}>
        Edit
      </EuiButton>
    ),
  },
];

<>
  <EuiButton onClick={() => setIsOpen(true)}>Manage rules</EuiButton>
  {isOpen && (
    <EuiFlyoutManager>
      <EuiFlyoutMain
        aria-labelledby={mainTitleId}
        onClose={() => {
          setIsOpen(false);
          setSelectedRule(null);
        }}
      >
        <EuiFlyoutHeader hasBorder>
          <EuiTitle size="m">
            <h2 id={mainTitleId}>Manage rules</h2>
          </EuiTitle>
        </EuiFlyoutHeader>
        <EuiFlyoutBody>
          <EuiText>
            <p>Select a rule to view and edit its configuration.</p>
          </EuiText>
          <EuiSpacer />
          <EuiBasicTable items={rules} columns={columns} />
        </EuiFlyoutBody>
        <EuiFlyoutFooter>
          <EuiButton
            fill
            onClick={() => {
              setIsOpen(false);
              setSelectedRule(null);
            }}
          >
            Done
          </EuiButton>
        </EuiFlyoutFooter>
      </EuiFlyoutMain>

      {selectedRule && selectedRuleData && (
        <EuiFlyoutChild
          aria-labelledby={childTitleId}
          onClose={() => setSelectedRule(null)}
        >
          <EuiFlyoutHeader hasBorder>
            <EuiBreadcrumbs
              breadcrumbs={[
                {
                  text: 'All rules',
                  onClick: () => setSelectedRule(null),
                },
                { text: selectedRuleData.name },
              ]}
            />
            <EuiSpacer size="s" />
            <EuiTitle size="m">
              <h2 id={childTitleId}>{selectedRuleData.name}</h2>
            </EuiTitle>
          </EuiFlyoutHeader>
          <EuiFlyoutBody>
            <EuiForm>
              <EuiFormRow label="Rule name">
                <EuiFieldText defaultValue={selectedRuleData.name} />
              </EuiFormRow>
              <EuiFormRow label="Status">
                <EuiSelect
                  options={[
                    { value: 'active', text: 'Active' },
                    { value: 'inactive', text: 'Inactive' },
                  ]}
                  defaultValue={selectedRuleData.status.toLowerCase()}
                />
              </EuiFormRow>
              <EuiFormRow label="Description">
                <EuiFieldText placeholder="Add a description" />
              </EuiFormRow>
              <EuiFormRow label="Threshold">
                <EuiFieldText defaultValue="80" type="number" />
              </EuiFormRow>
              <EuiFormRow>
                <EuiSwitch
                  label="Send email notifications"
                  checked={true}
                  onChange={() => {}}
                />
              </EuiFormRow>
            </EuiForm>
          </EuiFlyoutBody>
          <EuiFlyoutFooter>
            <EuiFlexGroup justifyContent="spaceBetween">
              <EuiFlexItem grow={false}>
                <EuiButtonEmpty onClick={() => setSelectedRule(null)}>
                  Back to rules
                </EuiButtonEmpty>
              </EuiFlexItem>
              <EuiFlexItem grow={false}>
                <EuiButton
                  fill
                  onClick={() => {
                    setSelectedRule(null);
                  }}
                >
                  Save
                </EuiButton>
              </EuiFlexItem>
            </EuiFlexGroup>
          </EuiFlyoutFooter>
        </EuiFlyoutChild>
      )}
    </EuiFlyoutManager>
  )}
</>`,
    },
  },
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedRule, setSelectedRule] = useState<string | null>(null);
    const mainTitleId = 'parentFlyoutTitle';
    const childTitleId = 'childFlyoutTitle';

    const rules = [
      { id: '1', name: 'High CPU usage alert', status: 'Active' },
      { id: '2', name: 'Memory threshold warning', status: 'Active' },
      { id: '3', name: 'Disk space monitor', status: 'Inactive' },
      { id: '4', name: 'Network traffic alert', status: 'Active' },
    ];

    const selectedRuleData = rules.find((r) => r.id === selectedRule);

    const columns = [
      {
        field: 'name',
        name: 'Rule name',
      },
      {
        field: 'status',
        name: 'Status',
      },
      {
        name: 'Actions',
        render: (rule: (typeof rules)[0]) => (
          <EuiButton size="s" onClick={() => setSelectedRule(rule.id)}>
            Edit
          </EuiButton>
        ),
      },
    ];

    return (
      <>
        <EuiButton onClick={() => setIsOpen(true)}>Manage rules</EuiButton>
        {isOpen && (
          <EuiFlyoutManager>
            <EuiFlyoutMain
              aria-labelledby={mainTitleId}
              onClose={() => {
                setIsOpen(false);
                setSelectedRule(null);
                onClose();
              }}
            >
              <EuiFlyoutHeader hasBorder>
                <EuiTitle size="m">
                  <h2 id={mainTitleId}>Manage rules</h2>
                </EuiTitle>
              </EuiFlyoutHeader>
              <EuiFlyoutBody>
                <EuiText>
                  <p>Select a rule to view and edit its configuration.</p>
                </EuiText>
                <EuiSpacer />
                <EuiBasicTable items={rules} columns={columns} />
              </EuiFlyoutBody>
              <EuiFlyoutFooter>
                <EuiButton
                  fill
                  onClick={() => {
                    setIsOpen(false);
                    setSelectedRule(null);
                    onClose();
                  }}
                >
                  Done
                </EuiButton>
              </EuiFlyoutFooter>
            </EuiFlyoutMain>

            {selectedRule && selectedRuleData && (
              <EuiFlyoutChild
                aria-labelledby={childTitleId}
                onClose={() => setSelectedRule(null)}
              >
                <EuiFlyoutHeader hasBorder>
                  <EuiBreadcrumbs
                    breadcrumbs={[
                      {
                        text: 'All rules',
                        onClick: () => setSelectedRule(null),
                      },
                      {
                        text: selectedRuleData.name,
                      },
                    ]}
                  />
                  <EuiSpacer size="s" />
                  <EuiTitle size="m">
                    <h2 id={childTitleId}>{selectedRuleData.name}</h2>
                  </EuiTitle>
                </EuiFlyoutHeader>
                <EuiFlyoutBody>
                  <EuiForm>
                    <EuiFormRow label="Rule name">
                      <EuiFieldText defaultValue={selectedRuleData.name} />
                    </EuiFormRow>
                    <EuiFormRow label="Status">
                      <EuiSelect
                        options={[
                          { value: 'active', text: 'Active' },
                          { value: 'inactive', text: 'Inactive' },
                        ]}
                        defaultValue={
                          selectedRuleData.status.toLowerCase()
                        }
                      />
                    </EuiFormRow>
                    <EuiFormRow label="Description">
                      <EuiFieldText placeholder="Add a description" />
                    </EuiFormRow>
                    <EuiFormRow label="Threshold">
                      <EuiFieldText defaultValue="80" type="number" />
                    </EuiFormRow>
                    <EuiFormRow>
                      <EuiSwitch
                        label="Send email notifications"
                        checked={true}
                        onChange={() => {}}
                      />
                    </EuiFormRow>
                  </EuiForm>
                </EuiFlyoutBody>
                <EuiFlyoutFooter>
                  <EuiFlexGroup justifyContent="spaceBetween">
                    <EuiFlexItem grow={false}>
                      <EuiButtonEmpty onClick={() => setSelectedRule(null)}>
                        Back to rules
                      </EuiButtonEmpty>
                    </EuiFlexItem>
                    <EuiFlexItem grow={false}>
                      <EuiButton
                        fill
                        onClick={() => {
                          console.log('Rule saved');
                          setSelectedRule(null);
                        }}
                      >
                        Save
                      </EuiButton>
                    </EuiFlexItem>
                  </EuiFlexGroup>
                </EuiFlyoutFooter>
              </EuiFlyoutChild>
            )}
          </EuiFlyoutManager>
        )}
      </>
    );
  },
};
