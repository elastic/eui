# EuiTabsObject

Playwright Component Object for [EuiTabs](https://eui.elastic.co/docs/components/navigation/tabs/). Also covers `EuiTabbedContent`, which renders an `EuiTabs` as the first child of the element carrying your `data-test-subj`.

## Usage

```ts
import { EuiTabsObject } from '@elastic/eui-test-helpers';

const tabs = new EuiTabsObject(page, 'myTabs');
await tabs.select('Documents');
expect(await tabs.getSelected()).toBe('Documents');
```

Set `data-test-subj` on `<EuiTabs>` or `<EuiTabbedContent>`. Tabs are addressed by their exact label.

## API

| Member | Description |
|---|---|
| `tabs` | `Locator` for all tabs, in order. |
| `getTabs()` | The labels of all tabs, in order. |
| `tab(label)` | `Locator` for the tab with exactly this label. Matches the label span, so `prepend` and `append` content does not interfere. |
| `select(label)` | Click the tab and wait for it to become selected. |
| `getSelected()` | The label of the selected tab, or `null`. |

## Deliberately excluded

Tab panels. `EuiTabbedContent` renders one `role="tabpanel"` for the selected tab, and bare `EuiTabs` consumers render content themselves, so assert on that content directly.
