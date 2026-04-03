/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

export interface SplitButtonSnippetState {
  color?: string;
  fill?: boolean;
  size?: string;
  isDisabled?: boolean;
  isLoading?: boolean;
  isPrimaryIconOnly?: boolean;
}

export const splitButtonSnippet = (state: SplitButtonSnippetState): string => {
  const parentProps: string[] = [];
  const primaryProps: string[] = [];
  const secondaryProps: string[] = [];

  if (state.color && state.color !== 'primary') {
    parentProps.push(`color="${state.color}"`);
  }
  if (state.fill) {
    parentProps.push('fill');
  }
  if (state.size === 's') {
    parentProps.push('size="s"');
  }
  if (state.isDisabled) {
    parentProps.push('isDisabled');
  }
  if (state.isLoading) {
    parentProps.push('isLoading');
  }

  if (state.isPrimaryIconOnly) {
    primaryProps.push('isIconOnly');
  }
  primaryProps.push('iconType="refresh"');

  secondaryProps.push('iconType="backgroundTask"');
  secondaryProps.push('aria-label="Send to background"');

  const parentPropsStr = parentProps.length > 0 ? '\n  ' + parentProps.join('\n  ') : '';
  const primaryPropsStr = '\n    ' + primaryProps.join('\n    ');
  const secondaryPropsStr = '\n    ' + secondaryProps.join('\n    ');

  return `<EuiSplitButton${parentPropsStr}>
  <EuiSplitButton.ActionPrimary${primaryPropsStr}
  >
    Refresh
  </EuiSplitButton.ActionPrimary>
  <EuiSplitButton.ActionSecondary${secondaryPropsStr}
  />
</EuiSplitButton>`;
};

export const splitButtonPopoverSnippet = (): string => {
  return `<EuiSplitButton>
  <EuiSplitButton.ActionPrimary
    iconType="save"
    tooltipProps={{
      content: 'Primary action tooltip',
    }}
  >
    Save
  </EuiSplitButton.ActionPrimary>
  <EuiSplitButton.ActionSecondary
    iconType="chevronSingleDown"
    aria-label="Open secondary actions menu"
    onClick={() => setIsPopoverOpen(!isPopoverOpen)}
    popoverProps={{
      isOpen: isPopoverOpen,
      closePopover: () => setIsPopoverOpen(false),
      children: menu,
    }}
  />
</EuiSplitButton>`;
};
