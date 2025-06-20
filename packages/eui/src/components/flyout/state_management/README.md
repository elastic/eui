# EUI Flyout State Management

EUI has a state management system for programmatically controlling flyouts. It provides a flexible way to open, close, and manage the content of flyouts from anywhere within a React component tree.

This system is ideal for scenarios where flyouts need to be triggered by deep-nested components or when managing a sequence of flyouts (e.g., a main flyout that opens a child flyout).

---

## `EuiFlyoutProvider` API

The `EuiFlyoutProvider` is the core stateful component. You must wrap it around any components that need to use the `useEuiFlyout` hook.

### Props

*   **`renderMainFlyoutContent`**: `(context: EuiManagedFlyoutRenderContext<MetaType>) => ReactNode;`
*   **`renderChildFlyoutContent`**: `(context: EuiManagedFlyoutRenderContext<MetaType>) => ReactNode;` (optional)

### The `flyoutContext` Object

The `flyoutContext` object passed to your render prop functions is of type `EuiManagedFlyoutRenderContext<MetaType>` and contains the following useful properties:

*   **`meta`**: `MetaType` - The arbitrary data object you passed into the `meta` property when calling `openFlyout` or `openChildFlyout`. This is a generic, allowing you to have type safety for your custom data.
*   **`onCloseFlyout`**: `() => void` - A callback function that closes the current main flyout.
*   **`onCloseChildFlyout`**: `() => void` - A callback function that closes the current child flyout.
*   **`flyoutSize`**: The size of the currently active flyout.
*   **`flyoutType`**: `'main' | 'child'` - Indicates which flyout the render prop is being called for.

---

## `useEuiFlyout` Hook API

The `useEuiFlyout` hook is generic and can be typed to match the `meta` object you are working with (e.g., `useEuiFlyout<MyMetaType>()`).

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

---

## Basic Usage Example

Here is a complete example of how to set up and use the flyout state management system in TypeScript, including child flyouts.

```tsx
import React from 'react';
import {
  EuiButton,
  EuiFlyoutProvider,
  useEuiFlyout,
  EuiFlyoutHeader,
  EuiFlyoutBody,
  EuiTitle,
  EuiText,
  EuiManagedFlyoutRenderContext,
} from '@elastic/eui';

// Define a type for the custom data we'll pass in `meta`
interface FlyoutMeta {
  title: string;
  userId?: string;
  parentId?: string;
}

// 1. A component that uses the hook to open the initial flyout
const MyComponent: React.FC = () => {
  const { openFlyout, isFlyoutOpen } = useEuiFlyout<FlyoutMeta>();

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
    flyoutContext: EuiManagedFlyoutRenderContext<FlyoutMeta>
  ) => {
    const { meta, onCloseFlyout } = flyoutContext;
    const { openChildFlyout, isChildFlyoutOpen } = useEuiFlyout<FlyoutMeta>();

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
    flyoutContext: EuiManagedFlyoutRenderContext<FlyoutMeta>
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
    <EuiFlyoutProvider
      renderMainFlyoutContent={renderMainFlyoutContent}
      renderChildFlyoutContent={renderChildFlyoutContent}
    >
      <MyComponent />
    </EuiFlyoutProvider>
  );
};
```

---

## Reducer Logic and Constraints

The internal reducer for `EuiFlyoutProvider` enforces several constraints to ensure proper flyout behavior, especially when using child flyouts:

*   If a child flyout is opened, the parent flyout's `side` prop is forced to `'right'`.
*   If a child flyout is opened, the parent flyout's `closeButtonPosition` is forced to `'inside'`.
*   Size constraints are applied:
    *   The parent flyout can only be size `'s'` or `'m'` if a child is present.
    *   The child flyout can only be size `'s'` if the parent is `'m'`.

These constraints are handled automatically by the state management system.