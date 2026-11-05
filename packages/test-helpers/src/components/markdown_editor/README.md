# EuiMarkdownEditorObject

Playwright Component Object for [EuiMarkdownEditor](https://eui.elastic.co/docs/components/editors-and-syntax/markdown-editor/).

## Usage

```ts
import { EuiMarkdownEditorObject } from '@elastic/eui-test-helpers';

const editor = new EuiMarkdownEditorObject(page, 'myEditor');
await editor.setValue('# Hello');
expect(await editor.getValue()).toBe('# Hello');
```

Set `data-test-subj` on `<EuiMarkdownEditor>`. EUI spreads it onto the wrapper, which the component-type guard verifies.

## API

| Member | Description |
|---|---|
| `textArea` | `Locator` for the `<textarea>` holding the markdown source. |
| `preview` | `Locator` for the rendered markdown, only in the DOM while previewing. |
| `setValue(text)` | Replace the markdown source. Switches back to editing first if needed. |
| `getValue()` | The current markdown source. |
| `isPreviewing()` | Whether the rendered preview is shown instead of the textarea. |
| `togglePreview()` | Switch between the textarea and the rendered preview. |

## Deliberately excluded

The formatting toolbar buttons and the drop zone. They are consumer facing (`toolbarProps`, `uiPlugins`, `dropHandlers`), so drive them with `locator` and the `euiMarkdownEditorToolbarButton*` test subjects EUI sets.
