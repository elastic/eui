/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { action } from '@storybook/addon-actions';
import { Meta, StoryObj } from '@storybook/react';
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import type { Root } from 'react-dom/client';
import { createRoot } from 'react-dom/client';

import {
  EuiButton,
  EuiCodeBlock,
  EuiDescriptionList,
  EuiFlexGroup,
  EuiFlexItem,
  EuiFlyoutBody,
  EuiPanel,
  EuiProvider,
  EuiSpacer,
  EuiSwitch,
  EuiSwitchEvent,
  EuiText,
  EuiTitle,
} from '../..';
import { EuiFlyout } from '../flyout';
import { useCurrentSession, useFlyoutManager } from './hooks';
import { EuiFlyoutIsManagedProvider } from './context';

const meta: Meta<typeof EuiFlyout> = {
  title: 'Layout/EuiFlyout/Flyout Manager',
  component: EuiFlyout,
};

export default meta;

interface FlyoutSessionProps {
  title: string;
  mainSize?: 's' | 'm' | 'l' | 'fill';
  mainMaxWidth?: number;
  childSize?: 's' | 'm' | 'fill';
  childMaxWidth?: number;
  flyoutType: 'overlay' | 'push';
  childBackgroundShaded?: boolean;
}

const DisplayContext: React.FC<{ title: string }> = ({ title }) => {
  const flyoutManager = useFlyoutManager();
  const currentSession = useCurrentSession();
  return (
    <>
      <EuiTitle size="s">
        <h3>{title}</h3>
      </EuiTitle>
      <EuiSpacer size="s" />
      <EuiCodeBlock language="json">
        {JSON.stringify(
          {
            flyoutManager: flyoutManager
              ? { state: flyoutManager.state }
              : null,
            currentSession: currentSession ? currentSession : null,
          },
          null,
          2
        )}
      </EuiCodeBlock>
    </>
  );
};

const FlyoutSession: React.FC<FlyoutSessionProps> = React.memo((props) => {
  const {
    title,
    mainSize,
    childSize,
    mainMaxWidth,
    childMaxWidth,
    flyoutType,
  } = props;

  const [isFlyoutVisible, setIsFlyoutVisible] = useState(false);
  const [isChildFlyoutVisible, setIsChildFlyoutVisible] = useState(false);

  // Handlers for "Open" buttons

  const handleOpenMainFlyout = () => {
    setIsFlyoutVisible(true);
  };

  const handleOpenChildFlyout = () => {
    setIsChildFlyoutVisible(true);
  };

  // Callbacks for state synchronization

  const mainFlyoutOnActive = useCallback(() => {
    action('activate main flyout')(title);
  }, [title]);

  const childFlyoutOnActive = useCallback(() => {
    action('activate child flyout')(title);
  }, [title]);

  const mainFlyoutOnClose = useCallback(() => {
    action('close main flyout')(title);
    setIsFlyoutVisible(false);
    setIsChildFlyoutVisible(false);
  }, [title]);

  const childFlyoutOnClose = useCallback(() => {
    action('close child flyout')(title);
    setIsChildFlyoutVisible(false);
  }, [title]);

  // Render

  return (
    <>
      <EuiText>
        <EuiButton disabled={isFlyoutVisible} onClick={handleOpenMainFlyout}>
          Open {title}
        </EuiButton>
      </EuiText>
      <EuiFlyout
        isOpen={isFlyoutVisible}
        id={`mainFlyout-${title}`}
        session={true}
        flyoutMenuProps={{ title: `${title} - Main` }}
        size={mainSize}
        maxWidth={mainMaxWidth}
        type={flyoutType}
        ownFocus={false}
        pushAnimation={true}
        onActive={mainFlyoutOnActive}
        onClose={mainFlyoutOnClose}
      >
        <EuiFlyoutBody>
          <EuiText>
            <p>This is the content of {title}.</p>
            <EuiSpacer size="s" />
            <EuiDescriptionList
              type="column"
              listItems={[
                { title: 'Flyout type', description: flyoutType },
                {
                  title: 'Main flyout size',
                  description: mainSize ?? 'undefined (`m` by default)',
                },
                {
                  title: 'Main flyout maxWidth',
                  description: mainMaxWidth ?? 'N/A',
                },
              ]}
            />
            {childSize && (
              <EuiButton
                onClick={handleOpenChildFlyout}
                disabled={isChildFlyoutVisible}
              >
                Open child flyout
              </EuiButton>
            )}
          </EuiText>
        </EuiFlyoutBody>
        {childSize && (
          <EuiFlyout
            isOpen={isChildFlyoutVisible}
            id={`childFlyout-${title}`}
            flyoutMenuProps={{ title: `${title} - Child` }}
            aria-labelledby="childFlyoutTitle"
            size={childSize}
            maxWidth={childMaxWidth}
            onActive={childFlyoutOnActive}
            onClose={childFlyoutOnClose}
          >
            <EuiFlyoutBody>
              <EuiText>
                <p>This is the content of the child flyout of {title}.</p>
                <EuiSpacer size="s" />
                <EuiDescriptionList
                  type="column"
                  listItems={[
                    {
                      title: 'Child flyout size',
                      description: childSize ?? 'N/A',
                    },
                    {
                      title: 'Child flyout maxWidth',
                      description: childMaxWidth ?? 'N/A',
                    },
                  ]}
                />
              </EuiText>
            </EuiFlyoutBody>
          </EuiFlyout>
        )}
      </EuiFlyout>
    </>
  );
});

FlyoutSession.displayName = 'FlyoutSession';

const MultiSessionFlyoutDemo = () => {
  const [flyoutType, setFlyoutType] = useState<'overlay' | 'push'>('overlay');

  const handleFlyoutTypeToggle = useCallback((e: EuiSwitchEvent) => {
    setFlyoutType(e.target.checked ? 'push' : 'overlay');
  }, []);

  const listItems = useMemo(
    () => [
      {
        title: 'Session A: main size = s, child size = s',
        description: (
          <FlyoutSession
            flyoutType={flyoutType}
            title="Session A"
            mainSize="s"
            childSize="s"
          />
        ),
      },
      {
        title: 'Session B: main size = m, child size = s',
        description: (
          <FlyoutSession
            flyoutType={flyoutType}
            title="Session B"
            mainSize="m"
            childSize="s"
          />
        ),
      },
      {
        title: 'Session C: main size = s, child size = fill',
        description: (
          <FlyoutSession
            flyoutType={flyoutType}
            title="Session C"
            mainSize="s"
            childSize="fill"
          />
        ),
      },
      {
        title: 'Session D: main size = fill, child size = s',
        description: (
          <FlyoutSession
            flyoutType={flyoutType}
            title="Session D"
            mainSize="fill"
            childSize="s"
          />
        ),
      },
      {
        title: 'Session E: main size = fill',
        description: (
          <FlyoutSession
            flyoutType={flyoutType}
            title="Session E"
            mainSize="fill"
          />
        ),
      },
      {
        title:
          'Session F: main size = undefined, child size = fill (maxWidth 1000px)',
        description: (
          <FlyoutSession
            flyoutType={flyoutType}
            title="Session F"
            mainSize={undefined}
            childSize="fill"
            childMaxWidth={1000}
          />
        ),
      },
      {
        title: 'Session G: main size = fill (maxWidth 1000px), child size = s',
        description: (
          <FlyoutSession
            flyoutType={flyoutType}
            title="Session G"
            mainSize="fill"
            mainMaxWidth={1000}
            childSize="s"
          />
        ),
      },
    ],
    [flyoutType]
  );

  return (
    <>
      <EuiSwitch
        label="Flyouts push page content"
        checked={flyoutType === 'push'}
        onChange={handleFlyoutTypeToggle}
      />
      <EuiSpacer />
      <EuiDescriptionList
        type="column"
        columnGutterSize="m"
        listItems={listItems}
      />
      <EuiSpacer size="xl" />
      <DisplayContext title="Flyout manager context" />
    </>
  );
};

export const MultiSessionExample: StoryObj<typeof EuiFlyout> = {
  name: 'Multi-session example',
  render: () => <MultiSessionFlyoutDemo />,
};

const ExternalRootChildFlyout: React.FC<{ parentId: string }> = ({
  parentId,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <EuiPanel hasBorder paddingSize="m" grow={false}>
      <EuiTitle size="xs">
        <h4>Root within {parentId}</h4>
      </EuiTitle>
      <EuiSpacer size="s" />
      <EuiButton onClick={handleOpen} size="s">
        Open Child Flyout
      </EuiButton>
      <EuiFlyout
        id={`child-flyout-${parentId}`}
        isOpen={isOpen}
        size="s"
        onClose={handleClose}
        flyoutMenuProps={{ title: `Child flyout of ${parentId}` }}
        data-test-subj="child-flyout-in-new-root"
      >
        <EuiFlyoutBody>
          <EuiText>
            <p>
              This is a child flyout rendered in a completely separate React
              root! It shares the same flyout manager state as the parent.
            </p>
            <EuiSpacer size="s" />
            <p>Parent ID: {parentId}</p>
          </EuiText>
        </EuiFlyoutBody>
      </EuiFlyout>
    </EuiPanel>
  );
};

const ExternalRootFlyout: React.FC<{ id: string }> = ({ id }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [buttonRoot, setButtonRoot] = useState<Root | null>(null);
  const buttonContainerRef = useRef<HTMLDivElement | null>(null);

  // Create the button to open the child flyout in a separate React root
  useEffect(() => {
    if (isOpen) {
      // Use setTimeout to ensure the DOM element is rendered
      const timer = setTimeout(() => {
        if (buttonContainerRef.current) {
          const newRoot = createRoot(buttonContainerRef.current);
          newRoot.render(
            <EuiProvider>
              {/* 
                EuiFlyoutIsManagedProvider is required here because the child flyout 
                needs to be detected as being within a managed flyout context for 
                proper routing. Without this, the child flyout would route to 
                EuiFlyoutMain instead of EuiFlyoutChild.
              */}
              <EuiFlyoutIsManagedProvider isManaged={true}>
                <ExternalRootChildFlyout parentId={id} />
              </EuiFlyoutIsManagedProvider>
            </EuiProvider>
          );
          setButtonRoot(newRoot);
        }
      }, 100);

      return () => clearTimeout(timer);
    }
  }, [isOpen, id]);

  // Cleanup the button root for opening the child flyout when the main flyout closes
  useEffect(() => {
    if (!isOpen && buttonRoot) {
      buttonRoot.unmount();
      setButtonRoot(null);
    }
  }, [isOpen, buttonRoot]);

  // Cleanup the main flyout's root on unmount
  useEffect(() => {
    return () => {
      if (buttonRoot) {
        buttonRoot.unmount();
      }
    };
  }, [buttonRoot]);

  return (
    <EuiPanel hasBorder paddingSize="m" grow={false}>
      <EuiTitle size="xs">
        <h3>{id}</h3>
      </EuiTitle>
      <EuiSpacer size="s" />
      <EuiButton onClick={() => setIsOpen((prev) => !prev)}>
        {isOpen ? 'Close flyout' : 'Open flyout'}
      </EuiButton>
      <EuiFlyout
        id={`external-root-${id}`}
        isOpen={isOpen}
        session
        size="m"
        onClose={() => setIsOpen(false)}
        flyoutMenuProps={{ title: `${id} flyout` }}
      >
        <EuiFlyoutBody>
          <EuiText>
            <p>
              This flyout lives in a separate React root but shares the same
              manager state. Closing it here should update all other flyout
              menus and history.
            </p>
            <EuiSpacer size="m" />
            <p>
              Below is a button rendered in a separate React root that opens a
              child flyout:
            </p>
            <EuiSpacer size="s" />
            {/* Container for the button React root - inside the main flyout */}
            <div ref={buttonContainerRef} />
          </EuiText>
        </EuiFlyoutBody>
      </EuiFlyout>
    </EuiPanel>
  );
};

const MultiRootFlyoutDemo: React.FC = () => {
  const secondaryRootRef = useRef<HTMLDivElement | null>(null);
  const tertiaryRootRef = useRef<HTMLDivElement | null>(null);
  const mountedRootsRef = useRef<Root[]>([]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (secondaryRootRef.current && tertiaryRootRef.current) {
        const containers = [
          { container: secondaryRootRef.current, id: 'Secondary root' },
          { container: tertiaryRootRef.current, id: 'Tertiary root' },
        ];

        mountedRootsRef.current = containers.map(({ container, id }) => {
          const root = createRoot(container);
          root.render(
            <EuiProvider>
              <ExternalRootFlyout id={id} />
            </EuiProvider>
          );
          return root;
        });
      }
    }, 100);

    return () => {
      clearTimeout(timer);
      mountedRootsRef.current.forEach((root) => root.unmount());
      mountedRootsRef.current = [];
    };
  }, []);

  return (
    <>
      <EuiTitle size="s">
        <h3>Multiple React roots</h3>
      </EuiTitle>
      <EuiSpacer size="s" />
      <EuiText size="s" color="subdued">
        <p>
          These flyouts are rendered in separate React roots but share the same
          flyout manager state. Open/close any flyout and watch the shared state
          update below.
        </p>
      </EuiText>
      <EuiSpacer />
      <EuiFlexGroup gutterSize="m">
        <EuiFlexItem grow={false}>
          <div ref={secondaryRootRef} />
        </EuiFlexItem>
        <EuiFlexItem grow={false}>
          <div ref={tertiaryRootRef} />
        </EuiFlexItem>
      </EuiFlexGroup>
      <EuiSpacer size="xl" />
      <DisplayContext title="Shared manager state" />
    </>
  );
};

export const MultiRootSyncExample: StoryObj<typeof EuiFlyout> = {
  name: 'Multi-root sync',
  render: () => <MultiRootFlyoutDemo />,
};
