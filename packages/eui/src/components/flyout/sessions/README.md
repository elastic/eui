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
*   **`onCloseFlyout`**: `() => void` - A callback function that closes the current main flyout.
*   **`onCloseChildFlyout`**: `() => void` - A callback function that closes the current child flyout.
*   **`flyoutSize`**: The size of the currently active flyout.
*   **`flyoutType`**: `'main' | 'child'` - Indicates which flyout the render prop is being called for.

## `useEuiFlyoutSession` Hook API

The `useEuiFlyoutSession` hook is generic and can be typed to match the `meta` object you are working with (e.g., `useEuiFlyoutSession<MyMetaType>()`).

### Methods

*   `openFlyout(options)`: Opens a new main flyout. If a flyout is already open, it adds the new one to a history stack.
*   `openChildFlyout(options)`: Opens a new child flyout to the left of the main flyout.
*   `closeFlyout()`: Closes the currently open main flyout. If there's a previous flyout in the history stack, it will be shown.
*   `closeChildFlyout()`: Closes the currently open child flyout.
*   `clearHistory()`: Closes all flyouts by clearing the history stack of all flyouts in the session.

### State Values

The hook also returns boolean flags representing the current state:

*   `isFlyoutOpen`: `true` if a main flyout is currently open.
*   `isChildFlyoutOpen`: `true` if a child flyout is currently open.
*   `canGoBack`: `true` if there is a previous flyout in the history stack.

## Basic Usage Example

Here is a complete example of how to set up and use the flyout state management system in TypeScript, including child flyouts.

```tsx
import React from 'react';
import {
  EuiButton,
  EuiFlyoutBody,
  EuiFlyoutHeader,
  EuiText,
  EuiTitle,
  EuiFlyoutSessionProvider,
  EuiFlyoutSessionRenderContext,
  useEuiFlyoutSession,
} from '@elastic/eui';

// Define a type for the custom data we'll pass in `meta`
interface FlyoutMeta {
  title: string;
  userId?: string;
  parentId?: string;
}

// 1. A component that uses the hook to open the initial flyout
const MyComponent: React.FC = () => {
  const { openFlyout, isFlyoutOpen } = useEuiFlyoutSession<FlyoutMeta>();

  const handleClick = () => {
    openFlyout({
      size: 'm',
      meta: { title: 'User Details', userId: '42' },
    });
  };

  return (
    <EuiButton onClick={handleClick} isDisabled={isFlyoutOpen}>
      Show User Details
    </EuiButton>
  );
};

// 2. The main application component that sets up the provider
const App: React.FC = () => {
  // 3. The render prop function for the main flyout.
  const renderMainFlyoutContent = (
    flyoutContext: EuiFlyoutSessionRenderContext<FlyoutMeta>
  ) => {
    const { meta, onCloseFlyout } = flyoutContext;
    const { openChildFlyout, isChildFlyoutOpen } = useEuiFlyoutSession<FlyoutMeta>();

    const handleOpenChild = () => {
      openChildFlyout({
        size: 's',
        meta: { title: 'User Preferences', parentId: meta.userId },
      });
    };

    return (
      <>
        <EuiFlyoutHeader hasBorder>
          <EuiTitle size="m">
            <h2>{meta.title}</h2>
          </EuiTitle>
        </EuiFlyoutHeader>
        <EuiFlyoutBody>
          <EuiText>
            <p>Details for user ID: {meta.userId}</p>
          </EuiText>
          <EuiButton onClick={handleOpenChild} isDisabled={isChildFlyoutOpen}>
            Edit Preferences
          </EuiButton>
          <EuiButton onClick={onCloseFlyout} fill>
            Close
          </EuiButton>
        </EuiFlyoutBody>
      </>
    );
  };

  // 4. The render prop function for the child flyout.
  const renderChildFlyoutContent = (
    flyoutContext: EuiFlyoutSessionRenderContext<FlyoutMeta>
  ) => {
    const { meta, onCloseChildFlyout } = flyoutContext;

    return (
      <>
        <EuiFlyoutHeader hasBorder>
          <EuiTitle size="s">
            <h3>{meta.title}</h3>
          </EuiTitle>
        </EuiFlyoutHeader>
        <EuiFlyoutBody>
          <EuiText>
            <p>Editing preferences for user {meta.parentId}.</p>
          </EuiText>
          <EuiButton onClick={onCloseChildFlyout}>Done</EuiButton>
        </EuiFlyoutBody>
      </>
    );
  };

  return (
    <EuiFlyoutSessionProvider
      renderMainFlyoutContent={renderMainFlyoutContent}
      renderChildFlyoutContent={renderChildFlyoutContent}
    >
      <MyComponent />
    </EuiFlyoutSessionProvider>
  );
};
```
