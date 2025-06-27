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
  EuiCodeBlock,
  EuiFlyoutBody,
  EuiFlyoutFooter,
  EuiFlyoutHeader,
  EuiSpacer,
  EuiText,
  EuiTitle,
} from '../../index';

import {
  EuiFlyoutSessionProvider,
  useEuiFlyoutSessionContext,
} from './flyout_provider';
import { EuiFlyoutSessionRenderContext } from './types';
import {
  type EuiFlyoutSessionOpenChildOptions,
  type EuiFlyoutSessionOpenGroupOptions,
  type EuiFlyoutSessionOpenMainOptions,
  useEuiFlyoutSession,
} from './use_eui_flyout';

const meta: Meta<typeof EuiFlyoutSessionProvider> = {
  title: 'Layout/EuiFlyout/EuiFlyoutChild',
  component: EuiFlyoutSessionProvider,
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
interface ShoppingCartContentProps extends ECommerceContentProps {
  onQuantityChange: (delta: number) => void;
}
interface ReviewOrderContentProps extends ECommerceContentProps {}
interface ItemDetailsContentProps extends ECommerceContentProps {}

/**
 *
 * The flyout system allows custom meta data to be provided by the consumer, in the "EuiFlyoutSessionOpen*Options"
 * interfaces. In the advanced use case, (WithHistoryApp), we're using metadata within the renderMainFlyoutContent
 * function as a conditional to determine which component to render in the main flyout.
 */
interface WithHistoryAppMeta {
  ecommerceMainFlyoutKey?: 'shoppingCart' | 'reviewOrder';
}

const ShoppingCartContent: React.FC<ShoppingCartContentProps> = ({
  itemQuantity,
  onQuantityChange,
}) => {
  const { openChildFlyout, openFlyout, closeChildFlyout, clearHistory } =
    useEuiFlyoutSession();
  const { state } = useEuiFlyoutSessionContext();
  const { config, isChildOpen } = state.activeFlyoutGroup || {};

  const handleOpenChildDetails = () => {
    const options: EuiFlyoutSessionOpenChildOptions<WithHistoryAppMeta> = {
      size: 's',
      flyoutProps: {
        className: 'demoFlyoutChild',
        'aria-label': 'Item details',
        onClose: () => {
          console.log('Item details onClose triggered');
          closeChildFlyout(); // If we add an onClose handler to the child flyout, we have to call closeChildFlyout within it for the flyout to actually close
        },
      },
      onUnmount: () => console.log('Unmounted item details child flyout'),
    };
    openChildFlyout(options);
  };

  const handleProceedToReview = () => {
    const reviewFlyoutSize = config?.mainSize || 'm';
    const options: EuiFlyoutSessionOpenMainOptions<WithHistoryAppMeta> = {
      size: reviewFlyoutSize,
      meta: { ecommerceMainFlyoutKey: 'reviewOrder' },
      flyoutProps: {
        ...config?.mainFlyoutProps,
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
          isDisabled={itemQuantity <= 0}
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
  const { goBack, clearHistory } = useEuiFlyoutSession();
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
          <EuiButton
            onClick={() => {
              console.log('Go back button clicked');
              goBack();
              // Add a setTimeout to check the state a little after the action is dispatched
              setTimeout(() => {
                console.log('After goBack timeout check');
              }, 100);
            }}
            color="danger"
          >
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
  const { closeChildFlyout } = useEuiFlyoutSession();
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
const WithHistoryAppControls: React.FC = () => {
  const {
    openFlyout,
    goBack,
    isFlyoutOpen,
    canGoBack,
    isChildFlyoutOpen,
    closeChildFlyout,
    clearHistory,
  } = useEuiFlyoutSession();

  const handleOpenShoppingCart = () => {
    const options: EuiFlyoutSessionOpenMainOptions<WithHistoryAppMeta> = {
      size: 'm',
      meta: { ecommerceMainFlyoutKey: 'shoppingCart' },
      flyoutProps: {
        type: 'push',
        pushMinBreakpoint: 'xs',
        className: 'shoppingCartFlyoutMain',
        'aria-label': 'Shopping cart',
        onClose: (event) => {
          console.log('Shopping cart onClose triggered', event);
          clearHistory(); // If we add an onClose handler to the main flyout, we have to call clearHistory within it for the flyout to actually close
        },
      },
      onUnmount: () => console.log('Unmounted shopping cart flyout'),
    };
    openFlyout(options);
  };

  const { state } = useEuiFlyoutSessionContext(); // For displaying raw state and history length

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

const WithHistoryApp: React.FC = () => {
  const [itemQuantity, setItemQuantity] = useState(1);

  const handleQuantityChange = (delta: number) => {
    setItemQuantity((prev) => Math.max(0, prev + delta));
  };

  // Render function for MAIN flyout content
  const renderMainFlyoutContent = (
    context: EuiFlyoutSessionRenderContext<WithHistoryAppMeta>
  ) => {
    const { meta } = context;
    const { ecommerceMainFlyoutKey } = meta || {};

    if (ecommerceMainFlyoutKey === 'shoppingCart') {
      return (
        <ShoppingCartContent
          itemQuantity={itemQuantity}
          onQuantityChange={handleQuantityChange}
        />
      );
    }
    if (ecommerceMainFlyoutKey === 'reviewOrder') {
      return <ReviewOrderContent itemQuantity={itemQuantity} />;
    }

    console.warn('renderMainFlyoutContent: Unknown flyout key', meta);
    return null;
  };

  // Render function for CHILD flyout content
  const renderChildFlyoutContent = () => {
    return <ItemDetailsContent itemQuantity={itemQuantity} />;
  };

  return (
    <EuiFlyoutSessionProvider
      renderMainFlyoutContent={renderMainFlyoutContent}
      renderChildFlyoutContent={renderChildFlyoutContent}
    >
      <WithHistoryAppControls />
    </EuiFlyoutSessionProvider>
  );
};

export const WithHistory = {
  name: 'FlyoutProvider with History',
  render: () => {
    return <WithHistoryApp />;
  },
};

/**
 * --------------------------------------
 * Group opener example (simple use case)
 * --------------------------------------
 */

const GroupOpenerControls: React.FC = () => {
  const { openFlyoutGroup, isFlyoutOpen, isChildFlyoutOpen, clearHistory } =
    useEuiFlyoutSession();

  const { state } = useEuiFlyoutSessionContext();

  const handleOpenGroup = () => {
    const options: EuiFlyoutSessionOpenGroupOptions = {
      main: {
        size: 'm',
        flyoutProps: {
          type: 'push',
          pushMinBreakpoint: 'xs',
          className: 'groupOpenerMainFlyout',
          'aria-label': 'Main flyout',
        },
        onUnmount: () => console.log('Unmounted main flyout'),
      },
      child: {
        size: 's',
        flyoutProps: {
          className: 'groupOpenerChildFlyout',
          'aria-label': 'Child flyout',
        },
        onUnmount: () => console.log('Unmounted child flyout'),
      },
    };
    openFlyoutGroup(options);
  };

  return (
    <div>
      <EuiTitle>
        <h2>EuiFlyoutSession Group Opener</h2>
      </EuiTitle>
      <EuiSpacer />
      <EuiText>
        <p>
          This demo shows how to use the <code>openFlyoutGroup</code> function
          to simultaneously open both main and child flyouts.
        </p>
      </EuiText>
      <EuiSpacer />
      <EuiButton
        onClick={handleOpenGroup}
        fill
        color="primary"
        iconType="folderOpen"
        data-testid="openFlyoutGroupButton"
        isDisabled={isFlyoutOpen || isChildFlyoutOpen}
      >
        Open flyouts
      </EuiButton>
      {(isFlyoutOpen || isChildFlyoutOpen) && (
        <>
          <EuiSpacer />
          <EuiButton onClick={clearHistory} color="danger">
            Close All Flyouts
          </EuiButton>
        </>
      )}
      <EuiSpacer size="s" />
      <EuiCodeBlock language="json" paddingSize="s">
        {JSON.stringify(state, null, 2)}
      </EuiCodeBlock>
    </div>
  );
};

const WithGroupOpenerApp: React.FC = () => {
  const MainFlyoutContent = () => {
    const { clearHistory } = useEuiFlyoutSession();
    return (
      <>
        <EuiFlyoutHeader hasBorder>
          <EuiTitle size="m">
            <h2 id="flyout-main-title">Main Flyout</h2>
          </EuiTitle>
        </EuiFlyoutHeader>
        <EuiFlyoutBody>
          <EuiText>
            <p>
              This is the main flyout content. It was opened simultaneously with
              the child flyout using the <code>openFlyoutGroup</code> function.
            </p>
          </EuiText>
        </EuiFlyoutBody>
        <EuiFlyoutFooter>
          <EuiButton onClick={clearHistory} color="danger">
            Close All Flyouts
          </EuiButton>
        </EuiFlyoutFooter>
      </>
    );
  };

  const ChildFlyoutContent = () => {
    const { closeChildFlyout } = useEuiFlyoutSession();
    return (
      <>
        <EuiFlyoutHeader hasBorder>
          <EuiTitle size="m">
            <h2 id="flyout-child-title">Child Flyout</h2>
          </EuiTitle>
        </EuiFlyoutHeader>
        <EuiFlyoutBody>
          <EuiText>
            <p>
              This is the child flyout content. It was opened simultaneously
              with the main flyout using the <code>openFlyoutGroup</code>
              function.
            </p>
          </EuiText>
        </EuiFlyoutBody>
        <EuiFlyoutFooter>
          <EuiButton onClick={closeChildFlyout} color="danger">
            Close Child Only
          </EuiButton>
        </EuiFlyoutFooter>
      </>
    );
  };

  const renderMainFlyoutContent = () => {
    return <MainFlyoutContent />;
  };

  const renderChildFlyoutContent = () => {
    return <ChildFlyoutContent />;
  };

  return (
    <EuiFlyoutSessionProvider
      renderMainFlyoutContent={renderMainFlyoutContent}
      renderChildFlyoutContent={renderChildFlyoutContent}
    >
      <GroupOpenerControls />
    </EuiFlyoutSessionProvider>
  );
};

export const WithGroupOpener: StoryObj = {
  name: 'FlyoutProvider with Group Opener',
  render: () => {
    return <WithGroupOpenerApp />;
  },
};
