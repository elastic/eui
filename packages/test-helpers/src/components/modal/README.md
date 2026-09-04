# EuiModalObject

Playwright Component Object for [EuiModal](https://eui.elastic.co/docs/components/containers/modal/) and `EuiConfirmModal`, which renders `EuiModal` underneath.

## Usage

```ts
import { EuiModalObject } from '@elastic/eui-test-helpers';

const modal = new EuiModalObject(page, 'myModal');
await modal.closeButton.click();
```

Set `data-test-subj` on the `<EuiModal>`/`<EuiConfirmModal>` itself, which the component-type guard verifies.

## API

| Member | Description |
|---|---|
| `closeButton` | `Locator` for this modal's own close button, scoped to this instance. |

`closeButton` is read by its stable `euiModal__closeIcon` class rather than a `data-test-subj`, since EUI does not set one on that button, only an i18n `aria-label`.

## Deliberately out of scope

- **`EuiConfirmModal`'s cancel/confirm buttons**: already carry their own stable `data-test-subj`s (`confirmModalCancelButton`, `confirmModalConfirmButton`), no ambiguity to solve.
- **Open/close animation**: unlike `EuiPopover`, `EuiModal` has no internal open/close state or transition to wait for. It is a plain conditionally-mounted component.
