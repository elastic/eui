/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';

import { useEuiMemoizedStyles } from '../../../services';
import { EuiButtonIcon } from '../../button';
import { EuiFlexGroup, EuiFlexItem } from '../../flex';
import { useEuiI18n } from '../../i18n';
import type { IconType } from '../../icon';
import { EuiScreenReaderLive } from '../../accessibility';
import { EuiText } from '../../text';
import { EuiToolTip } from '../../tool_tip';
import { euiFlyoutMenuStyles } from './flyout_menu.styles';
import type { EuiFlyoutMenuPagination } from './types';

const PaginationButton: React.FC<{
  iconType: IconType;
  label: string;
  onClick: () => void;
  isDisabled: boolean;
  dataTestSubj: string;
}> = ({ iconType, label, onClick, isDisabled, dataTestSubj }) => {
  const sharedProps = {
    iconType,
    color: 'text' as const,
    size: 'xs' as const,
    'aria-label': label,
    onClick,
    'data-test-subj': dataTestSubj,
  };

  return isDisabled ? (
    <EuiButtonIcon {...sharedProps} isDisabled />
  ) : (
    <EuiToolTip content={label} disableScreenReaderOutput>
      <EuiButtonIcon {...sharedProps} />
    </EuiToolTip>
  );
};

export const PaginationControls: React.FC<{
  pagination: EuiFlyoutMenuPagination;
}> = ({ pagination }) => {
  const styles = useEuiMemoizedStyles(euiFlyoutMenuStyles);
  const { currentIndex, total, onPrevious, onNext, onFirst, onLast } =
    pagination;

  // Jump-to-first/last controls read as a horizontal track, so the Prev/Next
  // chevrons follow that axis unless the consumer overrides them.
  const hasJumpControls = onFirst != null || onLast != null;
  const previousIconType = hasJumpControls
    ? 'chevronSingleLeft'
    : 'chevronSingleUp';
  const nextIconType = hasJumpControls
    ? 'chevronSingleRight'
    : 'chevronSingleDown';

  const firstLabel = useEuiI18n('euiFlyoutMenu.pagination.first', 'First');
  const prevLabel = useEuiI18n('euiFlyoutMenu.pagination.previous', 'Previous');
  const nextLabel = useEuiI18n('euiFlyoutMenu.pagination.next', 'Next');
  const lastLabel = useEuiI18n('euiFlyoutMenu.pagination.last', 'Last');
  const counterLabel = useEuiI18n(
    'euiFlyoutMenu.pagination.counter',
    '{position} of {total}',
    { position: currentIndex + 1, total }
  );

  const isAtStart = currentIndex === 0;
  const isAtEnd = currentIndex === total - 1;

  return (
    <EuiFlexItem grow={false}>
      <EuiFlexGroup gutterSize="xs" alignItems="center" responsive={false}>
        {onFirst && (
          <EuiFlexItem grow={false}>
            <PaginationButton
              iconType="chevronLimitLeft"
              label={firstLabel}
              onClick={onFirst}
              isDisabled={isAtStart}
              dataTestSubj="euiFlyoutMenuPaginationFirst"
            />
          </EuiFlexItem>
        )}
        <EuiFlexItem grow={false}>
          <PaginationButton
            iconType={previousIconType}
            label={prevLabel}
            onClick={onPrevious}
            isDisabled={isAtStart}
            dataTestSubj="euiFlyoutMenuPaginationPrev"
          />
        </EuiFlexItem>
        <EuiFlexItem grow={false}>
          <EuiText
            size="s"
            css={styles.euiFlyoutMenu__paginationCounter}
            aria-hidden="true"
          >
            {counterLabel}
          </EuiText>
          <EuiScreenReaderLive>{counterLabel}</EuiScreenReaderLive>
        </EuiFlexItem>
        <EuiFlexItem grow={false}>
          <PaginationButton
            iconType={nextIconType}
            label={nextLabel}
            onClick={onNext}
            isDisabled={isAtEnd}
            dataTestSubj="euiFlyoutMenuPaginationNext"
          />
        </EuiFlexItem>
        {onLast && (
          <EuiFlexItem grow={false}>
            <PaginationButton
              iconType="chevronLimitRight"
              label={lastLabel}
              onClick={onLast}
              isDisabled={isAtEnd}
              dataTestSubj="euiFlyoutMenuPaginationLast"
            />
          </EuiFlexItem>
        )}
      </EuiFlexGroup>
    </EuiFlexItem>
  );
};
