/**
 * Ensure the EuiPopover being tested is open/closed before contiuning
 * Note: Because EuiPopover is portalled, we want to query `document`
 * instead of the `container` returned by RTL's render()
 */
export declare const waitForEuiPopoverOpen: () => Promise<void>;
export declare const waitForEuiPopoverClose: () => Promise<void>;

/**
 * jsdom does not track keyboard vs. mouse input modality, so `:focus-visible`
 * always returns false. Call this before `fireEvent.focus()` on an element that
 * should be treated as keyboard-focused.
 *
 * Returns a cleanup function, call it after test assertions to restore the spy.
 */
export declare const simulateFocusVisible: (element: Element) => () => void;

/**
 * Prefer this over `fireEvent.focus()` in tooltip tests. Plain `fireEvent.focus`
 * does not set `:focus-visible` in jsdom and will not trigger the tooltip.
 *
 * Returns a cleanup function to restore the mock after assertions.
 */
export declare const focusEuiToolTipTrigger: (element: Element) => () => void;

export declare const showEuiComboBoxOptions: () => Promise<void>;

export declare const waitForEuiContextMenuPanelTransition: () => Promise<void>;
