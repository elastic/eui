# EuiCallOutObject

Playwright Component Object for [EuiCallOut](https://eui.elastic.co/docs/components/display/callout/).

## Usage

```ts
import { EuiCallOutObject } from '@elastic/eui-test-helpers';

const callOut = new EuiCallOutObject(page, 'myCallOut');
expect(await callOut.getColor()).toBe('warning');
expect(await callOut.getTitle()).toBe('Index is read only');
```

Set `data-test-subj` on `<EuiCallOut>`. EUI puts it on the panel root and derives `<subj>__message`, `<subj>__content` and `<subj>__actions` for the inner blocks. The root lookup matches whole tokens, so those derived values are not mistaken for the root.

## API

| Member | Description |
|---|---|
| `getTitle()` | The title text, or an empty string without a `title`. |
| `getText()` | The `text` block, or an empty string without a `text`. |
| `getColor()` | The color variant read from the root class: `primary`, `success`, `warning` or `danger`. |
| `dismissButton` | `Locator` for the dismiss button, found by its test subj or its cross icon so a `dismissButtonProps` test subj override still works. Zero elements without `onDismiss`. |
| `dismiss()` | Click the dismiss button. What follows is the consumer's `onDismiss`, nothing is asserted. |

## Deliberately excluded

Custom `children` and `actions` are consumer content, use `locator` to reach them. The `announceOnMount` live region renders a second, off-screen copy of the content under `role="status"`, it is outside the root and does not affect this object.
