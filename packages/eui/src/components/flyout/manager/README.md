# EuiFlyout session manager

[Documentation - production](https://eui.elastic.co/docs/components/containers/flyout/session-management)

[Documentation - local](http://localhost:3000/docs/components/containers/flyout/session-management)

[Documentation - sources](../../../../../website/docs/components/containers/flyout/session-management.mdx)

Session management for EuiFlyout is enabled with the `session` prop. You can read more about that
in the [main EuiFlyout developer README](../README.md).

## History scoping (`historyKey`)

Flyout history (Back button and history popover) is scoped by an optional **`historyKey`** prop (type `symbol`).

- **When `historyKey` is omitted**: Each session gets a unique key internally (`Symbol()`), so flyouts do not share history. The Back button will not appear for cross-session navigation.
- **When `historyKey` is set**: Only flyouts that receive the **same Symbol reference** share history. Use a shared Symbol (e.g. `const key = Symbol();` passed to multiple `EuiFlyout` instances) to group related flyouts so their Back button and history only show entries from that group.

This allows different domains (e.g. different product areas) to use `session="start"` without mixing their histories. Child flyouts inherit the main flyout's key and do not pass their own.

## Components and hooks

### EuiFlyoutMain

[EuiFlyoutMain](./flyout_main.tsx) is a thin logical component that renders [EuiManagedFlyout](./flyout_managed.tsx)
with the `level` prop set to `main` and does some minimal styling for when there's a child flyout rendered
alongside the main flyout.

### EuiFlyoutChild

[EuiFlyoutChild](./flyout_child.tsx) renders [EuiManagedFlyout](./flyout_managed.tsx) and does state validation
to ensure the child flyout is always rendered within a main flyout.

Child flyouts are created either by explicitly setting `session="inherit"` or automatically when a flyout
is nested inside a parent flyout's children (in the JSX tree) without an explicit `session` prop.

All child flyouts are of type `overlay`, and have `ownFocus` set to false, since that's handled separately.

Child flyouts are positioned absolutely and moved to the side by the width of the main flyout, which is stored
in the state and extracted with the [`useFlyoutWidth`](./selectors.ts) hook.

In `side-by-side` mode, the resize clamp keeps a resizable main flyout and its child within 90% of the reference width, so a main flyout that the user dragged wide shrinks to the largest width that fits when a child opens or the container narrows. When there is room again, the main flyout returns to the dragged width, which scales with the reference width for a named `size`. Layout mode decides from the width the clamp will apply (`clampFlyoutWidth`), not from the stored width: deciding from the stored width would switch to `stacked` before the clamp applies, and the clamp is off in `stacked` mode. A clamped pair is held at a fixed width and can't thrash, so it returns from `stacked` as soon as it is under the 95% threshold, skipping the 85% hysteresis. A clamp that leaves the main flyout no width is ignored, because the resize hook then keeps the flyout at its `size`. Layout mode learns that a flyout is resizable from the manager state. The `resizable` flag is set at registration and updated with `setFlyoutResizable`, because toggling it must not re-register the flyout and close its session.

### EuiManagedFlyout

[EuiManagedFlyout](./flyout_managed.tsx) is the primary logical piece of the flyout session management system.
It handles flyout registration, parent and child size validation, width tracking, and stage transitions for styling.

## State management

Flyout session state is managed through a singleton store pattern that enables cross-React-root state sharing.

The [`getFlyoutManagerStore()`](./store.ts) function returns a module-level singleton store instance. This store:
- Uses [`flyoutManagerReducer`](./reducer.ts) internally for state updates
- Implements `subscribe` and `getState` methods compatible with React's `useSyncExternalStore`
- Enables multiple React roots to share the same flyout state

The [`EuiFlyoutManager`](./provider.tsx) provider component uses `useSyncExternalStore` to sync React components with the singleton store. Components access the manager API (state + actions) through the [`useFlyoutManager`](./hooks.ts) hook.

The reducer actions are defined in [actions.ts](./actions.ts) and are exposed directly in the store.
You shouldn't call any of these actions outside the flyout source code as they're considered internal.
