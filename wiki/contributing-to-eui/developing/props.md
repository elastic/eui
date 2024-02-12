# Component props

Props are the main APIs through which consumers/developers interact with our components. As such, it's important that our props remain as consistent as possible between all components, as something like changing the name of a prop or removing a prop would be considered a breaking change.

## Naming props

### Enums

String literals should be used wherever possible and prioritized over booleans. This allows for the most extensibility when it comes to adding more features/options in the future. For example, use `layout: 'horizontal' | 'vertical'` instead of `isHorizontal: boolean`.

#### Size enums

We use abbreviations to refer to sizes, e.g. `xxl`, `xl`, `l`, `m`, `s`, `xs`, and `xxs`.

#### Typing enums

Enums should typically be declared as an `as const` array.

```tsx
// We first define the enum values as an array
export const COLORS = ['primary', 'success', 'warning', 'danger'] as const;

// We can then refer to the enum array for prop types.
export type EuiComponentProps = {
  color: COLORS[number];
  isDisabled?: boolean;
  /* ... */
};

// We can continue to use the enum array for iteration
const isNamedColor = (color: string) => COLORS.includes(color);
```

### Booleans

Generally, boolean props should have an `is` prefix, e.g. `isPlaceholder` or `isReadOnly`. The exception to this is when the prop matches an existing HTML attribute such as `disabled`; to avoid confusion the prop name should align with the HTML specification. Mirroring the attributes this way makes the most sense when the component is a thin wrapper around an existing HTML element, e.g. EuiButton -> `<button>` and EuiRadio ->   `<input type="radio">`.

### Event handlers

All event handlers should take the form `onEvent` and accurately describe when it will be called. e.g. `onClick` indicates the handler is called when the component is clicked, but if there is more granularity the handler should reflect that with `onItemClick`, `onRowClick`, etc.

## Common and required props

Try to leverage the `children` prop wherever possible. This will create a simpler more uniform
API throughout our components.

We also [require some props](../../../src/test/required_props.ts) to be supported by all components, as
reflected in our tests; for example, `className`. These are easily added via the `CommonProps` mentioned above.

## Pass-through props

To give the consumer as much flexibility as possible we use the destructuring assignment to pull
expected props out of the received props and pass `...rest` to one of the elements in the
`render()` method. This element is typically the root element, though in rare cases another element
makes more sense.

The main benefit behind this practice is that the consumer can specify any of
the [DOM attributes](https://reactjs.org/docs/dom-elements.html) supported by React, including
custom ones with the `data-` prefix.

In Typescript, it makes sense to then extend the props of that element when declaring the component's type. EUI also provides a shortlist of commonly used props like `className`, `aria-label`, and `data-test-subj` that you should extend as well.

```jsx
import { HTMLAttributes, FunctionComponent } from 'react';
import { CommonProps } from '../common';

export type EuiMegaMenuProps = HTMLAttributes<HTMLDivElement> &
  CommonProps & {
    color: EuiMegaMenuColor;
    isDisabled?: boolean;
    /* ... */
  };

export const EuiMegaMenu: FunctionComponent<EuiMegaMenuProps> = ({
  children,
  className,
  color = 'primary',
  size,
  className,
  isDisabled = false,
  ...rest
}) => {

  // Anything else specified by the consumer will be applied to the div as a DOM attribute.
  return (
    <div {...rest}>
      {/* ... */}
    </div>
  );
}
```

The component's TypeScript definition needs to properly include the target DOM element's props. A `Foo` component that passes `...rest` through to a `button` element would have the `HTMLButtonElement` props interface.

```ts
// passes extra props to a button
interface FooProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  title: string
}
```

## Props documentation from Typescript

We use [react-docgen-typescript](https://github.com/styleguidist/react-docgen-typescript/) combined with some custom [props filters](../../../scripts/babel/react-docgen-typescript.js) to automatically generate our Props tab/table from our Typescript component types.

> :warning: [react-docgen-typescript currently has a bug](https://github.com/styleguidist/react-docgen-typescript/issues/395) that does not correctly generate props for all components if a file has multiple components that set a `displayName`. To avoid this bug and broken props tables, keep your component files atomic / limited to 1 major component per file.
