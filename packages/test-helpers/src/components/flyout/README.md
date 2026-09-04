# EuiFlyoutObject

Playwright Component Object for [EuiFlyout](https://eui.elastic.co/docs/components/containers/flyout/).

## Usage

```ts
import { EuiFlyoutObject } from '@elastic/eui-test-helpers';

const flyout = new EuiFlyoutObject(page, 'myFlyout');
await flyout.closeButton.click();
```

Set `data-test-subj` on the `<EuiFlyout>` itself, which the component-type guard verifies.

## API

| Member | Description |
|---|---|
| `closeButton` | `Locator` for this flyout's own close button, scoped to this instance. Absent with `hideCloseButton` or a rendered flyout menu. |

## Deliberately out of scope

- **Multiple/nested flyouts on the page at once**: `closeButton` is already scoped to the instance you constructed, so this is naturally handled without extra API. Each flyout needs its own `data-test-subj`.
- **A Kibana-specific close button convention** (e.g. a `closeFlyoutButton` test-subj some consumers add on their own footer button instead of using EUI's close button): that is app-owned, not this component's concern.
- **The flyout menu** (`EuiFlyoutMenu`, including its own back button and pagination): a separate, newer subsystem with no evidenced consumer yet.
