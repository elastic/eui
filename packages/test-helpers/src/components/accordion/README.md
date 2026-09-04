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

- **Waiting for the open/close transition**: `content` fades in via `opacity`, which Playwright's own actionability checks do not account for. No consumer has needed this yet; assert on `trigger`'s `aria-expanded` before acting on `content` if timing matters.
