# EuiColorPickerObject

Playwright Component Object for [EuiColorPicker](https://eui.elastic.co/docs/components/forms/color-picker/).

## Usage

```ts
import { EuiColorPickerObject } from '@elastic/eui-test-helpers';

const colorPicker = new EuiColorPickerObject(page, 'myColorPicker');
await colorPicker.locator.click();
await colorPicker.swatches.first().click();
```

Set `data-test-subj` on `EuiColorPicker` itself. `EuiColorPicker` renders it on its anchor as `euiColorPickerAnchor <yourSubj>`, a compound value the shared root lookup matches by token. Without that, `getByTestId` on your own subj finds nothing.

## API

| Member | Description |
|---|---|
| `panel` | `Locator` for the popover panel. Rendered in a portal, so it is found on the page, not under the anchor. Resolves to zero elements while closed, and gets `data-popover-open="true"` once open. |
| `swatches` | `Locator` for the swatch buttons inside `panel`. |

`locator` is the anchor, a plain text input. Click it to open the picker, and use Playwright's own `inputValue()`/`fill()` to read or set the color.

## Deliberately out of scope

- **A custom `button` prop**: only the default text-input anchor has a class the component-type guard can rely on. A custom button has none, so it is not supported.
- **`open()`/`close()` methods**: `EuiPopover` only sets `aria-expanded`/`aria-controls` on button-like toggles, and the default anchor is an input, so the signal `EuiPopoverObject` relies on is missing. Click `locator` and assert on `panel` instead.
- **Several pickers open at once**: `panel` is found by class on the page, so two open pickers would both match. No consumer has needed this.
