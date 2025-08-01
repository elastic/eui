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
import { EuiFlyout, EuiFlyoutProps } from '../flyout';

const meta: Meta<typeof EuiFlyout> = {
  title: 'Layout/EuiFlyout/Flyout Manager',
  component: EuiFlyout,
};

export default meta;

interface ECommerceContentProps {
  itemQuantity: number;
}

interface ShoppingCartProps
  extends ECommerceContentProps,
    Pick<EuiFlyoutProps, 'onClose'> {
  onQuantityChange: (delta: number) => void;
}

const ShoppingCartFlyout = ({
  itemQuantity,
  onQuantityChange,
  onClose: onCloseProp,
}: ShoppingCartProps) => {
  console.log('RENDERING SHOPPING CART FLYOUT');
  const [isItemDetailsOpen, setIsItemDetailsOpen] = useState(false);
  const [isReviewCartOpen, setIsReviewCartOpen] = useState(false);

  const onClose: typeof onCloseProp = (event) => {
    onCloseProp(event);
  };

  return (
    <EuiFlyout session={true} id="shopping-cart-flyout" {...{ onClose }}>
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
          onClick={() => setIsReviewCartOpen(true)}
          isDisabled={itemQuantity <= 0}
          fill
        >
          {isReviewCartOpen ? 'Close review' : 'Proceed to review'}
        </EuiButton>
        {isItemDetailsOpen && (
          <ItemDetailsFlyout onClose={onClose} itemQuantity={itemQuantity} />
        )}
        {isReviewCartOpen && (
          <>
            <ReviewOrderFlyout onClose={onClose} itemQuantity={itemQuantity} />
          </>
        )}
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
    </EuiFlyout>
  );
};

interface ReviewOrderProps
  extends ECommerceContentProps,
    Pick<EuiFlyoutProps, 'onClose'> {}

const ReviewOrderFlyout = ({ itemQuantity, ...props }: ReviewOrderProps) => {
  console.log('RENDERING REVIEW ORDER FLYOUT');
  const [orderConfirmed, setOrderConfirmed] = useState(false);

  return (
    <EuiFlyout session={true} id="review-order-flyout" {...props}>
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

interface ItemDetailsProps
  extends ECommerceContentProps,
    Pick<EuiFlyoutProps, 'onClose'> {}

const ItemDetailsFlyout = ({ onClose, itemQuantity }: ItemDetailsProps) => {
  return (
    <EuiFlyout id="item-details-flyout" onClose={onClose}>
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
  const [isItemDetailsOpen, setIsItemDetailsOpen] = useState(false);
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
        <EuiButton onClick={() => setIsItemDetailsOpen(true)}>
          Item details
        </EuiButton>
      </EuiFlexGroup>
      <EuiSpacer />
      {isShoppingCartOpen && (
        <ShoppingCartFlyout
          onClose={() => setIsShoppingCartOpen(false)}
          onQuantityChange={(delta: number) =>
            setItemQuantity(itemQuantity + delta)
          }
          itemQuantity={itemQuantity}
        />
      )}
      {isReviewCartOpen && (
        <ReviewOrderFlyout
          onClose={() => setIsReviewCartOpen(false)}
          itemQuantity={itemQuantity}
        />
      )}
      {isItemDetailsOpen && (
        <ItemDetailsFlyout
          onClose={() => setIsItemDetailsOpen(false)}
          itemQuantity={itemQuantity}
        />
      )}
    </>
  );
};

export const BasicExample: StoryObj<typeof EuiFlyout> = {
  render: () => <BasicExampleComponent />,
};
