# Frequently Asked Questions

Here are our responses to questions we expect to get frequently.

## What is the Elastic UI Framework?

The Elastic UI Framework (EUI) is a design library in use at Elastic to build React applications that need to share our branding and aesthetics. It distributes UI React components and static assets for use in building web layouts. Alongside the React components is a SASS/CSS layer that can be used independently on its own.

## Can I use EUI?

Yes, but be aware of the [license](LICENSE.md) as always. Although the roadmap and priorities are directed by our own usage within Elastic, we do attempt to make the platform generically useful for any React application and try to test for it.

## What is the versioning, releases and upgrade strategy?

We use [semver](https://semver.org/) for versioning and use that to denote breaking changes in EUI upgrades. Traditionally we consider API changes in our prop names or existing component functionality to be a reason for a breaking change, but do not track the renaming of CSS selectors, mixins or other style changes under this same rigor.

Traditionally releases are made weekly against whatever is in master and you can upgrade from NPM as you see fit.

## How do you handle Typescript, Sass and theming?

EUI started as a JS and Sass library that outputs separate CSS and JS bundles. Over time we introduced TypeScript and started adding types, writing new components in TS, and migrating old components over. The goal is to actively convert everything over into a full TS system while retaining our build targets of ES5+commonjs, ES5+ES Modules, and a consolidated bundle file.

For styling we use Sass and generate a final CSS blob for the entire library, with some JSON theming files extracted from the Sass. You can find more information in [consuming EUI](wiki/consuming) and [theming](wiki/theming.md).

## Can I contribute to EUI

Yes! We accept PRs regularly similar to our other Elastic repos.

## Why is EUI open source?

Many of our products themselves are open source and rely upon this library to function. The Elastic UI Framework began as a folder of code in Kibana and we decided it could be used beyond that codebase. It exists as an independent library so that patterns can be shared across teams and design standards can be scaled across our organization. Since most of our products are open source, we treat this one similarly as far as public publishing and conversation even if its usage tends to focus more inward towards Elastic itself.

## What about reporting bugs and feature requests?

Bug reports and feature requests are most welcome, but our roadmap is driven primarily by internal usage.
