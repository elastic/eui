# EuiBadgeObject

Playwright Component Object for [EuiBadge](https://eui.elastic.co/docs/components/display/badge/).

## Usage

```ts
import { EuiBadgeObject } from '@elastic/eui-test-helpers';

const status = new EuiBadgeObject(page, 'myBadge');
expect(await status.getText()).toBe('Active');
await status.click();
```

Set `data-test-subj` on `<EuiBadge>`. EUI spreads it onto the badge element, a `<span>`, or a `<button>` or `<a>` when `onClick` or `href` is set. When `iconOnClick` is combined with `onClick` or `href`, it lands on the inner button instead. The component-type guard accepts both, and `iconButton` resolves from the surrounding `.euiBadge` either way.

## API

| Member | Description |
|---|---|
| `iconButton` | The icon button, present only with `iconOnClick`. |
| `getText()` | The badge text without the icon. |
| `click()` | Click the badge. Fails on a badge without `onClick` or `href`, which is not interactive. |
| `clickIcon()` | Click the icon button of an `iconOnClick` badge. |

## Deliberately excluded

`color`. Named colors are Emotion styles with no stable attribute, custom colors are inline styles. `EuiBetaBadge` is a different component with its own tooltip, use `getByRole` on it. `EuiNotificationBadge` has `EuiNotificationBadgeObject`.
