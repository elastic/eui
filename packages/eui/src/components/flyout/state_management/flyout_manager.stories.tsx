/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { Meta, StoryFn } from '@storybook/react';
import React, { PropsWithChildren, useCallback } from 'react';

import {
  EuiButton,
  EuiRadioGroup,
  EuiRadioGroupOption,
  EuiSpacer,
  EuiText,
} from '../../index';
import {
  EuiFlyout,
  EuiFlyoutChild,
  EuiFlyoutBody,
  EuiFlyoutFooter,
  EuiFlyoutHeader,
  EuiFlyoutSize,
} from '../index';
import { FlyoutManager, useFlyout } from './flyout_manager';

const FlyoutDemoApp: React.FC = () => {
  const { state, dispatch } = useFlyout();

  const getMainFlyoutContent = (
    currentMainSize: EuiFlyoutSize,
    childSizeForButton: Extract<EuiFlyoutSize, 's' | 'm'>
  ) => [
    <EuiFlyoutHeader hasBorder key="main-header">
      <h2 id="flyout-demo-main-title">Main flyout ({currentMainSize})</h2>
    </EuiFlyoutHeader>,
    <EuiFlyoutBody key="main-body">
      <EuiText key="main-body-text">
        <p>
          Hello, <code>FlyoutDemoApp</code>!
        </p>
      </EuiText>
      <EuiButton
        key="main-body-open-child-button"
        onClick={() =>
          dispatch({
            type: 'OPEN_CHILD_FLYOUT',
            payload: {
              childSize: childSizeForButton,
            },
          })
        }
        isDisabled={state.isChildOpen}
      >
        Open child flyout ({childSizeForButton})
      </EuiButton>
      <EuiButton
        key="main-body-close-main-button"
        onClick={() => dispatch({ type: 'CLOSE_MAIN_FLYOUT' })}
        color="danger"
      >
        Close main flyout
      </EuiButton>
    </EuiFlyoutBody>,
    <EuiFlyoutFooter key="main-footer">
      <EuiText size="s" key="main-footer-text">
        Main flyout footer from DemoApp
      </EuiText>
    </EuiFlyoutFooter>,
  ];

  const getChildFlyoutContent = (
    currentChildSize: Extract<EuiFlyoutSize, 's' | 'm'>
  ) => [
    <EuiFlyoutHeader hasBorder key="child-header">
      <h2 id="flyout-demo-child-title">Child flyout ({currentChildSize})</h2>
    </EuiFlyoutHeader>,
    <EuiFlyoutBody key="child-body">
      <EuiText key="child-body-text">
        <p>
          This is the child flyout, controlled by the dispatcher. Its content is
          defined in <code>FlyoutDemoApp</code>.
        </p>
      </EuiText>
      <EuiButton
        key="child-body-close-button"
        onClick={() => dispatch({ type: 'CLOSE_CHILD_FLYOUT' })}
      >
        Close child flyout
      </EuiButton>
    </EuiFlyoutBody>,
    <EuiFlyoutFooter key="child-footer">
      <EuiText size="s" key="child-footer-text">
        Child flyout footer from DemoApp
      </EuiText>
    </EuiFlyoutFooter>,
  ];

  const mainSizeOptions: EuiRadioGroupOption[] = [
    { id: 'main-s', label: 'Small (s)' },
    { id: 'main-m', label: 'Medium (m)' },
    { id: 'main-l', label: 'Large (l)' },
  ];

  const childSizeOptions: EuiRadioGroupOption[] = [
    {
      id: 'child-s',
      label: 'Small (s)',
      disabled: state.config.mainSize === 'l',
    },
    {
      id: 'child-m',
      label: 'Medium (m)',
      disabled: state.config.mainSize !== 's',
    },
  ];

  const onChangeMainFlyout = useCallback(
    (id: string) => {
      const size = id.replace('main-', '') as EuiFlyoutSize;
      dispatch({
        type: 'SET_CONFIG_SIZES',
        payload: {
          mainSize: size,
        },
      });
    },
    [dispatch]
  );

  const onChangeChildFlyout = useCallback(
    (id: string) => {
      const size = id.replace('child-', '') as Extract<
        EuiFlyoutSize,
        's' | 'm'
      >;
      dispatch({
        type: 'SET_CONFIG_SIZES',
        payload: {
          childSize: size,
        },
      });
    },
    [dispatch]
  );

  return (
    <div>
      <EuiText>
        <p>Use the controls below to configure and open the flyouts.</p>
      </EuiText>

      <EuiSpacer />

      <EuiRadioGroup
        legend={{ children: 'Select main flyout size' }}
        options={mainSizeOptions}
        idSelected={`main-${state.config.mainSize || 'm'}`}
        onChange={onChangeMainFlyout}
        name="mainFlyoutSizeConfig"
      />
      <EuiSpacer />
      <EuiRadioGroup
        legend={{ children: 'Select child flyout size' }}
        options={childSizeOptions}
        idSelected={`child-${state.config.childSize || 's'}`}
        onChange={onChangeChildFlyout}
        name="childFlyoutSizeConfig"
      />

      <EuiSpacer />

      <EuiButton
        onClick={() =>
          dispatch({
            type: 'OPEN_MAIN_FLYOUT',
            payload: {
              mainSize: state.config.mainSize,
            },
          })
        }
        isDisabled={state.isMainOpen}
        fill
      >
        Open main flyout ({state.config.mainSize || 'm'})
      </EuiButton>

      {state.isMainOpen && !state.isChildOpen && (
        <EuiButton
          onClick={() =>
            dispatch({
              type: 'OPEN_CHILD_FLYOUT',
              payload: {
                childSize: state.config.childSize,
              },
            })
          }
        >
          Open child ({state.config.childSize || 's'})
        </EuiButton>
      )}

      {state.isMainOpen && (
        <EuiButton
          onClick={() => dispatch({ type: 'CLOSE_MAIN_FLYOUT' })}
          color="danger"
        >
          Close all flyouts
        </EuiButton>
      )}

      <EuiSpacer />

      <EuiText size="s">
        <p>
          <strong>Current state:</strong>
          <pre>{JSON.stringify(state, null, 2)}</pre>
        </p>
      </EuiText>

      {state.isMainOpen && (
        <EuiFlyout
          onClose={() => dispatch({ type: 'CLOSE_MAIN_FLYOUT' })}
          aria-labelledby="flyout-demo-main-title"
          size={state.config.mainSize}
          type="push"
          ownFocus={false}
          side="right"
          closeButtonPosition="inside"
          pushMinBreakpoint={
            state.config.mainFlyoutProps?.pushMinBreakpoint || 'xs'
          }
          {...(state.config.mainFlyoutProps || {})}
        >
          {getMainFlyoutContent(
            state.config.mainSize!,
            state.config.childSize!
          )}
          {state.isChildOpen && (
            <EuiFlyoutChild
              onClose={() => dispatch({ type: 'CLOSE_CHILD_FLYOUT' })}
              aria-labelledby="flyout-demo-child-title"
              size={state.config.childSize}
              {...(state.config.childFlyoutProps || {})}
            >
              {getChildFlyoutContent(state.config.childSize!)}
            </EuiFlyoutChild>
          )}
        </EuiFlyout>
      )}
    </div>
  );
};

export default {
  title: 'Layout/EuiFlyout/State Management',
  component: FlyoutManager,
  parameters: {
    layout: 'centered',
  },
} as Meta<typeof FlyoutManager>;

const Template: StoryFn<PropsWithChildren<{}>> = (args) => {
  return (
    <FlyoutManager {...args}>
      <FlyoutDemoApp />
    </FlyoutManager>
  );
};

export const Default = Template.bind({});
Default.storyName = 'FlyoutManager provider and useFlyout hook';
