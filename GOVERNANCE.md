# EUI’s Design System Governance

This governance document describes the processes we follow within Elastic when working with the EUI design system.

## Prelude and principles

The following are some quotes and principles that guide the way we think about EUI.

> You can have a comprehensive design system [...] but if a design system user can’t get done what they’re trying to get done, the whole system risks obsolescence.
>
> Teams get creative and will find ways of getting things done, which may involve hacking styles, creating a slew of one-off components, or abandoning the design system altogether.
>
> This is why it is so incredibly important [...] to establish a crystal-clear governance process that helps users understand what to do when:
>
> - They can’t find a component that does what they need.
> - A design system component gets them 90% of the way there, but not 100%.
> - They have questions or concerns about the design system.

\- [Brad Frost](https://bradfrost.com/blog/post/a-design-system-governance-process/)

> Design systems should actively discourage deviations from the system, otherwise all the benefits of the system are lost.

\- Someone, somewhere, probably

- Enablement over enforcement: EUI is here to help you move faster, not to put up walls or slow you down. It works best when we collaborate early and often. "When in doubt, reach out!"

- A design system component should handle 90% of use cases. The remaining 10% may require customization through props, wrapping, or other actions.

- In general, our philosophy is to make our components as flexible and customizable as possible, up to the point where that flexibility explicitly enables bad or inaccessible UX.

- EUI is a mature library with over 100 publicly exported components, and generally is not actively adding new components.


## Process

### 1. If you're designing or developing new features in Elastic products, you should be using EUI

This doesn't mean just using components here are there as they suit your needs -- this means following the guidelines, patterns, and principles outlined in the EUI docs, and proactively and intentionally striving to stay within the bounds of EUI.

It is incredibly important to strive to stay within the bounds of EUI for product development work, because:

1. As an organization, we'll be able to both design and develop features faster.
2. We will establish a consistent product UX, regardless of solution or feature. This has an overwhlemingly positive effect on user perception of our products.
3. We will have less redundant code.
4. It's much easier to make sweeping product UX changes when we're using EUI consistently.

Things we want to avoid:
1. **Applying custom CSS to work around EUI** - These changes are brittle and prone to break in the future. They create UX inconsistencies.
2. **Creating new UI patterns and elements** - New UI elements and patterns breaks user consistency, creates more work for engineers, and opens the door for regressions and quality issues. EUI is well tested and built for quality and accessibility by default. EUI may not work for every scenario but please make an effort to use what we have when possible.

### 2. When in doubt, reach out!

The EUI team is here to help you work within the EUI design system. If you're not sure if we have a capability, what component to use, or how to achieve a certain result, please reach out! A short conversation with us could save you a lot of work downstream.

You can interact with us by:
- Subbmitting a Github issue
- Contacting us at #eui on Slack (internal to Elastic)

Ideally, we can help you find a way to work within what EUI provides. If not, proceed to step 3 or 4!

### 3. When we have something that works for you, but would require customization for your use case

For example -- you've found `EuiBadge`. It's perfect. Except for one thing ... it only provides solid colors, and you really feel that for your use case, it should be not be solid shaded and just have a colored border.

Firstly, congratuations, at this point you've followed step 1, you're using EUI.

Secondly, you've likely reached out to the EUI team to start a conversation about this when you realized it didn't quite work for you, well done!

In this case, the first thing you probably heard from the EUI team is that we *really* want you to consider using a different approach. We really feel like you should choose a different UX treatment, one that that does not require customizing EUIBadge.

However, after some discussion with our team, you've convinced us that this is truly the only thing that will work here. At this point, we will:

1. Provide you a workaround with custom CSS for a workaround.
2. Track this as a [one-off](#one-offs) customization.

If you feel strongly that this customization should be part of EUI and aligns with our guidance for [What we do accept](#what-we-do-and-dont-accept), you should create a [Feature Request](https://github.com/elastic/eui/issues/new?assignees=&labels=feature+request&projects=&template=feature_request.md&title=) for it.

The EUI team will consider the Feature Request and assign it a priority and work it as we have time. If and when we do, we will be sure to circle back to your "one-off" to make sure it is replaced with this new feature.

### 4. When we don't have a component or pattern for you

The process is the same for new components as it is for customizations. Be sure to check out the [one-off](#one-offs) section below.

## What we do and don’t accept

**What we do accept**
- Features that are clearly reusable
  - New changes must have a clear case for general reuse for Elastic products. Feature requests should include specific examples, or strong evidence of potential reuse.
- Features should have clear guidance around *when* they should be used.
- Bug fixes :D

**What we don’t accept**
- Features specific to a single use case (see [One-offs](#one-offs), below)
- Features that carry an excessive long-term maintenance burden, relative to their usage.
- Features that are inaccessible.

**Open source**
Elastic is an open-source repository, but not completely open-contribution. While we appreciate and welcome all your ideas and contributions, we cannot always guarantee we’ll accept them. Please see our [CONTRIBUTING.md](./wiki/contributing-to-eui/README.md) for more.

## One-offs

One-off components are a reality in mature design systems. If existing components do not meet your needs, it is acceptable to create a one-off components. One-offs must meet the following criteria to be considered for inclusion in EUI when its usage grows.
- The component must match the look and feel of EUI components
- The component follows EUI best practices, especially UX and accessibility
- The component has undergone manual accessibility testing
- The component has or is included in automated accessibility tests
- Works with Dark Mode

The EUI team tracks one-offs. If you create a one-off component within our products, we would like.