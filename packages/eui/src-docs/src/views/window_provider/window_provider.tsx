import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import {
  EuiButton,
  EuiButtonEmpty,
  EuiFlyout,
  EuiFlyoutBody,
  EuiFlyoutHeader,
  EuiHorizontalRule,
  EuiLink,
  EuiPanel,
  EuiPopover,
  EuiText,
  EuiTitle,
  EuiToolTip,
} from '../../../../src/components';
import { EuiWindowProvider } from '../../../../src/services';
import createCache, { EmotionCache } from '@emotion/cache';
import { CacheProvider } from '@emotion/react';
import { WindowProvider } from 'react-style-singleton';

export default () => {
  const [childWindow, setChildWindow] = useState<
    | {
        type: 'open';
        window: Window;
        emotionCache: EmotionCache;
      }
    | { type: 'closed' }
  >({ type: 'closed' });

  const openWindow = () => {
    const newWindow = window.open('', '_blank', `width=800,height=600`);

    if (!newWindow) {
      throw new Error('Could not open the window.');
    }

    newWindow.onbeforeunload = () => {
      setChildWindow({ type: 'closed' });
    };

    copyStyles(newWindow);

    const emotionCache = createCache({
      key: 'child-window',
      container: newWindow.document.head,
    });

    setChildWindow({ type: 'open', window: newWindow, emotionCache });
  };

  return (
    <div>
      <EuiButton onClick={openWindow}>Open new window</EuiButton>
      {childWindow.type === 'open' && (
        <EuiWindowProvider window={childWindow.window}>
          <WindowProvider window={childWindow.window}>
            <CacheProvider value={childWindow.emotionCache}>
              <NewWindow windowHandle={childWindow.window}>
                <WindowContents />
              </NewWindow>
            </CacheProvider>
          </WindowProvider>
        </EuiWindowProvider>
      )}
    </div>
  );
};

const NewWindow = ({
  windowHandle,
  children,
}: {
  windowHandle: Window;
  children: React.ReactNode;
}) => {
  return createPortal(children, windowHandle.document.body);
};

const WindowContents = () => {
  const [isFlyoutOpen, setIsFlyoutOpen] = useState(false);
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  return (
    <>
      {isFlyoutOpen ? (
        <EuiFlyout
          onClose={() => {
            setIsFlyoutOpen(false);
          }}
          paddingSize="m"
        >
          <EuiFlyoutHeader hasBorder>
            <EuiTitle size="m">
              <h2>Flyout header</h2>
            </EuiTitle>
          </EuiFlyoutHeader>
          <EuiFlyoutBody>
            <EuiText>Flyout contents.</EuiText>
          </EuiFlyoutBody>
        </EuiFlyout>
      ) : null}

      <EuiPanel hasBorder style={{ margin: '1rem' }}>
        <EuiText>
          <h2>Interactivity example</h2>
        </EuiText>

        <EuiHorizontalRule />

        <EuiButton
          onClick={() => {
            setIsFlyoutOpen(true);
          }}
        >
          Open flyout
        </EuiButton>

        <EuiHorizontalRule />

        <EuiPopover
          button={
            <EuiButtonEmpty
              iconType="documentation"
              iconSide="right"
              onClick={() => {
                setIsPopoverOpen(true);
              }}
            >
              Popover example (click to open)
            </EuiButtonEmpty>
          }
          isOpen={isPopoverOpen}
          closePopover={() => {
            setIsPopoverOpen(false);
          }}
        >
          <EuiText style={{ width: 300 }}>
            <p>Popover content that&rsquo;s wider than the default width</p>
          </EuiText>
        </EuiPopover>

        <EuiHorizontalRule />

        <EuiToolTip position="top" content="Here is some tooltip text">
          <EuiLink href="#">Tooltip example (hover to open)</EuiLink>
        </EuiToolTip>
      </EuiPanel>
    </>
  );
};

function copyStyles(targetWindow: Window) {
  const collectedStyles: string[] = [];

  const elements = [
    ...document.head.querySelectorAll('link[data-react-helmet="true"]'),
    ...document.head.getElementsByTagName('style'),
  ];

  elements.forEach((element) => {
    collectedStyles.push(element.outerHTML);
  });

  targetWindow.document.head.innerHTML += collectedStyles.join('\r\n');
}
