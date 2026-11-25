# EuiFilePickerObject

Playwright Component Object for [EuiFilePicker](https://eui.elastic.co/docs/components/forms/other/file-picker/).

## Usage

```ts
import { EuiFilePickerObject } from '@elastic/eui-test-helpers';

const upload = new EuiFilePickerObject(page, 'myFilePicker');
await upload.setFiles('fixtures/logo.png');
expect(await upload.getFileNames()).toEqual(['logo.png']);
await expect(upload.prompt).toHaveText('logo.png');
```

Set `data-test-subj` on `<EuiFilePicker>`. EUI spreads it onto the native `<input type="file">`, which the component-type guard verifies. The prompt is a sibling of the input inside `.euiFilePicker` and holds the remove button.

## API

| Member | Description |
|---|---|
| `prompt` | The prompt next to the input. Shows the file name, "N files selected" or the initial prompt. |
| `setFiles(files)` | Pick these files, paths or in-memory payloads, and wait for the picker to show them. Pass several only to a picker with `multiple`. An empty array clears the picker. |
| `getFileNames()` | The names of the picked files, in the order the input holds them. |
| `clear()` | Remove the picked files and wait for the initial prompt to come back. |

## Deliberately excluded

Drag and drop. Playwright sets files on the input directly, which is what the drop does. The remove button is reachable through `selectors.filePicker.CLEAR_BUTTON_SELECTOR` when a test needs to click it. `clear()` empties the input directly.
