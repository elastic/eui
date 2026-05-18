/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

/**
 * Generates AI-readable metadata for @elastic/eui.
 *
 * Output: packages/eui/metadata/
 *   ├── SKILL.md              ← agent instructions
 *   ├── index.json            ← component catalog (~30 tokens per entry)
 *   └── components/
 *       └── [name].json       ← full props + example per component
 *
 * Sources:
 *   - packages/eui-docgen/dist/  (prop types and descriptions)
 *   - packages/eui/src/components/**\/*.stories.tsx  (category, defaults)
 *
 * Usage: node scripts/generate_ai_metadata.mjs
 */

import path from 'node:path';
import fs from 'node:fs/promises';
import { glob } from 'glob';

const ROOT = new URL('../../../', import.meta.url).pathname;
const DOCGEN_DIST = path.join(ROOT, 'packages/eui-docgen/dist');
const EUI_SRC = path.join(ROOT, 'packages/eui/src');
const OUTPUT_DIR = path.join(ROOT, 'packages/eui/metadata');

// ---------------------------------------------------------------------------
// Story parsing
// ---------------------------------------------------------------------------

/**
 * Extracts the Storybook `title` and component `args` defaults from a TSX story file.
 * Uses regex rather than ts-node to keep this script dependency-free.
 */
function parseStoryFile(content) {
  // title: 'Display/EuiCallOut'
  const titleMatch = content.match(/title:\s*['"`]([^'"`]+)['"`]/);
  const title = titleMatch?.[1] ?? null;

  // args block under `// Component defaults` comment
  const defaultsMatch = content.match(
    /\/\/\s*Component defaults\s*\n([\s\S]*?)(?:},\s*\n|};\s*\n)/
  );
  const defaults = {};
  if (defaultsMatch) {
    const block = defaultsMatch[1];
    // Extract simple key: 'value' or key: false/true/number pairs
    for (const match of block.matchAll(
      /(\w+):\s*(?:'([^']*)'|"([^"]*)"|`([^`]*)`|(true|false|\d+(?:\.\d+)?))/g
    )) {
      const key = match[1];
      const val =
        match[2] ?? match[3] ?? match[4] ?? match[5];
      defaults[key] =
        val === 'true' ? true : val === 'false' ? false : isNaN(Number(val)) ? val : Number(val);
    }
  }

  // Playground story args (children, title, etc.)
  const playgroundMatch = content.match(
    /export const Playground[^=]*=\s*\{[\s\S]*?args:\s*\{([\s\S]*?)\}/
  );
  const playgroundArgs = {};
  if (playgroundMatch) {
    const block = playgroundMatch[1];
    for (const match of block.matchAll(
      /(\w+):\s*(?:'([^']*)'|"([^"]*)"|`([^`]*)`|(true|false|\d+(?:\.\d+)?))/g
    )) {
      const key = match[1];
      const val = match[2] ?? match[3] ?? match[4] ?? match[5];
      playgroundArgs[key] =
        val === 'true' ? true : val === 'false' ? false : isNaN(Number(val)) ? val : Number(val);
    }
  }

  return { title, defaults, playgroundArgs };
}

function categoryFromTitle(title) {
  if (!title) return 'Other';
  return title.split('/')[0];
}

function componentNameFromTitle(title) {
  if (!title) return null;
  const parts = title.split('/');
  return parts[parts.length - 1];
}

// ---------------------------------------------------------------------------
// Prop formatting
// ---------------------------------------------------------------------------

function formatProps(rawProps) {
  const result = {};
  for (const [key, prop] of Object.entries(rawProps ?? {})) {
    // Skip noisy HTML passthrough props
    if (['className', 'css', 'style', 'id', 'data-test-subj'].includes(key)) continue;
    // Skip untyped or inherited aria-* props that add noise
    if (key.startsWith('aria-') && !prop.description) continue;

    result[key] = {
      type: prop.type?.raw ?? prop.type?.name ?? 'unknown',
      required: prop.isRequired || false,
      ...(prop.defaultValue !== undefined && { default: prop.defaultValue }),
      ...(prop.description ? { description: prop.description } : {}),
    };
  }
  return result;
}

// ---------------------------------------------------------------------------
// Canonical example builder
// ---------------------------------------------------------------------------

/**
 * Builds a minimal JSX usage example from story defaults + playground args.
 * This is intentionally simple — the goal is a runnable one-liner that shows
 * the most common usage, not a comprehensive demo.
 */
function buildExample(name, defaults, playgroundArgs) {
  const allArgs = { ...defaults, ...playgroundArgs };
  const props = [];

  for (const [key, val] of Object.entries(allArgs)) {
    if (key === 'children') continue; // handled separately
    if (val === false) continue; // false booleans are default, skip
    if (val === true) {
      props.push(key);
    } else if (typeof val === 'string') {
      props.push(`${key}="${val}"`);
    } else {
      props.push(`${key}={${val}}`);
    }
  }

  const propsStr = props.length ? ` ${props.join(' ')}` : '';
  const children = allArgs.children ?? allArgs.title ?? null;

  if (children !== null) {
    return `<${name}${propsStr}>${children}</${name}>`;
  }
  return `<${name}${propsStr} />`;
}

// ---------------------------------------------------------------------------
// SKILL.md template
// ---------------------------------------------------------------------------

function generateSkillMd(componentCount) {
  return `---
name: eui
description: >
  Elastic UI component library guidance. Use when writing or reviewing
  any code that imports from @elastic/eui.
---

# @elastic/eui — AI Guidance

EUI is the design system used across all Elastic products. Every UI element
in Kibana, Cloud UI, and other Elastic products is built on EUI.

## How to use this metadata

This package ships machine-readable metadata at \`node_modules/@elastic/eui/metadata/\`:

\`\`\`
metadata/
├── SKILL.md           ← this file
├── index.json         ← ${componentCount} components × ~30 tokens each
└── components/
    └── [name].json    ← full props + example per component
\`\`\`

**Workflow for choosing and using a component:**

1. Search \`metadata/index.json\` for components matching your intent.
2. Read \`metadata/components/[name].json\` for the full prop API and example.
3. Import from \`@elastic/eui\` — never from a sub-path.

## Non-negotiable rules

| Rule | Wrong | Right |
|---|---|---|
| Never use raw HTML when an EUI component exists | \`<button>\` | \`EuiButton\` |
| Never use raw HTML flex layouts | \`<div style={{display:'flex'}}>\` | \`EuiFlexGroup\` + \`EuiFlexItem\` |
| Never hardcode colors or sizes | \`color: '#0070cc'\` | EUI theme tokens |
| Never bypass EUI typography | \`<h2 style={{...}}>\` | \`EuiTitle size="m"\` |
| Icon-only buttons always need aria-label | \`<EuiButtonIcon iconType="trash" />\` | \`<EuiButtonIcon iconType="trash" aria-label="Delete item" />\` |

## Intent → component quick map

| I need to… | Use |
|---|---|
| Show a primary action | \`EuiButton fill\` |
| Show a secondary / cancel action | \`EuiButtonEmpty\` |
| Show an icon-only action | \`EuiButtonIcon\` (+ aria-label) |
| Toggle between exclusive options | \`EuiButtonGroup\` |
| Lay out items horizontally | \`EuiFlexGroup\` + \`EuiFlexItem\` |
| Add vertical whitespace | \`EuiSpacer\` |
| Contain a section | \`EuiPanel\` |
| Show an info / warning / error message | \`EuiCallOut\` |
| Show a status dot + label | \`EuiHealth\` |
| Show a tag or category label | \`EuiBadge\` |
| Display tabular data | \`EuiBasicTable\` (server) or \`EuiInMemoryTable\` (client) |
| Open a side panel | \`EuiFlyout\` |
| Confirm a destructive action | \`EuiConfirmModal\` |
| Show a dashboard metric | \`EuiStat\` |
| Navigate within a page | \`EuiTabs\` |
| Show page-level navigation trail | \`EuiBreadcrumbs\` |
| Search with filters | \`EuiSearchBar\` |
| Select from a long list | \`EuiComboBox\` or \`EuiSelectable\` |
| Show an empty state | \`EuiEmptyPrompt\` |
| Full page layout | \`EuiPageTemplate\` |

## Common anti-patterns caught in review

\`\`\`tsx
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
\`\`\`

\`\`\`tsx
// ❌ Custom status dot
<span style={{ color: 'green' }}>● Active</span>

// ✅ EUI equivalent
<EuiHealth color="success">Active</EuiHealth>
\`\`\`
`;
}

// ---------------------------------------------------------------------------
// Component-level descriptions
// TODO: replace with component-level JSDoc once added to EUI source.
// Tracking issue: https://github.com/elastic/eui/issues/XXXX
// ---------------------------------------------------------------------------

const COMPONENT_DESCRIPTIONS = {
  EuiAccordion: 'Collapsible section that shows/hides content on toggle.',
  EuiBadge: 'Colored label for status, category, or count. Supports click handlers.',
  EuiBadgeGroup: 'Wrapping container for a group of EuiBadge items.',
  EuiBasicTable: 'Data table with sorting, pagination, and row actions. Use when data is fetched server-side.',
  EuiBottomBar: 'Fixed bar anchored to the bottom of the viewport for persistent actions.',
  EuiBreadcrumbs: 'Navigation trail showing the current page location within a hierarchy.',
  EuiButton: 'Primary interactive button. Handles keyboard focus, loading, and disabled states automatically.',
  EuiButtonEmpty: 'Text-only button with no background. Use for secondary or cancel actions.',
  EuiButtonGroup: 'Toggle group of mutually exclusive (single) or multi-select button options.',
  EuiButtonIcon: 'Icon-only button. Always requires an aria-label for accessibility.',
  EuiCallOut: 'Inline alert box for informational, success, warning, or danger messages.',
  EuiCard: 'Clickable or informational card with title, description, and optional icon.',
  EuiCheckbox: 'Single boolean checkbox input.',
  EuiCheckboxGroup: 'Group of related checkbox options.',
  EuiCode: 'Inline code snippet with monospace styling.',
  EuiCodeBlock: 'Multi-line syntax-highlighted code display with optional copy button.',
  EuiCollapsibleNav: 'Collapsible side navigation panel for app-level navigation.',
  EuiComboBox: 'Multi-select or single-select input with search and custom option support.',
  EuiDataGrid: 'High-performance virtualized data grid for large or complex datasets.',
  EuiDatePicker: 'Calendar-based date and time input.',
  EuiDescriptionList: 'Key-value pair list for displaying metadata or entity attributes.',
  EuiEmptyPrompt: 'Placeholder for empty states, error pages, and onboarding flows.',
  EuiFieldNumber: 'Numeric text input field.',
  EuiFieldPassword: 'Password input field with optional visibility toggle.',
  EuiFieldSearch: 'Search text input with a magnifier icon.',
  EuiFieldText: 'Single-line text input field.',
  EuiFilePicker: 'File upload input.',
  EuiFlexGroup: 'Flexbox row/column container. Children must be EuiFlexItem.',
  EuiFlexGrid: 'Responsive grid layout that wraps children into equal-width columns.',
  EuiFlexItem: 'Flex child within EuiFlexGroup. Controls grow, shrink, and alignment.',
  EuiFlyout: 'Slide-in overlay panel anchored to the viewport edge.',
  EuiFlyoutBody: 'Scrollable body region inside an EuiFlyout.',
  EuiFlyoutFooter: 'Sticky footer region inside an EuiFlyout, typically for action buttons.',
  EuiFlyoutHeader: 'Header region inside an EuiFlyout, typically contains an EuiTitle.',
  EuiForm: 'Form wrapper providing consistent layout and validation context.',
  EuiFormRow: 'Labeled form field wrapper with error message and help text support.',
  EuiHeader: 'Top application header bar. Used for global navigation and branding.',
  EuiHeaderBreadcrumbs: 'Breadcrumbs variant styled for use inside EuiHeader.',
  EuiHeaderLink: 'Navigation link styled for use inside EuiHeader.',
  EuiHeaderLinks: 'Container for a group of EuiHeaderLink items.',
  EuiHeaderSectionItem: 'Individual section item within the EuiHeader.',
  EuiHealth: 'Small colored status dot with an adjacent text label.',
  EuiHighlight: 'Wraps text and highlights a substring match (for search results).',
  EuiHorizontalRule: 'Visual divider line. Use instead of raw <hr>.',
  EuiIcon: 'SVG icon from the EUI icon library. Add aria-label when used standalone.',
  EuiImage: 'Responsive image with optional caption and fullscreen zoom.',
  EuiInMemoryTable: 'Data table with built-in client-side search, sort, and pagination.',
  EuiKeyPadMenu: 'Grid of icon+label menu items, typically used in popovers.',
  EuiKeyPadMenuItem: 'Individual item within EuiKeyPadMenu.',
  EuiLink: 'Anchor or button styled as a hyperlink.',
  EuiListGroup: 'Vertical list of action items or links.',
  EuiListGroupItem: 'Individual item within EuiListGroup.',
  EuiLoadingSpinner: 'Animated circular loading indicator.',
  EuiLoadingElastic: 'Animated Elastic logo loading indicator.',
  EuiMark: 'Highlights text with a background color (like a highlighter marker).',
  EuiModal: 'Focused dialog that traps focus and requires explicit user action.',
  EuiConfirmModal: 'Standardised confirmation dialog for destructive or irreversible actions.',
  EuiPageHeader: 'Page-level header with title, description, breadcrumbs, and action buttons.',
  EuiPageTemplate: 'Full-page layout template managing sidebar, header, and content regions.',
  EuiPagination: 'Page navigation control for paginated data sets.',
  EuiPanel: 'Contained surface with configurable background, border, and padding.',
  EuiPopover: 'Anchored floating panel for contextual menus or content.',
  EuiProgress: 'Linear determinate or indeterminate progress indicator.',
  EuiRadio: 'Single radio button. Use EuiRadioGroup for a related set.',
  EuiRadioGroup: 'Group of mutually exclusive radio button options.',
  EuiResizableContainer: 'Two-pane layout with a draggable divider between panels.',
  EuiSearchBar: 'Structured search input with filter pills and query syntax support.',
  EuiSelect: 'Native select dropdown. Prefer EuiComboBox for searchable or multi-select needs.',
  EuiSelectable: 'Searchable list with keyboard-accessible single or multi-select.',
  EuiSideNav: 'Vertical tree navigation menu for app-level page navigation.',
  EuiSkeletonText: 'Placeholder skeleton lines shown while content is loading.',
  EuiSkeletonRectangle: 'Placeholder skeleton rectangle shown while content is loading.',
  EuiSpacer: 'Vertical whitespace block. Always prefer over margin on surrounding elements.',
  EuiSplitPanel: 'Two-panel layout split horizontally or vertically with a shared border.',
  EuiStat: 'Large metric value with a smaller label, designed for dashboard KPIs.',
  EuiSteps: 'Numbered step-by-step process indicator.',
  EuiSubSteps: 'Nested sub-steps inside an EuiSteps item.',
  EuiSwitch: 'Toggle switch for boolean on/off settings.',
  EuiTab: 'Individual tab item. Must be a child of EuiTabs.',
  EuiTabs: 'Horizontal tab navigation bar.',
  EuiText: 'Semantic wrapper that applies EUI typography styles to arbitrary HTML content.',
  EuiTextAlign: 'Wrapper that sets text alignment on its children.',
  EuiTitle: 'Styled heading element. Use the size prop to control scale; use as to set the HTML heading level.',
  EuiToast: 'Auto-dismissing notification message shown in the toast list.',
  EuiGlobalToastList: 'Container that manages and renders active EuiToast notifications.',
  EuiToolTip: 'Hover/focus tooltip anchored to a trigger element.',
  EuiTour: 'Multi-step guided product tour anchored to specific elements.',
  EuiTreeView: 'Collapsible tree structure for hierarchical data.',
};

// ---------------------------------------------------------------------------
// Visual descriptions — how each component looks in a screenshot or mockup.
// Used by agents doing visual recognition when no Figma metadata is available.
//
// Authored by the EUI design team. See:
// https://github.com/elastic/eui/pull/9664
//
// Filling guide for each entry:
//   - Shape and container (box, pill, dot, row, panel…)
//   - Color cues (border color, background, accent)
//   - Typography (title weight, label size)
//   - Key visual differentiators from similar components
//   - What it is NOT (to prevent misidentification)
// ---------------------------------------------------------------------------

const VISUAL_DESCRIPTIONS = {
  // ---------------------------------------------------------------------------
  // Core 25 — filled by EUI design team (OnWeek May 2025)
  // ---------------------------------------------------------------------------

  EuiButton:
    'Rectangular button with rounded corners, consistent horizontal padding, ' +
    'and a visible text label. Comes in two fills: solid (filled, opaque ' +
    'background — the default primary action) and outlined (transparent ' +
    'background with a border, same border-radius). May include a small icon ' +
    'to the left or right of the label. Size variants: medium (default, ~32px ' +
    'tall) and small (~24px). NOT a plain text link (has a bounding box). ' +
    'NOT EuiButtonEmpty (which has no border or background).',

  EuiButtonEmpty:
    'Text-only button with no visible background or border at rest. Looks ' +
    'similar to a hyperlink but has button padding and alignment. The label ' +
    'color signals its role: primary blue for navigational actions, subdued ' +
    'grey for secondary, red for danger. May include a small icon. ' +
    'NOT EuiButton (no bounding box visible). NOT a plain <a> link.',

  EuiButtonIcon:
    'Icon-only button — a single SVG icon with no visible text label. The ' +
    'clickable area is a small square or circle (~24–32px). Background is ' +
    'transparent at rest; shows a subtle fill on hover. ALWAYS requires an ' +
    'aria-label (not visible). Common in table row actions, toolbars, and ' +
    'close/dismiss controls. NOT EuiIcon (which is purely decorative and ' +
    'non-interactive). Distinguished from EuiButton by the absence of any ' +
    'text label.',

  EuiCallOut:
    'A rectangular box with a prominent 4px solid colored left-border accent. ' +
    'Inside: an icon on the far left of the header row, a bold title text ' +
    'next to it, and optional body text below. The border (and icon) color ' +
    'encodes semantic meaning: blue = info/primary, green = success, ' +
    'yellow = warning, red = danger. No drop shadow (not floating). ' +
    'Full-width by default. NOT EuiPanel (no shadow, always has the left ' +
    'accent border). NOT EuiToast (not positioned/floating). NOT EuiModal.',

  EuiHealth:
    'A small filled circle (dot, ~10–12px diameter) followed immediately by ' +
    'a short inline text label. The dot color is the only visual signal: ' +
    'green = success/healthy, red = danger/critical, yellow = warning, ' +
    'grey = unknown/inactive. Very compact — typically appears in table cells, ' +
    'list items, or inline next to an entity name. NOT EuiBadge (no pill ' +
    'shape or background fill). NOT a status icon (no SVG glyph, just a dot).',

  EuiBadge:
    'A pill-shaped chip with fully rounded ends and a solid or light ' +
    'background fill. Contains short text (1–3 words), optionally preceded ' +
    'by a small icon or followed by a dismissible ×. Color variants cover ' +
    'semantic states (success green, danger red, warning yellow) as well as ' +
    'arbitrary custom colors. Sits inline within text or stacks in a flex ' +
    'row. NOT EuiHealth (no dot, has a pill container). NOT EuiButton ' +
    '(not interactive as a primary action, rectangular corners on EuiButton).',

  EuiPanel:
    'A card-like rectangular container with a white or light-grey background, ' +
    'a subtle border or low-elevation box-shadow, and internal padding. ' +
    'Corner radius is consistent (~6px). Can be flat (border only, no shadow) ' +
    'or raised (shadow). Contains arbitrary content — titles, text, tables, ' +
    'forms. NOT EuiCallOut (no colored left border). NOT EuiCard (EuiCard ' +
    'has a fixed header/description/footer structure and is typically ' +
    'clickable as a unit).',

  EuiFlexGroup:
    'A layout-only container — has no visual appearance of its own. ' +
    'Recognized by its children being arranged in a horizontal row (default) ' +
    'or vertical column with consistent gaps between them. The gap size ' +
    'corresponds to EUI spacing tokens (none / xs / s / m / l / xl). ' +
    'In Figma it appears as a frame with Auto Layout. Cannot be identified ' +
    'in a rasterized screenshot without inspecting the DOM — infer its ' +
    'presence from a row of sibling elements with uniform spacing.',

  EuiSpacer:
    'Pure vertical whitespace — a transparent block that adds a fixed gap ' +
    'between stacked elements. Not visually distinguishable in a rendered ' +
    'screenshot; only identifiable in Figma as an empty frame or spacing ' +
    'annotation. Infer its presence from gaps between vertically stacked ' +
    'components. Size tokens: xs (4px), s (8px), m (16px), l (24px), ' +
    'xl (32px), xxl (40px).',

  EuiFlyout:
    'A full-height panel anchored to and sliding in from the right (default) ' +
    'or left edge of the viewport. Covers a portion of the page (medium ' +
    'default width ~480px) with a semi-transparent dark overlay behind it. ' +
    'Has a distinct header bar at the top (containing a title and an × close ' +
    'button in the top-right corner), a scrollable body region, and an ' +
    'optional sticky footer with action buttons. NOT EuiModal (which is ' +
    'centered, not edge-anchored). NOT a sidebar nav (EuiFlyout is ' +
    'transient/overlay, nav is persistent).',

  EuiModal:
    'A centered dialog box that floats above the page behind a full-viewport ' +
    'dark overlay/backdrop. Fixed width, variable height. Structured in three ' +
    'regions: a header bar (title left, × close button right), a scrollable ' +
    'body, and a footer with action buttons (typically Cancel + primary ' +
    'action). Corners are rounded. NOT EuiFlyout (centered vs edge-anchored). ' +
    'EuiConfirmModal is a pre-structured variant with a title, body text, and ' +
    'exactly two buttons.',

  EuiBasicTable:
    'A standard data table with a header row of column labels (bold, light ' +
    'background) and data rows below. Column headers may show up/down sort ' +
    'arrows. Rows can have a hover highlight. Left-most column may have ' +
    'checkboxes for row selection. Right-most column often contains action ' +
    'buttons (EuiButtonIcon). Horizontal dividers between rows, no vertical ' +
    'grid lines by default. NOT EuiDataGrid (which has cell-level editing, ' +
    'column resizing handles, and a toolbar above). The distinction between ' +
    'EuiBasicTable and EuiInMemoryTable is invisible in a screenshot — ' +
    'both look identical; the difference is whether filtering/sorting is ' +
    'client-side or server-side.',

  EuiStat:
    'A high-contrast metric display: a large, heavy-weight number or short ' +
    'value (the stat) paired with a smaller descriptive label. Label is ' +
    'typically above or below the value, subdued color. Common in dashboard ' +
    'cards and summary panels. No border or background of its own — usually ' +
    'sits inside an EuiPanel. NOT EuiTitle (EuiStat is always paired with ' +
    'a descriptor label; EuiTitle is standalone heading text).',

  EuiEmptyPrompt:
    'A vertically centered content block used for empty, error, or onboarding ' +
    'states. Typically contains: an illustration or large icon at the top, a ' +
    'bold heading below it, one or two lines of body text, and one or more ' +
    'call-to-action buttons. Occupies a significant portion of the content ' +
    'area. May be contained in an EuiPanel or shown full-width. NOT a modal ' +
    '(not overlaid). NOT EuiCallOut (much larger, illustration-led, not an ' +
    'alert strip).',

  EuiPageHeader:
    'A horizontal page-level header bar sitting at the top of the content ' +
    'area (below the global Kibana chrome). Left side: optional breadcrumbs ' +
    'above a large page title, with an optional description line below the ' +
    'title. Right side: one or more action buttons aligned to the top-right. ' +
    'Optional tabs row at the bottom of the header. NOT the global EuiHeader ' +
    '(which is the app-wide top bar with the Elastic logo and nav). ' +
    'NOT a section heading inside a page.',

  EuiTabs:
    'A horizontal row of tab items, each a text label with generous padding. ' +
    'The active tab is visually distinguished by a solid underline (2–3px, ' +
    'primary color) or a filled background depending on the variant. Inactive ' +
    'tabs are muted. The tab bar sits above the content it controls. ' +
    'NOT EuiSteps (tabs are non-sequential navigation, steps imply a ' +
    'progression). NOT a segmented control / EuiButtonGroup.',

  EuiBreadcrumbs:
    'A single horizontal line of text items separated by › or / chevron ' +
    'characters. Each item except the last is a clickable link (primary ' +
    'color). The last item (current page) is plain, non-linked text. Very ' +
    'compact height. Sits above the page title, usually inside EuiPageHeader. ' +
    'NOT EuiSteps. NOT EuiTabs. NOT a pagination control.',

  EuiTitle:
    'Styled heading text — larger and heavier font weight than body copy. ' +
    'No background, no border, no container. Comes in scale sizes: ' +
    'xxxs → xxl, corresponding to h1–h6 visual weight. NOT EuiText (which ' +
    'wraps body copy). NOT EuiStat (which is always paired with a metric ' +
    'descriptor label). The HTML element rendered (h1–h6) is set by the ' +
    '`as` prop and may differ from the visual size.',

  EuiText:
    'A wrapper that applies EUI typography to arbitrary HTML content — ' +
    'paragraphs, lists, inline elements. Visually: regular-weight body text ' +
    'at standard reading size, with correct line-height and color. No visible ' +
    'border or background. NOT EuiTitle (body weight vs heading weight). ' +
    'Identified in a mockup by blocks of readable paragraph text or bulleted ' +
    'lists inside a layout region.',

  EuiFormRow:
    'A vertically stacked form field unit. From top to bottom: a short text ' +
    'label (regular weight, small), the input control (text field, select, ' +
    'etc.), and optionally a one-line helper text or red error message below. ' +
    'The group has consistent vertical spacing. NOT a standalone label ' +
    '(EuiFormRow always wraps an input). In a form with multiple fields, ' +
    'each EuiFormRow is a self-contained label+input+feedback stack.',

  EuiFieldText:
    'A single-line rectangular text input. Has a visible border on all four ' +
    'sides (default) with a subtle background. Shows placeholder text when ' +
    'empty. Focused state adds a blue border/glow. May have a prepend or ' +
    'append element (icon, label, button) inside the input boundary. ' +
    'NOT EuiSearchBar (EuiFieldText has no built-in search icon or filter ' +
    'pills). NOT EuiTextArea (single line vs multi-line).',

  EuiComboBox:
    'A multi-value select input. The input area shows selected items as ' +
    'pill-shaped badges inside the field, followed by a blinking text cursor ' +
    'for typing a search query. Has a dropdown chevron on the right. On click, ' +
    'opens a dropdown list of options. Single-select variant looks like ' +
    'a regular input with a chevron. NOT EuiSelect (native dropdown, no ' +
    'in-field pills). NOT EuiSelectable (EuiSelectable is a standalone ' +
    'panel list, not an inline input field).',

  EuiSearchBar:
    'A full-width search input that spans the content area or a panel. Has ' +
    'a magnifier (🔍) icon on the left inside the field. May render active ' +
    'filters as pill-shaped chips immediately to the right of the search text. ' +
    'Can have a Filters button on the right end. Visually wider and more ' +
    'prominent than EuiFieldSearch. NOT EuiFieldSearch (standalone narrow ' +
    'search input). NOT EuiComboBox (no option dropdown from the bar itself).',

  EuiPageTemplate:
    'The full-page scaffold — not a single visible element but the overall ' +
    'layout structure. Recognizable as the combination of: an optional fixed ' +
    'left sidebar, a top page header region, and a main content area filling ' +
    'the remaining space. The sidebar has a distinct background color. ' +
    'In a screenshot, infer EuiPageTemplate from the two-column ' +
    'sidebar+content layout with a header strip above the content column.',

  EuiIcon:
    'A small SVG pictogram, typically 16px (s) or 24px (m) square. ' +
    'Transparent background by default. Used inline in text, inside buttons, ' +
    'or as standalone decorative/informational elements. Color matches the ' +
    'surrounding text or is explicitly set. NOT EuiButtonIcon (EuiIcon is ' +
    'not interactive; it has no click area or hover state). NOT EuiAvatar ' +
    '(which is circular with initials or an image). Identify by recognizing ' +
    'the specific glyph from the EUI icon set.',

  // ---------------------------------------------------------------------------
  // Remaining entries — contributions welcome
  // ---------------------------------------------------------------------------
};

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

async function main() {
  // Ensure docgen dist exists
  try {
    await fs.access(path.join(DOCGEN_DIST, 'components/index.json'));
  } catch {
    console.error(
      'Error: packages/eui-docgen/dist/components/index.json not found.\n' +
      'Run `yarn workspace @elastic/eui-docgen generate` first.'
    );
    process.exit(1);
  }

  // Clean previous output so stale component files don't accumulate
  await fs.rm(OUTPUT_DIR, { recursive: true, force: true });
  await fs.mkdir(path.join(OUTPUT_DIR, 'components'), { recursive: true });

  // ------------------------------------------------------------------
  // 1. Load all docgen component data
  // ------------------------------------------------------------------
  const docgenComponentFiles = await glob('components/**/*.json', {
    cwd: DOCGEN_DIST,
    ignore: ['components/index.json'],
  });

  const allDocgen = {};
  for (const file of docgenComponentFiles) {
    const data = JSON.parse(await fs.readFile(path.join(DOCGEN_DIST, file), 'utf8'));
    Object.assign(allDocgen, data);
  }

  // ------------------------------------------------------------------
  // 2. Load story metadata (category + defaults)
  // ------------------------------------------------------------------
  const storyFiles = await glob('components/**/*.stories.tsx', { cwd: EUI_SRC });
  const storyMeta = {};

  for (const file of storyFiles) {
    const content = await fs.readFile(path.join(EUI_SRC, file), 'utf8');
    const { title, defaults, playgroundArgs } = parseStoryFile(content);
    if (!title) continue;

    const compName = componentNameFromTitle(title);
    if (compName && !storyMeta[compName]) {
      storyMeta[compName] = {
        category: categoryFromTitle(title),
        defaults,
        playgroundArgs,
      };
    }
  }

  // ------------------------------------------------------------------
  // 3. Build index.json — lightweight catalog
  // ------------------------------------------------------------------
  const index = {};
  let skipped = 0;

  for (const [name, component] of Object.entries(allDocgen)) {
    if (!name.startsWith('Eui')) { skipped++; continue; }
    if (name.endsWith('Props') || name.endsWith('Type')) { skipped++; continue; }

    const meta = storyMeta[name];
    // Only emit components that have a Storybook story — these are the
    // user-facing, documented components. Sub-components and internals
    // (EuiToolTipPopover, EuiTourStepIndicator, etc.) are excluded.
    if (!meta) { skipped++; continue; }

    const description = COMPONENT_DESCRIPTIONS[name] ?? '';

    index[name] = {
      description,
      category: meta.category,
      propCount: Object.keys(component.props ?? {}).length,
    };
  }

  await fs.writeFile(
    path.join(OUTPUT_DIR, 'index.json'),
    JSON.stringify(index, null, 2)
  );
  console.log(`✓ index.json — ${Object.keys(index).length} components (${skipped} internal types skipped)`);

  // ------------------------------------------------------------------
  // 4. Generate per-component JSON files
  // ------------------------------------------------------------------
  let componentCount = 0;
  for (const [name, component] of Object.entries(allDocgen)) {
    if (!name.startsWith('Eui')) continue;
    if (name.endsWith('Props') || name.endsWith('Type')) continue;
    if (!storyMeta[name]) continue; // only user-facing, documented components

    const meta = storyMeta[name];
    const fileName = euiNameToFileName(name);
    const formattedProps = formatProps(component.props ?? {});
    const example = buildExample(name, meta.defaults ?? {}, meta.playgroundArgs ?? {});

    const componentData = {
      name,
      description: COMPONENT_DESCRIPTIONS[name] ?? '',
      // How this component looks in a screenshot or mockup — used by agents
      // doing visual recognition when no Figma metadata is available.
      // Fill in for each component: shape, color cues, borders, shadows,
      // typical size, and anything that distinguishes it from similar components.
      visualDescription: VISUAL_DESCRIPTIONS[name] ?? '',
      category: meta.category ?? 'Other',
      import: `import { ${name} } from '@elastic/eui';`,
      props: formattedProps,
      example,
    };

    await fs.writeFile(
      path.join(OUTPUT_DIR, 'components', `${fileName}.json`),
      JSON.stringify(componentData, null, 2)
    );
    componentCount++;
  }

  console.log(`✓ components/ — ${componentCount} JSON files`);

  // ------------------------------------------------------------------
  // 5. Write SKILL.md
  // ------------------------------------------------------------------
  const skillPath = path.join(OUTPUT_DIR, 'SKILL.md');
  await fs.writeFile(skillPath, generateSkillMd(Object.keys(index).length));
  console.log('✓ SKILL.md');

  console.log(`\n🎉 AI metadata written to packages/eui/metadata/`);
}

function euiNameToFileName(name) {
  // EuiButton → button, EuiButtonEmpty → button_empty
  return name
    .replace(/^Eui/, '')
    .replace(/([A-Z])/g, (_, c, offset) => (offset > 0 ? '_' : '') + c)
    .toLowerCase()
    .replace(/^_/, '');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
