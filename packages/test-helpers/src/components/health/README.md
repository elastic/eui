# EuiHealthObject

Playwright Component Object for [EuiHealth](https://eui.elastic.co/docs/components/display/health/).

## Usage

```ts
import { EuiHealthObject } from '@elastic/eui-test-helpers';

const health = new EuiHealthObject(page, 'myHealth');
expect(await health.getText()).toBe('Healthy');
```

Set `data-test-subj` on `<EuiHealth>`. EUI spreads it onto the wrapper `<div>`, which the component-type guard verifies.

## API

| Member | Description |
|---|---|
| `getText()` | The status text next to the dot. |

## Deliberately excluded

`color`. The dot is an `EuiIcon` whose color is an Emotion style with no stable attribute. Assert on the text, which is what the color stands for.
