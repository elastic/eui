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
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import type { Root } from 'react-dom/client';
import { createRoot } from 'react-dom/client';

import {
  EuiButton,
  EuiCode,
  EuiCodeBlock,
  EuiDescriptionList,
  EuiFlexGroup,
  EuiFlexItem,
  EuiFlyoutBody,
  EuiFlyoutHeader,
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

const meta: Meta<typeof EuiFlyout> = {
  title: 'Layout/EuiFlyout/Flyout Manager',
  component: EuiFlyout,
  parameters: {
    // Skipping visual regression testing with Loki
    // This is a playground for Flyout Manager and doesn't show anything testable on page load
    loki: { skip: true },
  },
};

export default meta;

interface FlyoutSessionProps {
  title: string;
  mainSize?: 's' | 'm' | 'l' | 'fill';
  mainMaxWidth?: number;
  childSize?: 's' | 'm' | 'fill';
  childMaxWidth?: number;
  flyoutType: 'overlay' | 'push';
  ownFocus?: boolean;
  hasChildBackground: boolean;
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
    ownFocus = false,
    hasChildBackground,
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
      {isFlyoutVisible && (
        <EuiFlyout
          id={`mainFlyout-${title}`}
          session="start"
          flyoutMenuProps={{ title: `${title} - Main` }}
          size={mainSize}
          maxWidth={mainMaxWidth}
          type={flyoutType}
          ownFocus={ownFocus}
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
                  {
                    title: 'session',
                    description: 'start',
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
          {childSize && isChildFlyoutVisible && (
            <EuiFlyout
              id={`childFlyout-${title}`}
              flyoutMenuProps={{ title: `${title} - Child` }}
              aria-labelledby="childFlyoutTitle"
              size={childSize}
              maxWidth={childMaxWidth}
              onActive={childFlyoutOnActive}
              onClose={childFlyoutOnClose}
              hasChildBackground={hasChildBackground}
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
                      {
                        title: 'session',
                        description: 'inherit',
                      },
                    ]}
                  />
                </EuiText>
              </EuiFlyoutBody>
            </EuiFlyout>
          )}
        </EuiFlyout>
      )}
    </>
  );
});

FlyoutSession.displayName = 'FlyoutSession';

const NonSessionFlyout: React.FC<{
  flyoutType: 'overlay' | 'push';
}> = React.memo(({ flyoutType }) => {
  const [isFlyoutVisible, setIsFlyoutVisible] = useState(false);

  const handleOpenFlyout = () => {
    setIsFlyoutVisible(true);
  };

  const flyoutOnClose = useCallback(() => {
    action('close non-session flyout')();
    setIsFlyoutVisible(false);
  }, []);

  return (
    <>
      <EuiText>
        <EuiButton disabled={isFlyoutVisible} onClick={handleOpenFlyout}>
          Open non-session flyout
        </EuiButton>
      </EuiText>
      {isFlyoutVisible && (
        <EuiFlyout
          id="nonSessionFlyout"
          aria-labelledby="nonSessionFlyoutTitle"
          size="s"
          type={flyoutType}
          ownFocus={false}
          pushAnimation={true}
          onClose={flyoutOnClose}
          session="never"
          side="left"
        >
          <EuiFlyoutHeader>
            <EuiTitle size="m">
              <h2 id="nonSessionFlyoutTitle">Non-session Flyout</h2>
            </EuiTitle>
          </EuiFlyoutHeader>
          <EuiFlyoutBody>
            <EuiText>
              <p>
                This is the content of a non-session flyout. We assure it will
                never become a managed flyout by setting{' '}
                <EuiCode>{'session={never}'}</EuiCode>.
              </p>
              <EuiSpacer size="s" />
              <EuiDescriptionList
                type="column"
                listItems={[
                  { title: 'Flyout type', description: flyoutType },
                  { title: 'Size', description: 'm' },
                  { title: 'session', description: 'never' },
                ]}
              />
            </EuiText>
          </EuiFlyoutBody>
        </EuiFlyout>
      )}
    </>
  );
});

NonSessionFlyout.displayName = 'NonSessionFlyout';

const MultiSessionFlyoutDemo: React.FC = () => {
  const [flyoutType, setFlyoutType] = useState<'overlay' | 'push'>('overlay');
  const [hasChildBackground, setChildBackgroundShaded] = useState(false);

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
            hasChildBackground={hasChildBackground}
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
            hasChildBackground={hasChildBackground}
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
            hasChildBackground={hasChildBackground}
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
            hasChildBackground={hasChildBackground}
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
            hasChildBackground={hasChildBackground}
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
            hasChildBackground={hasChildBackground}
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
            hasChildBackground={hasChildBackground}
          />
        ),
      },
      {
        title: 'Session H: main size = s, child size = s, ownFocus = true',
        description: (
          <FlyoutSession
            flyoutType={flyoutType}
            title="Session H"
            mainSize="s"
            childSize="s"
            ownFocus
            hasChildBackground={hasChildBackground}
          />
        ),
      },
      {
        title: 'Non-session flyout',
        description: <NonSessionFlyout flyoutType={flyoutType} />,
      },
    ],
    [flyoutType, hasChildBackground]
  );

  return (
    <>
      <EuiSwitch
        label="Flyouts push page content"
        checked={flyoutType === 'push'}
        onChange={handleFlyoutTypeToggle}
      />
      <EuiSpacer />
      <EuiSwitch
        label="Child flyout background shaded"
        checked={hasChildBackground}
        onChange={() => setChildBackgroundShaded((prev) => !prev)}
      />
      <EuiSpacer size="m" />
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

  const handleToggle = () => {
    setIsOpen((prev) => !prev);
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
      <EuiButton onClick={handleToggle} size="s" disabled={isOpen}>
        Open child flyout
      </EuiButton>
      {isOpen && (
        <EuiFlyout
          id={`child-flyout-${parentId}`}
          size="s"
          onClose={handleClose}
          ownFocus={false}
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
      )}
    </EuiPanel>
  );
};

const ExternalRootFlyout: React.FC<{ id: string }> = ({ id }) => {
  const [isOpen, setIsOpen] = useState(false);
  const buttonContainerRef = useRef<HTMLDivElement | null>(null);
  const buttonRootRef = useRef<Root | null>(null);

  // Manage the React root lifecycle for the child flyout button
  useEffect(() => {
    if (!isOpen) {
      // Clean up when closing
      if (buttonRootRef.current) {
        buttonRootRef.current.unmount();
        buttonRootRef.current = null;
      }
      return;
    }

    // When opening, wait for flyout to render before creating nested root
    const timer = setTimeout(() => {
      if (buttonContainerRef.current && !buttonRootRef.current) {
        const newRoot = createRoot(buttonContainerRef.current);
        newRoot.render(
          <EuiProvider>
            <ExternalRootChildFlyout parentId={id} />
          </EuiProvider>
        );
        buttonRootRef.current = newRoot;
      }
    }, 0);

    return () => {
      clearTimeout(timer);
      // Don't unmount here - let the !isOpen case handle cleanup
    };
  }, [isOpen, id]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (buttonRootRef.current) {
        buttonRootRef.current.unmount();
        buttonRootRef.current = null;
      }
    };
  }, []);

  return (
    <EuiPanel hasBorder paddingSize="m" grow={false}>
      <EuiTitle size="xs">
        <h3>{id}</h3>
      </EuiTitle>
      <EuiSpacer size="s" />
      <EuiButton onClick={() => setIsOpen((prev) => !prev)}>
        {isOpen ? 'Close flyout' : 'Open flyout'}
      </EuiButton>
      {isOpen && (
        <EuiFlyout
          id={`external-root-${id}`}
          session="start"
          size="m"
          onClose={() => setIsOpen(false)}
          ownFocus={false}
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
      )}
    </EuiPanel>
  );
};

const MultiRootFlyoutDemo: React.FC = () => {
  const secondaryRootRef = useRef<HTMLDivElement | null>(null);
  const tertiaryRootRef = useRef<HTMLDivElement | null>(null);
  const mountedRootsRef = useRef<Root[]>([]);

  useLayoutEffect(() => {
    if (
      secondaryRootRef.current &&
      tertiaryRootRef.current &&
      mountedRootsRef.current.length === 0
    ) {
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

    return () => {
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
