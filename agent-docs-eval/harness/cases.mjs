// Case definitions. Accept/reject/use sets are frozen before the runs (tracker: "Eval cases").
// pick(a) -> { ok, why }; use(a) -> { check: bool }. `a` comes from analyze.mjs. JSX attr values are
// the literal string for string literals, `{expr}` for anything else.
import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import { createRequire } from 'node:module';

const req = createRequire(path.join(os.homedir(), 'kbx/base-a/kibana/package.json'));
const iconMap = req('@elastic/eui/lib/components/icon/icon_map.js').typeToPathMap;
const deprecatedRule = req(path.join(os.homedir(), 'kbx/base-a/kibana/node_modules/@elastic/eslint-plugin-eui/lib/cjs/rules/no_deprecated_icon_aliases.js'));
const DEPRECATED = new Set([
  ...Object.keys(deprecatedRule.DEPRECATED_ICON_ALIASES),
  ...deprecatedRule.DEPRECATED_ICONS_WITHOUT_REPLACEMENT,
  ...Object.keys(deprecatedRule.DEPRECATED_ICONS_WITH_GUIDANCE),
]);

const has = (el, k) => el.attrs[k] !== undefined;
const is = (el, k, v) => el.attrs[k] === v || el.attrs[k] === `{${v}}`;

// Accept: any alternative whose components are all newly rendered. Reject: [label, regex on added text].
function pickBy(a, alternatives, rejects = []) {
  const alt = alternatives.find((names) => names.every((n) => a.rendered(n)));
  const hits = rejects.filter(([, re]) => re.test(a.added)).map(([label]) => label);
  if (!alt) return { ok: false, why: `none of ${alternatives.map((x) => x.join('+')).join(' | ')} rendered${hits.length ? `; ${hits.join(', ')}` : ''}` };
  if (hits.length) return { ok: false, why: `reject: ${hits.join(', ')}` };
  return { ok: true, why: alt.join('+') };
}

const START = 'Start in';
const SCOPE = 'Keep the change scoped to this feature.';

const flyoutEls = (a) => [...a.newEls('EuiFlyout'), ...a.newEls('EuiFlyoutResizable')];
const flyoutUse = (a) => ({
  typePush: flyoutEls(a).some((e) => is(e, 'type', 'push')),
  sizeAndWidth: flyoutEls(a).some((e) => has(e, 'size') && (has(e, 'minWidth') || has(e, 'maxWidth'))),
});
// Report-only: the default pushMinBreakpoint ('l') already gives push-on-wide, overlay-on-narrow.
// Report-only copy review (content guidelines): new i18n strings, and those in Title Case.
const newCopy = (a) => [...a.added.matchAll(/defaultMessage[:=]\s*\{?\s*(['"`])((?:\\.|(?!\1).)*)\1/g)].map((m) => m[2]);
const copyExtra = (a) => {
  const copy = newCopy(a);
  // Per sentence, so a capital after a full stop does not count
  const titleCase = copy.filter((t) => t.split(/[.?!]\s+/).some((sentence) => sentence.split(/\s+/).slice(1).filter((w) => /^[A-Z][a-z]/.test(w)).length >= 2));
  return { copy, titleCase };
};
const flyoutExtra = (a) => ({ pushMinBreakpoint: flyoutEls(a).some((e) => has(e, 'pushMinBreakpoint')) });
const splitButtonUse = (a) => {
  const sec = a.newEls('EuiSplitButton.ActionSecondary');
  return {
    primary: a.rendered('EuiSplitButton.ActionPrimary'),
    secondaryNamed: sec.some((e) => has(e, 'aria-label') || has(e, 'aria-labelledby')),
    secondaryOpensMenu: sec.some((e) => has(e, 'popoverProps') || has(e, 'onClick')),
  };
};
// S8: toggle filters with counts.
const filterPick = (a) => pickBy(a, [['EuiFilterGroup', 'EuiFilterButton'], ['EuiButtonGroup']], [['raw aria-pressed button', /<button[^>]*aria-pressed/]]);
const filterUse = (a) => {
  const fb = a.newEls('EuiFilterButton').filter((e) => a.inside(e, 'EuiFilterGroup'));
  const bg = a.newEls('EuiButtonGroup');
  return {
    toggleSelected: fb.some((e) => has(e, 'isToggle') && (has(e, 'isSelected') || has(e, 'hasActiveFilters'))) || bg.some((e) => is(e, 'type', 'multi') && has(e, 'idToSelectedMap')),
    // A count in the button label meets the ticket as well as a numFilters badge.
    count: fb.some((e) => has(e, 'numFilters') || has(e, 'numActiveFilters') || /count|total|length/i.test(e.body.slice(e.text.length))) || bg.length > 0,
    // Separate groups per button render as separate boxes, not one filter bar.
    oneGroup: bg.length > 0 || a.newEls('EuiFilterGroup').some((g) => (g.body.match(/<EuiFilterButton\b/g) ?? []).length >= 2),
    legend: !bg.length || bg.some((e) => has(e, 'legend')),
  };
};
// S9: search with filters. EuiFieldSearch + EuiFilterGroup is the same composition EuiSearchBar renders.
const searchAlts = [['EuiSearchBar'], ['EuiSelectable', 'EuiInputPopover'], ['EuiSelectable', 'EuiPopover'], ['EuiFieldSearch', 'EuiFilterGroup']];
const searchUse = (a) => {
  const sb = a.newEls('EuiSearchBar');
  const sel = a.newEls('EuiSelectable');
  return {
    boxAndFilters: sb.some((e) => has(e, 'box') && has(e, 'filters')) || sel.some((e) => has(e, 'searchable') && (a.inside(e, 'EuiInputPopover') || a.inside(e, 'EuiPopover'))) || (a.rendered('EuiFieldSearch') && a.rendered('EuiFilterGroup')),
  };
};
const COLOR_LITERAL = /['"`]#[0-9a-f]{3,8}['"`]|\b(rgba?|hsla?)\(/i;
const newIcons = (a) => a.icons.filter((i) => i.isNew && typeof i.value === 'string' && !/^\{/.test(i.value)).map((i) => i.value);

const iconBad = (v) => !(v in iconMap) || DEPRECATED.has(v);
const iconShowcasePick = (a, min) => {
  const icons = [...new Set(newIcons(a))];
  const bad = icons.filter(iconBad);
  if (icons.length < min) return { ok: false, why: `only ${icons.length} literal icons: ${icons.join(', ')}` };
  return { ok: !bad.length, why: `${icons.length - bad.length}/${icons.length} valid${bad.length ? `; blank: ${bad.join(', ')}` : ''}` };
};
const iconShowcaseExtra = (a) => {
  const icons = [...new Set(newIcons(a))];
  return { icons, blank: icons.filter(iconBad) };
};

// Status icons: icons under a key named for the status (`paused: { iconType }`, `{ paused: 'pause' }`).
const P1_STATUSES = ['running', 'paused', 'failing', 'completed'];

const I_HOST = 'x-pack/platform/plugins/shared/evals/public/components/create_online_eval_flyout/index.tsx';
const I_STALE = ['checkInCircleFilled', 'popout'];
const iHostIcons = (a) => a.icons.filter((i) => i.file === I_HOST && typeof i.value === 'string' && !/^\{/.test(i.value)).map((i) => i.value);

const S1_PAUSED =['pause', 'minusCircle', 'hourglass', 'clock', 'clockCounter'];
// 'alert' is the deprecated alias of 'warning': right pick, so it fails Use (noDeprecated), not Pick.
const S1_DEGRADED = ['warning', 'warningFill', 'alert'];

export const cases = [
  {
    id: 'S1',
    dropped: 'both pass with identical icons; the model knows them',
    kind: 'select',
    project: 'x-pack/platform/plugins/shared/agent_builder',
    prompt: `The Status column on the MCP clients table only shows Active and Revoked. We need two more states, Paused and Degraded, so admins can tell at a glance when a client is temporarily disabled or running with problems. The API will return two new optional booleans on each client, 'paused' and 'degraded'; add them to the OAuthClient type in @kbn/agent-builder-common. Revoked takes precedence over Paused, and Paused over Degraded. Each status should show a small icon next to its label, and the Paused and Degraded icons should be visually distinct from each other and from the existing ones. The status filter above the table should offer the new states too. ${START} x-pack/platform/plugins/shared/agent_builder/public/application/components/mcp_clients/mcp_client_status_indicator.tsx. ${SCOPE}`,
    pick(a) {
      const icons = a.icons.filter((i) => i.isNew).map((i) => i.value);
      const rejects = [
        ['custom svg', /<svg\b/],
        ['emoji', /\p{Extended_Pictographic}/u],
        ['icon asset import', /from ['"][^'"]*(\/assets\/|\.svg['"])/],
      ].filter(([, re]) => re.test(a.added)).map(([l]) => l);
      const paused = icons.find((v) => S1_PAUSED.includes(v));
      const degraded = icons.find((v) => S1_DEGRADED.includes(v));
      const ok = !!paused && !!degraded && !rejects.length;
      return { ok, why: `icons: ${icons.join(', ') || 'none'}${rejects.length ? `; reject: ${rejects.join(', ')}` : ''}` };
    },
    use: (a) => {
      const icons = newIcons(a);
      return {
        noDeprecated: !icons.some((v) => DEPRECATED.has(v)),
        allValid: icons.every((v) => v in iconMap),
      };
    },
  },
  {
    id: 'S2',
    dropped: 'both pass with the same flyout props; effort win only, P1 covers the flyout',
    kind: 'select',
    project: 'x-pack/platform/plugins/shared/context_engine',
    prompt: `On the knowledge indicators list, clicking a row jumps straight to the full indicator page, and people lose their place in the list. We want a quick-preview panel with the title, type, status and last-updated time. On wide screens it should sit next to the table so the list stays usable, and on narrow screens it should cover the table instead. It needs a sensible minimum width so the content never gets cramped. The full page should stay reachable from the preview. ${START} x-pack/platform/plugins/shared/context_engine/public/application/components/ki/list/list_ki_table.tsx. ${SCOPE}`,
    pick: (a) =>
      pickBy(a, [['EuiFlyout'], ['EuiFlyoutResizable']], [
        ['vw width', /\b\d+vw\b/],
        ['window width', /innerWidth|addEventListener\(\s*['"]resize|matchMedia\(/],
        ['breakpoint hook', /useIsWithinBreakpoints|useCurrentEuiBreakpoint/],
      ]),
    use: flyoutUse,
    extra: flyoutExtra,
  },
  {
    id: 'S3',
    dropped: 'both pass; the model knows EuiAccordion',
    kind: 'select',
    project: 'x-pack/platform/plugins/shared/agent_builder',
    prompt: `The stale attachments banner in a conversation can get tall when many attachments are out of date, and it pushes the chat down. The list of stale attachments should be collapsible, with the summary line and the Use updated versions and Dismiss actions staying visible. ${START} x-pack/platform/plugins/shared/agent_builder/public/application/components/conversations/stale_attachments_panel.tsx. ${SCOPE}`,
    pick: (a) => pickBy(a, [['EuiAccordion']]),
    use: (a) => {
      const els = a.newEls('EuiAccordion');
      return {
        idAndButtonContent: els.some((e) => has(e, 'id') && has(e, 'buttonContent')),
        noCustomToggle: !a.icons.some((i) => i.isNew && /^(arrow|chevron)/.test(i.value)),
      };
    },
  },
  {
    id: 'S4',
    dropped: 'both pass; the model knows EuiContextMenu panels',
    kind: 'select',
    project: 'x-pack/platform/plugins/shared/cases',
    prompt: `In the alerts tab of a case, the row menu only offers 'Remove from case'. Users also want to change an alert's workflow status from here. Add a 'Change status' item to the row menu. Choosing it should show the available options (Open, Acknowledged, Closed) within the same menu, with a way to go back to the main items. Picking an option should call a status change handler passed in from the parent; wiring it to the backend is out of scope. ${START} x-pack/platform/plugins/shared/cases/public/components/attachments/alert/components/stack_alert_actions_cell.tsx. ${SCOPE}`,
    pick: (a) => pickBy(a, [['EuiContextMenu']]),
    use: (a) => {
      const els = a.newEls('EuiContextMenu');
      return {
        panels: els.some((e) => has(e, 'panels')),
        initialPanelId: els.some((e) => has(e, 'initialPanelId')),
        nestedPanel: /\bpanel:\s*['"\w]/.test(a.added),
        insidePopover: els.some((e) => a.inside(e, 'EuiPopover')),
      };
    },
  },
  {
    id: 'S5',
    kind: 'select',
    project: 'x-pack/platform/plugins/shared/fleet',
    prompt: `When Browse integrations returns no results, the empty state offers only 'Create integration'. We also want users to be able to upload an existing package from there. The empty state should still have a single action control: Create integration must stay one click, and 'Upload package' (it links to the upload page) should be offered from that same control as an alternative way to create, not as a separate button or link. ${START} x-pack/platform/plugins/shared/fleet/public/applications/integrations/sections/epm/screens/browse_integrations/components/no_data_prompt.tsx. ${SCOPE}`,
    pick: (a) => pickBy(a, [['EuiSplitButton']], [['border-radius hack', /border-?[rR]adius/]]),
    use: splitButtonUse,
  },
  {
    id: 'C1',
    kind: 'control',
    project: 'x-pack/solutions/observability/plugins/nightshift',
    prompt: `Memory pages in the knowledge list can only be opened. Users want to manage them without opening each one. Each memory page row should have an Edit action and a Delete action at the right end, as icons so the row stays compact. Hovering an action should show what it does. The rows are used on both the memory home and the activity views, so the actions should show wherever the row appears, and the parent decides what to do on click. ${START} x-pack/solutions/observability/plugins/nightshift/public/knowledge/memory/page_row.tsx. ${SCOPE}`,
    pick(a) {
      const btns = a.newEls('EuiButtonIcon');
      const clickableIcon = a.newEls('EuiIcon').some((e) => has(e, 'onClick'));
      if (clickableIcon) return { ok: false, why: 'clickable EuiIcon' };
      return { ok: btns.length >= 2, why: `${btns.length} EuiButtonIcon` };
    },
  },
  {
    id: 'S6',
    dropped: 'both pass without opening the docs',
    kind: 'select',
    project: 'x-pack/solutions/observability/plugins/uptime',
    prompt: `In Uptime settings, the Heartbeat indices field is a plain text box where you type a comma-separated list of index patterns. People mistype names and have no way to see which indices exist. Let users choose several indices from the ones available on the cluster by typing to narrow the list, and still allow entering a custom pattern such as heartbeat-*. The selected values must keep being saved in the same comma-separated format. ${START} x-pack/solutions/observability/plugins/uptime/public/legacy_uptime/components/settings/indices_form.tsx. ${SCOPE}`,
    pick: (a) => pickBy(a, [['EuiComboBox']], [['form-control CSS', /euiFormControl/]]),
    use: (a) => {
      const els = a.newEls('EuiComboBox');
      return {
        optionsSelectedOnChange: els.some((e) => has(e, 'options') && has(e, 'selectedOptions') && has(e, 'onChange')),
        multi: els.some((e) => !has(e, 'singleSelection') || is(e, 'singleSelection', 'false')),
        labelled: els.some((e) => a.inside(e, 'EuiFormRow') || a.inside(e, 'EuiDescribedFormGroup') || has(e, 'aria-label') || has(e, 'aria-labelledby')),
        customPatterns: els.some((e) => has(e, 'onCreateOption')),
      };
    },
  },
  {
    // Replaces the frozen "popover anchored to EuiScreenReaderOnly" case: that utility moves content
    // to left:-10000px, so a popover anchored inside it opens off-screen (cases assignees_field.tsx).
    id: 'S7',
    dropped: 'same component as H2; both pass with the same diff, effort win only',
    kind: 'select',
    project: 'x-pack/platform/plugins/private/snapshot_restore',
    prompt: `In Snapshot and Restore, the Restore status table cuts long index names off at the end. Restored data stream backing indices such as .ds-logs-nginx.access-production-2026.11.02-000014 then all look the same: the start tells you which data stream it is and the end tells you the date and generation. Show long index names so both the start and the end stay visible, and keep the full name available to the user. ${START} x-pack/platform/plugins/private/snapshot_restore/public/application/sections/home/restore_list/restore_table/restore_table.tsx. ${SCOPE}`,
    pick: (a) =>
      pickBy(a, [['EuiTextTruncate']], [
        ['manual slicing', /\.slice\(\s*-\s*\d|\.(substring|substr)\(/],
        ['rtl hack', /direction:\s*['"]?rtl/],
      ]),
    use: (a) => ({
      middle: a.newEls('EuiTextTruncate').some((e) => is(e, 'truncation', 'middle')),
    }),
  },
  // S8 and S9 fail in both arms because the agent never looks (the docs have the answer). With the
  // broad pointer they measure whether C looks, not a docs win we expect.
  {
    id: 'S8',
    kind: 'select',
    project: 'x-pack/platform/plugins/private/upgrade_assistant',
    prompt: `On the Upgrade Assistant Elasticsearch and Kibana deprecation pages, the Critical and Warning counts at the top are just labels. Admins want those counts to act as quick filters for the list below: click Critical to show only critical deprecations, click Warning for only warnings, and click again to clear, with the count still visible on each. Both can be on at once. ${START} x-pack/platform/plugins/private/upgrade_assistant/public/application/components/shared/deprecation_count.tsx. ${SCOPE}`,
    pick: filterPick,
    use: filterUse,
  },
  {
    id: 'S9',
    kind: 'select',
    project: 'x-pack/solutions/observability/plugins/apm',
    prompt: `The APM diagnostics Indices tab lists every index in two tables, and on clusters with many indices it is hard to find a specific one. Add a search box above the tables that filters by index name, together with filters for whether an index belongs to a data stream and whether its ingest pipeline or mappings have a problem. Filtering should apply to both tables. ${START} x-pack/solutions/observability/plugins/apm/public/components/app/diagnostics/indices_tab.tsx. ${SCOPE}`,
    pick: (a) => pickBy(a, searchAlts),
    use: searchUse,
  },
  {
    id: 'S10',
    dropped: 'both pass; the model knows EuiNotificationBadge',
    kind: 'select',
    project: 'x-pack/platform/plugins/shared/search_inference_endpoints',
    prompt: `In the model detail flyout, the 'Region options' heading has no indication of how many regions are available, so users have to count the badges. Show a count badge on the same row as the heading, vertically aligned with it and staying on that row at narrow flyout widths, and keep the description and region badges stacked underneath as they are today. ${START} x-pack/platform/plugins/shared/search_inference_endpoints/public/components/model_detail_flyout/region_options.tsx. ${SCOPE}`,
    pick: (a) =>
      pickBy(a, [['EuiFlexGroup', 'EuiFlexItem']], [
        ['px value', /\b\d+px\b/],
        ['custom flex CSS', /display:\s*['"]?(inline-)?flex/],
      ]),
    use: (a) => {
      const groups = a.newEls('EuiFlexGroup');
      return {
        rowGroup: groups.some((e) => has(e, 'gutterSize') && is(e, 'alignItems', 'center') && is(e, 'responsive', 'false')),
        badgeItemNoGrow: a.newEls('EuiFlexItem').some((e) => is(e, 'grow', 'false')),
        badgeInItem: [...a.newEls('EuiBadge'), ...a.newEls('EuiNotificationBadge')].some((e) => a.inside(e, 'EuiFlexItem')),
      };
    },
  },
  {
    id: 'C2',
    kind: 'control',
    project: 'x-pack/solutions/observability/plugins/infra',
    prompt: `On the Log categories page, the Trend column shows a small sparkline for each category next to the percentage change. The sparkline is always the default chart blue, so critical changes do not stand out. Colour each sparkline by severity of the change versus the reference period (alert-red for a large increase, amber for a moderate one, a neutral colour otherwise) so it matches how severity is shown elsewhere in the product. It must look correct and have enough contrast in both light and dark mode. ${START} x-pack/solutions/observability/plugins/infra/public/pages/logs/log_entry_categories/sections/top_categories/single_metric_sparkline.tsx. ${SCOPE}`,
    pick(a) {
      if (COLOR_LITERAL.test(a.added)) return { ok: false, why: 'color literal' };
      if (/ML_SEVERITY_COLORS/.test(a.added)) return { ok: false, why: 'ML_SEVERITY_COLORS (rgb literals)' };
      const themed = /euiTheme\.colors\.|colors\.vis\b|\beuiPalette\w*\(|useEuiTheme\(/.test(a.added);
      return { ok: themed, why: themed ? 'theme colors' : 'no theme color source in added lines' };
    },
  },
  {
    // Guardrail: better EUI docs must not pull agents away from the kbn-ui wrapper.
    id: 'G1',
    kind: 'guardrail',
    project: 'x-pack/platform/plugins/shared/cases',
    prompt: `On the case view, the Similar cases tab shows an empty table when the request for similar cases fails. The only sign of the failure is a toast that disappears after a few seconds, so users think there are no similar cases. When loading fails, show an error message in the tab that explains the problem and lets the user retry the request without reloading the page, and keep the table out of the way until it succeeds. ${START} x-pack/platform/plugins/shared/cases/public/components/case_view/components/case_view_similar_cases.tsx. ${SCOPE}`,
    pick(a) {
      // Raw EuiCallOut passes for now: the @kbn/ui-callout convention is a Kibana question EUI docs can't teach; scored separately later.
      if (a.rendered('KbnDangerCallout')) return { ok: true, why: 'KbnDangerCallout' };
      if (a.rendered('EuiCallOut')) return { ok: true, why: 'raw EuiCallOut' };
      return { ok: false, why: `no callout${a.rendered('EuiEmptyPrompt') ? ' (EuiEmptyPrompt)' : ''}` };
    },
    extra: copyExtra,
  },
  {
    // Icons next to stale code: the host screen already uses removed `checkInCircleFilled` and `popout`
    // (blank in EUI 123), and the obvious copy icon from memory, `copyClipboard`, is removed too.
    id: 'I1',
    kind: 'select',
    project: 'x-pack/platform/plugins/shared/evals',
    prompt: `After an online evaluation is saved, the Create online evaluation flyout shows a success screen with an 'Open in Workflows' button. Users also need the workflow ID to reference the workflow from scripts and API calls. Add a way to copy the workflow ID from that screen, next to the existing action, with an icon that makes the action clear. ${START} ${I_HOST}. ${SCOPE}`,
    pick(a) {
      const icons = newIcons(a);
      const bad = icons.filter((v) => !(v in iconMap) || DEPRECATED.has(v));
      if (!icons.length) return { ok: false, why: 'no new icon' };
      if (!a.rendered('EuiCopy') && !/copyToClipboard\(|navigator\.clipboard/.test(a.added)) return { ok: false, why: `no copy action; icons: ${icons.join(', ')}` };
      return { ok: !bad.length, why: `icons: ${icons.join(', ')}${bad.length ? `; invalid/deprecated: ${bad.join(', ')}` : ''}` };
    },
    use: (a) => ({
      copies: a.rendered('EuiCopy') || /copyToClipboard\(|navigator\.clipboard/.test(a.added),
    }),
    // Out of scope for the task, reported only: did it notice the blank icons on the same screen?
    extra: (a) => ({ fixedStale: iHostIcons(a).length > 0 && !iHostIcons(a).some((v) => I_STALE.includes(v)) }),
  },
  {
    // Same host, explicit: the agent has to find which names no longer exist.
    id: 'I2',
    dropped: 'identical diffs in both arms; I1 covers removed icons',
    kind: 'select',
    project: 'x-pack/platform/plugins/shared/evals',
    prompt: `After the latest EUI upgrade, some icons in the Create online evaluation flyout render blank. Find the icons in this component that no longer exist and replace each with the current equivalent. Don't change icons that still work. ${START} ${I_HOST}. ${SCOPE}`,
    pick(a) {
      const icons = iHostIcons(a);
      if (!icons.length) return { ok: false, why: 'host not changed' };
      const bad = icons.filter((v) => !(v in iconMap) || DEPRECATED.has(v));
      return { ok: !bad.length, why: `icons: ${icons.join(', ')}${bad.length ? `; still invalid/deprecated: ${bad.join(', ')}` : ''}` };
    },
    use: (a) => {
      const icons = iHostIcons(a);
      return {
        documentedReplacements: icons.includes('checkCircleFill') && icons.includes('external'),
        keptWorking: icons.includes('error') && icons.includes('warning'),
      };
    },
  },
  {
    id: 'P1',
    kind: 'composite',
    project: 'x-pack/platform/plugins/shared/evals',
    budgetUsd: 15,
    timeoutMin: 45,
    prompt: `Add a new "Jobs" page to the Evals app for scheduled evaluation jobs. The backend does not exist yet: put the data behind a hook that returns static sample data (about 12 jobs) with loading and error states, so it can be swapped for a real API later.

Spec:
- New tab "Jobs" next to the existing tabs, with its own route and breadcrumb.
- A list of jobs with name, dataset, status, last run time and score. Status is one of Running, Paused, Failing or Completed, each shown with its own icon and label.
- Above the list, toggleable quick filters for each status showing how many jobs have it. Several can be on at once.
- A search box that filters by job name, plus a filter by dataset.
- Each row has Run now and Pause as compact icon actions with a hint on hover. Duplicate, Edit and Delete go in a "more" menu on the row.
- Clicking a job opens a detail panel with the job's settings and its last 5 runs. On wide screens it sits beside the list so the list stays usable; on narrow screens it covers the list. From the mock: the panel is never narrower than 400px.
- When there are no jobs, show an empty state that explains what jobs are, with "Create job" as the main action and "Import from file" as a secondary option in a dropdown on the same control.
- Show a loading state while jobs load.
- If loading fails, show an error message above the list with a Retry action.
- From the mock: Failing uses #BD271E, the score badge background is #E6F1FA, and the quick filters have 12px between them. It must work in both light and dark mode.

${START} x-pack/platform/plugins/shared/evals/public/application.tsx and add the page under x-pack/platform/plugins/shared/evals/public/pages/. Keep the change scoped to this page.`,
    checklist: {
      route: (a) => a.files.some((f) => f.endsWith('evals/public/application.tsx')) && /jobs/i.test(a.added),
      statusIcons: (a) => {
        const st = P1_STATUSES.map((k) => a.icons.filter((i) => i.isNew && i.keys?.includes(k)).map((i) => i.value));
        return st.every((vs) => vs.length && vs.every((v) => v in iconMap && !DEPRECATED.has(v)));
      },
      filterChips: (a) => filterPick(a).ok && Object.values(filterUse(a)).every(Boolean),
      search: (a) => pickBy(a, searchAlts).ok && searchUse(a).boxAndFilters,
      // EuiBasicTable throws on a default action without onClick or href (P1-c-1, step-D-C2-G1-P1).
      rowActions: (a) => {
        const items = a.actions.filter((x) => x.isNew);
        if (items.length) return items.every((x) => !x.props || x.props.some((p) => ['onClick', 'href', 'render'].includes(p)));
        return a.newEls('EuiButtonIcon').some((e) => has(e, 'onClick')) && (a.rendered('EuiContextMenu') || a.rendered('EuiContextMenuPanel'));
      },
      detailPanel: (a) => (a.rendered('EuiFlyout') || a.rendered('EuiFlyoutResizable')) && Object.values(flyoutUse(a)).every(Boolean),
      emptyState: (a) => a.rendered('EuiEmptyPrompt') && a.rendered('EuiSplitButton') && Object.values(splitButtonUse(a)).every(Boolean),
      loading: (a) => /EuiLoading\w+|EuiSkeleton\w+/.test(a.added) || a.els.some((e) => e.isNew && /^Eui(Basic|InMemory)Table$/.test(e.name) && has(e, 'loading')),
      errorBanner: (a) => a.rendered('KbnDangerCallout') && !a.rendered('EuiCallOut'),
      noMockLiterals: (a) => !/#BD271E|#E6F1FA|\b12px\b/i.test(a.added),
    },
    extra: (a) => ({
      ...flyoutExtra(a),
      ...copyExtra(a),
      kbnUiImports: [...a.imports].filter(([, v]) => v.isNew && v.from.startsWith('@kbn/ui-')).map(([k]) => k),
      euiComponents: [...new Set(a.els.filter((e) => e.isNew && /^Eui/.test(e.name)).map((e) => e.name))].sort(),
    }),
  },
  // Drift cases: added after pre-registration (exploratory, reported separately). Each needs an API
  // newer than the model's training or contradicts nearby code; A must fail at k=1 to keep the case.
  {
    id: 'D1',
    kind: 'control',
    project: 'x-pack/platform/plugins/private/reporting',
    prompt: `The report schedules table gets cramped on narrow screens: titles and dates squash into unreadable columns and the row actions get hard to reach. Make it readable at any width. ${START} x-pack/platform/plugins/private/reporting/public/management/components/report_schedules_table.tsx. ${SCOPE}`,
    pick: (a) => {
      const hack = /overflow-?[xX]|overflow:\s*['"]?(auto|scroll)/.test(a.added);
      if (!/\bscrollableInline\b/.test(a.added)) return { ok: false, why: `no scrollableInline${hack ? '; overflow CSS hack' : ''}` };
      return hack ? { ok: false, why: 'reject: overflow CSS hack' } : { ok: true, why: 'scrollableInline' };
    },
    use: (a) => ({
      columnWidths: /\b(minWidth|width|maxWidth):/.test(a.added),
      stickyActions: /\bsticky:\s*true/.test(a.added),
    }),
    // Report-only: scrollableInline already switches tableLayout to auto (basic.md, Inline scrolling).
    extra: (a) => ({ tableLayoutAuto: /tableLayout=["'{]*auto/.test(a.added) }),
  },
  {
    id: 'D2',
    dropped: 'both pass from the types alone',
    kind: 'control',
    project: 'x-pack/platform/plugins/shared/agent_builder',
    prompt: `Users lose their unsaved skill edits when they click outside the edit flyout or press Escape by accident. In those two cases, if the form has unsaved changes, ask them to confirm discarding before closing. The X button and Cancel should still close right away. ${START} x-pack/platform/plugins/shared/agent_builder/public/application/components/agents/skills/skill_edit_flyout.tsx. ${SCOPE}`,
    pick: (a) => {
      const rejects = [
        ['outsideClickCloses', /outsideClickCloses/],
        ['own Escape handling', /keydown|onKeyDown|key\s*===?\s*['"]Escape['"]|keys\.ESCAPE/],
        ['hideCloseButton', /hideCloseButton/],
      ].filter(([, re]) => re.test(a.added)).map(([l]) => l);
      const reason = /\breason\b/.test(a.added) && /['"](outside-click|escape)['"]/.test(a.added);
      if (!reason) return { ok: false, why: `no meta.reason check${rejects.length ? `; ${rejects.join(', ')}` : ''}` };
      return rejects.length ? { ok: false, why: `reject: ${rejects.join(', ')}` } : { ok: true, why: 'onClose meta.reason' };
    },
    use: (a) => ({
      confirm: /EuiConfirmModal|openConfirm/.test(a.added),
      dirtyGated: /\bisDirty\b/.test(a.added),
    }),
  },
  {
    id: 'D3',
    dropped: 'Kibana convention (kbn-ui callout), not EUI drift',
    kind: 'select',
    project: 'x-pack/platform/plugins/shared/ingest_pipelines',
    prompt: `Add a prominent announcement at the top of the ingest pipelines list page for the new option to create a pipeline from a CSV file, with a button that opens that flow. Users can dismiss it, and it stays dismissed for them after a reload. ${START} x-pack/platform/plugins/shared/ingest_pipelines/public/application/sections/pipelines_list/main.tsx. ${SCOPE}`,
    pick: (a) => pickBy(a, [['AnnouncementBanner'], ['EuiBanner']], [['EuiCallOut', /<EuiCallOut\b/]]),
    use: (a) => ({
      dismiss: /\bonDismiss\b/.test(a.added),
      persisted: /localStorage|useLocalStorage|storage\.(get|set)/.test(a.added),
      csvAction: /getCreateFromCsvPath|createFromCsv|csv_create/.test(a.added),
    }),
  },
  {
    id: 'D4',
    dropped: 'A uses hasAriaDisabled from model knowledge (step-D4)',
    kind: 'control',
    project: 'x-pack/platform/plugins/private/ai_anonymization_settings',
    prompt: `In the anonymization pattern flyout, Save pattern and Test pattern stay disabled until the form is complete, and users can't tell why. When someone hovers over or tabs to a disabled button, tell them what's missing. Keyboard and screen reader users need the same explanation as mouse users. ${START} x-pack/platform/plugins/private/ai_anonymization_settings/public/components/pattern_flyout.tsx. ${SCOPE}`,
    // hasAriaDisabled (beta) keeps a disabled EUI button focusable, so its tooltip is reachable by
    // keyboard. The docs example keeps isDisabled alongside it.
    pick: (a) => {
      const save = d4Button(a, 'Save');
      const rejects = [
        ['manual aria-disabled', /aria-disabled=/],
        ['focusable wrapper', /tabIndex=/],
      ].filter(([, re]) => re.test(a.added)).map(([l]) => l);
      if (!save || !has(save, 'hasAriaDisabled')) return { ok: false, why: `Save has no hasAriaDisabled${rejects.length ? `; ${rejects.join(', ')}` : ''}` };
      return rejects.length ? { ok: false, why: `reject: ${rejects.join(', ')}` } : { ok: true, why: 'hasAriaDisabled' };
    },
    use: (a) => {
      const save = d4Button(a, 'Save');
      const test = d4Button(a, 'TestButton');
      return {
        saveTooltip: !!save && a.inside(save, 'EuiToolTip'),
        keepsDisabled: !!save && (has(save, 'isDisabled') || has(save, 'disabled')),
        testButton: !!test && has(test, 'hasAriaDisabled') && a.inside(test, 'EuiToolTip'),
      };
    },
  },
  {
    // Artificial: the host has no responsive code, and EuiResizableContainer can't change direction
    // from CSS, so the stack needs a breakpoint in JS. The plugin's overview already uses
    // useIsWithinBreakpoints. Kibana's app-area hooks (chrome-layout) are an accepted answer too.
    id: 'R1',
    dropped: 'A uses useIsWithinBreakpoints from memory in 6 turns, no lookups (pilot-R1)',
    kind: 'select',
    project: 'x-pack/platform/plugins/shared/streams_app',
    prompt: `On a stream's Partitioning tab, the child stream list and the preview sit side by side in resizable panels. On narrow screens they get squeezed: the list needs about 400px and the preview 300px, so the page overflows and the drag handle is fiddly. On phone and tablet widths, stack the list above the preview, each at full width. On wider screens keep the current side-by-side resizable layout as is. ${START} x-pack/platform/plugins/shared/streams_app/public/components/stream_management/data_management/stream_detail_routing/partitioning_layout.tsx. ${SCOPE}`,
    pick(a) {
      const rejects = [
        ['window width', /window\.(innerWidth|outerWidth)|document\.documentElement\.clientWidth/],
        ['matchMedia', /matchMedia\(/],
        ['resize listener', /addEventListener\(\s*['"]resize/],
        ['px media query', /@media[^{]*\d+px/],
      ].filter(([, re]) => re.test(a.added)).map(([label]) => label);
      const api = a.added.match(/\b(useIsWithin(?:Min|Max)?Breakpoints?|useCurrentEuiBreakpoint|useIsWithinChromeApplicationBreakpoints|useCurrentChromeApplicationBreakpoint)\(|<(EuiShowFor|EuiHideFor)\b/);
      if (!api) return { ok: false, why: `no breakpoint hook or EuiShowFor/EuiHideFor${rejects.length ? `; ${rejects.join(', ')}` : ''}` };
      if (rejects.length) return { ok: false, why: `reject: ${rejects.join(', ')}` };
      return { ok: true, why: api[1] ?? api[2] };
    },
  },
  // Icon showcase cases (2026-11-04): tasks whose obvious icon names from memory were removed, so a
  // miss is a row of blank squares. Pass = at least `min` new icons, none removed or deprecated.
  {
    id: 'T1',
    kind: 'select',
    project: 'x-pack/platform/plugins/shared/agent_builder',
    prompt: `Users often paste code and links into the feedback comment, and the plain text is hard to read on our side. Add a compact formatting toolbar above the comment box with icon buttons for bold, italic, strikethrough, heading, link, bulleted list, numbered list and code block. Each button wraps the selected text (or inserts a placeholder at the cursor) with the matching Markdown syntax and has a tooltip naming the action. Keep the existing textarea and the character limit. ${START} x-pack/platform/plugins/shared/agent_builder/public/application/components/conversations/timeline/response/feedback_controls/comment_box.tsx. ${SCOPE}`,
    pick: (a) => iconShowcasePick(a, 6),
    extra: iconShowcaseExtra,
  },
  {
    id: 'T2',
    kind: 'select',
    project: 'x-pack/platform/plugins/shared/agent_builder',
    prompt: `The Raw response flyout only shows the JSON. Support engineers keep asking for quick actions on it. Add a row of icon buttons under the flyout title, each with a tooltip: copy the conversation ID, download the JSON as a file, open the response in a new browser tab, expand the flyout to full screen, collapse or expand all JSON sections, and hide or show sensitive values. Put "Email to support" and "Compare with previous round" in a "more" menu at the end of the row; they can log a TODO for now. ${START} x-pack/platform/plugins/shared/agent_builder/public/application/components/conversations/timeline/response/execution_json_flyout.tsx. ${SCOPE}`,
    pick: (a) => iconShowcasePick(a, 6),
    extra: iconShowcaseExtra,
  },
  {
    id: 'F1',
    kind: 'select',
    project: 'x-pack/platform/plugins/shared/evals',
    prompt: `Reviewers open evaluators one by one from the Evaluators table to compare their definitions, and closing and reopening the detail flyout for each row is slow. Let them step to the previous or next evaluator from inside the detail flyout, in the table's current order and filters, and show which one of how many they are on. ${START} x-pack/platform/plugins/shared/evals/public/pages/evaluators/index.tsx. ${SCOPE}`,
    pick(a) {
      const builtIn = /flyoutMenuProps/.test(a.added) && /\bpagination\s*[:=]/.test(a.added) && /onNext/.test(a.added);
      const handRolled = /iconType=["'](arrow(Left|Right|Up|Down)|chevron\w*)["']/.test(a.added) || /\b(Previous|Next)\b<\//.test(a.added);
      return { ok: builtIn && !handRolled, why: `${builtIn ? 'flyoutMenuProps.pagination' : 'no built-in pagination'}${handRolled ? '; hand-rolled prev/next' : ''}` };
    },
  },
  {
    // EuiButtonIcon `hasNotificationDot` is patched into eui.d.ts on base-a and base-c (docs only on base-c), so no model knows it.
    id: 'N1',
    kind: 'select',
    project: 'x-pack/platform/plugins/shared/agent_builder',
    prompt: `In the embedded agent chat, users miss replies that finish in other conversations because the menu button that opens the conversation list looks the same either way. Show an unread indicator on that menu button when any conversation other than the one currently open is unread. ${START} x-pack/platform/plugins/shared/agent_builder/public/application/components/conversations/embeddable_conversation_header/embeddable_menu_button.tsx. ${SCOPE}`,
    pick(a) {
      const builtIn = /hasNotificationDot/.test(a.added);
      const handRolled = /EuiNotificationBadge|EuiBadge|EuiBeacon/.test(a.added) || /border-?radius\s*:\s*['"]?50%/i.test(a.added) || /position\s*:\s*['"]?absolute/.test(a.added);
      return { ok: builtIn && !handRolled, why: `${builtIn ? 'hasNotificationDot' : 'no hasNotificationDot'}${handRolled ? '; hand-rolled dot' : ''}` };
    },
  },
  {
    // EuiFieldSearch `shortcutHint`, EuiPanel `isLoading` and EuiStat `trend` are patched into eui.d.ts on base-c (docs vary by variant).
    id: 'N2',
    kind: 'select',
    project: 'x-pack/platform/plugins/shared/inbox',
    prompt: `On the inbox history page, users don't know they can press the slash key to jump to the history search box (the key handling already exists), so many scroll and click instead. Make the key visible to users in the search field itself. ${START} x-pack/platform/plugins/shared/inbox/public/pages/inbox_actions/components/inbox_history_feed.tsx. ${SCOPE}`,
    pick(a) {
      const builtIn = /shortcutHint/.test(a.added);
      const handRolled = /<kbd\b|EuiBadge|EuiKeyboardShortcut|\bappend=|\bprepend=|position\s*:\s*['"]?absolute/.test(a.added);
      return { ok: builtIn && !handRolled, why: `${builtIn ? 'shortcutHint' : 'no shortcutHint'}${handRolled ? '; hand-rolled key hint' : ''}` };
    },
  },
  {
    id: 'N3',
    kind: 'select',
    project: 'x-pack/platform/plugins/shared/ml',
    prompt: `In the Anomaly Explorer, new swim lane results are fetched whenever the job selection or time range changes, while the old results stay on screen. Users can't tell the section is not final yet. Make the section that holds the swim lanes show it is busy until the new results arrive, without hiding the existing content. ${START} x-pack/platform/plugins/shared/ml/public/application/explorer/anomaly_timeline.tsx. ${SCOPE}`,
    pick(a) {
      const builtIn = /isLoading/.test(a.added) && a.anyEls('EuiPanel').some((e) => e.attrs.isLoading !== undefined);
      const handRolled = /EuiProgress|EuiLoadingSpinner|EuiLoadingChart|EuiSkeleton|position\s*:\s*['"]?absolute|@keyframes|keyframes\(/.test(a.added);
      return { ok: builtIn && !handRolled, why: `${builtIn ? 'EuiPanel isLoading' : 'no EuiPanel isLoading'}${handRolled ? '; hand-rolled progress' : ''}` };
    },
  },
  {
    id: 'N4',
    kind: 'select',
    project: 'x-pack/platform/plugins/shared/cases',
    prompt: `In the cases list metrics row, the total cases count gives no sense of direction. Next to that number, show whether it is higher than, lower than, or the same as the value for the previous period. Take the previous value as a new optional prop on the metrics component; wiring it to a data source is out of scope. ${START} x-pack/platform/plugins/shared/cases/public/components/all_cases/components/cases_metrics.tsx. ${SCOPE}`,
    pick(a) {
      const builtIn = /\btrend\b/.test(a.added) && a.anyEls('EuiStat').some((e) => e.attrs.trend !== undefined);
      const handRolled = /sortUp|sortDown|arrowUp|arrowDown|EuiBadge|EuiHealth|[▲▼↑↓]/.test(a.added);
      return { ok: builtIn && !handRolled, why: `${builtIn ? 'EuiStat trend' : 'no EuiStat trend'}${handRolled ? '; hand-rolled direction icon' : ''}` };
    },
  },
  {
    // Guide: patterns/help-content.md ("Short definitions"). Task pass is separate from the G1-G5 guide checks.
    id: 'X3',
    kind: 'select',
    project: 'x-pack/platform/plugins/shared/ingest_pipelines',
    prompt: `Admins who open a pipeline from the Ingest Pipelines list often don't know what "Field access pattern" and "Failure processors" mean in the details flyout. Help them understand each term right where it appears, without taking them away from the flyout or changing the layout. ${START} x-pack/platform/plugins/shared/ingest_pipelines/public/application/sections/pipelines_list/flyout_content/details_panel.tsx. ${SCOPE}`,
    pick(a) {
      const n = a.newEls(/^(EuiIconTip|EuiToolTip|EuiPopover)$/).filter((e) => e.file.endsWith('flyout_content/details_panel.tsx')).length;
      return { ok: n >= 2, why: `${n} added EuiIconTip/EuiToolTip/EuiPopover in details_panel.tsx` };
    },
    extra(a) {
      const terms = [/^Field access pattern\b/i, /^Failure processors\b/i];
      const defs = newCopy(a).filter((t) => !terms.some((re) => re.test(t) && t.split(/\s+/).length <= 3));
      const tips = a.newEls(/^(EuiIconTip|EuiToolTip)$/);
      const words = (t) => t.trim().split(/\s+/).length;
      return {
        defs,
        G1: terms.every((re) => defs.some((t) => re.test(t))),
        G2: defs.length >= 2 && defs.every((t) => words(t) < 40 && /\.$/.test(t.trim())),
        G3: tips.filter((e) => /question/.test(e.body) && /color=["'{]*primary/.test(e.body)).length >= 2,
        G4: !tips.some((e) => /EuiLink|href=|<a\b/.test(e.body)),
        G5: a.newEls('EuiPopover').length === 0 && tips.length >= 2,
      };
    },
  },
  {
    // Held-out: reverted elastic/kibana#298824 (closes #288355) in both bases, including its test (uncommitted in the base, so it is part of every run diff). Docs: components/popover.md "Removing the focus trap" warning.
    id: 'HR1',
    kind: 'select',
    project: 'x-pack/solutions/security/plugins/security_solution',
    prompt: `On the Top threat hunting leads card, keyboard and screen reader users who press the Options button stay where they were: focus doesn't move into the options panel, so they have to tab through the rest of the page to reach the connector picker, and screen readers don't announce that a panel opened. Fix it for keyboard and screen reader users. ${START} x-pack/solutions/security/plugins/security_solution/public/entity_analytics/components/threat_hunting/top_threat_hunting_leads/index.tsx. ${SCOPE}`,
    pick(a) {
      // The bases carry the revert, so the run diff (vs HEAD) adds `ownFocus={false}` unless the agent removed it.
      const off = /ownFocus=\{false\}/.test(a.added);
      return { ok: !off, why: off ? 'ownFocus still false' : 'popover owns focus' };
    },
    extra(a) {
      return {
        handRolled: /\.focus\(|autoFocus|EuiFocusTrap|initialFocus|tabIndex/.test(a.added),
        aria: (a.added.match(/aria-[a-z]+|role=/g) || []).join(','),
      };
    },
  },
  {
    // EuiInMemoryTable `highlightSearchMatches` is patched into eui.d.ts on base-a and base-c (docs only on base-c, docs-heldout). Held-out: never tuned on.
    id: 'HN1',
    kind: 'select',
    project: 'src/platform/packages/shared/kbn-alerts-ui-shared',
    prompt: `In the alert details flyout, the table tab lists every field of the alert, often a hundred or more, and many values are long. When users type in the filter box the list narrows, but they still have to read each field name and value to find the part that made the row show up. Make what they typed easy to spot in the Field and Value columns. ${START} src/platform/packages/shared/kbn-alerts-ui-shared/src/alert_fields_table/index.tsx. ${SCOPE}`,
    pick(a) {
      const builtIn = /highlightSearchMatches/.test(a.added) && a.anyEls('EuiInMemoryTable').some((e) => e.attrs.highlightSearchMatches !== undefined);
      const handRolled = /EuiHighlight|EuiMark|<mark\b|dangerouslySetInnerHTML/.test(a.added);
      return { ok: builtIn && !handRolled, why: `${builtIn ? 'highlightSearchMatches' : 'no highlightSearchMatches'}${handRolled ? '; hand-rolled highlight' : ''}` };
    },
  },
  {
    // EuiTextArea `maxAutoRows` is patched into eui.d.ts on base-a and base-c (docs only on base-c, docs-heldout). Held-out: never tuned on.
    id: 'HN2',
    kind: 'select',
    project: 'x-pack/platform/plugins/shared/context_engine',
    prompt: `On an AI index's detail page, editing the description gives users a three-line box, but we ask them for a fairly long description: what the index is for, example questions and known gaps. People end up scrolling inside the small box to reread what they wrote. Let the box get taller as they write so more of the description is visible, while staying small for short descriptions and not taking over the page. ${START} x-pack/platform/plugins/shared/context_engine/public/application/components/ai_index_description_field.tsx. ${SCOPE}`,
    pick(a) {
      const builtIn = /maxAutoRows/.test(a.added) && a.anyEls('EuiTextArea').some((e) => e.attrs.maxAutoRows !== undefined);
      const handRolled = /scrollHeight|field-?sizing|fieldSizing|\.style\.(min|max)?[hH]eight|setProperty\(\s*['"](min-|max-)?height|ResizeObserver|useResizeObserver|TextareaAutosize|textarea-autosize|EuiAutoSizer|\binputRef\b|split\(\s*['"`]\\n|rows=\{[^}]*(length|Math\.)/.test(a.added);
      return { ok: builtIn && !handRolled, why: `${builtIn ? 'maxAutoRows' : 'no maxAutoRows'}${handRolled ? '; hand-rolled auto height' : ''}` };
    },
  },
  {
    // Greenfield, held out for the skill's kbn-ui step. Pre-registered 2026-11-05 (KB "AH1").
    id: 'AH1',
    kind: 'select',
    project: 'examples/hello_world',
    prompt: `Turn the Hello World example app into a real page. It should have the page title "Hello World", a one-line description of what the example shows, and below that a panel with a short paragraph and a button that shows a "Hello!" toast when clicked. Use EUI. ${START} examples/hello_world/public/plugin.tsx. ${SCOPE}`,
    pick(a) {
      const p = pickBy({ ...a, added: a.addedCode }, [['AppHeader']], [
        ['EuiPageHeader', /\bEuiPageHeader\b/],
        ['EuiPageTemplate.Header', /EuiPageTemplate\.Header/],
        ['KibanaPageTemplate.Header', /KibanaPageTemplate\.Header/],
        ['pageHeader', /\bpageHeader\s*=/],
        ['@kbn/ui-app-header', /@kbn\/ui-app-header/],
      ]);
      if (p.ok && !/from\s+['"]@kbn\/app-header['"]/.test(a.addedCode)) return { ok: false, why: 'AppHeader not imported from @kbn/app-header' };
      return p;
    },
    use(a) {
      return {
        renderContext: /KibanaRenderContextProvider/.test(a.addedCode),
        tsconfigRef: /"@kbn\/app-header"/.test(a.addedCode),
      };
    },
  },
];

// Matches by data-test-subj, which the host's Save and Test buttons already have.
function d4Button(a, suffix) {
  return a.els.find((e) => /^EuiButton/.test(e.name) && e.text.includes(`aiAnonymizationSettingsPatternFlyout${suffix}`));
}

// Held-out tickets (tracker: "Held-out run"): real open Kibana issues picked by an agent that never saw
// the docs or the cases above. No pick/use checks: correct = reviewed `works`, tsc pass, valid icons.
// Dropped as too hard, except H2, which became a select case (it replaces S7): A hand-rolls the
// truncation and its overflow-checked tooltip, which EuiTextTruncate does.
const H2_SELECT = {
  kind: 'select',
  pick: (a) =>
    pickBy(a, [['EuiTextTruncate']], [
      ['CSS ellipsis', /text-?[oO]verflow|euiTextTruncate\(|eui-textTruncate/],
      ['overflow measurement', /scrollWidth|offsetWidth|clientWidth/],
    ]),
};
const heldoutFile = new URL('./heldout.json', import.meta.url);
if (fs.existsSync(heldoutFile)) {
  for (const t of JSON.parse(fs.readFileSync(heldoutFile, 'utf8'))) {
    cases.push(t.id === 'H2' ? { ...t, ...H2_SELECT } : { ...t, kind: 'heldout', dropped: 'held-out tickets are too hard for this eval' });
  }
}
