/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { useState, useMemo, ReactNode } from 'react';
import { EuiButtonIcon } from '../../button';
import { EuiToolTip } from '../../tool_tip';
import { EuiPopover } from '../../popover';
import { EuiDescriptionList } from '../../description_list';
import { EuiBadge } from '../../badge';
import { useEuiI18n } from '../../i18n';

export const useDataGridKeyboardShortcuts = (): {
  keyboardShortcuts: ReactNode;
} => {
  const [isOpen, setIsOpen] = useState(false);

  const buttonLabel = useEuiI18n(
    'euiKeyboardShortcuts.label',
    'Keyboard shortcuts'
  );

  const keyboardShortcuts = useMemo(
    () => (
      <EuiPopover
        data-test-subj="dataGridKeyboardShortcutsPopover"
        isOpen={isOpen}
        closePopover={() => setIsOpen(false)}
        anchorPosition="downRight"
        panelClassName="euiDataGrid__keyboardShortcutsPopoverPanel"
        button={
          <EuiToolTip content={buttonLabel} delay="long">
            <EuiButtonIcon
              size="xs"
              iconType="iInCircle" // TODO
              color="text"
              data-test-subj="dataGridKeyboardShortcutsButton"
              onClick={() => setIsOpen(!isOpen)}
              aria-label={buttonLabel}
            />
          </EuiToolTip>
        }
      >
        <EuiDescriptionList
          type="column"
          align="center"
          compressed
          listItems={[
            {
              title: <EuiBadge>Up arrow</EuiBadge>,
              description: 'Moves focus one cell down.',
            },
            {
              title: <EuiBadge>Down arrow</EuiBadge>,
              description: 'Moves focus one cell up.',
            },
            {
              title: <EuiBadge>Right arrow</EuiBadge>,
              description: 'Moves focus one cell to the right.',
            },
            {
              title: <EuiBadge>Left arrow</EuiBadge>,
              description: 'Moves focus one cell to the left.',
            },
            {
              title: <EuiBadge>Home</EuiBadge>,
              description: 'Moves focus to the first cell in the current row.',
            },
            {
              title: <EuiBadge>End</EuiBadge>,
              description: 'Moves focus to the last cell in the current row.',
            },
            {
              title: (
                <>
                  <EuiBadge>Ctrl</EuiBadge>
                  <EuiBadge>Home</EuiBadge>
                </>
              ),
              description: 'Moves focus to the first cell in the first row.',
            },
            {
              title: (
                <>
                  <EuiBadge>Ctrl</EuiBadge>
                  <EuiBadge>End</EuiBadge>
                </>
              ),
              description: 'Moves focus to the last cell in the last row.',
            },
            {
              title: <EuiBadge>Page Up</EuiBadge>,
              description: 'Paginates to the last row of the previous page.',
            },
            {
              title: <EuiBadge>Page Down</EuiBadge>,
              description: 'Paginates to the first row of the next page.',
            },
            {
              title: <EuiBadge>Enter</EuiBadge>,
              description:
                'Opens cell expansion popover for interactive cells.',
            },
            {
              title: <EuiBadge>Escape</EuiBadge>,
              description: 'Closes any open popovers.',
            },
          ]}
        />
      </EuiPopover>
    ),
    [isOpen, buttonLabel]
  );

  return { keyboardShortcuts };
};
