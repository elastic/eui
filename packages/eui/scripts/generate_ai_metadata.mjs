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
  // Remaining entries
  // ---------------------------------------------------------------------------

  EuiAccordion:
    'A collapsible section with a clickable header row. The header contains ' +
    'a caret/arrow icon (left or right of the label) that rotates when the ' +
    'section is open. The body content slides in below the header with an ' +
    'animated height transition. In its collapsed state it looks like a ' +
    'single horizontal bar with a label and an arrow icon. NOT EuiPanel ' +
    '(which is always fully visible). NOT EuiTabs (which switch between ' +
    'views rather than revealing hidden content).',

  EuiBadgeGroup:
    'A flex-wrapping container for multiple EuiBadge pill elements. Visually ' +
    'appears as a row or multi-row cluster of pill-shaped chips with uniform ' +
    'gaps between them. Has no border or background of its own — the individual ' +
    'badges inside it supply the color and shape. NOT a single badge (always ' +
    'contains two or more).',

  EuiBottomBar:
    'A full-width dark-colored (dark grey or navy) horizontal bar fixed to ' +
    'the bottom edge of the viewport. Contains action buttons (typically ' +
    'Save and Cancel) laid out horizontally with standard padding. Sits on ' +
    'top of all page content. NOT EuiHeader (which is at the top). NOT ' +
    'EuiFooter (a generic component); EuiBottomBar is specifically a ' +
    'sticky action bar.',

  EuiButtonGroup:
    'A compact row of two or more adjacent buttons with shared borders, ' +
    'creating a segmented control appearance. The selected button has a ' +
    'filled (solid color) background; unselected buttons are outlined or ' +
    'subdued. Buttons are flush with no gap between them. NOT EuiTabs ' +
    '(which use underlines, not filled segments). NOT EuiFlexGroup of ' +
    'separate EuiButtons (those have gaps between them).',

  EuiCard:
    'A rectangular card-shaped panel with consistent internal padding. ' +
    'Typically contains: an icon or image at the top, a bold title below ' +
    'it, and one or two lines of description text. May include a footer ' +
    'with action buttons. Has a border and optional hover shadow when ' +
    'clickable. NOT EuiPanel (which has no fixed title/description/icon ' +
    'structure). NOT EuiStat (which only shows a metric value and label).',

  EuiCheckbox:
    'A small square checkbox input (~16px) with a visible border. When ' +
    'checked, displays a white checkmark on a blue/primary filled background. ' +
    'An indeterminate state shows a horizontal dash instead of a checkmark. ' +
    'Accompanied by a text label to its right. NOT EuiRadio (square vs ' +
    'circular). NOT EuiSwitch (checkbox is square; switch is a pill-shaped ' +
    'toggle).',

  EuiCheckboxGroup:
    'A vertical stack of EuiCheckbox items, each with a small square ' +
    'checkbox on the left and a text label to the right. Items are spaced ' +
    'with consistent vertical gaps. No outer border or background by default. ' +
    'NOT EuiRadioGroup (checkboxes are square and allow multi-select; radios ' +
    'are circular and single-select).',

  EuiCode:
    'Inline monospace text with a subtle light-grey background pill around ' +
    'it. Appears within a line of body text, slightly smaller than the ' +
    'surrounding text. No line numbers, no toolbar. NOT EuiCodeBlock ' +
    '(which is a multi-line block with a distinct container, optional copy ' +
    'button, and syntax highlighting).',

  EuiCodeBlock:
    'A multi-line rectangular block with a dark or light background, ' +
    'monospace font, and syntax-colored tokens (keywords, strings, etc.). ' +
    'Has a visible container with padding. May show line numbers on the ' +
    'left margin and a copy-to-clipboard button in the top-right corner. ' +
    'NOT EuiCode (which is a short inline snippet without a block container).',

  EuiCollapsibleNav:
    'A slide-in side panel anchored to the left edge of the viewport, used ' +
    'for app-level navigation. Wider than a typical flyout (~240–320px). ' +
    'Contains grouped navigation links, often with section headers and ' +
    'nested items. Can be docked (permanently open, pushing page content) ' +
    'or overlay (covering content). Has a close/hamburger toggle button. ' +
    'NOT EuiFlyout (which slides from the right and is for contextual ' +
    'content, not navigation).',

  EuiDataGrid:
    'A dense spreadsheet-style data table. Has a toolbar above the grid ' +
    'with column visibility toggles, density controls, and a fullscreen ' +
    'button. Column headers have resize handles (draggable dividers) and ' +
    'sort indicators. Cells are compact and content is truncated with ' +
    'ellipsis; clicking a cell opens a popover. Distinguishable from ' +
    'EuiBasicTable by the toolbar row above it and the column resize ' +
    'handles on the header cells.',

  EuiDatePicker:
    'A text input field that, when clicked, reveals a calendar popover below ' +
    'it. The input shows a formatted date/time string and a calendar icon on ' +
    'the right. The popover contains a month grid with day numbers, prev/next ' +
    'month navigation arrows, and optional time-picker inputs. NOT a plain ' +
    'EuiFieldText (has the calendar icon and calendar popover). NOT ' +
    'EuiSuperDatePicker (which is a larger date-range control with quick ' +
    'select options).',

  EuiDescriptionList:
    'A key-value pair list. Each entry shows a bold or emphasized term ' +
    '(the title) followed by its value (the description). Default layout ' +
    'stacks title above description vertically; column variant places them ' +
    'side by side with the title on the left in a narrower column. ' +
    'NOT a bullet list (no list markers). NOT EuiFormRow (not a form input).',

  EuiFieldNumber:
    'A single-line rectangular text input styled identically to EuiFieldText ' +
    'but constrained to numeric entry. Browser-native increment/decrement ' +
    'spinner arrows appear on the right inside the field on hover. Has a ' +
    'four-sided border and optional prepend/append elements. NOT EuiFieldText ' +
    '(number spinners are visible on hover). NOT a range slider.',

  EuiFieldPassword:
    'A single-line input where entered characters are masked as dots or ' +
    'asterisks by default. Visually identical to EuiFieldText except for ' +
    'the masked content. When the dual type is used, an eye icon button ' +
    'appears on the right to toggle visibility. NOT EuiFieldText (masking ' +
    'and the optional eye-icon toggle distinguish it).',

  EuiFieldSearch:
    'A single-line search input with a magnifier (🔍) icon embedded on the ' +
    'left inside the field. May show an × clear button on the right when ' +
    'text is present. Narrower and simpler than EuiSearchBar — no filter ' +
    'pills or additional controls adjacent to it. NOT EuiSearchBar (which ' +
    'is wider, may have a Filters button, and shows filter chips).',

  EuiFilePicker:
    'A file upload input area. In its large (default) variant it shows a ' +
    'rectangular dashed-border drop zone with an upload icon and a "Select ' +
    'or drag and drop" text prompt. In the compressed variant it renders as ' +
    'a standard button-like input that says "No file selected" or shows the ' +
    'chosen file name. NOT EuiFieldText (has drag-and-drop affordance).',

  EuiFlexGrid:
    'A layout-only container with no visual appearance of its own. ' +
    'Recognizable by its children being arranged in a fixed-column grid ' +
    '(1–4 equal-width columns) that wraps to new rows. Unlike EuiFlexGroup, ' +
    'columns are all the same width. Infer its presence from equal-width ' +
    'blocks arranged in a regular multi-column grid with consistent gaps.',

  EuiFlexItem:
    'A layout-only flex child element with no visual appearance of its own. ' +
    'Inside EuiFlexGroup it grows to fill available space by default. ' +
    'Cannot be identified visually in a screenshot — infer its presence ' +
    'from the children of a flex row being evenly or proportionally sized.',

  EuiFlyoutBody:
    'The scrollable content region inside an EuiFlyout. Fills the space ' +
    'between the flyout header and footer. Has internal padding and a ' +
    'scroll indicator when content overflows. Not independently identifiable ' +
    'outside of an EuiFlyout context.',

  EuiFlyoutFooter:
    'A sticky bar at the bottom of an EuiFlyout panel, visually separated ' +
    'from the scrollable body above by a thin top border. Contains action ' +
    'buttons (e.g. Save, Cancel) aligned left or right. Similar in ' +
    'appearance to EuiBottomBar but scoped inside a flyout.',

  EuiFlyoutHeader:
    'The top section of an EuiFlyout, separated from the body below by a ' +
    'thin bottom border. Typically contains an EuiTitle and sometimes ' +
    'breadcrumbs or a description. The × close button appears in the ' +
    'top-right corner of the flyout, adjacent to this header.',

  EuiForm:
    'A container wrapper with no distinctive visual appearance of its own. ' +
    'Groups EuiFormRow elements vertically with consistent spacing. May ' +
    'show a top-level error message strip when invalid. Infer its presence ' +
    'from a vertical stack of labeled input fields (each being an ' +
    'EuiFormRow). NOT EuiPanel (EuiForm provides form semantics; EuiPanel ' +
    'is a visual surface).',

  EuiGlobalToastList:
    'A stack of EuiToast notification cards anchored to the bottom-right ' +
    'corner of the viewport. Each toast is a rectangular card with a colored ' +
    'left accent (matching its type: info/success/warning/danger), a bold ' +
    'title, optional body text, and an × dismiss button in the top-right. ' +
    'Multiple toasts stack vertically with a small gap. NOT EuiCallOut ' +
    '(toasts are floating/positioned; callouts are inline in the page flow).',

  EuiHeader:
    'A fixed-height (48px) horizontal bar spanning the full viewport width, ' +
    'anchored to the top. Has a dark or light background with the Elastic ' +
    'logo on the left, navigation links in the middle, and user avatar / ' +
    'action icons on the right. May stack multiple header bars. NOT ' +
    'EuiPageHeader (which is inside the content area and has a large page ' +
    'title). NOT EuiTopNavMenu.',

  EuiHeaderBreadcrumbs:
    'Breadcrumb navigation styled specifically for the EuiHeader bar. ' +
    'Appears as a compact horizontal sequence of text links separated by ' +
    '› chevrons, fitted within the header height. The links are lighter ' +
    'or white-tinted to contrast with the dark header background. NOT ' +
    'standalone EuiBreadcrumbs (which appear below the header in the ' +
    'content area with dark text on a light background).',

  EuiHeaderLink:
    'A text link or label styled to fit inside the EuiHeader bar — same ' +
    'height as the header, horizontally padded, and with the header\'s ' +
    'text color. Appears as a clickable navigation label in the header. ' +
    'NOT EuiLink (which is an inline text link within body content).',

  EuiHeaderLinks:
    'A horizontal group of EuiHeaderLink items inside the EuiHeader. ' +
    'Displays as a row of evenly spaced navigation text labels at the top ' +
    'of the page. No visible separator between items (just horizontal ' +
    'padding). NOT EuiHeaderSectionItem (which wraps icon buttons and ' +
    'other non-link header elements).',

  EuiHeaderSectionItem:
    'An individual cell within the left or right section of EuiHeader. ' +
    'Vertically centers its child (logo, icon button, avatar, etc.) within ' +
    'the header height. Has no visible border or background of its own. ' +
    'Identifies as a flex item in the header bar.',

  EuiHighlight:
    'Inline text where a matching search substring is visually marked with ' +
    'a yellow or primary-color background highlight spanning just the matched ' +
    'characters. The rest of the text is unstyled. Appears within list items ' +
    'or body copy in search-result contexts. NOT EuiMark (which wraps the ' +
    'entire highlighted span in a semantic <mark> element with the same ' +
    'yellow background).',

  EuiHorizontalRule:
    'A thin horizontal line (1px) spanning the full width of its container ' +
    '(or quarter / half width via the size prop). Provides visual separation ' +
    'between sections. Has consistent top and bottom margin (vertical ' +
    'whitespace). NOT EuiSpacer (EuiSpacer is invisible whitespace; ' +
    'EuiHorizontalRule is a visible line).',

  EuiImage:
    'A responsive image element, optionally framed with a caption below it. ' +
    'May have a subtle shadow (`hasShadow`). When `allowFullScreen` is set, ' +
    'shows a small expand icon overlay in the corner that opens the image ' +
    'in a full-screen modal. NOT a raw <img> (EuiImage adds shadow, sizing, ' +
    'and optional fullscreen behavior).',

  EuiInMemoryTable:
    'Visually identical to EuiBasicTable — a data table with a header row, ' +
    'sortable column labels, and paginated rows. May additionally show a ' +
    'built-in EuiFieldSearch above the table for client-side filtering. ' +
    'The distinction from EuiBasicTable is invisible in a screenshot; both ' +
    'look the same. The search input above the table is a hint it may be ' +
    'EuiInMemoryTable.',

  EuiKeyPadMenu:
    'A grid of square or rectangular tile items arranged in rows of three ' +
    '(default). Each tile contains a large icon centered above a short text ' +
    'label. The tiles have a visible border and a hover background. Commonly ' +
    'shown inside a popover as an app launcher or navigation grid. NOT ' +
    'EuiButtonGroup (which is a linear row of adjacent buttons). NOT ' +
    'EuiListGroup (which is a vertical list, not a tile grid).',

  EuiKeyPadMenuItem:
    'A single square or rectangular tile with a large centered icon (~32px) ' +
    'above a short text label (~12px). Has a visible border, consistent ' +
    'padding, and a hover state that fills the background. Selected state ' +
    'shows a primary color fill or checkmark. Part of a EuiKeyPadMenu grid.',

  EuiLink:
    'Inline text styled as a hyperlink — primary blue color, underlined on ' +
    'hover. Renders as an anchor (<a>) or a button depending on whether ' +
    'href or onClick is provided. When external, adds a small external-link ' +
    'icon (↗) after the text. NOT EuiButton (no bounding box). NOT ' +
    'EuiButtonEmpty (EuiLink is inline within text, not a standalone control).',

  EuiListGroup:
    'A vertical list of action items or links, each in a full-width row ' +
    'with consistent padding. Items may include a leading icon, a text ' +
    'label, and optional trailing action icon buttons. With `bordered=true`, ' +
    'each item has a visible border, creating a bordered list card. NOT ' +
    'EuiSideNav (EuiListGroup has no nesting/tree structure). NOT a ' +
    'description list.',

  EuiListGroupItem:
    'A single row item within EuiListGroup. Full-width with horizontal ' +
    'padding. Contains an optional left icon, a text label (primary color ' +
    'when active), and optional right-side extra action buttons. The active ' +
    'item has a highlighted or bold label. Hover shows a light grey ' +
    'background.',

  EuiLoadingSpinner:
    'A circular ring (~16–40px diameter) that rotates continuously. ' +
    'The ring has a transparent gap that creates the spinning animation ' +
    'effect. Color matches the current theme\'s primary or subdued palette. ' +
    'NOT EuiLoadingElastic (which shows the animated Elastic logo, not a ' +
    'plain ring). NOT EuiProgress (which is a horizontal bar).',

  EuiLoadingElastic:
    'An animated version of the Elastic "E" logo mark used as a full-page ' +
    'or large-panel loading indicator. The logo pulses or animates in ' +
    'the brand color. Larger than EuiLoadingSpinner (typically 40–64px). ' +
    'NOT EuiLoadingSpinner (which is a plain circular ring). NOT EuiIcon ' +
    '(EuiLoadingElastic is animated).',

  EuiMark:
    'Inline text wrapped in a semantic <mark> element with a yellow or ' +
    'highlight-color background that spans just the marked word(s). ' +
    'The surrounding text is unstyled. Visually similar to EuiHighlight — ' +
    'both show highlighted text — but EuiMark wraps static content rather ' +
    'than dynamically matching a search query substring.',

  EuiConfirmModal:
    'A centered modal dialog with a dark full-viewport overlay. Contains: ' +
    'a header with a bold title and an × close button, a body with a short ' +
    'descriptive text paragraph, and a footer with exactly two buttons — ' +
    'a Cancel (empty/outlined) button and a primary action button (often ' +
    'red for destructive actions). Narrower than a general-purpose modal. ' +
    'NOT a multi-step wizard modal (only two footer buttons). NOT EuiFlyout.',

  EuiPagination:
    'A horizontal row of numbered page buttons with prev (‹) and next (›) ' +
    'arrow buttons on the ends. The active page number has a filled ' +
    'circular or rectangular background. Shows ellipsis (…) when the total ' +
    'page count is large and intermediate pages are collapsed. NOT ' +
    'EuiSteps (pagination is for navigation between data pages, not a ' +
    'sequential workflow indicator).',

  EuiPopover:
    'A floating panel that appears anchored to a trigger element (button, ' +
    'link, icon). Has a white or themed background, subtle border and ' +
    'shadow, rounded corners, and a small directional arrow pointing to the ' +
    'trigger. The panel can appear above, below, or to the sides of the ' +
    'trigger. NOT EuiToolTip (tooltip is smaller, text-only, appears on ' +
    'hover/focus; popover is triggered by click and can contain rich ' +
    'interactive content).',

  EuiProgress:
    'A full-width (of its container) thin horizontal bar. In indeterminate ' +
    'mode it shows an animated color sweep moving left-to-right. In ' +
    'determinate mode it shows a solid colored fill proportional to the ' +
    'value vs max. Height variants: xs (2px), s (4px), m (6px), l (8px). ' +
    'NOT EuiLoadingSpinner (horizontal bar vs circular ring). NOT a ' +
    'slider/range input.',

  EuiRadio:
    'A circular radio button input (~16px diameter) with a visible ring ' +
    'border. When selected, shows a filled primary-color dot inside the ' +
    'ring. Accompanied by a text label to its right. NOT EuiCheckbox ' +
    '(circular vs square). NOT EuiSwitch (radio is a small circle, switch ' +
    'is a pill-shaped toggle).',

  EuiRadioGroup:
    'A vertical stack of EuiRadio items, each with a small circular radio ' +
    'button on the left and a text label to the right. Items are spaced ' +
    'with consistent vertical gaps. Only one item can be selected at a time ' +
    '(filled circle). NOT EuiCheckboxGroup (circular vs square inputs).',

  EuiResizableContainer:
    'A two-panel layout with a thin draggable divider bar between the ' +
    'panels. The divider bar is a narrow vertical (or horizontal) strip ' +
    'with a grab handle icon (⠿ or ⋮) at its center. Panels resize as ' +
    'the user drags the divider. NOT EuiSplitPanel (which has a fixed ' +
    'divider with no dragging). NOT EuiFlyout.',

  EuiSelect:
    'A native HTML select dropdown. Appears as a single-line input-like ' +
    'box with the selected option text and a downward chevron on the right. ' +
    'Clicking opens the browser\'s native dropdown list. NOT EuiComboBox ' +
    '(which has in-field pill tags and a custom styled dropdown). NOT ' +
    'EuiSuperSelect (which uses a custom-styled popover instead of the ' +
    'native dropdown).',

  EuiSelectable:
    'A standalone searchable list panel. Has an optional search input at ' +
    'the top, then a scrollable list of option rows below. Each row shows ' +
    'a text label; selected rows show a checkmark (✓) on the right. ' +
    'Used inside a popover or panel — it is not an inline form input. ' +
    'NOT EuiComboBox (EuiSelectable is a standalone list, not an inline ' +
    'multi-value input field).',

  EuiSideNav:
    'A vertical tree navigation menu. Top-level items are bold section ' +
    'headers; child items are indented links with a smaller font weight. ' +
    'The currently selected item is highlighted with a primary-color text ' +
    'or a left accent bar. May include expand/collapse arrows for nested ' +
    'groups. NOT EuiListGroup (which is a flat list with no tree hierarchy ' +
    'or section headers). NOT EuiCollapsibleNav (which is the overlay ' +
    'panel that contains the side nav).',

  EuiSkeletonText:
    'Two to five horizontal grey bars of varying widths, stacked vertically ' +
    'with small gaps, mimicking a block of loading text lines. The bars ' +
    'have a soft, slightly animated shimmer effect. NOT EuiSkeletonRectangle ' +
    '(which is a single solid placeholder block). NOT EuiProgress (which ' +
    'is a thin loading bar, not text-shaped placeholders).',

  EuiSkeletonRectangle:
    'A single rectangular grey placeholder block with a shimmer animation, ' +
    'used to represent a loading image, chart, or UI block. Width and ' +
    'height are configurable. Has slightly rounded corners by default. ' +
    'NOT EuiSkeletonText (which is multiple thin lines). NOT EuiPanel ' +
    '(which is a visible content container, not a loading placeholder).',

  EuiSplitPanel:
    'Two adjacent panel sections (EuiSplitPanel.Inner) sharing a common ' +
    'border and grouped inside an outer container (EuiSplitPanel.Outer). ' +
    'In column (default) layout the inner panels stack vertically with a ' +
    'dividing border between them; in row layout they sit side by side. ' +
    'The divider is a fixed visible border, not draggable. NOT ' +
    'EuiResizableContainer (which has a draggable divider handle).',

  EuiSteps:
    'A vertical list of numbered procedural steps. Each step has a circular ' +
    'number badge on the left (e.g. "1", "2") followed by a bold step title ' +
    'to its right, with the step body content indented below. A vertical ' +
    'connector line may link step badges. Complete steps show a checkmark ' +
    'badge. NOT EuiPagination (steps are sequential instructions, not page ' +
    'navigation). NOT EuiTabs.',

  EuiSubSteps:
    'A compact nested list of sub-items indented inside an EuiSteps step ' +
    'body. Appears as a tighter, lower-prominence stack of numbered or ' +
    'bulleted items below a step\'s title. No circular badge — uses plain ' +
    'numbering or bullets. NOT a top-level EuiSteps list.',

  EuiSwitch:
    'A pill-shaped toggle control (~40px wide, ~20px tall). Has a circular ' +
    'thumb that slides left (off, grey background) or right (on, primary ' +
    'color background). Accompanied by a text label to the right. NOT ' +
    'EuiCheckbox (switch is pill-shaped; checkbox is square). NOT a ' +
    'radio button.',

  EuiTab:
    'A single tab item — a text label with generous top/bottom padding and ' +
    'no visible outer border. When active, shows a solid 2–3px underline in ' +
    'the primary color directly below the label. When inactive, the label ' +
    'is subdued. Part of an EuiTabs row. NOT a button (no bounding box ' +
    'visible at rest).',

  EuiTextAlign:
    'A transparent layout wrapper with no visual appearance of its own. ' +
    'Applies a text-align CSS property (left, center, right) to its ' +
    'children. Cannot be identified in a screenshot except by the resulting ' +
    'alignment of the contained text.',

  EuiToast:
    'A rectangular notification card (~320px wide) with a white or light ' +
    'background and a subtle left-side colored accent border (blue = info, ' +
    'green = success, yellow = warning, red = danger). Contains a bold ' +
    'title line, optional body text, and an × dismiss button in the ' +
    'top-right corner. Appears in a stack in the bottom-right of the ' +
    'viewport. NOT EuiCallOut (callouts are inline; toasts are floating ' +
    'and positioned).',

  EuiToolTip:
    'A small floating text bubble that appears near (above, below, or ' +
    'beside) an anchor element. Has a dark (near-black) background, white ' +
    'text, and a small directional arrow pointing to the anchor. Appears ' +
    'on hover or focus. Width is constrained (~200–250px). NOT EuiPopover ' +
    '(which has a light background, is triggered by click, and can hold ' +
    'rich content). NOT a browser native title tooltip.',

  EuiTour:
    'An annotating popover panel anchored to a highlighted UI element. ' +
    'Similar in shape to EuiPopover but has an additional header with a ' +
    'step counter ("Step 1 of 5"), a subtitle, a title, body content, and ' +
    'a footer row with navigation buttons (End tour / Next). A beacon ' +
    'or highlight outline may appear around the anchor element. NOT a ' +
    'plain EuiPopover (EuiTour includes the step counter and navigation ' +
    'footer).',

  EuiTreeView:
    'A hierarchical list with expand/collapse toggle icons. Each node row ' +
    'shows an optional leading icon (folder/file glyph), a text label, and ' +
    'a right-pointing chevron that rotates down when the node is expanded. ' +
    'Child nodes are indented relative to their parent. NOT EuiSideNav ' +
    '(EuiTreeView is for data hierarchies like file trees; EuiSideNav is ' +
    'for app page navigation). NOT EuiAccordion (EuiTreeView supports ' +
    'unlimited nesting and uses tree-specific icons).',

  EuiAvatar:
    'A circular element displaying up to two initials or an image inside it. ' +
    'The circle has a colored background (drawn from the EUI visualization ' +
    'palette by default) and comes in four sizes: s, m, l, xl. When an ' +
    'imageUrl is provided the initials are replaced by the photo. NOT ' +
    'EuiIcon (EuiAvatar is always circular and represents a person or entity).',

  EuiBetaBadge:
    'A small pill-shaped badge with a short label such as "Beta" or ' +
    '"Tech preview". It has a subtle hollow or accent-colored border, ' +
    'optional small icon to the left of the label, and shows a tooltip on ' +
    'hover explaining the pre-GA status. NOT EuiBadge (EuiBetaBadge is ' +
    'specifically for feature-maturity labeling with a tooltip).',

  EuiCheckableCard:
    'A bordered rectangular card panel that contains a radio button or ' +
    'checkbox in the top-left corner, a title, and optional child content ' +
    'below. Selecting the card highlights its border. Visually it looks like ' +
    'a larger, more prominent version of a radio/checkbox row. NOT EuiCard ' +
    '(EuiCheckableCard embeds a selection control; plain EuiCard is ' +
    'click-only).',

  EuiColorPicker:
    'A form control composed of a small colored swatch button that, when ' +
    'clicked, opens a popover containing an HSV gradient canvas, a hue ' +
    'slider, optional alpha slider, a hex/RGB text input, and a row of ' +
    'preset color swatches. NOT EuiColorPalettePicker (EuiColorPicker picks ' +
    'a single color; EuiColorPalettePicker picks a named palette).',

  EuiColorPaletteDisplay:
    'A thin horizontal bar (~24px tall) that renders a color gradient or ' +
    'series of fixed color blocks side-by-side to preview a palette. It is ' +
    'read-only and purely visual. NOT EuiColorPalettePicker (the display ' +
    'variant shows the palette but does not allow selection).',

  EuiColorPalettePicker:
    'A select-style dropdown button that shows the currently selected ' +
    'palette as a small horizontal color bar inside the button. Opening the ' +
    'dropdown reveals a list of named palettes, each with its color bar ' +
    'preview and label. NOT EuiColorPicker (EuiColorPalettePicker selects ' +
    'a multi-color palette; EuiColorPicker selects a single color).',

  EuiComment:
    'A single feed item composed of a circular avatar or icon on the left, ' +
    'a header row with author name, action text, and timestamp, and an ' +
    'optional bordered body panel below. Used inside EuiCommentList to form ' +
    'a conversation thread. NOT EuiTimeline (EuiComment includes user ' +
    'attribution and a collapsible body; EuiTimeline is a generic icon + ' +
    'content row).',

  EuiCommentList:
    'A vertical feed of EuiComment items connected by a thin vertical line ' +
    'running through their avatar column, giving a timeline appearance. The ' +
    'list container provides spacing and accessibility markup. NOT ' +
    'EuiTimeline (EuiCommentList is specifically for user-authored comments ' +
    'and system events; EuiTimeline is a lower-level building block).',

  EuiContextMenu:
    'A multi-level dropdown panel that looks like a card-style menu with ' +
    'rows of labeled items, each optionally preceded by a small icon. ' +
    'Sub-panels slide in from the right with a back-arrow header. Displayed ' +
    'inside an EuiPopover anchored to a trigger button. NOT EuiListGroup ' +
    '(EuiContextMenu supports nested panels and is triggered by a popover).',

  EuiDatePickerRange:
    'Two date/time input fields ("Start date" and "End date") placed ' +
    'side-by-side inside a single bordered form-control container, ' +
    'separated by an em-dash or arrow icon. Each field opens its own ' +
    'calendar popover when focused. NOT EuiSuperDatePicker ' +
    '(EuiDatePickerRange is a simple two-field date range without ' +
    'quick-select presets or a Refresh button).',

  EuiDescribedFormGroup:
    'A two-column form layout: the left column holds a title and descriptive ' +
    'text rendered in a smaller subdued style; the right column holds one or ' +
    'more EuiFormRow fields. On mobile the columns collapse to a single ' +
    'stack. NOT EuiFormRow (EuiDescribedFormGroup adds the description ' +
    'column alongside the input).',

  EuiDualRange:
    'A horizontal range slider with two draggable thumbs, one for the ' +
    'minimum value and one for the maximum. The track between the two thumbs ' +
    'is highlighted. Optional min/max labels appear at either end. NOT ' +
    'EuiRange (EuiDualRange has two handles for selecting a value range; ' +
    'EuiRange has a single handle).',

  EuiExpression:
    'An inline clause rendered as two adjacent colored text segments: a ' +
    'subdued label (the "description", e.g. "when") followed by a bold ' +
    'value (e.g. "count()"). The pair can be made clickable, adding a dashed ' +
    'underline. Multiple expressions can be placed in a row to form a query ' +
    'sentence. NOT EuiBadge (EuiExpression is a two-part label+value clause, ' +
    'not a standalone tag).',

  EuiFacetButton:
    'A flat text button with a label on the left and a small numeric count ' +
    'badge on the right. An optional leading icon or avatar can precede the ' +
    'label. When selected, the button appears bold/active. NOT EuiFilterButton ' +
    '(EuiFacetButton is used inside facet lists for multi-select filtering; ' +
    'EuiFilterButton appears inside a grouped filter bar).',

  EuiFacetGroup:
    'A vertical (or horizontal) list of EuiFacetButton items with consistent ' +
    'spacing and no outer border. It acts as a layout wrapper that aligns ' +
    'the count badges and optional icons across all child facet buttons. NOT ' +
    'EuiFilterGroup (EuiFacetGroup is an ungrouped list; EuiFilterGroup ' +
    'shares borders between buttons like a segmented control).',

  EuiFilterButton:
    'A bordered button styled for use inside a filter bar. It shows a text ' +
    'label and optionally a small numericNotificationBadge indicating how ' +
    'many items match the active filter. An active state changes the ' +
    'button\'s background. NOT EuiFacetButton (EuiFilterButton lives inside ' +
    'EuiFilterGroup sharing borders; EuiFacetButton is a standalone list ' +
    'item).',

  EuiFilterGroup:
    'A row of EuiFilterButton elements enclosed in a shared rounded-corner ' +
    'border, making them appear as a segmented button group. Adjacent buttons ' +
    'share a single dividing border rather than having separate outlines. NOT ' +
    'EuiButtonGroup (EuiFilterGroup is for search/filter controls and ' +
    'supports notification badges; EuiButtonGroup is a generic option ' +
    'selector).',

  EuiFlyoutResizable:
    'Identical in appearance to EuiFlyout — a full-height overlay panel ' +
    'anchored to the right (or left) viewport edge — but with a visible ' +
    'drag handle on its inner edge that lets users resize the panel width by ' +
    'dragging. NOT EuiFlyout (EuiFlyoutResizable adds the resizable drag ' +
    'handle; prefer EuiFlyout with resizable={true} for new code).',

  EuiIconTip:
    'A small standalone icon — typically a filled circle-question "?" or ' +
    'circle-information "i" glyph (~16px) — that displays a tooltip with ' +
    'explanatory text when hovered or focused. No visible label text is ' +
    'shown next to the icon. NOT EuiToolTip (EuiIconTip is a self-contained ' +
    'component that includes the icon; EuiToolTip wraps any arbitrary ' +
    'element).',

  EuiLoadingChart:
    'An animated placeholder that mimics a bar chart skeleton: three to five ' +
    'vertical bars of varying height that pulse or shimmer to indicate data ' +
    'is loading. NOT EuiLoadingSpinner (EuiLoadingChart suggests chart ' +
    'content is loading; EuiLoadingSpinner is a generic circular spinner). ' +
    'NOT EuiSkeleton (EuiLoadingChart is a fixed bar-chart animation, not ' +
    'a content-shaped skeleton block).',

  EuiLoadingLogo:
    'An animated Elastic product logo (defaulting to the Elastic mark or a ' +
    'specified product logomark) with a pulsing or fading animation, shown ' +
    'at a large size (xl or xxl). Used on full-page or large-panel loading ' +
    'screens. NOT EuiLoadingSpinner (EuiLoadingLogo shows a product logo; ' +
    'EuiLoadingSpinner shows a generic ring).',

  EuiMarkdownEditor:
    'A split-pane authoring area with a toolbar of formatting buttons across ' +
    'the top (bold, italic, link, list, etc.), a plain textarea for raw ' +
    'markdown on the left/bottom, and a rendered preview pane toggled by ' +
    'tabs. A drag-and-drop file zone may appear at the bottom. NOT ' +
    'EuiMarkdownFormat (EuiMarkdownEditor is an interactive editor; ' +
    'EuiMarkdownFormat is read-only rendered output).',

  EuiMarkdownFormat:
    'A read-only rendered markdown block: headings, paragraphs, bold/italic ' +
    'text, inline code, fenced code blocks, bullet and numbered lists, ' +
    'horizontal rules, and links, all styled with EUI typography tokens. No ' +
    'editing controls are visible. NOT EuiMarkdownEditor (EuiMarkdownFormat ' +
    'only renders; it has no toolbar or textarea).',

  EuiNotificationBadge:
    'A very small (~18px) filled circle or rounded pill containing a bold ' +
    'number. Default color is accent (red-ish); also available in success ' +
    'and subdued. Typically overlaid on or placed adjacent to a button to ' +
    'show a count of notifications or active filters. NOT EuiBadge ' +
    '(EuiNotificationBadge is a compact numeric-only indicator; EuiBadge is ' +
    'a wider text/label tag).',

  EuiRange:
    'A horizontal slider control with a single draggable thumb on a track. ' +
    'Optional min/max labels appear at each end; an optional tooltip above ' +
    'the thumb shows the current value. NOT EuiDualRange (EuiRange has one ' +
    'thumb; EuiDualRange has two thumbs for a min/max range). NOT ' +
    'EuiFieldNumber (EuiRange is a slider, not a text input).',

  EuiSplitButton:
    'Two buttons joined into one visual unit sharing a border radius: a ' +
    'wider primary action button on the left with a text label, and a narrow ' +
    'chevron-down icon button on the right separated by a thin divider. ' +
    'Clicking the chevron opens a dropdown of secondary actions. NOT ' +
    'EuiButton with append (EuiSplitButton is a distinct two-part component ' +
    'with separate click targets).',

  EuiSuperDatePicker:
    'A date-range picker control rendered as a row containing: a quick-select ' +
    'button (clock icon), a "from" date input, a dash separator, a "to" date ' +
    'input, and a blue "Refresh" or "Update" button on the right. Clicking ' +
    'the quick-select opens a popover with preset ranges like "Last 15 ' +
    'minutes". NOT EuiDatePickerRange (EuiSuperDatePicker includes ' +
    'quick-select presets, datemath support, and a Refresh button).',

  EuiSuperSelect:
    'A custom-styled select control that looks like a bordered input button ' +
    'showing the selected option\'s content (text, icon, or rich node) and a ' +
    'trailing chevron. Clicking opens a popover listbox of options rather ' +
    'than the browser\'s native select dropdown. NOT EuiSelect (EuiSuperSelect ' +
    'uses a custom popover and supports rich option content; EuiSelect uses ' +
    'the native browser select element).',

  EuiTabbedContent:
    'A combined component showing a horizontal tab bar (EuiTabs) at the top ' +
    'with the selected tab\'s content panel rendered immediately below it. The ' +
    'active tab has an underline indicator. NOT EuiTabs alone (EuiTabbedContent ' +
    'manages the tab bar and the associated content panel together; EuiTabs ' +
    'is only the bar).',

  EuiTextArea:
    'A multi-line bordered text input box, visually taller than a single-line ' +
    'EuiFieldText. Renders the HTML textarea element styled with EUI form ' +
    'control tokens — rounded corners, focus ring, and consistent padding. ' +
    'NOT EuiFieldText (EuiTextArea is multi-line; EuiFieldText is ' +
    'single-line). NOT EuiMarkdownEditor (EuiTextArea is a plain text area ' +
    'with no markdown toolbar).',

  EuiTimeline:
    'A vertical list of event items where each row has a circular icon badge ' +
    'on the left (containing an EuiIcon glyph) and free-form content on the ' +
    'right, with items connected by a thin vertical line through the icon ' +
    'column. NOT EuiCommentList (EuiTimeline is a generic icon+content list; ' +
    'EuiCommentList is built on top of it specifically for user comments). ' +
    'NOT EuiSteps (EuiTimeline has no step numbers or progress state).',

  EuiToken:
    'A small (~16–24px) rounded-square chip with a colored or tinted ' +
    'background containing a single icon glyph centered inside it. Colors ' +
    'and shapes communicate data type (e.g. tokenString, tokenNumber, ' +
    'tokenGeo). Used inline in field lists, search suggestions, and code ' +
    'editors. NOT EuiIcon (EuiToken always has the colored background chip; ' +
    'EuiIcon is a bare SVG glyph with no background container).',

  // Visible utility / sub-components worth recognising
  EuiSkeletonCircle:
    'A circular grey placeholder disc with a shimmer animation, used to ' +
    'represent a loading avatar or icon. Diameter is configurable. NOT ' +
    'EuiSkeletonRectangle (which is rectangular). NOT EuiAvatar (which ' +
    'shows actual content).',

  EuiSkipLink:
    'A visually hidden anchor link that becomes visible on keyboard focus, ' +
    'typically rendered as a small pill in the top-left corner of the page. ' +
    'Used for keyboard accessibility to jump to main content. Invisible in ' +
    'mouse-driven screenshots.',

  EuiStepHorizontal:
    'A horizontal row of numbered step indicators. Each step is a circle ' +
    'containing a number (or checkmark if complete), connected to adjacent ' +
    'steps by a horizontal line. Below each circle sits a short text label. ' +
    'NOT EuiSteps (which is vertical with expanded content per step).',

  EuiTable:
    'The low-level semantic HTML table wrapper. Visually identical to ' +
    'EuiBasicTable — header row, data rows, horizontal dividers. Use ' +
    'EuiBasicTable or EuiInMemoryTable in preference; EuiTable is the ' +
    'primitive used when full manual control of rows and cells is needed.',

  EuiTourStep:
    'A single step in a guided tour: a popover-shaped panel anchored to ' +
    'a highlighted element, containing a step-counter badge, a title, body ' +
    'text, and navigation buttons (Next / End tour). Has a subtle beacon ' +
    'or pulsing highlight around the anchor. NOT EuiPopover (EuiTourStep ' +
    'adds the step counter and navigation footer).',

  EuiInlineEditText:
    'A piece of body text that, when clicked, transitions into an inline ' +
    'text input field with Save and Cancel icon buttons appearing to its ' +
    'right. In read mode it looks like regular EuiText. In edit mode it ' +
    'looks like EuiFieldText with two action icons. NOT EuiFieldText alone.',

  EuiBeacon:
    'A small pulsing circle (~8–12px) used as a visual attention indicator ' +
    'or "live" dot, similar to a notification dot. It animates with a ' +
    'ripple/pulse effect. Color is typically success-green or accent. NOT ' +
    'EuiHealth (EuiBeacon pulsates; EuiHealth is a static dot).',

  EuiTablePagination:
    'A combined control row sitting below a data table, containing a ' +
    '"Rows per page" select dropdown on the left and an EuiPagination ' +
    'page-number control on the right. NOT EuiPagination alone (which ' +
    'has only the page buttons with no rows-per-page control).',
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
