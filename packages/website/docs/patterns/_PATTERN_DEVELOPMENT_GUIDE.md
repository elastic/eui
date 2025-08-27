# Pattern Development Guide

This directory contains task-oriented patterns that provide recipes for common UI scenarios using EUI atoms.

## Pattern Structure

All patterns should follow the structure defined in `_template.mdx`. The key sections are:

### Required Sections
1. **Problem** - Clear statement of what this pattern solves
2. **When to use / When not to use** - Usage guidance
3. **Variants** - Each variant as its own section with interactive example
4. **Anatomy** - Component breakdown (optional, see guidance below)
5. **Behavior** - Interaction and state rules
6. **Accessibility** - A11y requirements
7. **Tokens** - Design token usage
8. **Do's and Don'ts** - Best practices

### Variant Structure
Each variant should be presented as its own section:
- **Section heading** = Variant name
- **Description** = When to use this variant
- **Interactive example** = Complete, working code with `interactive` flag

### Anatomy Section Guidance
Include an Anatomy section when:
- **Visual structure patterns** with clear layout (Flyouts, Modals, Page layouts)
- **Subcomponent patterns** like EuiFlyoutHeader/EuiFlyoutBody or EuiModalHeader/EuiModalBody
- **Complex layout patterns** that benefit from visual breakdown

Use **ASCII diagrams** for visual structure patterns:
```
┌─────────────────────────────────┐
│ Header                          │
├─────────────────────────────────┤
│ Body                            │
├─────────────────────────────────┤
│ Footer                          │
└─────────────────────────────────┘
```

Use **bullet lists** for conceptual patterns (Forms, Cards, Stats, Tabs):
- **Element 1**: Description
- **Element 2**: Description

## Examples to Follow

- **Card layouts** (`layouts/card-layouts.mdx`) - Excellent example of variant structure
- **Tabs** (`navigation/tabs-usage.mdx`) - Updated to match Card layouts structure
- **Form layout** (`forms/form-layout.mdx`) - Good example of form patterns

## Template Usage

1. Copy `_template.mdx` to create new patterns
2. Replace all `[placeholder]` text with actual content
3. Ensure all examples have the `interactive` flag
4. Test with `npm run build` before committing

## Pattern Categories

- **Forms** - Form layouts, validation, input patterns
- **Navigation & structure** - Tabs, side nav, page layouts
- **Dialogs & feedback** - Modals, toasts, alerts
- **Content display** - Cards, tables, data density

## Quality Checklist

- [ ] Follows template structure
- [ ] All examples are interactive (`interactive` flag)
- [ ] Complete, working code examples
- [ ] Proper imports for all EUI components
- [ ] Realistic, practical scenarios
- [ ] Accessibility guidance included
- [ ] Design tokens documented
- [ ] Do's and Don'ts provided
- [ ] Migration guidance (only if real legacy component exists)

## Migration Guidance Rules

- ✅ **Include migration section** only when there's a real legacy component being replaced
- ✅ **Show actual before/after code** using real component names and props
- ✅ **Explain specific benefits** of the migration (flexibility, accessibility, etc.)
- ❌ **Don't include migration** for patterns without legacy components
- ❌ **Don't use made-up examples** with fake component names or props
