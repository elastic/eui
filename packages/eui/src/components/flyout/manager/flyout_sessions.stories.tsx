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
  mainSize: 's' | 'm' | 'l' | 'fill';
  mainMaxWidth?: number;
  childSize: 's' | 'm' | 'fill';
  childMaxWidth?: number;
  /** Optional. When set, flyouts in this session share history with others using the same Symbol. */
  historyKey?: symbol;
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

/** Reusable session child flyout (shared props; body content passed as children). */
const SessionChildFlyout: React.FC<{
  id: string;
  flyoutTitle: string;
  size: 's' | 'm' | 'fill';
  maxWidth?: number;
  onClose: () => void;
  onActive: () => void;
  children: React.ReactNode;
}> = ({ id, flyoutTitle, size, maxWidth, onClose, onActive, children }) => (
  <EuiFlyout
    id={id}
    session="inherit"
    flyoutMenuProps={{ title: flyoutTitle, iconType: 'faceNeutral' }}
    size={size}
    maxWidth={maxWidth}
    onActive={onActive}
    onClose={onClose}
    resizable={false}
    hasChildBackground={true}
  >
    <EuiFlyoutBody>{children}</EuiFlyoutBody>
  </EuiFlyout>
);

const FlyoutSession: React.FC<FlyoutSessionProps> = (props) => {
  const {
    title,
    mainSize,
    childSize,
    mainMaxWidth,
    childMaxWidth,
    historyKey,
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
    flyoutManager?.goToFlyout(`childFlyout1-${title}`, 'child');
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
            Open {title} flyout
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
            iconType: 'faceHappy',
          }}
          size={mainSize}
          maxWidth={mainMaxWidth}
          type={flyoutType}
          ownFocus={flyoutOwnFocus}
          hasAnimation={true}
          onActive={mainFlyoutOnActive}
          onClose={mainFlyoutOnClose}
          resizable={true}
        >
          <EuiFlyoutHeader>
            <EuiTitle size="m">
              <h2 id={`mainFlyoutTitle-${title}`}>{title} - Main Flyout</h2>
            </EuiTitle>
          </EuiFlyoutHeader>
          <EuiFlyoutBody>
            <EuiText>
              <p>Child-to-child navigation: open one child, then the other.</p>
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
                    description: <EuiCode>start</EuiCode>,
                  },
                ]}
              />
              <EuiSpacer size="m" />
              <EuiFlexGroup gutterSize="s">
                {([1, 2] as const).map((n) => (
                  <EuiFlexItem key={n} grow={false}>
                    <EuiButton
                      onClick={n === 1 ? handleOpenChild1 : handleOpenChild2}
                      disabled={childIdsInSession.has(
                        `childFlyout${n}-${title}`
                      )}
                    >
                      Open Child {n}
                    </EuiButton>
                  </EuiFlexItem>
                ))}
              </EuiFlexGroup>
            </EuiText>
          </EuiFlyoutBody>
        </EuiFlyout>
      )}
      {isChild1FlyoutVisible && (
        <SessionChildFlyout
          id={`childFlyout1-${title}`}
          flyoutTitle={`${title} - Child 1`}
          size={childSize}
          maxWidth={childMaxWidth}
          onClose={child1FlyoutOnClose}
          onActive={childFlyoutOnActive('child1')}
        >
          <EuiText>
            <p>
              Child 1. Open &quot;Child 2&quot; to test child→child navigation.
            </p>
            <EuiSpacer size="s" />
            <EuiDescriptionList
              type="column"
              listItems={[
                { title: 'Child', description: '1' },
                {
                  title: 'Child flyout size',
                  description: childSize ?? 'N/A',
                },
                {
                  title: 'Child flyout maxWidth',
                  description: childMaxWidth ?? 'N/A',
                },
                { title: 'session', description: <EuiCode>inherit</EuiCode> },
              ]}
            />
            <EuiSpacer size="m" />
            <EuiButton onClick={handleOpenChild2}>
              Open next (Child 2)
            </EuiButton>
          </EuiText>
        </SessionChildFlyout>
      )}
      {isChild2FlyoutVisible && (
        <SessionChildFlyout
          id={`childFlyout2-${title}`}
          flyoutTitle={`${title} - Child 2`}
          size={childSize}
          maxWidth={childMaxWidth}
          onClose={child2FlyoutOnClose}
          onActive={childFlyoutOnActive('child2')}
        >
          <EuiText>
            <p>
              Child 2. You navigated from Child 1. Check manager state below.
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
        </SessionChildFlyout>
      )}
    </>
  );
};

const NonSessionFlyout: React.FC<{ size: string }> = ({ size }) => {
  const [isFlyoutVisible, setIsFlyoutVisible] = useState(false);
  const [flyoutType, setFlyoutType] = useState<'overlay' | 'push'>('push');
  const [flyoutOwnFocus, setFlyoutOwnFocus] = useState(false);

  const handleOpenFlyout = () => {
    setIsFlyoutVisible(true);
  };

  const flyoutOnClose = useCallback(() => {
    action('close non-session flyout')();
    setIsFlyoutVisible(false);
  }, []);

  // Render

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
          <EuiButton disabled={isFlyoutVisible} onClick={handleOpenFlyout}>
            Open non-session flyout
          </EuiButton>
        </EuiFlexItem>
      </EuiFlexGroup>
      {isFlyoutVisible && (
        <EuiFlyout
          // Using default EuiFlyout session behavior of 'never'
          id="nonSessionFlyout"
          aria-labelledby="nonSessionFlyoutTitle"
          size={size}
          type={flyoutType}
          ownFocus={flyoutOwnFocus}
          hasAnimation={true}
          onClose={flyoutOnClose}
        >
          <EuiFlyoutHeader>
            <EuiTitle size="m">
              <h2 id="nonSessionFlyoutTitle">Non-session Flyout</h2>
            </EuiTitle>
          </EuiFlyoutHeader>
          <EuiFlyoutBody>
            <EuiText>
              <p>
                This is the content of a non-session flyout. It is assured to
                not be a managed flyout using the{' '}
                <EuiCode>{'session={never}'}</EuiCode> behavior.
              </p>
              <EuiSpacer size="s" />
              <EuiDescriptionList
                type="column"
                listItems={[
                  { title: 'Flyout type', description: flyoutType },
                  { title: 'Size', description: 'm' },
                  {
                    title: 'session',
                    description: (
                      <>
                        <EuiCode>never</EuiCode> (using default)
                      </>
                    ),
                  },
                ]}
              />
            </EuiText>
          </EuiFlyoutBody>
        </EuiFlyout>
      )}
    </>
  );
};

const MultiSessionFlyoutDemo: React.FC = () => {
  const parksHistoryKey = React.useRef(Symbol()).current;
  const sanitationHistoryKey = React.useRef(Symbol()).current;

  const listItems = [
    {
      title: 'Parks (shared history)',
      description: (
        <EuiFlexGroup gutterSize="s" direction="column" alignItems="flexStart">
          <EuiFlexItem grow={false}>
            <FlyoutSession
              title="Park hours"
              mainSize="s"
              childSize="s"
              historyKey={parksHistoryKey}
            />
          </EuiFlexItem>
          <EuiFlexItem grow={false}>
            <FlyoutSession
              title="Facility reservations"
              mainSize="s"
              childSize="s"
              historyKey={parksHistoryKey}
            />
          </EuiFlexItem>
          <EuiFlexItem grow={false}>
            <FlyoutSession
              title="Events"
              mainSize="s"
              childSize="s"
              historyKey={parksHistoryKey}
            />
          </EuiFlexItem>
        </EuiFlexGroup>
      ),
    },
    {
      title: 'Sanitation (shared history)',
      description: (
        <EuiFlexGroup gutterSize="s" direction="column" alignItems="flexStart">
          <EuiFlexItem grow={false}>
            <FlyoutSession
              title="Trash schedule"
              mainSize="m"
              childSize="s"
              historyKey={sanitationHistoryKey}
            />
          </EuiFlexItem>
          <EuiFlexItem grow={false}>
            <FlyoutSession
              title="Recycling guidelines"
              mainSize="m"
              childSize="s"
              historyKey={sanitationHistoryKey}
            />
          </EuiFlexItem>
          <EuiFlexItem grow={false}>
            <FlyoutSession
              title="Bulk pickup"
              mainSize="m"
              childSize="s"
              historyKey={sanitationHistoryKey}
            />
          </EuiFlexItem>
        </EuiFlexGroup>
      ),
    },
    {
      title: 'Permits (no historyKey: unique group)',
      description: (
        <FlyoutSession
          title="Permits"
          mainSize="s"
          childSize="s"
          // no historyKey - each session is alone in its history group
        />
      ),
    },
    {
      title: 'Non-session flyout',
      description: <NonSessionFlyout size="s" />,
    },
  ];

  return (
    <>
      <EuiText>
        <p>
          &quot;Parks&quot;, &quot;Sanitation&quot;, and &quot;Permits&quot; are
          separate groups of scoped history. Navigating with the Back button and
          the history menu does not cross over into other groups.
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
  parameters: {
    docs: {
      description: {
        story:
          'Parks and Sanitation use a shared `historyKey` so Back/history are scoped to each domain. Permits omits `historyKey` so it is alone in its history group. Open flyouts from different sections to see that histories do not mix.',
      },
    },
  },
  render: () => <MultiSessionFlyoutDemo />,
};

const ExternalRootChildFlyout: React.FC<{
  historyKey: symbol;
  parentId: string;
}> = ({ historyKey, parentId }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen((prev) => !prev);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <>
      <EuiButton onClick={handleToggle} size="s" disabled={isOpen}>
        {`Open ${parentId} child flyout in external root`}
      </EuiButton>
      {isOpen && (
        <EuiFlyout
          id={`child-flyout-${parentId}`}
          session="inherit"
          size="s"
          onClose={handleClose}
          ownFocus={false}
          flyoutMenuProps={{ title: `Child flyout of ${parentId}` }}
          resizable={false}
          data-test-subj="child-flyout-in-new-root"
          historyKey={historyKey}
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
    </>
  );
};

const ExternalRootFlyout: React.FC<{ id: string; historyKey: symbol }> = ({
  id,
  historyKey,
}) => {
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
            <ExternalRootChildFlyout historyKey={historyKey} parentId={id} />
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
    <>
      <EuiButton onClick={() => setIsOpen((prev) => !prev)} disabled={isOpen}>
        {`Open ${id} flyout`}
      </EuiButton>
      {isOpen && (
        <EuiFlyout
          id={`external-root-${id}`}
          session="start"
          size="m"
          onClose={() => setIsOpen(false)}
          ownFocus={false}
          flyoutMenuProps={{ title: `${id} flyout` }}
          resizable={true}
          historyKey={historyKey}
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
    </>
  );
};

const multiRootHistoryKey = Symbol('multiRootSharedHistory');

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
            <ExternalRootFlyout id={id} historyKey={multiRootHistoryKey} />
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
