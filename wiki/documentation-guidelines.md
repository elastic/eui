# Documentation guidelines

## Links

### Linking between EUI doc pages/components

In instances where you would like to provide a link to another EUI component
referenced in a given component description or example, take advantage of `react-router`,
which is used for routing in EUI docs. Aside from the benefit of shorter path names, `react-router` will take the environment into account and provide the correct URL for both development and production locations.

#### Basic example:

```js
import {
  Link,
} from 'react-router';

// ...

Consult the larger <Link to="/guidelines/colors">color guidelines</Link> page
for a better explanation about passing color contrast.
```

### Linking to external resources

When referring to external sites or resources, use EUI components that take an `href` prop, such as `EuiLink`.

#### Basic example:

```js
import {
  EuiLink,
} from '/src/components';

// ...

<EuiLink href="https://github.com/elastic/eui/blob/master/src/global_styling/mixins/_shadow.scss">View the Sass code for shadow mixins</EuiLink>.
```
