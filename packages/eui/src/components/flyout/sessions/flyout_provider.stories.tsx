/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { Meta, StoryObj } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import React, { useState, useEffect, useCallback } from 'react';

import {
  EuiButton,
  EuiCodeBlock,
  EuiFlyoutBody,
  EuiFlyoutFooter,
  EuiFlyoutHeader,
  EuiRadioGroup,
  EuiRadioGroupOption,
  EuiSpacer,
  EuiText,
  EuiTitle,
} from '../../index';

import {
  EuiFlyoutSessionProvider,
  useEuiFlyoutSessionContext,
} from './flyout_provider';
import type {
  EuiFlyoutSessionHistoryState,
  EuiFlyoutSessionOpenChildOptions,
  EuiFlyoutSessionOpenGroupOptions,
  EuiFlyoutSessionOpenMainOptions,
  EuiFlyoutSessionOpenManagedOptions,
  EuiFlyoutSessionRenderContext,
  EuiFlyoutSessionGroup,
} from './types';
import { useEuiFlyoutSession } from './use_eui_flyout';

const loggerAction = action('flyout-session-log');

const meta: Meta<typeof EuiFlyoutSessionProvider> = {
  title: 'Layout/EuiFlyout/Flyout System',
  component: EuiFlyoutSessionProvider,
};

export default meta;

/** Helper component for displaying internal raw state */
const InternalState: React.FC<{
  state: EuiFlyoutSessionHistoryState<unknown>;
}> = ({ state }) => {
  return (
    <>
      <EuiTitle size="s">
        <h3>Internal state</h3>
      </EuiTitle>
      <EuiCodeBlock language="json">
        {JSON.stringify(state, null, 2)}
      </EuiCodeBlock>
    </>
  );
};

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
interface ItemDetailsContentProps extends ECommerceContentProps {}
interface ReviewOrderContentProps extends ECommerceContentProps {}
interface OrderConfirmedContentProps extends ECommerceContentProps {}

/**
 *
 * The flyout system allows custom meta data to be provided by the consumer, in the "EuiFlyoutSessionOpen*Options"
 * interfaces. In the advanced use case, (ECommerceApp), we're using metadata within the renderMainFlyoutContent
 * function as a conditional to determine which component to render in the main flyout.
 */
interface ECommerceAppMeta {
  ecommerceMainFlyoutKey?: 'shoppingCart' | 'reviewOrder' | 'orderConfirmed';
}

const ShoppingCartContent: React.FC<ShoppingCartContentProps> = ({
  itemQuantity,
  onQuantityChange,
}) => {
  const {
    openChildFlyout,
    openManagedFlyout,
    isChildFlyoutOpen,
    closeChildFlyout,
    closeSession,
  } = useEuiFlyoutSession();

  const handleOpenItemDetails = () => {
    const options: EuiFlyoutSessionOpenChildOptions<ECommerceAppMeta> = {
      title: 'Item details',
      size: 's',
      flyoutProps: {
        className: 'itemDetailsFlyoutChild',
        'aria-label': 'Item details',
        onClose: () => {
          loggerAction('Item details onClose triggered');
          closeChildFlyout(); // If we add an onClose handler to the child flyout, we have to call closeChildFlyout within it for the flyout to actually close
        },
      },
    };
    openChildFlyout(options);
  };

  const handleProceedToReview = () => {
    const options: EuiFlyoutSessionOpenManagedOptions<ECommerceAppMeta> = {
      title: 'Review order',
      hideTitle: true, // title will only show in the history popover
      size: 'm',
      meta: { ecommerceMainFlyoutKey: 'reviewOrder' },
      flyoutProps: {
        type: 'push',
        className: 'reviewOrderFlyoutMain',
        'aria-label': 'Review order',
        onClose: () => {
          loggerAction('Review order onClose triggered');
          closeSession(); // If we add an onClose handler to the main flyout, we have to call closeSession within it for the flyout to actually close
        },
      },
    };
    openManagedFlyout(options);
  };

  return (
    <>
      <EuiFlyoutHeader>
        <EuiTitle size="m">
          <h2 id="flyout-shopping-cart-title">Shopping cart</h2>
        </EuiTitle>
      </EuiFlyoutHeader>
      <EuiFlyoutBody>
        <EuiText>
          <p>Item: Flux Capacitor</p>
        </EuiText>
        <EuiButton
          onClick={isChildFlyoutOpen ? closeChildFlyout : handleOpenItemDetails}
        >
          {isChildFlyoutOpen ? 'Close item details' : 'View item details'}
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
        <EuiButton onClick={closeSession} color="danger">
          Close
        </EuiButton>
      </EuiFlyoutFooter>
    </>
  );
};

const ReviewOrderContent: React.FC<ReviewOrderContentProps> = ({
  itemQuantity,
}) => {
  const { goBack, openManagedFlyout, closeSession } = useEuiFlyoutSession();

  return (
    <>
      <EuiFlyoutHeader>
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
          onClick={() =>
            openManagedFlyout({
              title: 'Order confirmed',
              size: 'm',
              flyoutProps: {
                type: 'push',
                className: 'orderConfirmedFlyout',
                'aria-label': 'Order confirmed',
                onClose: () => {
                  loggerAction('Order confirmed onClose triggered');
                  closeSession(); // If we add an onClose handler to the main flyout, we have to call closeSession within it for the flyout to actually close
                },
              },
              meta: { ecommerceMainFlyoutKey: 'orderConfirmed' },
            })
          }
          fill
          color="accent"
        >
          Confirm purchase
        </EuiButton>
      </EuiFlyoutBody>
      <EuiFlyoutFooter>
        <EuiButton
          onClick={() => {
            loggerAction('Go back button clicked');
            goBack();
          }}
          color="danger"
        >
          Go back
        </EuiButton>{' '}
        <EuiButton onClick={closeSession} color="danger">
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

const OrderConfirmedContent: React.FC<OrderConfirmedContentProps> = ({
  itemQuantity,
}) => {
  const { closeSession } = useEuiFlyoutSession();
  return (
    <>
      <EuiFlyoutBody>
        <EuiText>
          <h3>Order confirmed</h3>
          <p>Item: Flux Capacitor</p>
          <p>Quantity: {itemQuantity}</p>
          <EuiSpacer />
          <p>Your order has been confirmed. Check your email for details.</p>
        </EuiText>
      </EuiFlyoutBody>
      <EuiFlyoutFooter>
        <EuiButton onClick={closeSession} color="danger">
          Close
        </EuiButton>
      </EuiFlyoutFooter>
    </>
  );
};

// Component for the main control buttons and state display
const ECommerceAppControls: React.FC = () => {
  const {
    openManagedFlyout,
    goBack,
    isFlyoutOpen,
    canGoBack,
    isChildFlyoutOpen,
    closeChildFlyout,
    closeSession,
  } = useEuiFlyoutSession();
  const { state } = useEuiFlyoutSessionContext(); // Use internal hook for displaying raw state

  const handleCloseOrGoBack = () => {
    if (canGoBack) {
      goBack();
    } else {
      closeSession();
    }
  };
  const handleOpenShoppingCart = () => {
    const options: EuiFlyoutSessionOpenManagedOptions<ECommerceAppMeta> = {
      title: 'Shopping cart',
      hideTitle: true, // title will only show in the history popover
      size: 'm',
      meta: { ecommerceMainFlyoutKey: 'shoppingCart' },
      flyoutProps: {
        type: 'push',
        pushMinBreakpoint: 'xs',
        className: 'shoppingCartFlyoutMain',
        'aria-label': 'Shopping cart',
        onClose: (event) => {
          loggerAction('Shopping cart onClose triggered', event);
          closeSession(); // If we add an onClose handler to the main flyout, we have to call closeSession within it for the flyout to actually close
        },
      },
    };
    openManagedFlyout(options);
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
      <EuiSpacer />
      <EuiButton
        onClick={closeChildFlyout}
        isDisabled={!isChildFlyoutOpen}
        color="warning"
      >
        Close child flyout
      </EuiButton>
      <EuiSpacer />
      <EuiButton
        onClick={handleCloseOrGoBack}
        isDisabled={!isFlyoutOpen}
        color="warning"
      >
        Close/Go back
      </EuiButton>
      <EuiSpacer />
      <InternalState state={state} />
    </>
  );
};

const ECommerceApp: React.FC = () => {
  const [itemQuantity, setItemQuantity] = useState(1);

  const handleQuantityChange = (delta: number) => {
    setItemQuantity((prev) => Math.max(0, prev + delta));
  };

  // Render function for MAIN flyout content
  const renderMainFlyoutContent = (
    context: EuiFlyoutSessionRenderContext<ECommerceAppMeta>
  ) => {
    const { meta } = context;
    const { ecommerceMainFlyoutKey } = meta || {};

    switch (ecommerceMainFlyoutKey) {
      case 'orderConfirmed':
        return <OrderConfirmedContent itemQuantity={itemQuantity} />;
      case 'reviewOrder':
        return <ReviewOrderContent itemQuantity={itemQuantity} />;
      case 'shoppingCart':
        return (
          <ShoppingCartContent
            itemQuantity={itemQuantity}
            onQuantityChange={handleQuantityChange}
          />
        );
    }

    loggerAction(
      'renderMainFlyoutContent: Unknown flyout key',
      meta?.ecommerceMainFlyoutKey
    );
    return null;
  };

  // Render function for CHILD flyout content
  const renderChildFlyoutContent = () => {
    return <ItemDetailsContent itemQuantity={itemQuantity} />;
  };

  const ecommerceHistoryFilter = useCallback(
    (
      history: EuiFlyoutSessionHistoryState<ECommerceAppMeta>['history'],
      activeFlyoutGroup?: EuiFlyoutSessionGroup<ECommerceAppMeta> | null
    ) => {
      const isOrderConfirmationActive =
        activeFlyoutGroup?.meta?.ecommerceMainFlyoutKey === 'orderConfirmed';

      // If on order confirmation page, clear history to remove "Back" button
      if (isOrderConfirmationActive) {
        loggerAction('Clearing history');
        return [];
      }

      return history;
    },
    []
  );

  return (
    <EuiFlyoutSessionProvider
      renderMainFlyoutContent={renderMainFlyoutContent}
      renderChildFlyoutContent={renderChildFlyoutContent}
      historyFilter={ecommerceHistoryFilter}
      onUnmount={() => {
        loggerAction('All flyouts have been unmounted');
      }}
    >
      <ECommerceAppControls />
    </EuiFlyoutSessionProvider>
  );
};

export const ECommerceWithHistory: StoryObj = {
  name: 'Advanced Use Case',
  parameters: {
    loki: {
      skip: true,
    },
  },
  render: () => {
    return <ECommerceApp />;
  },
};

/**
 * --------------------------------------
 * Deep History Example (advanced use case)
 * --------------------------------------
 */

interface DeepHistoryAppMeta {
  page: 'page01' | 'page02' | 'page03' | 'page04' | 'page05' | '';
}

const getHistoryManagedFlyoutOptions = (
  page: DeepHistoryAppMeta['page']
): EuiFlyoutSessionOpenManagedOptions<DeepHistoryAppMeta> => {
  return {
    title: page,
    size: 'm',
    meta: { page },
    flyoutProps: {
      type: 'push',
      pushMinBreakpoint: 'xs',
      'aria-label': page,
    },
  };
};

const DeepHistoryPage: React.FC<DeepHistoryAppMeta> = ({ page }) => {
  const { openManagedFlyout, closeSession } = useEuiFlyoutSession();
  const [nextPage, setNextPage] = useState<DeepHistoryAppMeta['page']>('');

  useEffect(() => {
    switch (page) {
      case 'page01':
        setNextPage('page02');
        break;
      case 'page02':
        setNextPage('page03');
        break;
      case 'page03':
        setNextPage('page04');
        break;
      case 'page04':
        setNextPage('page05');
        break;
      case 'page05':
        setNextPage('');
        break;
    }
  }, [page]);

  const handleOpenNextFlyout = () => {
    const options = getHistoryManagedFlyoutOptions(nextPage);
    openManagedFlyout(options);
  };

  return (
    <>
      <EuiFlyoutHeader>
        <EuiTitle size="m">
          <h2 id="flyout-review-order-title">Page {page}</h2>
        </EuiTitle>
      </EuiFlyoutHeader>
      <EuiFlyoutBody>
        {nextPage === '' ? (
          <>
            <EuiText>
              <p>
                This is the content for {page}.<br />
                You have reached the end of the history.
              </p>
            </EuiText>
          </>
        ) : (
          <>
            <EuiText>
              <p>This is the content for {page}.</p>
            </EuiText>
            <EuiSpacer />
            <EuiButton onClick={handleOpenNextFlyout}>
              Navigate to {nextPage}
            </EuiButton>
          </>
        )}
      </EuiFlyoutBody>
      <EuiFlyoutFooter>
        <EuiButton onClick={closeSession} color="danger">
          Close
        </EuiButton>
      </EuiFlyoutFooter>
    </>
  );
};

// Component for the main control buttons and state display
const DeepHistoryAppControls: React.FC = () => {
  const { openManagedFlyout, isFlyoutOpen } = useEuiFlyoutSession();
  const { state } = useEuiFlyoutSessionContext(); // Use internal hook for displaying raw state

  const handleOpenManagedFlyout = () => {
    const options = getHistoryManagedFlyoutOptions('page01');
    openManagedFlyout(options);
  };

  return (
    <>
      <EuiButton
        onClick={handleOpenManagedFlyout}
        isDisabled={isFlyoutOpen}
        fill
      >
        Begin flyout navigation
      </EuiButton>
      <EuiSpacer />
      <InternalState state={state} />
    </>
  );
};

const DeepHistoryApp: React.FC = () => {
  // Render function for MAIN flyout content
  const renderMainFlyoutContent = (
    context: EuiFlyoutSessionRenderContext<DeepHistoryAppMeta>
  ) => {
    const { meta } = context;
    const { page } = meta || { page: 'page01' };
    return <DeepHistoryPage page={page} />;
  };

  return (
    <EuiFlyoutSessionProvider
      renderMainFlyoutContent={renderMainFlyoutContent}
      onUnmount={() => loggerAction('All flyouts have been unmounted')}
    >
      <DeepHistoryAppControls />
    </EuiFlyoutSessionProvider>
  );
};

export const DeepHistory: StoryObj = {
  name: 'Deep History Navigation',
  render: () => {
    return <DeepHistoryApp />;
  },
};

/**
 * --------------------------------------
 * Group opener example (simple use case)
 * --------------------------------------
 */

const GroupOpenerControls: React.FC<{
  mainFlyoutType: 'push' | 'overlay';
  mainFlyoutSize: 's' | 'm';
}> = ({ mainFlyoutType, mainFlyoutSize }) => {
  const {
    openFlyoutGroup,
    isFlyoutOpen,
    isChildFlyoutOpen,
    closeSession,
    closeChildFlyout,
  } = useEuiFlyoutSession();
  const { state } = useEuiFlyoutSessionContext(); // Use internal hook for displaying raw state

  const handleOpenGroup = () => {
    // make the child flyout size be different than the main
    let childFlyoutSize: 's' | 'm' = 's';
    if (mainFlyoutSize === 's') {
      childFlyoutSize = 'm';
    }
    const options: EuiFlyoutSessionOpenGroupOptions = {
      main: {
        title: 'Group opener, main flyout',
        size: mainFlyoutSize,
        flyoutProps: {
          type: mainFlyoutType,
          pushMinBreakpoint: 'xs',
          ownFocus: true,
          outsideClickCloses: true,
          className: 'groupOpenerMainFlyout',
          'aria-label': 'Main flyout',
          onClose: () => {
            loggerAction('Group opener main flyout onClose triggered');
            closeSession();
          },
        },
      },
      child: {
        title: 'Group opener, child flyout',
        size: childFlyoutSize,
        flyoutProps: {
          className: 'groupOpenerChildFlyout',
          'aria-label': 'Child flyout',
          onClose: () => {
            loggerAction('Group opener child flyout onClose triggered');
            closeChildFlyout();
          },
        },
      },
    };
    openFlyoutGroup(options);
  };

  return (
    <>
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
          <EuiButton onClick={closeSession} color="danger">
            Close All Flyouts
          </EuiButton>
        </>
      )}
      <EuiSpacer />
      <InternalState state={state} />
    </>
  );
};

const GroupOpenerApp: React.FC = () => {
  const [mainFlyoutType, setMainFlyoutType] = useState<'push' | 'overlay'>(
    'push'
  );
  const mainFlyoutTypeRadios = [
    { id: 'push', label: 'Push' },
    { id: 'overlay', label: 'Overlay' },
  ];

  const [mainFlyoutSize, setMainFlyoutSize] = useState<'s' | 'm'>('s');
  const mainFlyoutSizeRadios = [
    { id: 's', label: 'Small' },
    { id: 'm', label: 'Medium' },
  ];

  const MainFlyoutContent = () => {
    const { closeSession } = useEuiFlyoutSession();
    return (
      <>
        <EuiFlyoutBody>
          <EuiText>
            <p>
              This is the main flyout content. It was opened simultaneously with
              the child flyout using the <code>openFlyoutGroup</code> function.
            </p>
          </EuiText>
        </EuiFlyoutBody>
        <EuiFlyoutFooter>
          <EuiButton onClick={closeSession} color="danger">
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
    <>
      <EuiText>
        <p>
          This demo shows how to use the <code>openFlyoutGroup</code> function
          to simultaneously open both main and child flyouts.
        </p>
      </EuiText>
      <EuiSpacer />
      <EuiRadioGroup
        options={mainFlyoutTypeRadios}
        idSelected={mainFlyoutType}
        onChange={(id) => setMainFlyoutType(id as typeof mainFlyoutType)}
        name="mainFlyoutType"
        legend={{ children: 'Main flyout type' }}
      />
      <EuiSpacer />
      <EuiRadioGroup
        options={mainFlyoutSizeRadios}
        idSelected={mainFlyoutSize}
        onChange={(id) => setMainFlyoutSize(id as typeof mainFlyoutSize)}
        name="mainFlyoutSize"
        legend={{ children: 'Main flyout size' }}
      />
      <EuiSpacer />
      <EuiFlyoutSessionProvider
        renderMainFlyoutContent={renderMainFlyoutContent}
        renderChildFlyoutContent={renderChildFlyoutContent}
        onUnmount={() => {
          loggerAction('FlyoutGroup flyouts have been unmounted');
        }}
      >
        <GroupOpenerControls
          mainFlyoutType={mainFlyoutType}
          mainFlyoutSize={mainFlyoutSize}
        />
      </EuiFlyoutSessionProvider>
    </>
  );
};

export const WithGroupOpener: StoryObj = {
  name: 'Group Opener',
  parameters: {
    loki: {
      skip: true,
    },
  },
  render: () => {
    return <GroupOpenerApp />;
  },
};

/**
 * ---------------------------------------------------
 * Basic Flyout
 * ---------------------------------------------------
 */

const BasicFlyoutControls: React.FC<{
  flyoutType: 'push' | 'overlay';
  mainFlyoutSize: 's' | 'm';
}> = ({ flyoutType, mainFlyoutSize }) => {
  const { openFlyout, isFlyoutOpen, isChildFlyoutOpen, closeSession } =
    useEuiFlyoutSession();
  const { state } = useEuiFlyoutSessionContext(); // Use internal hook for displaying raw state

  const handleOpenFlyout = () => {
    const options: EuiFlyoutSessionOpenMainOptions = {
      flyoutProps: {
        type: flyoutType,
        onClose: () => {
          loggerAction('Basic flyout onClose triggered');
          closeSession();
        },
      },
      size: mainFlyoutSize,
    };
    openFlyout(options);
  };
  return (
    <>
      <EuiButton
        onClick={handleOpenFlyout}
        fill
        color="primary"
        iconType="folderOpen"
        data-testid="openFlyoutButton"
        isDisabled={isFlyoutOpen || isChildFlyoutOpen}
      >
        Open flyout
      </EuiButton>
      <EuiSpacer />
      <InternalState state={state} />
    </>
  );
};

const BasicFlyoutApp: React.FC = () => {
  const [flyoutType, setFlyoutType] = useState<'push' | 'overlay'>('overlay');
  const typeRadios: EuiRadioGroupOption[] = [
    { id: 'push', label: 'Push' },
    { id: 'overlay', label: 'Overlay' },
  ];

  const [mainFlyoutSize, setMainFlyoutSize] = useState<'s' | 'm'>('m');
  const sizeRadios: EuiRadioGroupOption[] = [
    { id: 's', label: 'Small' },
    { id: 'm', label: 'Medium' },
  ];

  const renderMainFlyoutContent = () => {
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
              This is the main flyout content. This was opened using the{' '}
              <code>openFlyout</code> function.
            </p>
          </EuiText>
        </EuiFlyoutBody>
      </>
    );
  };
  return (
    <>
      <EuiText>
        <p>
          This demo shows how to use the backwards compatible{' '}
          <code>openFlyout</code> function to open both main and child flyouts.
        </p>
      </EuiText>
      <EuiSpacer />
      <EuiRadioGroup
        options={typeRadios}
        idSelected={flyoutType}
        onChange={(id) => setFlyoutType(id as 'push' | 'overlay')}
        legend={{ children: 'Flyout type' }}
        name="statefulFlyoutTypeToggle"
      />
      <EuiSpacer />
      <EuiRadioGroup
        options={sizeRadios}
        idSelected={mainFlyoutSize}
        onChange={(id) => setMainFlyoutSize(id as 's' | 'm')}
        legend={{ children: 'Flyout size' }}
        name="statefulFlyoutSizeToggle"
      />
      <EuiSpacer />
      <EuiFlyoutSessionProvider
        renderMainFlyoutContent={renderMainFlyoutContent}
        onUnmount={() => {
          loggerAction('Flyout has been unmounted');
        }}
      >
        <BasicFlyoutControls
          flyoutType={flyoutType}
          mainFlyoutSize={mainFlyoutSize}
        />
      </EuiFlyoutSessionProvider>
      <EuiSpacer />
    </>
  );
};

export const BasicFlyout: StoryObj = {
  render: () => {
    return <BasicFlyoutApp />;
  },
};
