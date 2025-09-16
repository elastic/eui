/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import { action } from '@storybook/addon-actions';

import {
  EuiButton,
  EuiCode,
  EuiCodeBlock,
  EuiDescriptionList,
  EuiDescriptionListDescription,
  EuiDescriptionListTitle,
  EuiFlexGroup,
  EuiFlexItem,
  EuiFlyoutBody,
  EuiFlyoutFooter,
  EuiSpacer,
  EuiSwitch,
  EuiText,
  EuiTitle,
} from '../..';
import { EuiFlyout, EuiFlyoutProps } from '../flyout';
import { useFlyoutManager } from './hooks';
import { _EuiFlyoutSide, DEFAULT_SIDE, FLYOUT_SIDES } from '../const';

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
    Pick<EuiFlyoutProps, 'onClose' | 'ownFocus' | 'side'> {
  onQuantityChange: (delta: number) => void;
}

const ShoppingCartFlyout = ({
  itemQuantity,
  onQuantityChange,
  onClose,
  ownFocus,
  side,
}: ShoppingCartProps) => {
  const [isItemDetailsOpen, setIsItemDetailsOpen] = useState(false);
  const [isReviewCartOpen, setIsReviewCartOpen] = useState(false);

  return (
    <EuiFlyout
      session={true}
      id="shopping-cart-flyout"
      size="m"
      ownFocus={ownFocus}
      side={side}
      aria-label="Shopping cart"
      {...{ onClose }}
    >
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
          <ItemDetailsFlyout
            onClose={() => setIsItemDetailsOpen(false)}
            itemQuantity={itemQuantity}
            side={side}
          />
        )}
        {isReviewCartOpen && (
          <>
            <ReviewOrderFlyout
              onClose={() => setIsReviewCartOpen(false)}
              itemQuantity={itemQuantity}
              side={side}
            />
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
    Pick<EuiFlyoutProps, 'onClose' | 'side'> {}

const ReviewOrderFlyout = ({
  itemQuantity,
  side,
  ...props
}: ReviewOrderProps) => {
  const [orderConfirmed, setOrderConfirmed] = useState(false);

  return (
    <EuiFlyout
      session={true}
      id="review-order-flyout"
      ownFocus={false}
      size="m"
      side={side}
      aria-label="Review order"
      {...props}
    >
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
              action('go back')();
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
    Pick<EuiFlyoutProps, 'onClose' | 'id' | 'side'> {}

const ItemDetailsFlyout = ({
  onClose,
  itemQuantity,
  id = 'item-details-flyout',
  side = DEFAULT_SIDE,
}: ItemDetailsProps) => {
  return (
    <EuiFlyout
      id={id}
      onClose={onClose}
      size="s"
      side={side}
      aria-label="Item details"
    >
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

const BasicExampleComponent = ({
  side = DEFAULT_SIDE,
}: {
  side?: _EuiFlyoutSide;
}) => {
  const [shoppingCartOwnFocus, setShoppingCartOwnFocus] = useState(false);
  const [isShoppingCartOpen, setIsShoppingCartOpen] = useState(false);
  const [isReviewCartOpen, setIsReviewCartOpen] = useState(false);
  const [isItemDetailsOpen, setIsItemDetailsOpen] = useState(false);
  const [itemQuantity, setItemQuantity] = useState(1);
  const context = useFlyoutManager();

  return (
    <>
      <EuiFlexGroup direction="column">
        <EuiFlexItem>
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
        </EuiFlexItem>
        <EuiFlexItem>
          <EuiFlexGroup>
            <EuiFlexItem>
              <EuiFlexGroup direction="column">
                <EuiFlexItem>
                  <EuiTitle size="s">
                    <h2>Flyouts</h2>
                  </EuiTitle>
                  <EuiSpacer size="m" />
                  <EuiDescriptionList>
                    <EuiDescriptionListTitle>
                      Shopping cart
                    </EuiDescriptionListTitle>
                    <EuiDescriptionListDescription>
                      This flyout always starts a new session,{' '}
                      <EuiCode>{`session={true}`}</EuiCode>.
                    </EuiDescriptionListDescription>
                    <EuiDescriptionListTitle>
                      Review order
                    </EuiDescriptionListTitle>
                    <EuiDescriptionListDescription>
                      This flyout always starts a new session,{' '}
                      <EuiCode>{`session={true}`}</EuiCode>.
                      <EuiSpacer size="xs" />
                      It is rendered by the button above, but also from within
                      the Shopping Cart flyout.
                    </EuiDescriptionListDescription>
                    <EuiDescriptionListTitle>
                      Item details
                    </EuiDescriptionListTitle>
                    <EuiDescriptionListDescription>
                      This flyout is a regular flyout.
                      <EuiSpacer size="xs" />
                      It is rendered by the button above, but also from within
                      the Shopping Cart flyout.
                      <EuiSpacer size="xs" />
                      If rendered from <strong>here</strong>, and{' '}
                      <strong>no</strong> session is active, it is rendered as a{' '}
                      <strong>regular</strong> flyout.
                      <EuiSpacer size="xs" />
                      If rendered from <strong>here</strong>, and a session{' '}
                      <strong>is</strong> active, it is rendered as a new{' '}
                      <EuiCode>main</EuiCode> flyout as a new session.
                      <EuiSpacer size="xs" />
                      If rendered from <strong>within</strong> the Shopping Cart
                      flyout, it will be rendered as a <EuiCode>child</EuiCode>{' '}
                      flyout.
                    </EuiDescriptionListDescription>
                  </EuiDescriptionList>
                </EuiFlexItem>
                <EuiFlexItem>
                  <EuiTitle size="s">
                    <h2>Current State</h2>
                  </EuiTitle>
                  <EuiCodeBlock language="json">
                    {JSON.stringify(context?.state, null, 2)}
                  </EuiCodeBlock>
                </EuiFlexItem>
              </EuiFlexGroup>
            </EuiFlexItem>
            <EuiFlexItem>
              <EuiFlexGroup direction="column">
                <EuiFlexItem>
                  <EuiTitle size="s">
                    <h2>Summary</h2>
                  </EuiTitle>
                  <EuiSpacer size="m" />
                  <EuiText size="s">
                    <div>
                      This example demonstrates the different ways a flyout can
                      be rendered.
                      <EuiSpacer size="m" />
                      The <EuiCode>session</EuiCode> prop is used to control
                      whether a flyout is rendered as a new session.
                      <EuiSpacer size="m" />
                      The determination of whether a flyout is rendered as a{' '}
                      <EuiCode>main</EuiCode> or <EuiCode>child</EuiCode> flyout
                      is based on the presence of an active session,{' '}
                      <em>and</em> if the flyout is rendered from within a
                      managed flyout.
                      <EuiSpacer size="m" />
                      This change means the relationship between the main and
                      child flyout, as well as the history of which main flyouts
                      have been opened, are <strong>
                        implicitly derived
                      </strong>{' '}
                      from the React structure.
                      <EuiSpacer size="m" />
                      So from a DX perspective, no one need wonder if they
                      should create a <EuiCode>MainFlyout</EuiCode> or
                      <EuiCode>ChildFlyout</EuiCode>, or check what may already
                      be open... the way its structured and the{' '}
                      <EuiCode>session</EuiCode> prop handle it all.
                    </div>
                  </EuiText>
                </EuiFlexItem>
                <EuiFlexItem>
                  <EuiTitle size="s">
                    <h2>Known issues</h2>
                  </EuiTitle>
                  <EuiSpacer size="m" />
                  <EuiDescriptionList>
                    <EuiDescriptionListTitle>Animation</EuiDescriptionListTitle>
                    <EuiDescriptionListDescription>
                      If a main flyout is opened with{' '}
                      <EuiCode>{`ownFocus={true}`}</EuiCode>, the child flyout
                      animation is inconsistent: it flies in <em>above</em> the
                      main flyout.
                      <EuiSpacer size="s" />
                      This is due to the <EuiCode>EuiMask</EuiCode> surrounding
                      the main flyout, preventing the child flyout from being
                      rendered <em>below</em> it.
                      <EuiSpacer size="s" />
                      <EuiSwitch
                        label="Shopping cart ownFocus"
                        checked={shoppingCartOwnFocus}
                        onChange={(e) =>
                          setShoppingCartOwnFocus(e.target.checked)
                        }
                      />
                    </EuiDescriptionListDescription>
                  </EuiDescriptionList>
                </EuiFlexItem>
              </EuiFlexGroup>
            </EuiFlexItem>
          </EuiFlexGroup>
        </EuiFlexItem>
      </EuiFlexGroup>
      {isShoppingCartOpen && (
        <ShoppingCartFlyout
          onClose={() => setIsShoppingCartOpen(false)}
          onQuantityChange={(delta: number) =>
            setItemQuantity(itemQuantity + delta)
          }
          itemQuantity={itemQuantity}
          ownFocus={shoppingCartOwnFocus}
          side={side}
        />
      )}
      {isReviewCartOpen && (
        <ReviewOrderFlyout
          onClose={() => setIsReviewCartOpen(false)}
          itemQuantity={itemQuantity}
          side={side}
        />
      )}
      {isItemDetailsOpen && (
        <ItemDetailsFlyout
          id="shopping-cart-item-details-flyout"
          onClose={() => setIsItemDetailsOpen(false)}
          itemQuantity={itemQuantity}
          side={side}
        />
      )}
    </>
  );
};

export const BasicExample: StoryObj<typeof EuiFlyout> = {
  render: (args) => <BasicExampleComponent {...args} />,
  args: {
    side: 'right',
  },
  argTypes: {
    side: {
      control: 'radio',
      options: FLYOUT_SIDES,
    },
  },
};
