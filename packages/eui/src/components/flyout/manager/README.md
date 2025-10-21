# EuiFlyout session manager

[Documentation - production](https://eui.elastic.co/docs/components/containers/flyout/session-management)

[Documentation - local](http://localhost:3000/docs/components/containers/flyout/session-management),

[Documentation - sources](../../../../../website/docs/components/containers/flyout/session-management.mdx)

Session management for EuiFlyout is enabled with the `session` prop. You can read more about that
in the [main EuiFlyout developer README](../README.md). 

## Components and hooks

### EuiFlyoutMain

[EuiFlyoutMain](./flyout_main.tsx) is a thin logical component that renders [EuiManagedFlyout](./flyout_managed.tsx)
with the `level` prop set to `true` and does some minimal styling for when there's a child flyout rendered
alongside the main flyout.

### EuiFlyoutChild

[EuiFlyoutChild](./flyout_child.tsx) renders [EuiManagedFlyout](./flyout_managed.tsx) and does state validation
to ensure the child flyout is always rendered within a main flyout.

All child flyouts are of type `overlay`, and have `ownFocus` set to false, since that's handled separately.

Child flyouts are positioned absolutely and moved to the side by the width of the main flyout, which is stored
in the state and extracted with the [`useFlyoutWidth`](./selectors.ts) hook.

### EuiFlyoutManaged

[EuiFlyoutManaged](./flyout_managed.tsx) is the primary logical piece of the flyout session management system.
It handles flyout registration, parent and child size validation, width tracking, and stage transitions for styling.

## State management

State of flyout sessions is managed with [`useFlyoutManager`](./hooks.ts) hook and its underlying
[`flyoutManagerReducer`](./reducer.ts) via [`useFlyoutManagerReducer`](./hooks.ts).
It uses the native React `useReducer` for best compatibility with consumer applications.

The reducer actions are defined in [actions.ts](./actions.ts) and are exposed directly in the provider.
You shouldn't call any of these actions outside the flyout source code as they're considered internal.
