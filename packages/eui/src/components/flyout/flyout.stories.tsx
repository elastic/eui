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
      <EuiButton onClick={() => handleToggle(!_isOpen)}>
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

export const WithHeader: Story = {
  parameters: {
    codeSnippet: {
      snippet: `const [isOpen, setIsOpen] = useState(false);
const titleId = 'flyoutWithHeaderTitle';

<>
  <EuiButton onClick={() => setIsOpen(true)}>Open flyout with header</EuiButton>
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
        <EuiButton onClick={() => setIsOpen(true)}>Open flyout with header</EuiButton>
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
  <EuiButton onClick={() => setIsOpen(true)}>Open flyout with header and footer</EuiButton>
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
        <EuiButton onClick={() => setIsOpen(true)}>Open flyout with header and footer</EuiButton>
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

export const WithHeaderAndMenu: Story = {
  parameters: {
    codeSnippet: {
      snippet: `const [isOpen, setIsOpen] = useState(false);
const titleId = 'flyoutWithHeaderAndMenuTitle';

<>
  <EuiButton onClick={() => setIsOpen(true)}>Open flyout with header and menu</EuiButton>
  {isOpen && (
    <EuiFlyout
      aria-labelledby={titleId}
      onClose={() => setIsOpen(false)}
      flyoutMenuProps={{
        title: 'Flyout menu',
        showBackButton: false,
      }}
    >
      <EuiFlyoutHeader hasBorder>
        <EuiTitle size="m">
          <h2 id={titleId}>Document details</h2>
        </EuiTitle>
        <EuiSpacer size="s" />
        <EuiText size="s" color="subdued">
          <p>
            Combine a menu bar with a header for navigable reference content.
          </p>
        </EuiText>
      </EuiFlyoutHeader>
      <EuiFlyoutBody>
        <EuiText>
          <p>
            Use a menu bar for shared controls (like a share button)
            along with structured content in a header.
          </p>
          <ul>
            <li>The menu bar provides navigation context</li>
            <li>The header provides content structure</li>
            <li>Perfect for drill-down or multi-step workflows</li>
            <li>Back button is automatically displayed in managed session flyouts</li>
          </ul>
        </EuiText>
      </EuiFlyoutBody>
    </EuiFlyout>
  )}
</>`,
    },
  },
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    const titleId = 'flyoutWithHeaderAndMenuTitle';

    return (
      <>
        <EuiButton onClick={() => setIsOpen(true)}>Open flyout with header and menu</EuiButton>
        {isOpen && (
          <EuiFlyout
            aria-labelledby={titleId}
            onClose={() => {
              setIsOpen(false);
              onClose();
            }}
            flyoutMenuProps={{
              customActions: [
                {
                  iconType: 'share',
                  onClick: () => alert('Share clicked'),
                  'aria-label': 'Share this document',
                },
              ],
            }}
          >
            <EuiFlyoutHeader hasBorder>
              <EuiTitle size="m">
                <h2 id={titleId}>Document details</h2>
              </EuiTitle>
              <EuiSpacer size="s" />
              <EuiText size="s" color="subdued">
                <p>
                  Combine a menu bar with a header for navigable reference content.
                </p>
              </EuiText>
            </EuiFlyoutHeader>
            <EuiFlyoutBody>
              <EuiText>
                <p>
                  Use a menu bar when you need navigation controls (like a back button)
                  along with structured content in a header.
                </p>
                <ul>
                  <li>The menu bar provides navigation context</li>
                  <li>The header provides content structure</li>
                  <li>Perfect for drill-down or multi-step workflows</li>
                  <li>Back button is automatically displayed in managed session flyouts</li>
                </ul>
              </EuiText>
            </EuiFlyoutBody>
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
  <EuiButton onClick={() => setIsOpen(true)}>Open flyout with banner</EuiButton>
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
          Open flyout with banner
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
        <EuiButton onClick={() => setIsOpen(!isOpen)}>
          Toggle push flyout
        </EuiButton>
        <EuiSpacer size="m" />
        <EuiPanel>
          <EuiText><p>The content will resized to fit the flyout.</p></EuiText>
        </EuiPanel>
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
  <EuiSpacer size="m" />
  <EuiPanel>
    <EuiText><p>The content will resized to fit the flyout.</p></EuiText>
  </EuiPanel>
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

<div style={{padding: '24px'}}>
  <EuiButton onClick={() => setIsOpen(true)}>
    Open resizable push flyout
  </EuiButton>
  <EuiSpacer size="m" />
  <EuiPanel>
    <EuiText><p>The content will resized to fit the flyout.</p></EuiText>
  </EuiPanel>
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
</div>`,
    },
  },
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    const titleId = 'resizablePushFlyoutTitle';

    return (
      <div style={{padding: '24px'}}>
        <EuiButton onClick={() => setIsOpen(true)}>
          Open resizable push flyout
        </EuiButton>
        <EuiSpacer size="m" />
        <EuiPanel>
          <EuiText><p>The content will resized to fit the flyout.</p></EuiText>
        </EuiPanel>

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
      </div>
    );
  },
};

export const BasicBodyOnly: Story = {
  parameters: {
    codeSnippet: {
      snippet: `const [isOpen, setIsOpen] = useState(false);

<>
  <EuiButton onClick={() => setIsOpen(true)}>Open flyout with body only</EuiButton>
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
        <EuiButton onClick={() => setIsOpen(true)}>Open flyout with body only</EuiButton>
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
        <EuiButton buttonRef={manualTriggerRef}>
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
