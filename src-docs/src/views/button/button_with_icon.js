import React from 'react';

import {
  EuiButton,
  EuiFlexGroup,
  EuiFlexItem,
  EuiButtonEmpty,
} from '../../../../src/components';

export default () => (
  <div>
    <EuiFlexGroup responsive={false} wrap gutterSize="s" alignItems="center">
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
          Small
        </EuiButton>
      </EuiFlexItem>

      <EuiFlexItem grow={false}>
        <EuiButton iconType="lensApp" size="s" fill onClick={() => {}}>
          Small and filled
        </EuiButton>
      </EuiFlexItem>

      <EuiFlexItem grow={true}>
        <EuiButton fullWidth iconType="lensApp" onClick={() => {}}>
          Full width
        </EuiButton>
      </EuiFlexItem>
    </EuiFlexGroup>

    <EuiFlexGroup responsive={false} wrap gutterSize="s" alignItems="center">
      <EuiFlexItem grow={false}>
        <EuiButtonEmpty onClick={() => {}} iconType="lensApp">
          Empty button
        </EuiButtonEmpty>
      </EuiFlexItem>

      <EuiFlexItem grow={false}>
        <EuiButtonEmpty onClick={() => {}} iconType="lensApp" size="s">
          Small empty
        </EuiButtonEmpty>
      </EuiFlexItem>

      <EuiFlexItem grow={false}>
        <EuiButtonEmpty onClick={() => {}} iconType="lensApp" size="xs">
          Extra small empty
        </EuiButtonEmpty>
      </EuiFlexItem>
    </EuiFlexGroup>

    <EuiFlexGroup responsive={false} wrap gutterSize="s" alignItems="center">
      <EuiFlexItem grow={false}>
        <EuiButton iconSide="right" onClick={() => {}} iconType="arrowDown">
          Icon right
        </EuiButton>
      </EuiFlexItem>

      <EuiFlexItem grow={false}>
        <EuiButton
          iconSide="right"
          fill
          iconType="arrowDown"
          onClick={() => {}}
        >
          Filled
        </EuiButton>
      </EuiFlexItem>

      <EuiFlexItem grow={false}>
        <EuiButton
          iconSide="right"
          iconType="arrowDown"
          size="s"
          onClick={() => {}}
        >
          Small
        </EuiButton>
      </EuiFlexItem>

      <EuiFlexItem grow={false}>
        <EuiButton
          iconSide="right"
          iconType="arrowDown"
          size="s"
          fill
          onClick={() => {}}
        >
          Small and filled
        </EuiButton>
      </EuiFlexItem>

      <EuiFlexItem grow={true}>
        <EuiButton
          fullWidth
          iconSide="right"
          iconType="arrowDown"
          onClick={() => {}}
        >
          Full width
        </EuiButton>
      </EuiFlexItem>
    </EuiFlexGroup>

    <EuiFlexGroup responsive={false} wrap gutterSize="s" alignItems="center">
      <EuiFlexItem grow={false}>
        <EuiButtonEmpty
          iconSide="right"
          onClick={() => {}}
          iconType="arrowDown"
        >
          Icon right
        </EuiButtonEmpty>
      </EuiFlexItem>

      <EuiFlexItem grow={false}>
        <EuiButtonEmpty
          iconSide="right"
          onClick={() => {}}
          iconType="arrowDown"
          size="s"
        >
          Small empty
        </EuiButtonEmpty>
      </EuiFlexItem>

      <EuiFlexItem grow={false}>
        <EuiButtonEmpty
          iconSide="right"
          onClick={() => {}}
          iconType="arrowDown"
          size="xs"
        >
          Extra small empty
        </EuiButtonEmpty>
      </EuiFlexItem>
    </EuiFlexGroup>

    <EuiFlexGroup responsive={false} wrap gutterSize="s" alignItems="center">
      <EuiFlexItem grow={false}>
        <EuiButton onClick={() => {}} iconType="heart" isDisabled>
          Disabled
        </EuiButton>
      </EuiFlexItem>

      <EuiFlexItem grow={false}>
        <EuiButton fill iconType="lensApp" onClick={() => {}} isDisabled>
          Filled
        </EuiButton>
      </EuiFlexItem>

      <EuiFlexItem grow={false}>
        <EuiButton iconType="heart" size="s" onClick={() => {}} isDisabled>
          Small
        </EuiButton>
      </EuiFlexItem>

      <EuiFlexItem grow={false}>
        <EuiButton
          iconType="lensApp"
          size="s"
          fill
          onClick={() => {}}
          isDisabled
        >
          Small and filled
        </EuiButton>
      </EuiFlexItem>

      <EuiFlexItem grow={true}>
        <EuiButton fullWidth iconType="lensApp" onClick={() => {}} isDisabled>
          Full width
        </EuiButton>
      </EuiFlexItem>
    </EuiFlexGroup>

    <EuiFlexGroup responsive={false} wrap gutterSize="s" alignItems="center">
      <EuiFlexItem grow={false}>
        <EuiButtonEmpty
          isDisabled
          color="text"
          onClick={() => {}}
          iconType="dashboardApp"
        >
          Disabled app icon
        </EuiButtonEmpty>
      </EuiFlexItem>

      <EuiFlexItem grow={false}>
        <EuiButtonEmpty
          isDisabled
          color="text"
          onClick={() => {}}
          iconType="arrowDown"
          iconSide="right"
          size="xs"
        >
          Disabled icon right
        </EuiButtonEmpty>
      </EuiFlexItem>
    </EuiFlexGroup>
  </div>
);
