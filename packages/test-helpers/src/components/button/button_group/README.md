# EuiButtonGroupObject

Playwright Component Object for [EuiButtonGroup](https://eui.elastic.co/docs/components/navigation/buttons/group/).

## Usage

```ts
import { EuiButtonGroupObject } from '@elastic/eui-test-helpers';

const group = new EuiButtonGroupObject(page, 'myButtonGroup');
await group.select('Option two');
expect(await group.getSelected()).toEqual(['Option two']);
```

Set `data-test-subj` on `<EuiButtonGroup>`. EUI spreads it onto the group element, which the component-type guard verifies. Buttons are addressed by their exact accessible name, so `aria-label` on `EuiButtonIcon` children and the hidden label of `isIconOnly` options both work. Selection is read from `aria-pressed`, so the object works with the `options` API and the children API alike.

## API

| Member | Description |
|---|---|
| `buttons` | `Locator` for all buttons, in order. |
| `button(label)` | `Locator` for the button with exactly this label. |
| `getOptions()` | The accessible labels of all buttons, in order. |
| `select(label)` | Click the button with this label unless it is already selected, then wait for it. |
| `deselect(label)` | Click the selected button with this label to deselect it, `multi` type only. |
| `getSelected()` | The labels of the selected buttons, in order. One at most with `single` type. |

## Deliberately excluded

Tooltips and disabled state. Assert on them through `button(label)`. `EuiFilterGroup` is a different component, see `EuiFilterButtonObject`.
