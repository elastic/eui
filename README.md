<img src="https://repository-images.githubusercontent.com/107422373/b6180480-a1d7-11eb-8a3c-902086232aa7" alt="" />

# Elastic UI Framework

**The Elastic UI Framework is a collection of React UI components for quickly building user interfaces at Elastic.**

Check out our [full documentation site][docs] which contains many examples of components in the EUI framework aesthetic, and how to use them in your products. Our FAQ below covers common usage questions — for other general questions regarding EUI, check out the [Discussions tab](https://github.com/elastic/eui/discussions).

## Frequently Asked Questions

### What is the Elastic UI Framework?

The Elastic UI Framework (EUI) is a design library in use at Elastic to build React applications that need to share our branding and aesthetics. It distributes typed UI React components and static assets for use in building web layouts. Alongside the React components, we ship theme & style utilities that can be used independently on their own.

The primary goal of this library is to provide reusable UI components that can be used throughout Elastic's web products. As React components, they remove CSS from the process of building UIs. As a single source of truth, the framework allows our designers to make changes to our aesthetic directly in the code. And unit test coverage for the UI components allows us to deliver a stable "API for user interfaces".

### Can I use EUI?

Please see Elastic's licensing FAQ: [I’m using EUI or Elastic Charts in my application outside of Kibana, how does this affect me?][licensing-faq]

### Why is EUI open source?

Many of Elastic's products are open source and rely upon this library to function. The Elastic UI Framework began as a folder of code in Kibana and we decided it could be used beyond that codebase. It exists as an independent library so that patterns can be shared across teams and design standards can be scaled across our organization. Since most of our products are open source, we treat this one similarly as far as public publishing and conversation even if its usage tends to focus more inward towards Elastic itself.

### What is the versioning, release, and upgrade strategy?

We use [semver](https://semver.org/) for versioning and use that to denote breaking changes in EUI upgrades. Traditionally we consider API changes in our prop names or existing component functionality to be a reason for a breaking change, but do not track the renaming of CSS selectors, mixins or other style changes under this same rigor.

Traditionally releases are made weekly against whatever is in the `main` branch and you can upgrade from NPM as you see fit.

### Can I contribute to EUI?

Yes! We welcome community-contributed PRs, especially around feature requests that the EUI team may not have bandwidth to carry out alone. You can find documentation around creating and submitting new components in [our wiki](wiki/contributing-to-eui/).

### What about reporting bugs and feature requests?

Bug reports and feature requests are most welcome, but our roadmap and prioritization are driven primarily by [internal Elastic usage](wiki/contributing-to-eui#how-we-assign-work-and-define-our-roadmap).

Please note that in order to keep our backlog manageable and focused on tasks we intend to complete, feature requests & tech debt issues that are inactive for a year will be auto-closed (bugs will remain open if determined to be reproducible and valid).

This activity counter can be soft reset by commenting on the issue directly, but please do so mindfully. We would ask that you proactively let the EUI team know why this request matters to you or how it impacts you or your users, in order to help us prioritize accordingly.

The EUI team, like everyone else, has a finite amount of time and resources, and it is not humanly possible for us to implement every task or feature requested of us. However, that's where the beauty of open source comes in - if your request is important to you, we strongly encourage you to [contribute code directly to EUI](wiki/contributing-to-eui/) that addresses your issue or request!

<!-- TODO: Delete this question once the Emotion migration is complete -->
### What is the status of EUI's theming?

The EUI library was previously built upon Sass and is in the process of migrating to CSS-in-JS (specifically [Emotion](https://emotion.sh)). While this work is in progress, we ask for your patience with our in-between state in areas such as documentation and setup.

If you're a Kibana developer with questions around CSS-in-JS usage in Kibana, please check out our [FAQ discussion](https://github.com/elastic/eui/discussions/6828)!

## Wiki

Our wiki docs contain instructions and guidelines on multiple areas of EUI usage and development that are too detailed for an initial README. For more information, see:

- [Consuming EUI](wiki/consuming-eui)
- [Contributing to EUI](wiki/contributing-to-eui/)
- [Running EUI locally](wiki/contributing-to-eui/running-eui-locally.md)

## License

[Dual-licensed under Elastic v2 and Server Side Public License, v1][license]. See Elastic's [licensing FAQ][licensing-faq] for details.

[license]: LICENSE.txt
[licensing-faq]: https://www.elastic.co/pricing/faq/licensing#im-using-eui-or-elastic-charts-in-my-application-outside-of-kibana-how-does-this-affect-me
[docs]: https://elastic.github.io/eui/
