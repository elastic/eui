# EuiFlyout

[Documentation - production](https://eui.elastic.co/docs/components/containers/flyout/)

[Documentation - local](http://localhost:3000/docs/components/containers/flyout/)

[Documentation - sources](../../../../website/docs/components/containers/flyout)

## Component composition

```mermaid
flowchart
    EuiFlyout --> EuiFlyoutComponent
    EuiFlyout --> |"session = 'start'"|EuiFlyoutMain --> EuiManagedFlyout --> EuiFlyoutComponent
    EuiFlyout --> |"session = 'inherit'"|EuiFlyoutChild --> EuiManagedFlyout --> EuiFlyoutComponent
```

The core implementation of EuiFlyout lives in the internal [EuiFlyoutComponent](./flyout.component.tsx) file.
It contains the main logic and UI for rendering flyouts. However, it's not the component
that EUI consumers interact with directly.

The EuiFlyout export actually comes from [`flyout.tsx`](./flyout.tsx) which is a thin logical
wrapper that conditionally handles session management when `session="start"`,
or renders the plain [EuiFlyoutComponent](./flyout.component.tsx) otherwise.
That structure provides a better business logic separation.

## Resizable flyouts

Historically, the resizable variant of EuiFlyout was a separate component called
[EuiFlyoutResizable](./flyout_resizable.tsx). It was a wrapper over the regular `EuiFlyout` that injected
additional event handlers and a drag handler element to flyout's `children`.

Currently, this logic is moved to an internal [`useEuiFlyoutResizable`](./use_flyout_resizable.ts) hook
that serves the same purpose, but is directly integrated into EuiFlyoutComponent,
and the resizability feature is enabled via the `resizable` prop for simplicity and ability
to dynamically change whether the flyout is resizable or not.

The EuiFlyoutResizable component still exists as a thin wrapper over EuiFlyout
that sets the `resizable` prop to `true`, and is exported as part of the public API
for backwards compatibility.

```mermaid
flowchart
    EuiFlyoutResizable --> EuiFlyoutComponent
    EuiFlyoutComponent ~~~|"resizable = true"| EuiFlyoutComponent
```

## Managed flyouts (aka flyout session management)

The developer README for the managed flyouts lives in the [`manager` subdirectory](./manager/README.md).
