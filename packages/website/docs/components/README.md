# Atom Component Development Guide

This directory contains atom components - small, stable, accessible foundational components that serve as building blocks for patterns.

## Component Structure

All atom components should follow the structure defined in `_template.mdx`. The key sections are:

### Required Sections
1. **Brief description** - What this atom does and its purpose
2. **Pattern link** - Callout linking to relevant pattern page
3. **Basic usage** - Simple, minimal example
4. **States/Variants** - Different states or variants of the component
5. **Usage** - Specific usage aspects and examples
6. **Guidelines** - Component-specific rules and warnings
7. **Accessibility** - A11y requirements and considerations
8. **Design tokens** - Token usage and theming
9. **Props** - Complete props table

### Key Principles
- **Lean and focused** - Only show the component's core capabilities
- **Minimal examples** - Simple, isolated demonstrations
- **Pattern links** - Always link to relevant pattern pages for usage guidance
- **No usage guidance** - Move "when to use" content to patterns

## Examples to Follow

- **Panel** (`containers/panel/index.mdx`) - Excellent example of atom structure
- **Modal** (`containers/modal/index.mdx`) - Good example of states and accessibility
- **FormRow** (`forms/form-row.mdx`) - Lean atom with pattern link

## Template Usage

1. Copy `_template.mdx` to create new atom pages
2. Replace all `[placeholder]` text with actual content
3. Ensure all examples have the `interactive` flag
4. Add pattern links for usage guidance
5. Test with `npm run build` before committing

## Atom vs Pattern Content

### Atom Pages Should Include:
- ✅ Component API and props
- ✅ Basic usage examples
- ✅ States and variants
- ✅ Accessibility at component level
- ✅ Design tokens
- ✅ Pattern links

### Atom Pages Should NOT Include:
- ❌ "When to use" guidance
- ❌ Complex usage scenarios
- ❌ Layout recipes
- ❌ Business logic examples
- ❌ "Do's and Don'ts" (move to patterns)

## Quality Checklist

- [ ] Follows template structure
- [ ] All examples are interactive (`interactive` flag)
- [ ] Pattern link included (if applicable)
- [ ] Basic usage example provided
- [ ] States/variants documented
- [ ] Accessibility guidance included
- [ ] Design tokens documented
- [ ] Props table included
- [ ] No usage guidance (moved to patterns)
- [ ] Lean, focused content

## Component Categories

- **Containers** - Layout and structural components
- **Forms** - Input and form-related components
- **Navigation** - Navigation and routing components
- **Display** - Content presentation components
- **Feedback** - Status and notification components

## Migration from Legacy Components

When converting legacy components to atoms:

1. **Remove usage guidance** - Move to pattern pages
2. **Simplify examples** - Focus on component capabilities
3. **Add pattern links** - Direct users to usage guidance
4. **Keep core API** - Maintain essential props and behavior
5. **Update accessibility** - Ensure a11y is documented
