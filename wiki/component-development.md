# Component development

For information on how to design components, see the [component design docs][component-design].

Before working with EUI components or creating new ones, you may want to run a local server for the [documentation site][docs]. This is where we demonstrate how the components in our design system work.

## Launching the documentation server

To view interactive documentation, start the development server using the command below.

```shell
yarn
yarn start
```

Once the server boots up, you can visit it on your browser at: [http://localhost:8030/](http://localhost:8030/). The development server watches for changes to the source code files and will automatically recompile the components for you when you make changes.

## Creating components

There are four steps to creating a new component:

1. Create the SCSS for the component in `src/components`
2. Create the React portion of the component
3. Write tests
4. Document it with examples in `src-docs`

You can do this using Yeoman, or you can do it manually if you prefer.

- [Yeoman component creation guide][docs-yeoman]
- [Manual component creation guide][docs-manual]

## Testing the component

### Running tests

`yarn test-unit` runs the Jest unit tests once.

`yarn test-unit button` will run tests with "button" in the spec name.

You can pass other [Jest CLI arguments](https://jestjs.io/docs/cli). For example:

`yarn test-unit -u` will update your snapshots. 
Note: if you are experiencing failed builds in Jenkins related to snapshots, then try clearing the cache first `yarn test-unit --clearCache`.

`yarn test-unit --watch` watches for changes and runs the tests as you code.

`yarn test-unit --coverage` generates a code coverage report showing you how
fully-tested the code is, located at `reports/jest-coverage`.

### Writing tests

Refer to the [testing guide](testing.md) for guidelines on writing and designing your tests.

Refer to the [automated accessibility testing guide](automated-accessibility-testing.md) for info more info on those.

### Testing dev features in local Kibana

Note that `yarn link` currently does not work with Kibana. You'll need to manually pack and insert it into Kibana to test locally.

#### In EUI run:

```bash
yarn build-pack
```

This will create a `.tgz` file with the changes in your EUI directory. At this point you can move it anywhere.

#### In Kibana:

Point the `package.json` file in Kibana to that file: `"@elastic/eui": "/path/to/elastic-eui-xx.x.x.tgz"`. Then run the following commands at Kibana's root folder:

```bash
yarn kbn bootstrap --no-validate && yarn start
```

* The `--no-validate` flag is required when bootstrapping with a `.tgz`.
  * Change the name of the `.tgz` after subsequent `yarn build && yarn pack` steps (e.g., `elastic-eui-xx.x.x-1.tgz`, `elastic-eui-xx.x.x-2.tgz`). This is required for `yarn` to recognize new changes to the package.
* Running Kibana with `yarn start` ensures it starts in dev mode and doesn't use a previously cached version of EUI.

## Principles

### Logically-grouped components

If a component has subcomponents (`<EuiToolBar>` and `<EuiToolBarSearch>`), tightly-coupled components (`<EuiButton>` and `<EuiButtonGroup>`), or you just want to group some related components together (`<EuiTextInput>`, `<EuiTextArea>`, and `<EuiCheckBox>`), then they belong in the same logical grouping. In this case, you can create additional SCSS files for these components in the same component directory.

### Writing CSS

Refer to the [SASS page][sass] of our documentation site for a guide to writing styles.

[component-design]: component-design.md
[docs]: https://elastic.github.io/eui/
[docs-yeoman]: creating-components-yeoman.md
[docs-manual]: creating-components-manually.md
[sass]: https://elastic.github.io/eui/#/guidelines/sass

## TypeScript definitions

### Pass-through props

Many of our components use `rest parameters` and the `spread` operator to pass props through to an underlying DOM element. In those instances the component's TypeScript definition needs to properly include the target DOM element's props.

A `Foo` component that passes `...rest` through to a `button` element would have the props interface

```ts
// passes extra props to a button
interface FooProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  title: string
}
```

Some DOM elements (e.g. `div`, `span`) do not have attributes beyond the basic ones provided by all HTML elements. In these cases there isn't a specific `*HTMLAttributes<T>` interface, and you should use `HTMLAttributes<HTMLDivElement>`.

```ts
// passes extra props to a div
interface FooProps extends HTMLAttributes<HTMLDivElement> {
  title: string
}
```

If your component forwards a `ref` through to an underlying element, the interface needs to be further extended with `DetailedHTMLProps`

```ts
// passes extra props and forwards the ref to a button
interface FooProps extends DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
  title: string
}
```

### forwardRef

React's `forwardRef` should be used to provide access to the component's outermost element. We impose two additional requirements when using `forwardRef`:

1. use `forwardRef` instead of `React.forwardRef`, otherwise [react-docgen-typescript](https://github.com/styleguidist/react-docgen-typescript/) does not understand it and the component's props will not be rendered in our documentation
2. the resulting component must have a `displayName`, this is useful when the component is included in a snapshot or when inspected in devtools. There is an eslint rule which checks for this.  

#### Simple forward/pass-through

```tsx
import React, { forwardRef } from 'react';

interface MyComponentProps {...}

export const MyComponent = forwardRef<
  HTMLDivElement, // type of element or component the ref will be passed to
  MyComponentProps // what properties apart from `ref` the component accepts
>(
  (
    { destructure, props, here, ...rest },
    ref
  ) => {
    return (
      <div ref={ref} {...rest}>
        ...
      </div>
    );
  }
);

MyComponent.displayName = 'MyComponent';
```

#### Combining with additional refs

Sometimes an element needs to have 2+ refs passed to it, for example a component interacts with the same element the forwarded ref needs to be given to. For this EUI provides a `useCombinedRefs` hook:

```tsx
import React, { forwardRef, createRef } from 'react';
import { useCombinedRefs } from '../../services';

interface MyComponentProps {...}

export const MyComponent = forwardRef<
  HTMLDivElement, // type of element or component the ref will be passed to
  MyComponentProps // what properties apart from `ref` the component accepts
>(
  (
    { destructure, props, here, ...rest },
    ref
  ) => {
    const localRef = useRef<HTMLDivElement>(null);
    const combinedRefs = useCombinedRefs([ref, localRef]);
    return (
      <div ref={combinedRefs} {...rest}>
        ...
      </div>
    );
  }
);

MyComponent.displayName = 'MyComponent';
```

#### Providing custom or additional data 

Rarely, a component's ref needs to be something other than a DOM element, or provide additional information. In these cases, React's `useImperativeHandle` can be used to provide a custom object as the ref's value. For example, **EuiMarkdownEditor**'s ref includes both its textarea element and the `replaceNode` method to interact with the abstract syntax tree. https://github.com/elastic/eui/blob/v31.10.0/src/components/markdown_editor/markdown_editor.tsx#L331

```tsx
import React, { useImperativeHandle } from 'react';

export const EuiMarkdownEditor = forwardRef<
  EuiMarkdownEditorRef,
  EuiMarkdownEditorProps
  >(
  (props, ref) => {
    ...

    // combines the textarea element & `replaceNode` into a single object, which is then passed back to the forwarded `ref`
    useImperativeHandle(
      ref,
      () => ({ textarea: textareaRef.current, replaceNode }),
      [replaceNode]
    );

    ...
  }
);
```
