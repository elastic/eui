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

import { FlyoutManager, useFlyout } from './flyout_manager';
import { FlyoutRenderContext } from './types';
import {
  OpenChildFlyoutOptions,
  OpenMainFlyoutOptions,
  useEuiFlyoutApi,
} from './use_eui_flyout';

interface ContentProps {
  onCloseFlyout: () => void;
}

interface ContactUsContentProps extends ContentProps {}

interface ECommerceContentProps extends ContentProps {
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
  selectedMainFlyoutKey?: 'shoppingCart' | 'reviewOrder' | 'contactUs';
  selectedChildFlyoutKey?: 'itemDetails';
}

const ShoppingCartContent: React.FC<ShoppingCartContentProps> = ({
  itemQuantity,
  onQuantityChange,
  onCloseFlyout,
  isChildOpen,
  isMainOpen,
}) => {
  const { openChildFlyout, nextFlyout, closeFlyout } = useEuiFlyoutApi();
  const { state } = useFlyout();
  const { activeFlyoutGroup } = state;

  const handleOpenChildDetails = () => {
    const options: OpenChildFlyoutOptions<DemoAppMetaForContext> = {
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
    const options: OpenMainFlyoutOptions<DemoAppMetaForContext> = {
      size: reviewFlyoutSize,
      meta: { selectedMainFlyoutKey: 'reviewOrder' },
      flyoutProps: {
        ...activeFlyoutGroup?.config.mainFlyoutProps,
        'aria-label': 'Review order',
      },
      onUnmount: () =>
        console.log(`Unmounted review order flyout (${reviewFlyoutSize})`),
    };
    nextFlyout(options);
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
          onClick={() => onQuantityChange(-1)}
          iconType="minusInCircle"
          aria-label="Decrease quantity"
          isDisabled={itemQuantity <= 0}
        >
          -1
        </EuiButton>
        <EuiButton
          onClick={() => onQuantityChange(1)}
          iconType="plusInCircle"
          aria-label="Increase quantity"
        >
          +1
        </EuiButton>
        <EuiSpacer />
        <EuiButton
          onClick={isChildOpen ? closeFlyout : handleOpenChildDetails}
          isDisabled={!isMainOpen}
        >
          {isChildOpen ? 'Close item details' : 'View item details'}
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
        <EuiButton onClick={onCloseFlyout} color="danger">
          {isChildOpen ? 'Close details & Go back' : 'Close/Go back'}
        </EuiButton>
      </EuiFlyoutFooter>
    </>
  );
};

const ReviewOrderContent: React.FC<ReviewOrderContentProps> = ({
  itemQuantity,
  onCloseFlyout,
}) => {
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
        <EuiButton onClick={onCloseFlyout} color="danger">
          Close/Go back
        </EuiButton>
      </EuiFlyoutFooter>
    </>
  );
};

const ItemDetailsContent: React.FC<ItemDetailsContentProps> = ({
  itemQuantity,
  onCloseFlyout,
}) => {
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
        <EuiButton onClick={onCloseFlyout} color="danger">
          Close details
        </EuiButton>
      </EuiFlyoutFooter>
    </>
  );
};

const ContactUsContent: React.FC<ContactUsContentProps> = ({
  onCloseFlyout,
}) => {
  return (
    <>
      <EuiFlyoutHeader hasBorder>
        <EuiTitle size="m">
          <h2 id="flyout-contact-us-title">Contact Us</h2>
        </EuiTitle>
      </EuiFlyoutHeader>
      <EuiFlyoutBody>
        <EuiText>
          <p>
            If you have any questions, please reach out to us at
            support@example.com.
          </p>
        </EuiText>
      </EuiFlyoutBody>
      <EuiFlyoutFooter>
        <EuiButton onClick={onCloseFlyout} color="primary">
          Close
        </EuiButton>
      </EuiFlyoutFooter>
    </>
  );
};

// Component for the main control buttons and state display
const DemoAppControls: React.FC = () => {
  const { openFlyout, closeFlyout, clearHistory, isFlyoutOpen, canGoBack } =
    useEuiFlyoutApi();
  const { state } = useFlyout(); // For displaying raw state and history length

  const [
    isShoppingCartFlyoutExplicitlyOpen,
    setIsShoppingCartFlyoutExplicitlyOpen,
  ] = useState(false);
  const [isContactUsFlyoutExplicitlyOpen, setIsContactUsFlyoutExplicitlyOpen] =
    useState(false);

  const handleOpenShoppingCart = () => {
    const options: OpenMainFlyoutOptions<DemoAppMetaForContext> = {
      size: 'm',
      meta: { selectedMainFlyoutKey: 'shoppingCart' },
      flyoutProps: {
        type: 'push',
        pushMinBreakpoint: 'xs',
        className: 'shoppingCartFlyoutMain',
        'aria-label': 'Shopping cart',
        onClose: (event) => {
          console.log('Shopping cart onClose triggered', event);
          setIsShoppingCartFlyoutExplicitlyOpen(false);
        },
      },
      onUnmount: () => console.log('Unmounted shopping cart flyout'),
    };
    openFlyout(options);
    setIsShoppingCartFlyoutExplicitlyOpen(true);
  };

  const handleOpenContactUs = () => {
    const options: OpenMainFlyoutOptions<DemoAppMetaForContext> = {
      size: 's',
      meta: { selectedMainFlyoutKey: 'contactUs' },
      flyoutProps: {
        type: 'push',
        className: 'contactUsFlyoutMain',
        'aria-label': 'Contact Us',
        onClose: (event) => {
          console.log('Contact Us onClose triggered', event);
          setIsContactUsFlyoutExplicitlyOpen(false);
        },
      },
      onUnmount: () => console.log('Unmounted Contact Us flyout'),
    };
    openFlyout(options);
    setIsContactUsFlyoutExplicitlyOpen(true);
  };

  return (
    <>
      <EuiButton
        onClick={handleOpenShoppingCart}
        isDisabled={
          isShoppingCartFlyoutExplicitlyOpen ||
          isContactUsFlyoutExplicitlyOpen ||
          isFlyoutOpen
        }
        fill
      >
        Open shopping cart
      </EuiButton>

      <EuiSpacer size="s" />

      <EuiButton
        onClick={handleOpenContactUs}
        isDisabled={
          isShoppingCartFlyoutExplicitlyOpen ||
          isContactUsFlyoutExplicitlyOpen ||
          isFlyoutOpen
        }
        fill
      >
        Contact us
      </EuiButton>

      <EuiSpacer size="s" />

      <EuiButton onClick={closeFlyout} isDisabled={!canGoBack} color="warning">
        Close current / Go back (history items: {state.history.length})
      </EuiButton>

      <EuiSpacer size="s" />

      <EuiButton
        onClick={clearHistory}
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

const FlyoutDemoApp: React.FC = () => {
  const [itemQuantity, setItemQuantity] = useState(1);

  const handleQuantityChange = (delta: number) => {
    setItemQuantity((prev) => Math.max(0, prev + delta));
  };

  const renderDemoFlyoutContent = (
    context: FlyoutRenderContext<DemoAppMetaForContext>
  ) => {
    const { meta, onClose, activeFlyoutGroup: currentGroup } = context;

    if (context.flyoutType === 'main') {
      const { selectedMainFlyoutKey: flyoutKey } = meta || {};
      if (flyoutKey === 'shoppingCart') {
        return (
          <ShoppingCartContent
            itemQuantity={itemQuantity}
            onQuantityChange={handleQuantityChange}
            onCloseFlyout={onClose}
            isChildOpen={currentGroup?.isChildOpen}
            isMainOpen={currentGroup?.isMainOpen}
          />
        );
      }
      if (flyoutKey === 'reviewOrder') {
        return (
          <ReviewOrderContent
            itemQuantity={itemQuantity}
            onCloseFlyout={onClose}
          />
        );
      }
      if (flyoutKey === 'contactUs') {
        return <ContactUsContent onCloseFlyout={onClose} />;
      }
    } else if (context.flyoutType === 'child') {
      const { selectedChildFlyoutKey: flyoutKey } = meta || {};
      if (flyoutKey === 'itemDetails') {
        return (
          <ItemDetailsContent
            itemQuantity={itemQuantity}
            onCloseFlyout={onClose}
          />
        );
      }
    }
    console.warn('renderDemoFlyoutContent: Unknown flyout key', context);
    return null;
  };

  return (
    <FlyoutManager renderFlyoutContent={renderDemoFlyoutContent}>
      <DemoAppControls />
    </FlyoutManager>
  );
};

export default {
  title: 'Layout/EuiFlyout/EuiFlyoutChild',
  component: FlyoutManager,
  parameters: {
    layout: 'centered',
  },
} as Meta<typeof FlyoutManager>;

const Template: StoryFn<PropsWithChildren<{}>> = () => {
  return <FlyoutDemoApp />;
};

export const Default = Template.bind({});
Default.storyName = 'FlyoutManager with History';
