import React from 'react';

import {
  EuiButton,
  EuiFlexGroup,
  EuiFlexItem,
  EuiButtonEmpty,
} from '../../../../src/components';

export default () => (
  <div>
    <EuiFlexGroup gutterSize="s" alignItems="center">
      <EuiFlexItem grow={false}>
        <EuiButton onClick={() => {}} iconType="heart">
          Primary
        </EuiButton>
      </EuiFlexItem>

      <EuiFlexItem grow={false}>
        <EuiButton fill iconType="lensApp" onClick={() => {}}>
          Filled
        </EuiButton>
      </EuiFlexItem>

      <EuiFlexItem grow={false}>
        <EuiButton iconType="heart" size="s" onClick={() => {}}>
          small
        </EuiButton>
      </EuiFlexItem>

      <EuiFlexItem grow={false}>
        <EuiButton iconType="lensApp" size="s" fill onClick={() => {}}>
          small and filled
        </EuiButton>
      </EuiFlexItem>
    </EuiFlexGroup>

    <EuiFlexGroup gutterSize="s" alignItems="center">
      <EuiFlexItem grow={false}>
        <EuiButton iconSide="right" onClick={() => {}} iconType="heart">
          Primary
        </EuiButton>
      </EuiFlexItem>

      <EuiFlexItem grow={false}>
        <EuiButton iconSide="right" fill iconType="lensApp" onClick={() => {}}>
          Filled
        </EuiButton>
      </EuiFlexItem>

      <EuiFlexItem grow={false}>
        <EuiButton
          iconSide="right"
          iconType="heart"
          size="s"
          onClick={() => {}}>
          small
        </EuiButton>
      </EuiFlexItem>

      <EuiFlexItem grow={false}>
        <EuiButton
          iconSide="right"
          iconType="lensApp"
          size="s"
          fill
          onClick={() => {}}>
          small and filled
        </EuiButton>
      </EuiFlexItem>
    </EuiFlexGroup>

    <EuiFlexGroup gutterSize="s" alignItems="center">
      <EuiFlexItem grow={false}>
        <EuiButton
          iconSide="right"
          onClick={() => {}}
          iconType="heart"
          isDisabled>
          Disabled
        </EuiButton>
      </EuiFlexItem>

      <EuiFlexItem grow={false}>
        <EuiButton
          iconSide="right"
          fill
          iconType="lensApp"
          onClick={() => {}}
          isDisabled>
          Filled
        </EuiButton>
      </EuiFlexItem>

      <EuiFlexItem grow={false}>
        <EuiButton
          iconSide="right"
          iconType="heart"
          size="s"
          onClick={() => {}}
          isDisabled>
          small
        </EuiButton>
      </EuiFlexItem>

      <EuiFlexItem grow={false}>
        <EuiButton
          iconSide="right"
          iconType="lensApp"
          size="s"
          fill
          onClick={() => {}}
          isDisabled>
          small and filled
        </EuiButton>
      </EuiFlexItem>
    </EuiFlexGroup>

    <EuiFlexGroup gutterSize="s" alignItems="center">
      <EuiFlexItem grow={false}>
        <EuiButtonEmpty onClick={() => {}} iconType="arrowDown">
          Primary with icon left
        </EuiButtonEmpty>
      </EuiFlexItem>

      <EuiFlexItem grow={false}>
        <EuiButtonEmpty
          onClick={() => {}}
          iconType="arrowDown"
          iconSide="right"
          size="xs">
          Extra small with icon right
        </EuiButtonEmpty>
      </EuiFlexItem>
    </EuiFlexGroup>

    <EuiFlexGroup gutterSize="s" alignItems="center">
      <EuiFlexItem grow={false}>
        <EuiButtonEmpty color="text" onClick={() => {}} iconType="dashboardApp">
          Text with app icon left
        </EuiButtonEmpty>
      </EuiFlexItem>

      <EuiFlexItem grow={false}>
        <EuiButtonEmpty
          color="text"
          onClick={() => {}}
          iconType="dashboardApp"
          iconSide="right"
          size="xs">
          Extra small with app icon right
        </EuiButtonEmpty>
      </EuiFlexItem>
    </EuiFlexGroup>

    <EuiFlexGroup gutterSize="s" alignItems="center">
      <EuiFlexItem grow={false}>
        <EuiButtonEmpty onClick={() => {}} isLoading>
          Loading
        </EuiButtonEmpty>
      </EuiFlexItem>

      <EuiFlexItem grow={false}>
        <EuiButtonEmpty onClick={() => {}} isLoading iconSide="right">
          Loading
        </EuiButtonEmpty>
      </EuiFlexItem>
    </EuiFlexGroup>
  </div>
);
