# EuiGlobalToastListObject

Playwright Component Object for [EuiGlobalToastList](https://eui.elastic.co/docs/components/display/toast/).

## Usage

```ts
import { EuiGlobalToastListObject } from '@elastic/eui-test-helpers';

const toastList = new EuiGlobalToastListObject(page, 'globalToastList');
await expect(toastList.toasts).toHaveCount(1);
await toastList.closeAll();
```

Set `data-test-subj` on the `<EuiGlobalToastList>` (EUI spreads it onto the `.euiGlobalToastList` element, which the component-type guard verifies). Toasts rendered outside the list (inline `EuiToast`) are not covered.

## API

| Member | Description |
|---|---|
| `toasts` | `Locator` for the toasts currently in the list, keeping Playwright auto-retry for count and content assertions (e.g. `expect(toasts).toHaveCount(1)`, `expect(toasts).toContainText('Saved')`). |
| `closeAll()` | Clicks every toast's close button and waits until none remain. No-op when the list is already empty, so it doubles as a "dismiss if present" teardown helper. Tolerates toasts auto-dismissing mid-iteration. |
