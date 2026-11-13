# EuiEmptyPromptObject

Playwright Component Object for [EuiEmptyPrompt](https://eui.elastic.co/docs/components/display/empty-prompt/).

## Usage

```ts
import { EuiEmptyPromptObject } from '@elastic/eui-test-helpers';

const prompt = new EuiEmptyPromptObject(page, 'noResults');
expect(await prompt.getTitle()).toBe('No services available');
await prompt.clickAction('Add data');
```

Set `data-test-subj` on `<EuiEmptyPrompt>`. EUI spreads it onto the panel, which the component-type guard verifies.

## API

| Member | Description |
|---|---|
| `footer` | `Locator` for the footer, absent without `footer`. |
| `action(name)` | `Locator` for the action with exactly this accessible name, a button or a link. |
| `getTitle()` | The title text, or an empty string without `title`. |
| `getBody()` | The body text, or an empty string without `body`. |
| `getActions()` | The labels of the actions, in order, for a single action and for an array. |
| `clickAction(name)` | Click the action with this name. What follows is up to the consumer. |

## Deliberately excluded

`icon`, `color` and `layout`. They are presentation, assert on them through `locator` if a test needs to. Links inside `body` are content, not actions, reach them through `locator`.
