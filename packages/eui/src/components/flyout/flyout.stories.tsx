/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, {
  useCallback,
  useRef,
  useState,
  KeyboardEventHandler,
  FocusEventHandler,
} from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { css } from '@emotion/react';

import {
  EuiButton,
  EuiCallOut,
  EuiFlexGroup,
  EuiFlexItem,
  EuiPanel,
  EuiPopover,
  EuiSpacer,
  EuiText,
  EuiTitle,
} from '../index';
import { useEuiTheme } from '../../services';

import {
  EuiFlyout,
  EuiFlyoutProps,
  EuiFlyoutBody,
  EuiFlyoutHeader,
  EuiFlyoutFooter,
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
  props: Partial<
    EuiFlyoutProps & { isOpen: boolean; onToggle: (open: boolean) => void }
  >
) => {
  const { isOpen, onToggle } = props;
  const [_isOpen, setIsOpen] = useState(isOpen ?? true);

  const handleToggle = (open: boolean) => {
    setIsOpen(open);
    onToggle?.(open);
  };

  return (
    <>
      <EuiButton size="s" onClick={() => handleToggle(!_isOpen)}>
        Toggle flyout
      </EuiButton>
      {_isOpen && (
        <EuiFlyout
          {...props}
          onClose={(...args) => {
            handleToggle(false);
            onClose(...args);
          }}
        />
      )}
    </>
  );
};

export const Playground: Story = {
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
  render: ({ ...args }) => <StatefulFlyout {...args} />,
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
    pushMinBreakpoint: 'xs',
  },
  render: ({ ...args }) => {
    const fillerText = (
      <EuiText>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed eu
          condimentum ipsum, nec ornare metus. Sed egestas elit nec placerat
          suscipit. Cras pulvinar nisi eget enim sodales fringilla. Aliquam
          lobortis lorem at ornare aliquet. Mauris laoreet laoreet mollis.
          Pellentesque aliquet tortor dui, non luctus turpis pulvinar vitae.
          Nunc ultrices scelerisque erat eu rutrum. Nam at ligula enim. Ut nec
          nisl faucibus, euismod neque ut, aliquam nisl. Donec eu ante ut arcu
          rutrum blandit nec ac nisl. In elementum id enim vitae aliquam. In
          sagittis, neque vitae ultricies interdum, sapien justo efficitur
          ligula, sit amet fermentum nisl magna sit amet turpis. Nulla facilisi.
          Proin nec viverra mi. Morbi dolor arcu, ornare non consequat et,
          viverra dapibus tellus.
        </p>
      </EuiText>
    );
    return (
      <>
        <StatefulFlyout {...args}>
          <EuiFlyoutBody>{fillerText}</EuiFlyoutBody>
        </StatefulFlyout>
        {fillerText}
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

const INCLUDE_IN_FLYOUT_TRAP_FOCUS_DATA_ATTRIBUTE =
  'data-include-in-flyout-trap-focus';
const INCLUDE_IN_FLYOUT_TRAP_FOCUS = {
  prop: {
    [INCLUDE_IN_FLYOUT_TRAP_FOCUS_DATA_ATTRIBUTE]: 'true',
  },
  attribute: INCLUDE_IN_FLYOUT_TRAP_FOCUS_DATA_ATTRIBUTE,
  selector: `[${INCLUDE_IN_FLYOUT_TRAP_FOCUS_DATA_ATTRIBUTE}="true"]`,
};

const Popover = ({
  buttonLabel,
  includeInFlyoutTrapFocus,
}: {
  buttonLabel: string;
  includeInFlyoutTrapFocus: boolean;
}) => {
  const triggerRef = useRef<HTMLButtonElement>(null);
  const firstElementRef = useRef<HTMLButtonElement | null>(null);
  const panelRef = useRef<HTMLElement | null>(null);

  const [isOpen, setIsOpen] = useState(false);

  const onTriggerKeyDown: KeyboardEventHandler<HTMLButtonElement> = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (!isOpen) {
        setIsOpen(true);
      } else {
        firstElementRef.current?.focus();
      }
    }
  };

  const onContentKeyDown: KeyboardEventHandler<HTMLDivElement> = (e) => {
    if (e.key === 'Escape') {
      triggerRef.current?.focus();
    }
  };

  const onTriggerBlur: FocusEventHandler<HTMLElement> = useCallback((event) => {
    const nextFocus = event.relatedTarget as HTMLElement | null;

    if (nextFocus) {
      if (triggerRef.current?.contains(nextFocus)) return;
      if (panelRef.current?.contains(nextFocus)) return;
    }

    setIsOpen(false);
  }, []);

  return (
    <EuiPopover
      button={
        <EuiButton
          buttonRef={triggerRef}
          onFocus={() => setIsOpen(true)}
          onKeyDown={onTriggerKeyDown}
          onBlur={onTriggerBlur}
          fullWidth
          {...INCLUDE_IN_FLYOUT_TRAP_FOCUS.prop}
        >
          {buttonLabel}
        </EuiButton>
      }
      ownFocus={false}
      isOpen={isOpen}
      closePopover={() => setIsOpen(false)}
      panelPaddingSize="s"
      anchorPosition="upCenter"
      repositionOnScroll
      panelProps={{
        ...(includeInFlyoutTrapFocus ? INCLUDE_IN_FLYOUT_TRAP_FOCUS.prop : {}),
        onKeyDown: onContentKeyDown,
        onBlur: onTriggerBlur,
      }}
      panelRef={(node) => {
        panelRef.current = node;
      }}
    >
      <EuiFlexGroup gutterSize="s" direction="column">
        <EuiFlexItem grow={false}>
          <EuiText size="s">
            <p>Focusable content stays trapped when toggled.</p>
          </EuiText>
        </EuiFlexItem>
        <EuiFlexGroup>
          <EuiFlexItem>
            <EuiButton
              buttonRef={firstElementRef}
              size="s"
              onClick={() => {
                console.log('confirm action');
                setIsOpen(false);
              }}
            >
              Confirm action
            </EuiButton>
          </EuiFlexItem>
          <EuiFlexItem>
            <EuiButton
              size="s"
              color="danger"
              onClick={() => {
                console.log('destructive action');
                setIsOpen(false);
              }}
            >
              Destructive action
            </EuiButton>
          </EuiFlexItem>
        </EuiFlexGroup>
      </EuiFlexGroup>
    </EuiPopover>
  );
};

/**
 * TODO: remove
 *
 * This story is used only to reproduce the issue from the PR: https://github.com/elastic/kibana/pull/238230.
 * Both popovers should behave the same for now, i.e. not be keyboard interactive when flyout uses focus trap.
 */
export const PopoverInFlyoutFocusTrap: Story = {
  parameters: {
    controls: {
      include: [],
    },
    layout: 'fullscreen',
  },
  render: function Render(args) {
    const { euiTheme } = useEuiTheme();

    const flyoutTriggerRef = useRef<HTMLButtonElement>(null);

    const [isFlyoutOpen, setIsFlyoutOpen] = useState(false);

    const onCloseFlyout = useCallback(() => {
      setIsFlyoutOpen(false);
      flyoutTriggerRef.current?.focus();
    }, []);

    return (
      <>
        <EuiPanel
          borderRadius="none"
          css={css`
            position: fixed;
            block-size: 100%;
            z-index: ${Number(euiTheme.levels.flyout) + 20};
          `}
          {...INCLUDE_IN_FLYOUT_TRAP_FOCUS.prop}
        >
          <EuiFlexGroup direction="column" gutterSize="m" wrap>
            <EuiButton
              buttonRef={flyoutTriggerRef}
              onClick={() => setIsFlyoutOpen((open) => !open)}
            >
              Toggle flyout
            </EuiButton>
            <Popover
              buttonLabel="Toggle popover (included)"
              includeInFlyoutTrapFocus={true}
            />
            <Popover
              buttonLabel="Toggle popover (not included)"
              includeInFlyoutTrapFocus={false}
            />
          </EuiFlexGroup>
        </EuiPanel>
        {isFlyoutOpen && (
          <EuiFlyout
            {...args}
            onClose={onCloseFlyout}
            includeSelectorInFocusTrap={[INCLUDE_IN_FLYOUT_TRAP_FOCUS.selector]}
          >
            <EuiFlyoutHeader hasBorder>
              <EuiTitle size="m">
                <h2>Popover composition</h2>
              </EuiTitle>
            </EuiFlyoutHeader>
            <EuiFlyoutBody>
              <EuiText>
                <p>These popovers are portalled outside the flyout DOM.</p>
              </EuiText>
            </EuiFlyoutBody>
          </EuiFlyout>
        )}
      </>
    );
  },
};
