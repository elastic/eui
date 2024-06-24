# Storybook code-snippet addon

## Description

> This is an internal EUI Storybook addon which adds code snippets to EUI stories. 

The purpose of this addon is to improve the developer experience by providing code snippets with dynamically updated props based on the story controls. 

This addon is provided as additional story panel next to the available panels for "Controls", "Actions" and "Interactions".

The basis for the code snippet generation is based on Storybooks [`Source`](https://storybook.js.org/docs/writing-docs/doc-blocks#source) block. The internally used [`jsxDecorator`](https://github.com/storybookjs/storybook/blob/2bff7a1c156bbd42ab381f84b8a55a07694e7e53/code/renderers/react/src/docs/jsxDecorator.tsx) file was copied and then adjusted and extended to fit the specific needs for EUI. The main functionality to generate a jsx string from react elements comes from the [`react-element-to-jsx-string`](https://github.com/algolia/react-element-to-jsx-strin) package.

## Concept

The `code-snippet` addon follows the [official guides](https://storybook.js.org/docs/addons/writing-addons) to create a Storybook addon. The only real difference is that this addon is not released separately but simply added and used internally.

The addon is defined and registered in `manager.ts` this ensures it's available in Storybook. Storybook handles most of the rendered output (e.g. tab list and tab buttons), the only custom content is what is passed via the `render` key on the addon config. This content will be output as child of the addon panel that Storybook renders.

```ts
// Register a addon
addons.register(ADDON_ID, (api: API) => {
  // Register a panel
  addons.add(PANEL_ID, {
    type: types.PANEL,
    title: 'Code Snippet',
    match: ({ viewMode }) => viewMode === 'story',
    render: Panel,
  });
});
```

The main code snippet generation functionality is done in `jsx_decorator.tsx`. It's used as a decorator for every story in `preview.tsx`. 


```ts
import { customJsxDecorator } from './addons/code-snippet/decorators/jsx_decorator';

const preview: Preview = {
  decorators: [
    customJsxDecorator,
  ]
}
```

This decorator generates the code snippet as a `string` and sends it via Storybooks [Channel events](https://storybook.js.org/docs/addons/addons-api#usechannel) to the custom addon panel which outputs the code string to the panel which updates its state on receiving the event ([code](https://github.com/elastic/eui/blob/03d20559b4262d6a18de5fc8edf4ec3854753995/packages/eui/.storybook/addons/code-snippet/components/panel.tsx#L58)).

```ts
channel.emit(EVENTS.SNIPPET_RENDERED, {
    id,
    source: jsx,
    args: unmappedArgs,
});
```

![Dimensions](https://github.com/elastic/eui/assets/44670957/9bb087f5-82bd-4b55-8264-5decc0a36cff)

## Differences to the Storybook `jsxDecorator`

The main changes/additions to the original `jsxDecorator` from Storybook are to ensure the generator outputs clean and EUI relevant code snippets.

Additional features added:
- renames Emotion wrappers to the actual component name (whenever we use `css` on a component in a story it will be an Emotion-wrapped component)
- renames stateful wrappers that start with the wording Stateful (requires us to follow an agreed naming convention)
- removes obsolete fragment wrappers (but keeps required ones)
- removes story specific wrappers (e.g. layout or styling)
- keep related wrappers (e.g. parent & subcomponent or related by name)
- resolves any other unexpected wrapper we might add to structure complex stories
- renames internal component names that start with _underscore (e.g. `<_Component>` is changed to `<Component>`)
- ensures `css` attribute is output properly and not as resolved Emotion object
- ensures boolean props are output in a meaningful way (generally as shorthand but it keeps specifically defined `false` values where `false` has a meaning)
- ensures project specific formatting via `prettier`
- supports adding manual code snippets


## How it works

The generation happens in different stages:

1. `pre-conversion`: determine what react element should be passed to react-element-to-jsx-string and with which options
2. `conversion`: pass react elements to react-element-to-jsx-string
3. `post-conversion`: do additional replacements on the returned string
4. `formatting`: format the result using prettier

### 1. Pre-conversion

Before passing a React element to the `react-element-to-jsx-string` package functionality, we first determine:

1. Should a story be skipped? ([code](https://github.com/elastic/eui/blob/03d20559b4262d6a18de5fc8edf4ec3854753995/packages/eui/.storybook/addons/code-snippet/decorators/utils.ts#L196))
    - a story may be skipped:
        - by using `parameters.codeSnippet.skip` ([example](https://github.com/elastic/eui/blob/03d20559b4262d6a18de5fc8edf4ec3854753995/packages/eui/src/components/drag_and_drop/drag_drop_context.stories.tsx#L31))
        - by returning an anonymous function from story `render`
2. Is a manual code snippet provided? ([code](https://github.com/elastic/eui/blob/03d20559b4262d6a18de5fc8edf4ec3854753995/packages/eui/.storybook/addons/code-snippet/decorators/jsx_decorator.tsx#L100)) ([example](https://github.com/elastic/eui/blob/03d20559b4262d6a18de5fc8edf4ec3854753995/packages/eui/src/components/text_diff/text_diff.stories.tsx#L24))

3. What React element should be used? (only a single React element can be passed to `react-element-to-jsx-string`) ([code](https://github.com/elastic/eui/blob/03d20559b4262d6a18de5fc8edf4ec3854753995/packages/eui/.storybook/addons/code-snippet/decorators/jsx_decorator.tsx#L146))

    1. Check if the outer element should be resolved due to manual flagging via `parameters.codeSnippet.resolveChildren`. The children would be used instead. ([code](https://github.com/elastic/eui/blob/03d20559b4262d6a18de5fc8edf4ec3854753995/packages/eui/.storybook/addons/code-snippet/decorators/render_jsx.tsx#L214)).
    2. We check the story react element for some base conditions ([code](https://github.com/elastic/eui/blob/03d20559b4262d6a18de5fc8edf4ec3854753995/packages/eui/.storybook/addons/code-snippet/decorators/render_jsx.tsx#L226)) for which we return the current element. Otherwise we move to the elements `children`:
        - Is the element the story component?
        - Is the element the stories parent? (We usually want to show Parent & subcomponents together)
        - Is the element a subcomponent?
        - Is the element a stateful wrapper? (To add interactivity we usually wrap stories in stateful wrappers that are not relevant for the snippet)
        - Is the element a React.Fragment? (where obsolete we would want to remove wrapping fragments)
    3. If the element is an array we resolve for the children ([code](https://github.com/elastic/eui/blob/03d20559b4262d6a18de5fc8edf4ec3854753995/packages/eui/.storybook/addons/code-snippet/decorators/render_jsx.tsx#L235)).

4. Once a single React element is determine the node and all its props (+ children) are recursively checked and resolved to ensure expected output:

    - skip any obsolete React.Fragments (returning children instead) ([code](https://github.com/elastic/eui/blob/03d20559b4262d6a18de5fc8edf4ec3854753995/packages/eui/.storybook/addons/code-snippet/decorators/render_jsx.tsx#L330))
    - ensure Emotion `css` is resolved and reversed as Emotion transforms the input syntax to an Emotion style object. (e.g. resolve `css={({ euiTheme }) => ({})}`) ([code](https://github.com/elastic/eui/blob/03d20559b4262d6a18de5fc8edf4ec3854753995/packages/eui/.storybook/addons/code-snippet/decorators/render_jsx.tsx#L357))
    - ensure euiTheme tokens are output as variables (e.g. `someProp=euiTheme.colors.lightShade`) - This step adds the variable in special markes that are removed later. This is to prevent `react-element-to-jsx-string` from assuming a type and formatting unexpectedly ([code](https://github.com/elastic/eui/blob/03d20559b4262d6a18de5fc8edf4ec3854753995/packages/eui/.storybook/addons/code-snippet/decorators/render_jsx.tsx#L400))
    - ensure `style` attribute is applied ([code](https://github.com/elastic/eui/blob/03d20559b4262d6a18de5fc8edf4ec3854753995/packages/eui/.storybook/addons/code-snippet/decorators/render_jsx.tsx#L468))
    - resolve arrays (this outputs e.g. `someProp={[<SomeComponent />, <SomeOtherComponent />]}` instead of `[]`) ([code](https://github.com/elastic/eui/blob/03d20559b4262d6a18de5fc8edf4ec3854753995/packages/eui/.storybook/addons/code-snippet/decorators/render_jsx.tsx#L495))
    - resolve objects (e.g. ensures output like `{ text: 'foobar' color: 'green' }`) ([code](https://github.com/elastic/eui/blob/03d20559b4262d6a18de5fc8edf4ec3854753995/packages/eui/.storybook/addons/code-snippet/decorators/render_jsx.tsx#L504))
    - resolve class instances used as values to functions ([code](https://github.com/elastic/eui/blob/03d20559b4262d6a18de5fc8edf4ec3854753995/packages/eui/.storybook/addons/code-snippet/decorators/render_jsx.tsx#L518))
    - [_todo_] resolve render functions

### 2. Conversion from React element to string

Once the React element is properly checked and resolved according to expected output needs, it can be passed to the functionality from `react-element-to-jsx-string` which will generate a jsx string based on the React element. ([code](https://github.com/elastic/eui/blob/03d20559b4262d6a18de5fc8edf4ec3854753995/packages/eui/.storybook/addons/code-snippet/decorators/render_jsx.tsx#L249))

```tsx
// example output
<EuiFlexItem
  component="div"
  css={{
    backgroundColor: 'rgba(0, 119, 204, 0.1)'
  }}
  grow={true}
>
  Flex item
</EuiFlexItem>
```

### 3. Post-conversion cleanup

The returned string of the conversion is then cleaned to ensure:

- rename internal Components (e.g. `<_Component>` to `<Component>`) ([code](https://github.com/elastic/eui/blob/03d20559b4262d6a18de5fc8edf4ec3854753995/packages/eui/.storybook/addons/code-snippet/decorators/render_jsx.tsx#L256))
- rename necessary React.Fragment to shorthand (e.g. `<React.Fragment>` to `<>`) [code](https://github.com/elastic/eui/blob/03d20559b4262d6a18de5fc8edf4ec3854753995/packages/eui/.storybook/addons/code-snippet/decorators/render_jsx.tsx#L277)
- ensure boolean value shorthand by manually filtering out values of `true` ([code](https://github.com/elastic/eui/blob/03d20559b4262d6a18de5fc8edf4ec3854753995/packages/eui/.storybook/addons/code-snippet/decorators/render_jsx.tsx#L290))
    - this is manually handled and not by `react-element-to-jsx-string` because we want to keep some occurrences of `false` values when they have meaning (e.g. `<EuiFlexItem grow={false}>`)
- replace variable markers that were added in "1: Pre-conversion" ([code](https://github.com/elastic/eui/blob/03d20559b4262d6a18de5fc8edf4ec3854753995/packages/eui/.storybook/addons/code-snippet/decorators/render_jsx.tsx#L301))
- remove obsolete function naming ([code](https://github.com/elastic/eui/blob/03d20559b4262d6a18de5fc8edf4ec3854753995/packages/eui/.storybook/addons/code-snippet/decorators/render_jsx.tsx#L314))


### 4. Final Formatting

To ensure the formatting is correct after adjusting the string returned from `react-element-to-jsx-string` and to align it with the EUI projects formatting rules, we run `prettier` on the string as a final step. ([code](https://github.com/elastic/eui/blob/03d20559b4262d6a18de5fc8edf4ec3854753995/packages/eui/.storybook/addons/code-snippet/decorators/utils.ts#L207))

## Options

Currently there are a few addon specific parameter options added that can be used under the key `codeSnippet` in the parameters config key.

```ts
// meta or story config
const meta = {
  title: 'Navigation/EuiButton',
  component: EuiButton,
  parameters: {
    codeSnippet: {
       // will skip code snippet generation for the component or story
      skip: true,
      // Useful for complex story composition wrappers (using the story component as 
      // nested child and not as direct return for `render`).
      // It will skip the outer story wrapper and return the code snippet for its children
      // instead. See the story for `EuiHeader/Multiple Fixed Headers` as an example.
      resolveChildren: true,
      // Useful when the story outputs additional contnt that should not be included in the
      // snippet and instead only the actual story component should be output as snippet.
      resolveStoryElementOnly: true,
    }
  }
}
```

## Additional functionality

### Manual code snippets

Instead of using the automatic code snippet generation, we can also provide a manual snippet which will be output instead. This is especially useful when the story content is not actually a component (e.g. a hook). You can see an example of this for the story of `useEuiTextDiff`.

To add the story args to the code snippet, add the defined marker `{{STORY_ARGS}}` to the snippet string. This marker will be replaced automatically with the current story args. If the args should be spread on the root component use `{{...STORY_ARGS}}` instead.

```ts
// {{STORY_ARGS}}
parameters: {
    codeSnippet: {
      snippet: `
      const [rendered, textDiffObject] = useTextDiff({{STORY_ARGS}})
      `,
    },
}

// {{...STORY_ARGS}}
parameters: {
    codeSnippet: {
      snippet: `
      <SomeComponent {{...STORY_ARGS}}) />
      `,
    },
}
```

🚧 More will follow soon 🚧


## Limitations

1. Currently it's not yet supported to resolve `"render functions"` (either used as children or as any prop value). Components that make use of render functions (specifically for children) are currently (manually) skipped via `parameters.codeSnippet.skip: true` until support is added.

2. Currently the addon uses Storybooks `SyntaxHighlighter` component to output the code snippets. This works generally well but seems to have trouble properly detecting and styling code parts for large snippets. This results in some partially uncolored snippets. Using EUI components does currently not work just out of the box as there seem to be issues with applying Emotion correctly.