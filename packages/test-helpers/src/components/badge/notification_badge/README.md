# EuiNotificationBadgeObject

Playwright Component Object for [EuiNotificationBadge](https://eui.elastic.co/docs/components/display/badge/).

## Usage

```ts
import { EuiNotificationBadgeObject } from '@elastic/eui-test-helpers';

const unread = new EuiNotificationBadgeObject(page, 'myNotificationBadge');
expect(await unread.getCount()).toBe(5);
```

Set `data-test-subj` on `<EuiNotificationBadge>`. EUI spreads it onto the `<span>`, which the component-type guard verifies. The badge inside an `EuiFilterButton` carries no test subject of its own, reach it through `EuiFilterButtonObject.notificationBadge`.

## API

| Member | Description |
|---|---|
| `getText()` | The badge text. |
| `getCount()` | The badge text as a number, `NaN` when it is not one. |

## Deliberately excluded

`color` and `size`. They are Emotion styles with no stable attribute.
