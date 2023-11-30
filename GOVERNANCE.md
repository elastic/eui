# EUI’s Design System Governance

EUI is a mature library with over 100 publicly exported components, and generally is not actively adding new components.

## Process
- If a component exists for your use case:
  - Use it!
- If a component exists but would require changes to work for your use case:
  - Start a conversation with the EUI team, we may be able to help identify a solution or a workaround.
- If you cannot find an existing component or workaround for your use case:
  - Start a conversation with the EUI team, we may be able to help identify a solution or a workaround.
  - If it is clear a new component does not exist:
    - If you believe the feature would qualify as a new addition to EUI (See [What we do and don't accept](#what-we-do-and-dont-accept) below), submit a feature request.
    - If you believe this would require a one-off, please follow the [one-off guidelines](#one-offs) below.

## What we do and don’t accept

**What we do accept**
- Features that are clearly reusable
  - New changes must have a clear case for general reuse for Elastic products. Feature requests should include specific examples, or strong evidence of potential reuse.
- Bug fixes :D

**What we don’t accept**
- Features specific to a single use case (see [One-offs](#one-offs), below)
- Features that carry an excessive long-term maintenance burden, relative to their usage
- Features that are inaccessible

**Open source**
Elastic is an open-source repository, but not completely open-contribution. While we appreciate and welcome all your ideas and contributions, we cannot always guarantee we’ll accept them. Please see our [CONTRIBUTING.md](./wiki/contributing-to-eui/README.md) for more.

## What a design system should and shouldn’t do
A design system component should handle 90% of use cases. The remaining 10% may require customization through props, wrapping, or other actions.

In general, our philosophy is to make our components as flexible and customizable as possible, up to the point where that flexibility explicitly enables bad or inaccessible UX.

If you can’t find a component that does what you need, [start a discussion](https://github.com/elastic/eui/discussions) with us so we can help determine whether your use case is general enough to bring back to EUI, or specific enough to remain a one-off.

## One-offs
One-offs are a reality in mature design systems. If existing components do not meet your needs, it is acceptable to create a one-off component. One-offs must meet the following criteria to be considered for inclusion in EUI when its usage grows.
- The component must match the look and feel of EUI components
- The component follows EUI best practices, especially UX and accessibility
- The component has undergone manual accessibility testing
- The component has or is included in automated accessibility tests
