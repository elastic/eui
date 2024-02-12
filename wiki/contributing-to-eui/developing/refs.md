# Component refs

Components should always accept a `ref` prop which should typically pass back the primary underlying native DOM element to the `ref` callback.

However, more complex components (e.g., `EuiDataGrid` and `EuiMarkdownEditor`) may instead pass back [a ref of imperative APIs](#providing-custom-or-additional-data) as a way to control said component.

## forwardRef

React's [`forwardRef`](https://reactjs.org/docs/forwarding-refs.html) should be used to provide access to the component's outermost element. We impose two additional requirements when using `forwardRef`:

1. Use `forwardRef` instead of `React.forwardRef`, otherwise [react-docgen-typescript](https://github.com/styleguidist/react-docgen-typescript/) does not understand it and the component's props table will error in our documentation
2. The resulting component must have a `displayName`, which is useful when the component is included in a snapshot or when inspected in devtools. There is an eslint rule which checks for this.

### Simple forward/pass-through

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

### Combining with additional refs

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

## Providing custom or additional data

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
