/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { Meta, StoryObj } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import React, { useState, useCallback, useMemo } from 'react';

import {
  EuiButton,
  EuiCodeBlock,
  EuiDescriptionList,
  EuiFlyoutBody,
  EuiFlyoutFooter,
  EuiPageTemplate,
  EuiPageTemplateProps,
  EuiSpacer,
  EuiSwitch,
  EuiSwitchEvent,
  EuiText,
  EuiTitle,
} from '../..';
import { EuiFlyout } from '../flyout';
import { useFlyoutManager, useCurrentSession } from './hooks';

const meta: Meta<typeof EuiFlyout> = {
  title: 'Layout/EuiFlyout/Flyout Manager',
  component: EuiFlyout,
};

export default meta;

interface FlyoutSessionProps {
  title: string;
  mainSize: 's' | 'm' | 'l' | 'fill';
  mainMaxWidth?: number;
  childSize?: 's' | 'm' | 'fill';
  childMaxWidth?: number;
  flyoutType: 'overlay' | 'push';
  childBackgroundShaded?: boolean;
}

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

  // Main flyout lifecycle handlers
  const handleActivateMainFlyout = useCallback(() => {
    action('activate main flyout')(title);
  }, [title]);

  const handleCloseMainFlyout = useCallback(() => {
    action('close main flyout')(title);
    setIsFlyoutVisible(false);
    setIsChildFlyoutVisible(false);
  }, [title]);

  const handleCloseButtonClick = useCallback(() => {
    action('close button click')(title);
    setIsFlyoutVisible(false);
    setIsChildFlyoutVisible(false);
  }, [title]);

  // Child flyout lifecycle handlers
  const handleActivateChildFlyout = useCallback(() => {
    action('activate child flyout')(title);
  }, [title]);

  const handleCloseChildFlyout = useCallback(() => {
    action('close child flyout')(title);
    setIsChildFlyoutVisible(false);
  }, [title]);

  const handleCloseChildButtonClick = useCallback(() => {
    action('close button click')(title);
    setIsChildFlyoutVisible(false);
  }, [title]);

  // Handlers for inline callbacks
  const handleOpenMainFlyout = useCallback(() => {
    action('open main flyout')(title);
    setIsFlyoutVisible(true);
  }, [title]);

  const handleMainFlyoutClose = useCallback(() => {
    handleCloseMainFlyout();
  }, [handleCloseMainFlyout]);

  const handleOpenChildFlyout = useCallback(() => {
    setIsChildFlyoutVisible(true);
  }, []);

  const handleChildFlyoutClose = useCallback(() => {
    handleCloseChildFlyout();
  }, [handleCloseChildFlyout]);

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
        aria-labelledby="flyoutTitle"
        size={mainSize}
        maxWidth={mainMaxWidth}
        type={flyoutType}
        ownFocus={false}
        pushAnimation={true}
        onActive={handleActivateMainFlyout}
        onClose={handleMainFlyoutClose}
      >
        <EuiFlyoutBody>
          <EuiText>
            <p>This is the content of {title}.</p>
            <EuiSpacer size="s" />
            <EuiDescriptionList
              type="column"
              listItems={[
                { title: 'Flyout type', description: flyoutType },
                { title: 'Main flyout size', description: mainSize },
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
        <EuiFlyoutFooter>
          <EuiButton onClick={handleCloseButtonClick}>Close</EuiButton>
        </EuiFlyoutFooter>
        <EuiFlyout
          isOpen={isChildFlyoutVisible}
          id={`childFlyout-${title}`}
          flyoutMenuProps={{ title: `${title} - Child` }}
          aria-labelledby="childFlyoutTitle"
          size={childSize}
          maxWidth={childMaxWidth}
          onActive={handleActivateChildFlyout}
          onClose={handleChildFlyoutClose}
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
          <EuiFlyoutFooter>
            <EuiButton onClick={handleCloseChildButtonClick}>Close</EuiButton>
          </EuiFlyoutFooter>
        </EuiFlyout>
      </EuiFlyout>
    </>
  );
});

FlyoutSession.displayName = 'FlyoutSession';

const ExampleComponent = () => {
  const panelled: EuiPageTemplateProps['panelled'] = undefined;
  const restrictWidth: EuiPageTemplateProps['restrictWidth'] = false;
  const bottomBorder: EuiPageTemplateProps['bottomBorder'] = 'extended';

  const [flyoutType, setFlyoutType] = useState<'overlay' | 'push'>('overlay');

  const handleFlyoutTypeToggle = useCallback((e: EuiSwitchEvent) => {
    setFlyoutType(e.target.checked ? 'push' : 'overlay');
  }, []);

  const flyoutManager = useFlyoutManager();
  const currentSession = useCurrentSession();

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
        title: 'Session F: main size = s, child size = fill (maxWidth 1000px)',
        description: (
          <FlyoutSession
            flyoutType={flyoutType}
            title="Session F"
            mainSize="s"
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
    <EuiPageTemplate
      panelled={panelled}
      restrictWidth={restrictWidth}
      bottomBorder={bottomBorder}
      offset={0}
      grow={false}
    >
      <EuiPageTemplate.Header
        iconType="logoElastic"
        pageTitle="Flyout System Example"
      />
      <EuiPageTemplate.Section grow={false} bottomBorder={bottomBorder}>
        <EuiTitle size="s">
          <h3 id="settingsHeading">Options</h3>
        </EuiTitle>
        <EuiSpacer />
        <EuiSwitch
          label="Flyouts push page content"
          checked={flyoutType === 'push'}
          onChange={handleFlyoutTypeToggle}
        />
        {/* FIXME add option to set child flyout background style to "shaded" */}
      </EuiPageTemplate.Section>
      <EuiPageTemplate.Section grow={false} bottomBorder={bottomBorder}>
        <EuiDescriptionList
          type="column"
          columnGutterSize="m"
          listItems={listItems}
        />
      </EuiPageTemplate.Section>
      <EuiPageTemplate.Section>
        <EuiTitle size="s">
          <h3 id="contextHeading">Contexts</h3>
        </EuiTitle>
        <EuiSpacer />
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
      </EuiPageTemplate.Section>
    </EuiPageTemplate>
  );
};

export const MultiSessionExample: StoryObj<typeof EuiFlyout> = {
  name: 'Multi-session example',
  render: () => <ExampleComponent />,
  parameters: {
    layout: 'fullscreen',
  },
};
