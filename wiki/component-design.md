# Component Design

For information on how to develop components, see the [component development docs][component-development].

We use a number of patterns and conventions throughout our components.

## Size enums

We use abbreviations to refer to sizes, e.g. `xxl`, `xl`, `l`, `m`, `s`, `xs`, and `xxs`.

## Enums and maps

We define objects which map enums to corresponding values, typically CSS classes. For example,
here's how we would define maps for colors and sizes in a fictional `MegaMenu` component.

```jsx
// We first define the map for getting the appropriate class for each enum value.
const colorToClassNameMap = {
  primary: 'euiMegaMenu--primary',
  secondary: 'euiMegaMenu--secondary',
  warning: 'euiMegaMenu--warning',
  danger: 'euiMegaMenu--danger',
};

// Then we generate the enums themselves by pulling out the keys.
export const COLORS = Object.keys(colorToClassNameMap);

// We can repeat this pattern for other things, e.g. sizes.
const sizeToClassNameMap = {
  s: 'euiMegaMenu--small',
  l: 'euiMegaMenu--large',
};

export const SIZES = Object.keys(sizeToClassNameMap);
```

We use the maps to generate the classname for the component:

```jsx
export const MegaMenu = ({
  children,
  className,
  color,
  size,
  className,
  isDisabled,
  ...rest
}) => {
  const classes = classNames(
    'euiMegaMenu',
    colorToClassNameMap[color],
    sizeToClassNameMap[size],
    className,
    {
      'euiMegaMenu--isDisabled': isDisabled,
    },
  );

  /* ... */
```

This is how we define the prop types using the enums we generated:

```jsx
// We can refer to the enums objects for the prop types.
EuiMegaMenu.propTypes = {
  color: PropTypes.oneOf(COLORS),
  size: PropTypes.oneOf(SIZES),
  /* ... */
};

// For the default props we can just specify the enum values we want to use.
EuiMegaMenu.defaultProps = {
  color: 'primary',
  size: 'l',
  /* ... */
};
```

## Pass-through props

To give the consumer as much flexibility as possible we use the destructuring assignment to pull
expected props out of the received props and pass `...rest` to one of the elements in the
`render()` method. This element is typically the root element, though in rare cases another element
makes more sense.

The main benefit behind this practice is that the consumer can specify any of
the [DOM attributes](https://reactjs.org/docs/dom-elements.html) supported by React, including
custom ones with the `data-` prefix.

```jsx
export const EuiMegaMenu = ({
  children,
  className,
  color,
  size,
  className,
  isDisabled,
  ...rest
}) => {

  // Anything else specified by the consumer will be applied to the div as a DOM attribute.
  return (
    <div
      {...rest}
    >
    </div>
  );

  /* ... */
```

## Common and required props

Try to leverage the `children` prop wherever possible. This will create a simpler more uniform
API throughout our components.

We also [require some props](../src/test/reqiured_props.js) to be supported by all components, as
reflected in our tests; for example, `className`.

```jsx
EuiMegaMenu.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
}
```

[component-development]: component-development.md
