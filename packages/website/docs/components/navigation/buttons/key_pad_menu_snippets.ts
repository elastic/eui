/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

export const keyPadMenuSnippet = (): string => {
  return `<EuiKeyPadMenu>
  <EuiKeyPadMenuItem label="Dashboard">
    <EuiIcon type="dashboardApp" size="l" />
  </EuiKeyPadMenuItem>

  <EuiKeyPadMenuItem label="Canvas">
    <EuiIcon type="canvasApp" size="l" />
  </EuiKeyPadMenuItem>

  <EuiKeyPadMenuItem isSelected label="Lens">
    <EuiIcon type="lensApp" size="l" />
  </EuiKeyPadMenuItem>

  <EuiKeyPadMenuItem isDisabled label="Visualize">
    <EuiIcon type="visualizeApp" size="l" />
  </EuiKeyPadMenuItem>
</EuiKeyPadMenu>`;
};

export const keyPadMenuItemSnippet = (): string => {
  return `<EuiKeyPadMenuItem
  label="Button"
  isSelected={isSelected}
  onClick={() => setIsSelected(!isSelected)}
>
  <EuiIcon type="grid" size="l" />
</EuiKeyPadMenuItem>

<EuiKeyPadMenuItem
  label="Link"
  href="/path"
>
  <EuiIcon type="link" size="l" />
</EuiKeyPadMenuItem>`;
};

export const keyPadMenuBetaSnippet = (): string => {
  return `<EuiKeyPadMenuItem
  label="Icon"
  betaBadgeLabel="Beta"
  betaBadgeTooltipContent="This module is not GA."
  betaBadgeIconType="beta"
>
  <EuiIcon type="textBold" size="l" />
</EuiKeyPadMenuItem>`;
};

export const keyPadMenuCheckableSnippet = (): string => {
  return `<EuiKeyPadMenu checkable={{ legend: 'Multi select as checkboxes' }}>
  <EuiKeyPadMenuItem
    checkable="multi"
    isSelected={isSelected}
    id="check1"
    label="Check one"
    onChange={() => setIsSelected(!isSelected)}
  >
    <EuiIcon type="faceHappy" size="l" />
  </EuiKeyPadMenuItem>
</EuiKeyPadMenu>`;
};

export const keyPadMenuRadioSnippet = (): string => {
  return `<EuiKeyPadMenu checkable={{ ariaLegend: 'Single select as radios' }}>
  <EuiKeyPadMenuItem
    checkable="single"
    name={radioGroupName}
    id="radio1"
    label="Radio one"
    onChange={(id) => setSelectedId(id)}
    isSelected={selectedId === 'radio1'}
  >
    <EuiIcon type="faceHappy" size="l" />
  </EuiKeyPadMenuItem>
</EuiKeyPadMenu>`;
};
