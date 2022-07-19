/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { useState, useMemo, ReactNode } from 'react';

import { useGeneratedHtmlId } from '../../../services';
import { EuiButtonIcon } from '../../button';
import { EuiToolTip } from '../../tool_tip';
import { EuiPopover, EuiPopoverTitle } from '../../popover';
import { EuiDescriptionList } from '../../description_list';
import { EuiText } from '../../text';
import { useEuiI18n } from '../../i18n';

export const useDataGridKeyboardShortcuts = (): {
  keyboardShortcuts: ReactNode;
} => {
  const [isOpen, setIsOpen] = useState(false);

  const title = useEuiI18n('euiKeyboardShortcuts.title', 'Keyboard shortcuts');
  const titleId = useGeneratedHtmlId();

  const keyboardShortcuts = useMemo(
    () => (
      <EuiPopover
        data-test-subj="dataGridKeyboardShortcutsPopover"
        isOpen={isOpen}
        closePopover={() => setIsOpen(false)}
        anchorPosition="downRight"
        panelClassName="euiDataGrid__keyboardShortcutsPopoverPanel"
        button={
          <EuiToolTip content={title} delay="long">
            <EuiButtonIcon
              size="xs"
              iconType="keyboard"
              color="text"
              data-test-subj="dataGridKeyboardShortcutsButton"
              onClick={() => setIsOpen(!isOpen)}
              aria-label={title}
            />
          </EuiToolTip>
        }
      >
        <EuiPopoverTitle paddingSize="s">
          <h2 id={titleId}>{title}</h2>
        </EuiPopoverTitle>
        <EuiText size="xs">
          <EuiDescriptionList
            aria-labelledby={titleId}
            type="column"
            align="center"
            compressed
            listItems={[
              {
                title: <kbd>Up arrow</kbd>,
                description: 'Moves focus one cell down.',
              },
              {
                title: <kbd>Down arrow</kbd>,
                description: 'Moves focus one cell up.',
              },
              {
                title: <kbd>Right arrow</kbd>,
                description: 'Moves focus one cell to the right.',
              },
              {
                title: <kbd>Left arrow</kbd>,
                description: 'Moves focus one cell to the left.',
              },
              {
                title: <kbd>Home</kbd>,
                description:
                  'Moves focus to the first cell in the current row.',
              },
              {
                title: <kbd>End</kbd>,
                description: 'Moves focus to the last cell in the current row.',
              },
              {
                title: (
                  <>
                    <kbd>Ctrl</kbd> <kbd>Home</kbd>
                  </>
                ),
                description: 'Moves focus to the first cell in the first row.',
              },
              {
                title: (
                  <>
                    <kbd>Ctrl</kbd> <kbd>End</kbd>
                  </>
                ),
                description: 'Moves focus to the last cell in the last row.',
              },
              {
                title: <kbd>Page Up</kbd>,
                description: 'Paginates to the last row of the previous page.',
              },
              {
                title: <kbd>Page Down</kbd>,
                description: 'Paginates to the first row of the next page.',
              },
              {
                title: <kbd>Enter</kbd>,
                description:
                  'Opens cell expansion popover for interactive cells.',
              },
              {
                title: <kbd>Escape</kbd>,
                description: 'Closes any open popovers.',
              },
            ]}
          />
        </EuiText>
      </EuiPopover>
    ),
    [isOpen, title, titleId]
  );

  return { keyboardShortcuts };
};
