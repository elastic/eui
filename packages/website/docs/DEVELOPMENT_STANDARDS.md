# EUI Development Standards

This document outlines the standards for developing EUI documentation following the **atoms + patterns** approach.

## Overview

EUI is evolving from a component-heavy architecture to a lean atoms + explicit patterns approach:

- **Atoms**: Small, stable, accessible foundational components (~30 core atoms)
- **Patterns**: Task-oriented recipes built from atoms (~15-20 patterns)
- **Design Tokens**: Control style evolution for visual freshness

## Quick Reference

### Pattern Pages
- **Template**: `docs/patterns/_template.mdx`
- **Guide**: `docs/patterns/DEVELOPMENT.md`
- **Examples**: Card layouts, Tabs, Form layout

### Atom Pages
- **Template**: `docs/components/_template.mdx`
- **Guide**: `docs/components/README.md`
- **Examples**: Panel, Modal, FormRow

## Pattern Structure

```
1. Problem statement
2. When to use / When not to use
3. Variants (each as separate section with interactive example)
4. Anatomy (optional - for visual structure patterns)
5. Behavior
6. Accessibility
7. Tokens
8. Do's and Don'ts
9. Migration guidance (if applicable)
```

## Atom Structure

```
1. Brief description + pattern link
2. Basic usage
3. States/variants
4. Usage aspects
5. Guidelines (if needed)
6. Accessibility
7. Design tokens
8. Props table
```

## Key Principles

### Patterns
- ✅ Task-oriented recipes
- ✅ Interactive examples with "Show code"
- ✅ Realistic, practical scenarios
- ✅ Complete usage guidance
- ✅ Migration from legacy components
- ✅ Anatomy sections for visual structure patterns

### Atoms
- ✅ Lean and focused
- ✅ Minimal, isolated examples
- ✅ Pattern links for usage guidance
- ✅ No "when to use" content
- ✅ Core API and accessibility

## Quality Standards

### All Pages
- [ ] Follows appropriate template
- [ ] All examples are interactive
- [ ] Complete, working code
- [ ] Proper imports
- [ ] Accessibility documented
- [ ] Design tokens documented

### Pattern Pages
- [ ] Variants as separate sections
- [ ] Realistic scenarios
- [ ] Do's and Don'ts
- [ ] Migration guidance (only if real legacy component exists)

### Atom Pages
- [ ] Pattern links included
- [ ] Lean, focused content
- [ ] No usage guidance
- [ ] Props table complete

## Migration Strategy

1. **Patterns first** - Create pattern pages before deprecating components
2. **Soft deprecation** - Mark legacy components with warnings
3. **Migration guides** - Provide before/after examples (only for real legacy components)
4. **Gradual adoption** - Allow time for teams to migrate

### Migration Guidance Rules
- ✅ **Include migration section** only when there's a real legacy component being replaced
- ✅ **Show actual before/after code** using real component names and props
- ✅ **Explain specific benefits** of the migration (flexibility, accessibility, etc.)
- ❌ **Don't include migration** for patterns without legacy components
- ❌ **Don't use made-up examples** with fake component names or props

## Examples to Follow

### Patterns
- **Card layouts** - Excellent variant structure
- **Tabs** - Good routing integration
- **Form layout** - Comprehensive form guidance

### Atoms
- **Panel** - Perfect atom structure
- **Modal** - Good states and accessibility
- **FormRow** - Lean with pattern link

## Getting Started

1. **New pattern**: Copy `docs/patterns/_template.mdx`
2. **New atom**: Copy `docs/components/_template.mdx`
3. **Update existing**: Follow guides in respective README files
4. **Test**: Run `npm run build` before committing

## Benefits

- **Better DX**: Copy-paste examples from patterns
- **More flexible**: Atoms can be combined in new ways
- **Easier maintenance**: Less prop churn on wrappers
- **Design evolution**: Tokens enable visual refreshes
- **Clear guidance**: Patterns provide real-world recipes
