/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';

import {
  EuiButton,
  EuiFlexGroup,
  EuiFlyoutBody,
  EuiFlyoutFooter,
  EuiFlyoutHeader,
  EuiSpacer,
  EuiText,
  EuiTitle,
} from '../../index';
import { EuiFlyout, EuiFlyoutProps } from './eui_flyout';
import { useCreateManagedFlyoutRenderer } from './hooks';

const meta: Meta<typeof EuiFlyout> = {
  title: 'Layout/EuiFlyout/EuiManagedFlyout',
  component: EuiFlyout,
};

export default meta;

/**
 * ---------------------------------------------------
 * Ecommerce Shopping Cart Example (advanced use case)
 * ---------------------------------------------------
 */

interface ECommerceContentProps {
  itemQuantity: number;
}

interface ShoppingCartContentProps
  extends ECommerceContentProps,
    Pick<EuiFlyoutProps, 'onClose'> {
  onQuantityChange: (delta: number) => void;
}

const ShoppingCartManagedFlyout: React.FC<ShoppingCartContentProps> = ({
  itemQuantity,
  onQuantityChange,
  onClose: onCloseProp,
}) => {
  const [isItemDetailsOpen, setIsItemDetailsOpen] = useState(false);

  const onClose: typeof onCloseProp = (event) => {
    setIsItemDetailsOpen(false);
    onCloseProp(event);
  };

  const renderer = useCreateManagedFlyoutRenderer();

  const handleProceedToReview = () => {
    renderer((props) => (
      <ReviewOrderManagedFlyout {...props} itemQuantity={itemQuantity} />
    ));
  };

  return (
    <EuiFlyout managed={true} level="main" {...{ onClose }}>
      <EuiFlyoutHeader hasBorder>
        <EuiTitle size="m">
          <h2 id="flyout-shopping-cart-title">Shopping cart</h2>
        </EuiTitle>
      </EuiFlyoutHeader>
      <EuiFlyoutBody>
        <EuiText>
          <p>Item: Flux Capacitor</p>
        </EuiText>
        <EuiButton onClick={() => setIsItemDetailsOpen(!isItemDetailsOpen)}>
          {isItemDetailsOpen ? 'Close item details' : 'View item details'}
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
          isDisabled={itemQuantity <= 0}
          fill
        >
          Proceed to review
        </EuiButton>
      </EuiFlyoutBody>
      <EuiFlyoutFooter>
        <EuiButton
          onClick={(e: React.MouseEvent<HTMLButtonElement>) =>
            onClose(e.nativeEvent)
          }
          color="danger"
        >
          Close
        </EuiButton>
      </EuiFlyoutFooter>
      {isItemDetailsOpen && (
        <ItemDetailsManagedFlyout
          onClose={onClose}
          itemQuantity={itemQuantity}
        />
      )}
    </EuiFlyout>
  );
};

interface ReviewOrderContentProps
  extends ECommerceContentProps,
    Pick<EuiFlyoutProps, 'onClose'> {}

const ReviewOrderManagedFlyout: React.FC<ReviewOrderContentProps> = ({
  itemQuantity,
  ...props
}) => {
  const [orderConfirmed, setOrderConfirmed] = useState(false);

  return (
    <EuiFlyout managed={true} level="main" {...props}>
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
          <EuiButton
            onClick={() => {
              console.log('Go back button clicked');
              // goBack();
            }}
            color="danger"
          >
            Go back
          </EuiButton>
        )}{' '}
        <EuiButton
          onClick={(e: React.MouseEvent<HTMLButtonElement>) =>
            props.onClose(e.nativeEvent)
          }
          color="danger"
        >
          Close
        </EuiButton>
      </EuiFlyoutFooter>
    </EuiFlyout>
  );
};

interface ItemDetailsContentProps
  extends ECommerceContentProps,
    Pick<EuiFlyoutProps, 'onClose'> {}

const ItemDetailsManagedFlyout: React.FC<ItemDetailsContentProps> = ({
  itemQuantity,
  onClose,
}) => {
  return (
    <EuiFlyout managed={true} level="child" onClose={onClose}>
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
        <EuiButton
          onClick={(e: React.MouseEvent<HTMLButtonElement>) =>
            onClose(e.nativeEvent)
          }
          color="danger"
        >
          Close details
        </EuiButton>
      </EuiFlyoutFooter>
    </EuiFlyout>
  );
};

const BasicExampleComponent = () => {
  const [isShoppingCartOpen, setIsShoppingCartOpen] = useState(false);
  const [isReviewCartOpen, setIsReviewCartOpen] = useState(false);
  const [itemQuantity, setItemQuantity] = useState(1);

  return (
    <>
      <EuiFlexGroup>
        <EuiButton onClick={() => setIsShoppingCartOpen(true)}>
          Shopping cart
        </EuiButton>
        <EuiButton onClick={() => setIsReviewCartOpen(true)}>
          Review order
        </EuiButton>
      </EuiFlexGroup>
      {isShoppingCartOpen && (
        <ShoppingCartManagedFlyout
          onClose={() => setIsShoppingCartOpen(false)}
          onQuantityChange={(delta: number) =>
            setItemQuantity(itemQuantity + delta)
          }
          itemQuantity={itemQuantity}
        />
      )}
      {isReviewCartOpen && (
        <ReviewOrderManagedFlyout
          onClose={() => setIsReviewCartOpen(false)}
          itemQuantity={itemQuantity}
        />
      )}
    </>
  );
};

export const BasicExample: StoryObj<typeof EuiFlyout> = {
  render: () => <BasicExampleComponent />,
};
