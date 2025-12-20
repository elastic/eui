# Design System Synchronization Guidelines
When submitting code changes that affect the visual design, behavior, or properties of EUI components or tokens, it's critical to ensure the [Elastic UI Borealis](https://www.figma.com/design/FHys7gLzyvD1gc9DrJM6D8/Elastic-UI--Borealis-?m=auto) Figma library remains synchronized with the codebase. This maintains design-development consistency across the entire Elastic ecosystem.

## When Figma Updates Are Required
Code changes that impact design and require Figma library updates include:

- *Component visual changes:* Styling modifications, color updates, spacing adjustments, typography changes
- *New component creation:* Following the four-step component creation process
- *Props modifications:* Adding, removing, or changing component properties that affect visual output
- *Icon additions/changes:* New icons or modifications to existing ones per icon creation guidelines
- *Design token updates:* Changes to colors, spacing, typography, or other design tokens
*Behavioral changes:* Interactions, states, or animations that alter user experience

## Design Review Process

1. Contact the design colleague in your team who can support you throughout the process, if needed.
2. Create a new Figma branch in the [Elastic UI Borealis](https://www.figma.com/design/FHys7gLzyvD1gc9DrJM6D8/Elastic-UI--Borealis-?m=auto) library that includes the proposed changes and links to the related PR.
3. Request a design review in Figma using the built-in workflow, or share the branch in the #eui-figma Slack channel.
