jest.mock('./../../../src/components/auto_sizer', () => {
  const {
    EuiAutoSizer,
  } = require('./../../../src/components/auto_sizer/auto_sizer.testenv');
  return { EuiAutoSizer };
});

jest.mock('./../../../src/components/observer/resize_observer', () => {
  const resizeObservers = require('./../../../src/components/observer/resize_observer/resize_observer.testenv');
  return resizeObservers;
});

jest.mock('./../../../src/components/icon', () => {
  const { EuiIcon } = require('./../../../src/components/icon/icon.testenv');
  return { EuiIcon };
});

jest.mock('./../../../src/services/accessibility', () => {
  const a11y = jest.requireActual('./../../../src/services/accessibility');
  const {
    htmlIdGenerator,
    useGeneratedHtmlId,
  } = require('./../../../src/services/accessibility/html_id_generator.testenv');
  return { ...a11y, htmlIdGenerator, useGeneratedHtmlId };
});

jest.mock('./../../../src/services/breakpoint/current_breakpoint_hook', () => {
  const {
    useCurrentEuiBreakpoint,
  } = require('./../../../src/services/breakpoint/current_breakpoint_hook.testenv');
  return { useCurrentEuiBreakpoint };
});

// @see https://github.com/focus-trap/tabbable#testing-in-jsdom
const mockTabbable = jest.requireActual('tabbable');

jest.mock('tabbable', () => ({
  ...mockTabbable,
  tabbable: (node, options) =>
    mockTabbable.tabbable(node, { ...options, displayCheck: 'none' }),
  focusable: (node, options) =>
    mockTabbable.focusable(node, { ...options, displayCheck: 'none' }),
  isFocusable: (node, options) =>
    mockTabbable.isFocusable(node, { ...options, displayCheck: 'none' }),
  isTabbable: (node, options) =>
    mockTabbable.isTabbable(node, { ...options, displayCheck: 'none' }),
}));
