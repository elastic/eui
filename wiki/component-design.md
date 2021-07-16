# Component Design

For information on how to develop components, see the [component development docs][component-development].

We use a number of patterns and conventions throughout our components.

## Size enums

We use abbreviations to refer to sizes, e.g. `xxl`, `xl`, `l`, `m`, `s`, `xs`, and `xxs`.

## Enums and maps

We define objects which map enums to corresponding values, typically CSS classes. For example,
here's how we would define maps for colors and sizes in a fictional `MegaMenu` component.

```tsx
// We first define the enum values as a type
type EuiMegaMenuColor = 'primary' | 'success' | 'warning' | 'danger';

// Then we define the map for getting the appropriate class for each enum value.
const colorToClassNameMap: { [color in EuiMegaMenuColor]: string } = {
  primary: 'euiMegaMenu--primary',
  success: 'euiMegaMenu--success',
  warning: 'euiMegaMenu--warning',
  danger: 'euiMegaMenu--danger',
};

// Then we generate the enums themselves by pulling out the keys.
export const COLORS = keysOf(colorToClassNameMap);
```

This is how we define the prop types using the enums we generated in Typescript:

```tsx
// We can refer to the enums objects for the prop types.
export type EuiMegaMenuProps = {
  color: EuiMegaMenuColor;
  isDisabled?: boolean;
  /* ... */
};
```

For the default props we can just specify the enum values we want to use in the constructor and then use the maps to generate the className for the component:

```tsx
export const EuiMegaMenu: FunctionComponent<EuiMegaMenuProps> = ({
  children,
  className,
  color = 'primary',
  className,
  isDisabled = false,
  ...rest
}) => {
  const classes = classNames(
    'euiMegaMenu',
    colorToClassNameMap[color],
    className,
    {
      'euiMegaMenu--isDisabled': isDisabled,
    },
  );

  /* ... */
}
```

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

## Naming props

### Enums

String literals should be used wherever possible and prioritized over booleans. This allows for the most extensibility when it comes to adding more features/options in the future. For example, instead of the prop `isHorizontal: boolean` use `layout: 'horizontal' | 'vertical'`.

### Booleans

Generally, boolean props should have an `is` prefix, e.g. `isPlaceholder` or `isReadOnly`. The exception to this is when the prop matches an existing HTML attribute such as `disabled`; to avoid confusion the prop name should align with the HTML specification. Mirroring the attributes this way makes the most sense when the component is a thin wrapper around an existing HTML element, e.g. EuiButton -> `<button>` and EuiRadio ->   `<input type="radio">`.

### Event handlers

All event handlers should take the form `onEvent` and accurately describe when it will be called. e.g. `onClick` indicates the handler is called when the component is clicked, but if there is more granularity the handler should reflect that with `onItemClick`, `onRowClick`, etc.

## Common and required props

Try to leverage the `children` prop wherever possible. This will create a simpler more uniform
API throughout our components.

We also [require some props](../src/test/required_props.ts) to be supported by all components, as
reflected in our tests; for example, `className`. These are easily added via the `CommonProps` mentioned above.

[component-development]: component-development.md
