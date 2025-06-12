/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { Meta, StoryFn } from '@storybook/react';
import React, { PropsWithChildren } from 'react';

import {
  EuiButton,
  EuiSpacer,
  EuiCodeBlock,
  EuiTitle,
  EuiFlyoutBody,
  EuiFlyoutFooter,
  EuiFlyoutHeader,
  EuiText,
} from '../../index';

import { FlyoutManager, useFlyout } from './flyout_manager';
import { FlyoutRenderContext } from './types';

interface ShoppingCartContentProps {
  context: FlyoutRenderContext;
}
const ShoppingCartContent: React.FC<ShoppingCartContentProps> = ({
  context,
}) => {
  const { dispatch, activeFlyoutGroup, onClose } = context;
  const itemQuantity =
    context.flyoutSpecificProps.customData?.itemQuantity || 0;

  const handleUpdateQuantity = (delta: number) => {
    if (
      !activeFlyoutGroup ||
      !activeFlyoutGroup.config.mainFlyoutProps?.customData
    )
      return;
    const currentCustomData =
      activeFlyoutGroup.config.mainFlyoutProps.customData;
    const currentQuantity = currentCustomData.itemQuantity || 0;
    const newQuantity = Math.max(0, currentQuantity + delta);
    dispatch({
      type: 'UPDATE_ACTIVE_FLYOUT_CONFIG',
      payload: {
        configChanges: {
          mainFlyoutProps: {
            ...activeFlyoutGroup.config.mainFlyoutProps,
            customData: { ...currentCustomData, itemQuantity: newQuantity },
          },
        },
      },
    });
  };

  const handleOpenChildFlyout = () => {
    dispatch({
      type: 'OPEN_CHILD_FLYOUT',
      payload: {
        childSize: 's',
        childFlyoutProps: {
          className: 'demoFlyoutChild',
          'aria-label': 'Item details',
          customData: { itemQuantity },
        },
        childOnUnmount: () =>
          console.log('Unmounted item details child flyout'),
      },
    });
  };

  const handleProceedToReview = () => {
    if (!activeFlyoutGroup || !activeFlyoutGroup.isMainOpen) return;
    const reviewFlyoutSize = activeFlyoutGroup.config.mainSize || 'm';
    dispatch({
      type: 'OPEN_MAIN_FLYOUT',
      payload: {
        mainSize: reviewFlyoutSize,
        mainFlyoutProps: {
          ...activeFlyoutGroup.config.mainFlyoutProps,
          'aria-label': 'Review order',
          customData: { variant: 'review', itemQuantity },
        },
        mainOnUnmount: () =>
          console.log(`Unmounted review order flyout (${reviewFlyoutSize})`),
      },
    });
  };

  return (
    <>
      <EuiFlyoutHeader hasBorder>
        <EuiTitle size="m">
          <h2 id="flyout-shopping-cart-title">Shopping cart</h2>
        </EuiTitle>
      </EuiFlyoutHeader>
      <EuiFlyoutBody>
        <EuiText>
          <p>Item: Flux Capacitor</p>
        </EuiText>
        <EuiSpacer />
        <EuiText>Quantity: {itemQuantity}</EuiText>
        <EuiButton
          onClick={() => handleUpdateQuantity(-1)}
          iconType="minusInCircle"
          aria-label="Decrease quantity"
          isDisabled={itemQuantity <= 0}
        >
          -1
        </EuiButton>
        <EuiButton
          onClick={() => handleUpdateQuantity(1)}
          iconType="plusInCircle"
          aria-label="Increase quantity"
        >
          +1
        </EuiButton>
        <EuiSpacer />
        <EuiButton
          onClick={
            activeFlyoutGroup?.isChildOpen ? onClose : handleOpenChildFlyout
          }
          isDisabled={!activeFlyoutGroup?.isMainOpen}
        >
          {activeFlyoutGroup?.isChildOpen
            ? 'Close item details'
            : 'View item details'}
        </EuiButton>
        <EuiSpacer />
        <EuiButton
          onClick={handleProceedToReview}
          isDisabled={!activeFlyoutGroup?.isMainOpen || itemQuantity <= 0}
          fill
        >
          Proceed to review
        </EuiButton>
      </EuiFlyoutBody>
      <EuiFlyoutFooter>
        <EuiButton onClick={onClose} color="danger">
          {activeFlyoutGroup?.isChildOpen
            ? 'Close details & Go back'
            : 'Close/Go back'}
        </EuiButton>
      </EuiFlyoutFooter>
    </>
  );
};

interface ReviewOrderContentProps {
  context: FlyoutRenderContext;
}
const ReviewOrderContent: React.FC<ReviewOrderContentProps> = ({ context }) => {
  const { onClose } = context;
  const itemQuantity =
    context.flyoutSpecificProps.customData?.itemQuantity || 0;
  return (
    <>
      <EuiFlyoutHeader hasBorder>
        <EuiTitle size="m">
          <h2 id="flyout-review-order-title">Review order</h2>
        </EuiTitle>
      </EuiFlyoutHeader>
      <EuiFlyoutBody>
        <EuiText>
          <h3>Review your order</h3>
          <p>Item: Flux Capacitor</p>
          <p>Quantity: {itemQuantity}</p>
        </EuiText>
        <EuiSpacer />
        <EuiButton
          onClick={() => console.log('Purchase confirmed!', { itemQuantity })}
          fill
          color="accent"
        >
          Confirm purchase
        </EuiButton>
      </EuiFlyoutBody>
      <EuiFlyoutFooter>
        <EuiButton onClick={onClose} color="danger">
          Close/Go back
        </EuiButton>
      </EuiFlyoutFooter>
    </>
  );
};

interface ItemDetailsContentProps {
  context: FlyoutRenderContext;
}
const ItemDetailsContent: React.FC<ItemDetailsContentProps> = ({ context }) => {
  const { onClose } = context;
  const itemQuantity =
    context.flyoutSpecificProps.customData?.itemQuantity || 0;
  return (
    <>
      <EuiFlyoutHeader hasBorder>
        <EuiTitle size="m">
          <h2 id="flyout-item-details-title">Item details</h2>
        </EuiTitle>
      </EuiFlyoutHeader>
      <EuiFlyoutBody>
        <EuiText>
          <p>
            <strong>Item:</strong> Flux Capacitor
          </p>
          <p>
            <strong>Selected quantity:</strong> {itemQuantity}
          </p>
          <p>
            This amazing device makes time travel possible! Handle with care.
          </p>
        </EuiText>
      </EuiFlyoutBody>
      <EuiFlyoutFooter>
        <EuiButton onClick={onClose} color="danger">
          Close details
        </EuiButton>
      </EuiFlyoutFooter>
    </>
  );
};

const renderDemoFlyoutContent = (context: FlyoutRenderContext) => {
  const variant = context.flyoutSpecificProps.customData?.variant;

  if (context.flyoutType === 'main') {
    if (variant === 'shoppingCart') {
      return <ShoppingCartContent context={context} />;
    }
    if (variant === 'review') {
      return <ReviewOrderContent context={context} />;
    }
  } else if (context.flyoutType === 'child') {
    return <ItemDetailsContent context={context} />;
  }

  console.warn(
    'renderDemoFlyoutContent: Unknown flyout type or scenario',
    context
  );
  return null;
};

const FlyoutDemoApp: React.FC = () => {
  const { state, dispatch } = useFlyout();
  const { activeFlyoutGroup } = state;

  const handleOpenMainFlyout = () => {
    dispatch({
      type: 'OPEN_MAIN_FLYOUT',
      payload: {
        mainSize: 'm',
        mainFlyoutProps: {
          type: 'push',
          pushMinBreakpoint: 'xs',
          className: 'demoFlyoutMain',
          'aria-label': 'Shopping cart',
          customData: { variant: 'shoppingCart', itemQuantity: 1 },
        },
        mainOnUnmount: () => console.log(`Unmounted shopping cart flyout`),
      },
    });
  };

  const handleCloseCurrent = () => {
    dispatch({ type: 'CLOSE_CURRENT_FLYOUT' });
  };

  const handleClearHistory = () => {
    dispatch({ type: 'CLEAR_HISTORY' });
  };

  return (
    <>
      <EuiButton
        onClick={handleOpenMainFlyout}
        isDisabled={!!activeFlyoutGroup?.isMainOpen}
        fill
      >
        Open shopping cart
      </EuiButton>

      <EuiSpacer size="s" />

      <EuiButton
        onClick={handleCloseCurrent}
        isDisabled={!activeFlyoutGroup}
        color="warning"
      >
        Close current / Go back (history items: {state.history.length})
      </EuiButton>

      <EuiSpacer size="s" />

      <EuiButton
        onClick={handleClearHistory}
        isDisabled={state.history.length === 0}
        color="danger"
        iconType="trash"
      >
        Clear history
      </EuiButton>

      <EuiSpacer />

      <EuiTitle size="s">
        <h3>Current state</h3>
      </EuiTitle>
      <EuiCodeBlock language="json" fontSize="s" paddingSize="s" isCopyable>
        {JSON.stringify(state, null, 2)}
      </EuiCodeBlock>
    </>
  );
};

export default {
  title: 'Layout/EuiFlyout/State Management with History',
  component: FlyoutManager,
  parameters: {
    layout: 'centered',
  },
} as Meta<typeof FlyoutManager>;

const Template: StoryFn<PropsWithChildren<{}>> = (args) => {
  return (
    <FlyoutManager {...args} renderFlyoutContent={renderDemoFlyoutContent}>
      <FlyoutDemoApp />
    </FlyoutManager>
  );
};

export const Default = Template.bind({});
Default.storyName = 'FlyoutManager with History';
