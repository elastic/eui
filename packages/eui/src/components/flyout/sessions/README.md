# EUI Flyout State Management (Flyout Sessions)

EUI has a state management system for programmatically controlling flyouts. It provides a flexible way to open, close, and manage the content of flyouts from anywhere within a React component tree.

This system is ideal for scenarios flows involving sequence of flyouts (e.g., a main flyout that opens a child flyout, a main flyout opens a "next" flyout), otherwise known as a "flyout session".

## `EuiFlyoutSessionProvider` API

The `EuiFlyoutSessionProvider` is the core stateful component. You must wrap it around any components that need to use the `useEuiFlyoutSession` hook.

### Props

*   **`renderMainFlyoutContent`**: `(flyoutContext: EuiFlyoutSessionRenderContext<MetaType>) => ReactNode;`
*   **`renderChildFlyoutContent`**: `(flyoutContext: EuiFlyoutSessionRenderContext<MetaType>) => ReactNode;` (optional)

### The `flyoutContext` Object

The `flyoutContext` object passed to your render prop functions is of type `EuiFlyoutSessionRenderContext<MetaType>` and contains the following useful properties:

*   **`meta`**: `MetaType` - The arbitrary data object you passed into the `meta` property when calling `openFlyout` or `openChildFlyout`. This is a generic, allowing you to have type safety for your custom data.
*   **`activeFlyoutGroup`**: `EuiFlyoutSessionGroup` - The currently active flyout group.

## `useEuiFlyoutSession` Hook API

The `useEuiFlyoutSession` hook is generic and can be typed to match the `meta` object you are working with (e.g., `useEuiFlyoutSession<MyMetaType>()`).

### Methods

*   `openFlyout(options: EuiFlyoutSessionOpenMainOptions<MetaType>)`: Opens a new main flyout. If a flyout is already open, it adds the new one to a history stack.
*   `openChildFlyout(options: EuiFlyoutSessionOpenChildOptions<MetaType>)`: Opens a new child flyout to the left of the main flyout.
*   `openFlyoutGroup(options: EuiFlyoutSessionOpenGroupOptions<MetaType>)`: Opens a group containing a main flyout and a child flyout.
*   `closeChildFlyout()`: Closes the currently open child flyout.
*   `goBack()`: If there's a previous flyout in the history stack, it will be shown.
*   `closeSession()`: Closes all flyouts by clearing the history stack of all flyouts in the session.

### State Values

The hook also returns boolean flags representing the current state:

*   `isFlyoutOpen`: `true` if a main flyout is currently open.
*   `isChildFlyoutOpen`: `true` if a child flyout is currently open.
*   `canGoBack`: `true` if there is a previous flyout in the history stack.

## Basic Usage Example

Here is a simplified example of how to set up and use the flyout state management hook.

```tsx
import React from 'react';

import {
  EuiButton,
  EuiFlyoutBody,
  EuiText,
  EuiFlyoutHeader,
  EuiTitle,
  EuiFlyoutSessionProvider,
  useEuiFlyoutSession,
} from '@elastic/eui';

const FlyoutAppControls: React.FC = () => {
  const { openFlyout, isFlyoutOpen } = useEuiFlyoutSession();

  const handleOpenFlyout = () => {
    // Calling `openFlyout` again within the same `EuiFlyoutSessionProvider` instance
    // will add the new flyout to the history stack.
    openFlyout({
      size: 'm',
      meta: { title: 'My Flyout' },
    });
  };

  return (
    <EuiButton onClick={handleOpenFlyout} isDisabled={isFlyoutOpen} fill>
      Open simple flyout
    </EuiButton>
  );
};

const FlyoutApp: React.FC = () => {
  // The EuiFlyoutSessionRenderContext is passed to your render prop functions.
  // This can contain a custom `meta` object (set in the `openFlyout` function call)
  // which allows you to customize the content shown in the flyout.
  const renderMainFlyoutContent = (flyoutContext: EuiFlyoutSessionRenderContext<{ title: string }>) => (
    <>
      <EuiFlyoutHeader hasBorder>
        <EuiTitle size="s">
          <h2>{flyoutContext.meta.title}</h2>
        </EuiTitle>
      </EuiFlyoutHeader>
      <EuiFlyoutBody>
        <EuiText>
          <p>Simple flyout content</p>
        </EuiText>
      </EuiFlyoutBody>
    </>
  );

  return (
    <EuiFlyoutSessionProvider renderMainFlyoutContent={renderMainFlyoutContent}>
      <FlyoutAppControls />
    </EuiFlyoutSessionProvider>
  );
};
```
