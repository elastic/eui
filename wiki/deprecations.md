# Deprecations

## General deprecation guidelines

- For all deprecations, we should retain functionality, but mark them in the EUI docs and add them to the [deprecation schedule issue](https://github.com/elastic/eui/issues/1469).
- EUI performs at-will releases, so our deprecation patterns are based on time rather than release number. We provide at least 3 months time to make upgrades, ideally 6.
- We try as often as possible to make this deprecations non-breaking and will only adjust semvar to major when we believe they would cause anything more than a minor visual break. Because of this, we will plan to follow through on deprecation quarterly to avoid creating lots of major bumps.

## Deprecation notices

### Sass

- When deprecating styles or classes, use `@warn` notices to spit output during the build.

### Javascript

- For JS, apply console errors on a case by case basis. We've received feedback these can be overly noisy and remove confidence in the end product.

## Documentation

### Component props

- Add prop documentation with `**DEPRECATED**` in bold, including instructions on what alternative (if any) to use. For example, [see this deprecation comment](https://github.com/elastic/eui/blob/79960490cd27e9f97c05a2bf58d33056d2c66a62/src/components/card/card.tsx#L127).

### Entire components

- Add a badge to the documentation page indicating the component is set for deprecation, with an optional additional callout explaining why and what alternatives (if any) users have. For example, [see this component deprecation](https://github.com/elastic/eui/blob/312e2c48c7db62f435d1c65bf2011e31e55cbfa4/src-docs/src/views/accessibility/accessibility_example.js#L71-L91).

## Actual removal of features

When it comes to actually removing features:

- If your component, prop, or utility, is being used internally in EUI, ensure you've removed cases of it where possible prior to the actual deletion date.
- Optionally check for known consumer usages of the deprecated functionality and contact the appropriate teams to let them know they should look into removing its usage as well as offering alternatives (if any).

Ideally, when the final deprecation date listed in the schedule comes up, there should be little to no friction involved in simply deleting the entire feature from the codebase as both EUI and Kibana will already have moved off the deprecated feature.
