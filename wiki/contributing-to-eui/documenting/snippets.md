# Snippets

Snippets are short and easily copy-pastable examples of component usage. They are viewable next to the "Demo JS/TS" tab.

## When to include a snippet

- Does this snippet provide the consumer with everything it needs for the component to work?
- Does this snippet provide the details of a specific object the component needs to work?
- If it doesn't provide either and the whole demo JS is needed for the component to work, then it's probably best to not add a snippet.

## Guidelines & examples

- Use descriptive JS variables in place of **consumer generated** strings, functions, states and node prop types.
- All other props, like enums, should be written with proper value types.

```jsx
<EuiPopover
  id={popoverId}
  button={button}
  isOpen={isPopoverOpen}
  closePopover={closePopover}
  anchorPosition="downLeft"
>
  <!-- Popover content -->
</EuiPopover>
```

- If the demo code provides lots of examples, this is probably mostly for us maintainers to manage all the different states. However, **the consumer really just needs a single basic snippet**. In some cases, you can add a second one with the **most commonly used props**. The basic example should always come first.

```jsx
<EuiLink href="#"><!-- Link text --></EuiLink>
```

```jsx
<EuiLink href="#" color="success">
  <!-- Colored link text -->
</EuiLink>
```

- Use HTML comments to suggest what the `children` might be.

```jsx
<EuiText color="danger"><!-- Raw HTML content --></EuiText>
```

- The snippet should illustrate when a component requires its children to be wrapped with a specific tag.

```jsx
<EuiCallOut>
  <p><!-- Content --></p>
</EuiCallOut>
```

- When a component contains a single element child the snippet should illustrate it. Enforce best practices by providing a description.

```jsx
<EuiTitle>
  <h2><!-- Defaults to medium size. Change the heading level based on your context. --></h2>
</EuiTitle>
```

- When a prop receives an array of objects, display only one object and show all the required keys.

```jsx
<EuiSteps
  steps={[
    {
      title: 'Step 1',
      children: <p>Do this first</p>,
    },
  ]}
/>
```
