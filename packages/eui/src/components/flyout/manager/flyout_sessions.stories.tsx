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
  useRef,
  useState,
  type PropsWithChildren,
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
  EuiIcon,
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
import type { EuiIconType } from '../../icon/icon';

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
  mainSize: 's' | 'm' | 'l' | 'fill';
  mainMaxWidth?: number;
  childSize: 's' | 'm' | 'fill';
  childMaxWidth?: number;
  historyKey?: symbol;
  iconType: EuiIconType;
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

const childId1 = (t: string) => `childFlyout1-${t}`;
const childId2 = (t: string) => `childFlyout2-${t}`;

const FlyoutSession: React.FC<PropsWithChildren & FlyoutSessionProps> = (
  props
) => {
  const {
    children,
    title,
    mainSize,
    childSize,
    mainMaxWidth,
    childMaxWidth,
    historyKey,
    iconType,
  } = props;

  const [isFlyoutVisible, setIsFlyoutVisible] = useState(false);
  const [isChild1FlyoutVisible, setIsChild1FlyoutVisible] = useState(false);
  const [isChild2FlyoutVisible, setIsChild2FlyoutVisible] = useState(false);

  const currentSession = useCurrentSession();
  const flyoutManager = useFlyoutManager();

  const [flyoutType, setFlyoutType] = useState<'overlay' | 'push'>('push');
  const [flyoutOwnFocus, setFlyoutOwnFocus] = useState(false);

  const childIdsInSession = new Set<string>([
    ...(currentSession?.childFlyoutId ? [currentSession.childFlyoutId] : []),
    ...(currentSession?.childHistory ?? []).map((e) => e.flyoutId),
  ]);

  const handleOpenMainFlyout = () => {
    setIsFlyoutVisible(true);
  };

  const handleOpenChild1 = () => {
    setIsChild1FlyoutVisible(true);
  };

  const handleOpenChild2 = () => {
    setIsChild2FlyoutVisible(true);
  };

  /** Switch to Child 1 when it's already in the session (e.g. from Child 2's "Open previous" button). */
  const handleGoToChild1 = useCallback(() => {
    flyoutManager?.goToFlyout(childId1(title), 'child');
  }, [flyoutManager, title]);

  const mainFlyoutOnActive = useCallback(() => {
    action('activate main flyout')(title);
  }, [title]);

  const childFlyoutOnActive = useCallback(
    (which: 'child1' | 'child2') => () => {
      action('activate child flyout')(`${title} - ${which}`);
    },
    [title]
  );

  const mainFlyoutOnClose = useCallback(() => {
    action('close main flyout')(title);
    setIsFlyoutVisible(false);
  }, [title]);

  const child1FlyoutOnClose = useCallback(() => {
    action('close child flyout')(`${title} - Child 1`);
    setIsChild1FlyoutVisible(false);
  }, [title]);

  const child2FlyoutOnClose = useCallback(() => {
    action('close child flyout')(`${title} - Child 2`);
    setIsChild2FlyoutVisible(false);
  }, [title]);

  return (
    <>
      <EuiFlexGroup gutterSize="s" alignItems="center">
        <EuiFlexItem grow={false}>
          <EuiFlexGroup>
            <EuiFlexItem grow={false}>
              <EuiSwitch
                label="Overlay"
                checked={flyoutType === 'overlay'}
                onChange={(e: EuiSwitchEvent) =>
                  setFlyoutType(e.target.checked ? 'overlay' : 'push')
                }
              />
            </EuiFlexItem>
            <EuiFlexItem grow={false}>
              <EuiSwitch
                label="ownFocus"
                checked={flyoutOwnFocus}
                disabled={flyoutType === 'push'}
                onChange={(e: EuiSwitchEvent) =>
                  setFlyoutOwnFocus(e.target.checked)
                }
              />
            </EuiFlexItem>
          </EuiFlexGroup>
        </EuiFlexItem>
        <EuiFlexItem>
          <EuiButton disabled={isFlyoutVisible} onClick={handleOpenMainFlyout}>
            {iconType && <EuiIcon type={iconType} />} {title}
          </EuiButton>
        </EuiFlexItem>
      </EuiFlexGroup>
      {isFlyoutVisible && (
        <EuiFlyout
          id={`mainFlyout-${title}`}
          session="start"
          historyKey={historyKey}
          flyoutMenuProps={{
            title: `${title} - Main`,
            iconType,
          }}
          size={mainSize}
          maxWidth={mainMaxWidth}
          type={flyoutType}
          ownFocus={flyoutOwnFocus}
          pushAnimation={true}
          onActive={mainFlyoutOnActive}
          onClose={mainFlyoutOnClose}
          resizable={true}
        >
          <EuiFlyoutHeader>
            <EuiTitle size="m">
              <h2 id={`mainFlyoutTitle-${title}`}>
                <EuiIcon type={iconType} /> {title}
              </h2>
            </EuiTitle>
          </EuiFlyoutHeader>
          <EuiFlyoutBody>
            <EuiText>
              {children}
              <EuiSpacer size="m" />
              <EuiFlexGroup gutterSize="s">
                <EuiFlexItem grow={false}>
                  <EuiButton
                    onClick={handleOpenChild1}
                    disabled={childIdsInSession.has(childId1(title))}
                  >
                    Open Child 1
                  </EuiButton>
                </EuiFlexItem>
                <EuiFlexItem grow={false}>
                  <EuiButton
                    onClick={handleOpenChild2}
                    disabled={childIdsInSession.has(childId2(title))}
                  >
                    Open Child 2
                  </EuiButton>
                </EuiFlexItem>
              </EuiFlexGroup>
            </EuiText>
          </EuiFlyoutBody>
          {isChild1FlyoutVisible && (
            <EuiFlyout
              id={childId1(title)}
              flyoutMenuProps={{
                title: `${title} - Child 1`,
                iconType: 'faceNeutral',
              }}
              size={childSize}
              maxWidth={childMaxWidth}
              onActive={childFlyoutOnActive('child1')}
              onClose={child1FlyoutOnClose}
              resizable={true}
              hasChildBackground={true}
            >
              <EuiFlyoutBody>
                <EuiText>
                  <p>
                    Child 1. Open &quot;Child 2&quot; to test child→child
                    navigation.
                  </p>
                  <EuiSpacer size="s" />
                  <EuiDescriptionList
                    type="column"
                    listItems={[
                      { title: 'Child', description: '1' },
                      {
                        title: 'session',
                        description: <EuiCode>inherit</EuiCode>,
                      },
                    ]}
                  />
                  <EuiSpacer size="m" />
                  <EuiButton onClick={handleOpenChild2}>
                    Open next (Child 2)
                  </EuiButton>
                </EuiText>
              </EuiFlyoutBody>
            </EuiFlyout>
          )}
          {isChild2FlyoutVisible && (
            <EuiFlyout
              id={childId2(title)}
              flyoutMenuProps={{
                title: `${title} - Child 2`,
                iconType: 'faceNeutral',
              }}
              size={childSize}
              maxWidth={childMaxWidth}
              onActive={childFlyoutOnActive('child2')}
              onClose={child2FlyoutOnClose}
              resizable={true}
              hasChildBackground={true}
            >
              <EuiFlyoutBody>
                <EuiText>
                  <p>
                    Child 2. You navigated from Child 1. Check manager state
                    below.
                  </p>
                  <EuiSpacer size="s" />
                  <EuiDescriptionList
                    type="column"
                    listItems={[
                      { title: 'Child', description: '2' },
                      {
                        title: 'session',
                        description: <EuiCode>inherit</EuiCode>,
                      },
                    ]}
                  />
                  <EuiSpacer size="m" />
                  <EuiButton onClick={handleGoToChild1}>
                    Open previous (Child 1)
                  </EuiButton>
                </EuiText>
              </EuiFlyoutBody>
            </EuiFlyout>
          )}
        </EuiFlyout>
      )}
    </>
  );
};

const MultiSessionFlyoutDemo: React.FC = () => {
  // 'permits' doesn't have a history key, so it will be assigned a random one internally
  const parksHistoryKey = React.useRef(Symbol('parks')).current;
  const sanitationHistoryKey = React.useRef(Symbol('sanitation')).current;

  const listItems = [
    {
      title: 'Parks',
      description: (
        <EuiPanel>
          <EuiFlexGroup
            gutterSize="s"
            direction="column"
            alignItems="flexStart"
          >
            <EuiFlexItem grow={false}>
              <FlyoutSession
                title="Park hours"
                mainSize="s"
                childSize="s"
                historyKey={parksHistoryKey}
                iconType="clock"
              >
                Park hours are from 6am to 10pm daily, with last entry at
                9:30pm.
              </FlyoutSession>
            </EuiFlexItem>
            <EuiFlexItem grow={false}>
              <FlyoutSession
                title="Facility reservations"
                mainSize="s"
                childSize="s"
                historyKey={parksHistoryKey}
                iconType="calendar"
              >
                Reservations can be made by calling (555) 123-4567 or online at
                www.cityparks.com/reservations.
              </FlyoutSession>
            </EuiFlexItem>
            <EuiFlexItem grow={false}>
              <FlyoutSession
                title="Events"
                mainSize="s"
                childSize="s"
                historyKey={parksHistoryKey}
                iconType="megaphone"
              >
                No upcoming events. Check back later!
              </FlyoutSession>
            </EuiFlexItem>
          </EuiFlexGroup>
        </EuiPanel>
      ),
    },
    {
      title: 'Sanitation',
      description: (
        <EuiPanel>
          <EuiFlexGroup
            gutterSize="s"
            direction="column"
            alignItems="flexStart"
          >
            <EuiFlexItem grow={false}>
              <FlyoutSession
                title="Trash schedule"
                mainSize="m"
                childSize="s"
                historyKey={sanitationHistoryKey}
                iconType="trash"
              >
                Trash pickup is on Mondays and Thursdays. Recycling pickup is on
                Wednesdays.
              </FlyoutSession>
            </EuiFlexItem>
            <EuiFlexItem grow={false}>
              <FlyoutSession
                title="Recycling guidelines"
                mainSize="m"
                childSize="s"
                historyKey={sanitationHistoryKey}
                iconType="aggregate"
              >
                Recycling guidelines: Plastic bottles and containers, paper and
                cardboard, aluminum cans, and glass bottles and jars are
                accepted. Please rinse containers and remove lids.
              </FlyoutSession>
            </EuiFlexItem>
            <EuiFlexItem grow={false}>
              <FlyoutSession
                title="Bulk pickup"
                mainSize="m"
                childSize="s"
                historyKey={sanitationHistoryKey}
                iconType="broom"
              >
                Bulk pickup is available by appointment only. Schedule a pickup
                by calling (555) 987-6543 or online at
                www.citysanitation.com/bulk-pickup.
              </FlyoutSession>
            </EuiFlexItem>
          </EuiFlexGroup>
        </EuiPanel>
      ),
    },
    {
      title: 'Permits',
      description: (
        <EuiPanel>
          <EuiFlexGroup
            gutterSize="s"
            direction="column"
            alignItems="flexStart"
          >
            <EuiFlexItem grow={false}>
              <FlyoutSession
                title="Permits"
                mainSize="s"
                childSize="s"
                iconType="document"
              >
                For permit information, please contact city hall at (555)
                555-5555 or visit www.cityhall.com/permits.
              </FlyoutSession>
            </EuiFlexItem>
          </EuiFlexGroup>
        </EuiPanel>
      ),
    },
  ];

  return (
    <>
      <EuiText>
        <p>
          &quot;Parks&quot;, &quot;Sanitation&quot;, and &quot;Permits&quot; are
          separate groups to demonstrate that the Back button can only navigate
          within a single scoped history group.
        </p>
      </EuiText>
      <EuiSpacer size="l" />

      <EuiDescriptionList
        type="column"
        columnGutterSize="s"
        rowGutterSize="m"
        listItems={listItems}
      />
      <EuiSpacer size="l" />

      <DisplayContext title="Flyout manager context" />
      <EuiSpacer size="l" />

      <EuiText size="s" color="subdued">
        <p>
          The following filler text is used for testing scrolling and push
          behaviors.
        </p>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque
          eleifend ex nec urna efficitur, at convallis erat facilisis. Sed
          laoreet, nunc id gravida cursus, ligula erat facilisis risus, in
          dignissim libero odio a justo. Nullam euismod, nisi vel consectetur
          interdum, nisl nisi aliquam nunc, eget aliquam massa nisl quis nunc.
          Donec euismod, nisi vel consectetur interdum, nisl nisi aliquam nunc,
          eget aliquam massa nisl quis nunc. Donec euismod, nisi vel consectetur
          interdum, nisl nisi aliquam nunc, eget aliquam massa nisl quis nunc.
          Donec euismod, nisi vel consectetur interdum, nisl nisi aliquam nunc,
          eget aliquam massa nisl quis nunc.
        </p>
        <p>
          Vivamus luctus urna sed urna ultricies ac tempor dui sagittis. In
          condimentum facilisis porta. Sed nec diam eu diam mattis viverra.
          Nulla fringilla, orci ac euismod semper, magna diam porttitor mauris,
          quis sollicitudin sapien justo in libero. Fusce lacinia arcu et nulla.
          Nulla vitae mauris non felis mollis faucibus. Phasellus sodales
          volutpat urna, id fringilla mi consectetur nec.
        </p>
        <p>
          Pellentesque habitant morbi tristique senectus et netus et malesuada
          fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae,
          ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam
          egestas semper. Aenean ultricies mi vitae est. Mauris placerat
          eleifend leo.
        </p>
        <p>
          Quisque sit amet est et sapien ullamcorper pharetra. Vestibulum erat
          wisi, condimentum sed, commodo vitae, ornare sit amet, wisi. Aenean
          fermentum, elit eget tincidunt condimentum, eros ipsum rutrum orci,
          sagittis tempus lacus enim ac dui. Donec non enim in turpis pulvinar
          facilisis. Ut felis. Praesent dapibus, neque id cursus faucibus,
          tortor neque egestas augue, eu vulputate magna eros eu erat. Aliquam
          erat volutpat. Nam dui mi, tincidunt quis, accumsan porttitor,
          facilisis luctus, metus.
        </p>
      </EuiText>
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
          session="inherit"
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
          <EuiFlyoutHeader>
            <EuiTitle size="m">
              <h2 id={`externalRootFlyoutTitle-${id}`}>
                {id} - External Root Flyout
              </h2>
            </EuiTitle>
          </EuiFlyoutHeader>
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

      <EuiSpacer size="l" />

      <DisplayContext title="Shared manager state" />
    </>
  );
};

export const MultiRootSyncExample: StoryObj<typeof EuiFlyout> = {
  name: 'Multi-root sync',
  render: () => <MultiRootFlyoutDemo />,
};
