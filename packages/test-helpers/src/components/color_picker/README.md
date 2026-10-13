# EuiColorPickerObject

Playwright Component Object for [EuiColorPicker](https://eui.elastic.co/docs/components/forms/color-picker/).

## Usage

```ts
import { EuiColorPickerObject } from '@elastic/eui-test-helpers';

const colorPicker = new EuiColorPickerObject(page, 'myColorPicker');
await colorPicker.setColor('#ff0000');
expect(await colorPicker.getColor()).toBe('#FF0000');
```

Set `data-test-subj` on `EuiColorPicker` itself. `EuiColorPicker` renders it on its anchor as `euiColorPickerAnchor <yourSubj>`, a compound value the shared root lookup matches by token. Without that, `getByTestId` on your own subj finds nothing.

`locator` is the anchor: the default text input, or the element you passed as the `button` prop.

## API

| Member | Description |
|---|---|
| `setColor(color)` | Type `color` into the hex input and verify it was accepted. With the default anchor that input is the anchor itself. With a custom `button` the input is inside the panel, so the picker is opened, filled and closed again. Throws if the panel has no input (`secondaryInputDisplay="none"`). |
| `getColor()` | The color shown in the hex input, uppercased. With a custom `button` the picker is opened to read it and closed again. |
| `panel` | `Locator` for the popover panel. Rendered in a portal, so it is found on the page, not under the anchor. Resolves to zero elements while closed, and gets `data-popover-open="true"` once open. |
| `swatches` | `Locator` for the swatch buttons inside `panel`. |

## Deliberately out of scope

- **`open()`/`close()` methods**: `EuiPopover` only sets `aria-expanded`/`aria-controls` on button-like toggles, and the default anchor is an input, so the signal `EuiPopoverObject` relies on is missing. Click `locator` and assert on `panel` instead.
- **`display="inline"`**: there is no anchor and no popover, the picker renders in place. Use plain Playwright locators.
- **Several pickers open at once**: `panel` is found by class on the page, so two open pickers would both match. No consumer has needed this.
