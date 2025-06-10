/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { Meta, StoryFn } from '@storybook/react';
import React, { PropsWithChildren, useState } from 'react';

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

import { EuiFlyoutManager, useEuiFlyoutManager } from './flyout_manager';
import { EuiManagedFlyoutRenderContext } from './types';
import {
  EuiOpenChildManagedFlyoutOptions,
  EuiOpenMainManagedFlyoutOptions,
  useEuiFlyoutApi,
} from './use_eui_flyout';

interface ECommerceContentProps {
  itemQuantity: number;
}
interface ShoppingCartContentProps extends ECommerceContentProps {
  onQuantityChange: (delta: number) => void;
  isChildOpen?: boolean;
  isMainOpen?: boolean;
}
interface ReviewOrderContentProps extends ECommerceContentProps {}
interface ItemDetailsContentProps extends ECommerceContentProps {}

interface DemoAppMetaForContext {
  selectedMainFlyoutKey?: 'shoppingCart' | 'reviewOrder';
  selectedChildFlyoutKey?: 'itemDetails';
}

const ShoppingCartContent: React.FC<ShoppingCartContentProps> = ({
  itemQuantity,
  onQuantityChange,
  isChildOpen,
  isMainOpen,
}) => {
  const { openChildFlyout, openFlyout, closeChildFlyout, clearHistory } =
    useEuiFlyoutApi();
  const { state } = useEuiFlyoutManager();
  const { activeFlyoutGroup } = state;

  const handleOpenChildDetails = () => {
    const options: EuiOpenChildManagedFlyoutOptions<DemoAppMetaForContext> = {
      size: 's',
      meta: { selectedChildFlyoutKey: 'itemDetails' },
      flyoutProps: {
        className: 'demoFlyoutChild',
        'aria-label': 'Item details',
      },
      onUnmount: () => console.log('Unmounted item details child flyout'),
    };
    openChildFlyout(options);
  };

  const handleProceedToReview = () => {
    const reviewFlyoutSize = activeFlyoutGroup?.config.mainSize || 'm';
    const options: EuiOpenMainManagedFlyoutOptions<DemoAppMetaForContext> = {
      size: reviewFlyoutSize,
      meta: { selectedMainFlyoutKey: 'reviewOrder' },
      flyoutProps: {
        ...activeFlyoutGroup?.config.mainFlyoutProps,
        'aria-label': 'Review order',
      },
      onUnmount: () =>
        console.log(`Unmounted review order flyout (${reviewFlyoutSize})`),
    };
    openFlyout(options);
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
        <EuiButton
          onClick={isChildOpen ? closeChildFlyout : handleOpenChildDetails}
          isDisabled={!isMainOpen}
        >
          {isChildOpen ? 'Close item details' : 'View item details'}
        </EuiButton>
        <EuiSpacer />
        <EuiText>Quantity: {itemQuantity}</EuiText>
        <EuiButton
          onClick={() => onQuantityChange(-1)}
          iconType="minusInCircle"
          aria-label="Decrease quantity"
          isDisabled={itemQuantity <= 0}
        >
          -1
        </EuiButton>{' '}
        <EuiButton
          onClick={() => onQuantityChange(1)}
          iconType="plusInCircle"
          aria-label="Increase quantity"
        >
          +1
        </EuiButton>
        <EuiSpacer />
        <EuiButton
          onClick={handleProceedToReview}
          isDisabled={!isMainOpen || itemQuantity <= 0}
          fill
        >
          Proceed to review
        </EuiButton>
      </EuiFlyoutBody>
      <EuiFlyoutFooter>
        <EuiButton onClick={clearHistory} color="danger">
          Close
        </EuiButton>
      </EuiFlyoutFooter>
    </>
  );
};

const ReviewOrderContent: React.FC<ReviewOrderContentProps> = ({
  itemQuantity,
}) => {
  const { goBack, clearHistory } = useEuiFlyoutApi();
  const [orderConfirmed, setOrderConfirmed] = useState(false);

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
        {orderConfirmed ? (
          <EuiText>
            <p>Order confirmed!</p>
          </EuiText>
        ) : (
          <EuiButton
            onClick={() => setOrderConfirmed(true)}
            fill
            color="accent"
          >
            Confirm purchase
          </EuiButton>
        )}
      </EuiFlyoutBody>
      <EuiFlyoutFooter>
        {!orderConfirmed && (
          <EuiButton onClick={goBack} color="danger">
            Go back
          </EuiButton>
        )}{' '}
        <EuiButton onClick={clearHistory} color="danger">
          Close
        </EuiButton>
      </EuiFlyoutFooter>
    </>
  );
};

const ItemDetailsContent: React.FC<ItemDetailsContentProps> = ({
  itemQuantity,
}) => {
  const { closeChildFlyout } = useEuiFlyoutApi();
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
        <EuiButton onClick={closeChildFlyout} color="danger">
          Close details
        </EuiButton>
      </EuiFlyoutFooter>
    </>
  );
};

// Component for the main control buttons and state display
const DemoAppControls: React.FC = () => {
  const {
    openFlyout,
    goBack,
    isFlyoutOpen,
    canGoBack,
    isChildFlyoutOpen,
    closeChildFlyout,
  } = useEuiFlyoutApi();
  const { state } = useEuiFlyoutManager(); // For displaying raw state and history length

  const handleOpenShoppingCart = () => {
    const options: EuiOpenMainManagedFlyoutOptions<DemoAppMetaForContext> = {
      size: 'm',
      meta: { selectedMainFlyoutKey: 'shoppingCart' },
      flyoutProps: {
        type: 'push',
        pushMinBreakpoint: 'xs',
        className: 'shoppingCartFlyoutMain',
        'aria-label': 'Shopping cart',
        onClose: (event) => {
          console.log('Shopping cart onClose triggered', event);
        },
      },
      onUnmount: () => console.log('Unmounted shopping cart flyout'),
    };
    openFlyout(options);
  };

  return (
    <>
      <EuiButton
        onClick={handleOpenShoppingCart}
        isDisabled={isFlyoutOpen}
        fill
      >
        Open shopping cart
      </EuiButton>
      <EuiSpacer size="s" />
      <EuiButton
        onClick={closeChildFlyout}
        isDisabled={!isChildFlyoutOpen}
        color="warning"
      >
        Close child flyout
      </EuiButton>
      <EuiSpacer size="s" />
      <EuiButton onClick={goBack} isDisabled={!canGoBack} color="warning">
        Close/Go back
      </EuiButton>
      <EuiSpacer size="s" />

      <EuiTitle size="s">
        <h3>Current state</h3>
      </EuiTitle>
      <EuiCodeBlock language="json" fontSize="s" paddingSize="s">
        {JSON.stringify(state, null, 2)}
      </EuiCodeBlock>
    </>
  );
};

const FlyoutDemoApp: React.FC = () => {
  const [itemQuantity, setItemQuantity] = useState(1);

  const handleQuantityChange = (delta: number) => {
    setItemQuantity((prev) => Math.max(0, prev + delta));
  };

  // Render function for MAIN flyout content
  const renderMainFlyoutContent = (
    context: EuiManagedFlyoutRenderContext<DemoAppMetaForContext>
  ) => {
    const { meta, activeFlyoutGroup } = context;
    const { selectedMainFlyoutKey: flyoutKey } = meta || {};

    if (flyoutKey === 'shoppingCart') {
      return (
        <ShoppingCartContent
          itemQuantity={itemQuantity}
          onQuantityChange={handleQuantityChange}
          isChildOpen={activeFlyoutGroup?.isChildOpen}
          isMainOpen={activeFlyoutGroup?.isMainOpen}
        />
      );
    }
    if (flyoutKey === 'reviewOrder') {
      return <ReviewOrderContent itemQuantity={itemQuantity} />;
    }

    console.warn('renderMainFlyoutContent: Unknown flyout key', meta);
    return null;
  };

  // Render function for CHILD flyout content
  const renderChildFlyoutContent = (
    context: EuiManagedFlyoutRenderContext<DemoAppMetaForContext>
  ) => {
    const { meta } = context;
    const { selectedChildFlyoutKey: flyoutKey } = meta || {};

    if (flyoutKey === 'itemDetails') {
      return <ItemDetailsContent itemQuantity={itemQuantity} />;
    }

    console.warn('renderChildFlyoutContent: Unknown flyout key', meta);
    return null;
  };

  return (
    <EuiFlyoutManager
      renderMainFlyoutContent={renderMainFlyoutContent}
      renderChildFlyoutContent={renderChildFlyoutContent}
    >
      <DemoAppControls />
    </EuiFlyoutManager>
  );
};

export default {
  title: 'Layout/EuiFlyout/EuiFlyoutChild',
  component: EuiFlyoutManager,
} as Meta<typeof EuiFlyoutManager>;

const Template: StoryFn<PropsWithChildren<{}>> = () => {
  return <FlyoutDemoApp />;
};

export const Default = Template.bind({});
Default.storyName = 'FlyoutManager with History';
