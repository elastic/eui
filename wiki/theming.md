## How EUI theming works

EUI can be easily themed by overwriting the [global styling](https://github.com/elastic/eui/tree/master/src/global_styling)
variables. Currently we maintain the following themes:

* theme_light (the default EUI theme)
* theme_dark (the same theme in dark)

Each of these themes (outside of the default theme_light one) simply include variable
overwrites that adjust colors and sizing to fit the needs of that theme.

## How to create and test a theme

#### Set up your Sass

1. Create a `src/themes/my_theme_name/` directory.
2. Add any `.scss` files you need for your theme in this folder (Ex: `src/themes/my_theme_name/my_theme_color.scss`).
3. Duplicate `src/theme_light.scss` and call it `src/my_theme_name.scss`.
4. Import your variables into the top of this file, making sure the global_variables and
components load after it.

```sass
// These are variable overwrites used only for this theme.
@import 'themes/my_theme_name/my_theme_name_sizes';
@import 'themes/my_theme_name/my_theme_name_colors';

// Global styling
@import 'global_styling/index';

// Components
@import 'components/index';
```

#### Make your theme available in the docs

Lastly, make sure to include your theme in the /src-docs/index.js file so that it's available
through the theme selector.

## Theming tips

Touch the least amount of variables possible. By nature EUI is very rigid. You shouldn't need
much to make drastic changes to color. Most themes are less then a dozen variable overwrites in total.

* In general you should only overwrite variables contained in the `src/global_styling` folder.
* Do not overwrite individual component variables or classnames. Although this is certainly possible
components are much more prone to change and you'll risk breaking your theme.
