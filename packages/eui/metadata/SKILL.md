---
name: eui
description: >
  Elastic UI component library guidance. Use when writing or reviewing
  any code that imports from @elastic/eui.
---

# @elastic/eui — AI Guidance

EUI is the design system used across all Elastic products. Every UI element
in Kibana, Cloud UI, and other Elastic products is built on EUI.

## How to use this metadata

This package ships machine-readable metadata at `node_modules/@elastic/eui/metadata/`:

```
metadata/
├── SKILL.md           ← this file
├── index.json         ← 231 components × ~30 tokens each
└── components/
    └── [name].json    ← full props + example per component
```

**Workflow for choosing and using a component:**

1. Search `metadata/index.json` for components matching your intent.
2. Read `metadata/components/[name].json` for the full prop API and example.
3. Import from `@elastic/eui` — never from a sub-path.

## Non-negotiable rules

| Rule | Wrong | Right |
|---|---|---|
| Never use raw HTML when an EUI component exists | `<button>` | `EuiButton` |
| Never use raw HTML flex layouts | `<div style={{display:'flex'}}>` | `EuiFlexGroup` + `EuiFlexItem` |
| Never hardcode colors or sizes | `color: '#0070cc'` | EUI theme tokens |
| Never bypass EUI typography | `<h2 style={{...}}>` | `EuiTitle size="m"` |
| Icon-only buttons always need aria-label | `<EuiButtonIcon iconType="trash" />` | `<EuiButtonIcon iconType="trash" aria-label="Delete item" />` |

## Intent → component quick map

| I need to… | Use |
|---|---|
| Show a primary action | `EuiButton fill` |
| Show a secondary / cancel action | `EuiButtonEmpty` |
| Show an icon-only action | `EuiButtonIcon` (+ aria-label) |
| Toggle between exclusive options | `EuiButtonGroup` |
| Lay out items horizontally | `EuiFlexGroup` + `EuiFlexItem` |
| Add vertical whitespace | `EuiSpacer` |
| Contain a section | `EuiPanel` |
| Show an info / warning / error message | `EuiCallOut` |
| Show a status dot + label | `EuiHealth` |
| Show a tag or category label | `EuiBadge` |
| Display tabular data | `EuiBasicTable` (server) or `EuiInMemoryTable` (client) |
| Open a side panel | `EuiFlyout` |
| Confirm a destructive action | `EuiConfirmModal` |
| Show a dashboard metric | `EuiStat` |
| Navigate within a page | `EuiTabs` |
| Show page-level navigation trail | `EuiBreadcrumbs` |
| Search with filters | `EuiSearchBar` |
| Select from a long list | `EuiComboBox` or `EuiSelectable` |
| Show an empty state | `EuiEmptyPrompt` |
| Full page layout | `EuiPageTemplate` |

## Common anti-patterns caught in review

```tsx
// ❌ Inline flex + raw buttons + hex color
<div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
  <button style={{ background: '#0070cc', color: 'white' }}>Save</button>
  <button>Cancel</button>
</div>

// ✅ EUI equivalent
<EuiFlexGroup gutterSize="s" justifyContent="flexEnd">
  <EuiFlexItem grow={false}>
    <EuiButton fill onClick={onSave}>Save</EuiButton>
  </EuiFlexItem>
  <EuiFlexItem grow={false}>
    <EuiButtonEmpty onClick={onCancel}>Cancel</EuiButtonEmpty>
  </EuiFlexItem>
</EuiFlexGroup>
```

```tsx
// ❌ Custom status dot
<span style={{ color: 'green' }}>● Active</span>

// ✅ EUI equivalent
<EuiHealth color="success">Active</EuiHealth>
```
