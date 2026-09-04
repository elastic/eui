# EuiAccordionObject

Playwright Component Object for [EuiAccordion](https://eui.elastic.co/docs/components/containers/accordion/).

## Usage

```ts
import { EuiAccordionObject } from '@elastic/eui-test-helpers';

const accordion = new EuiAccordionObject(page, 'myAccordion');
await accordion.trigger.click();
await expect(accordion.trigger).toHaveAttribute('aria-expanded', 'true');
```

Set `data-test-subj` on the `<EuiAccordion>` itself, which the component-type guard verifies.

## API

| Member | Description |
|---|---|
| `trigger` | `Locator` for the trigger button. `aria-expanded` on it reflects open state synchronously, so a retrying assertion on it is all that's needed, no wait or poll. |
| `content` | `Locator` for the children wrapper, scoped to this instance. |

## Deliberately out of scope

- **Waiting for the open/close transition**: while closed, `content` is `height: 0` with `opacity: 0`, so Playwright already treats anything inside it as not visible and auto-waits. Only the brief opening transition (height and opacity animating together) is not fully covered by Playwright's actionability checks. No consumer has needed a wait for it yet, so none is exposed.
