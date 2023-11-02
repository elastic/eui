/**
 * Ensure the EuiPopover being tested is open/closed before contiuning
 * Note: Because EuiPopover is portalled, we want to query `document`
 * instead of the `container` returned by RTL's render()
 */
export declare const waitForEuiPopoverOpen: () => Promise<void>;
export declare const waitForEuiPopoverClose: () => Promise<void>;

export declare const waitForEuiToolTipVisible: () => Promise<void>;
export declare const waitForEuiToolTipHidden: () => Promise<void>;

export declare const showEuiComboBoxOptions: () => Promise<void>;

export declare const waitForEuiContextMenuPanelTransition: () => Promise<void>;
