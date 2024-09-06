/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { useState, useMemo, ReactNode } from 'react';

import { useGeneratedHtmlId, useEuiMemoizedStyles } from '../../../services';
import { EuiButtonIcon } from '../../button';
import { EuiToolTip } from '../../tool_tip';
import { EuiPopover, EuiPopoverTitle } from '../../popover';
import { EuiDescriptionList } from '../../description_list';
import { EuiText } from '../../text';
import { useEuiI18n, EuiI18n } from '../../i18n';

import { euiDataGridKeyboardShortcutsStyles } from './keyboard_shortcuts.styles';

export const useDataGridKeyboardShortcuts = (): {
  keyboardShortcuts: ReactNode;
} => {
  const [isOpen, setIsOpen] = useState(false);

  const title = useEuiI18n('euiKeyboardShortcuts.title', 'Keyboard shortcuts');
  const titleId = useGeneratedHtmlId();

  const styles = useEuiMemoizedStyles(euiDataGridKeyboardShortcutsStyles);

  const keyboardShortcuts = useMemo(
    () => (
      <EuiPopover
        data-test-subj="dataGridKeyboardShortcutsPopover"
        isOpen={isOpen}
        closePopover={() => setIsOpen(false)}
        anchorPosition="downRight"
        panelPaddingSize="none"
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
        <EuiText
          css={styles.euiDataGrid__keyboardShortcuts}
          className="euiDataGrid__keyboardShortcuts"
          size="xs"
        >
          <EuiDescriptionList
            aria-labelledby={titleId}
            type="column"
            columnWidths={['auto', 'auto']}
            align="center"
            compressed
            listItems={[
              {
                title: (
                  <kbd>
                    <EuiI18n
                      token="euiKeyboardShortcuts.upArrowTitle"
                      default="Up arrow"
                    />
                  </kbd>
                ),
                description: (
                  <EuiI18n
                    token="euiKeyboardShortcuts.upArrowDescription"
                    default="Move one cell up"
                  />
                ),
              },
              {
                title: (
                  <kbd>
                    <EuiI18n
                      token="euiKeyboardShortcuts.downArrowTitle"
                      default="Down arrow"
                    />
                  </kbd>
                ),
                description: (
                  <EuiI18n
                    token="euiKeyboardShortcuts.downArrowDescription"
                    default="Move one cell down"
                  />
                ),
              },
              {
                title: (
                  <kbd>
                    <EuiI18n
                      token="euiKeyboardShortcuts.rightArrowTitle"
                      default="Right arrow"
                    />
                  </kbd>
                ),
                description: (
                  <EuiI18n
                    token="euiKeyboardShortcuts.rightArrowDescription"
                    default="Move one cell right"
                  />
                ),
              },
              {
                title: (
                  <kbd>
                    <EuiI18n
                      token="euiKeyboardShortcuts.leftArrowTitle"
                      default="Left arrow"
                    />
                  </kbd>
                ),
                description: (
                  <EuiI18n
                    token="euiKeyboardShortcuts.leftArrowDescription"
                    default="Move one cell left"
                  />
                ),
              },
              {
                title: (
                  <kbd>
                    <EuiI18n
                      token="euiKeyboardShortcuts.homeTitle"
                      default="Home"
                    />
                  </kbd>
                ),
                description: (
                  <EuiI18n
                    token="euiKeyboardShortcuts.homeDescription"
                    default="Move to the first cell of the current row"
                  />
                ),
              },
              {
                title: (
                  <kbd>
                    <EuiI18n
                      token="euiKeyboardShortcuts.endTitle"
                      default="End"
                    />
                  </kbd>
                ),
                description: (
                  <EuiI18n
                    token="euiKeyboardShortcuts.endDescription"
                    default="Move to the last cell of the current row"
                  />
                ),
              },
              {
                title: (
                  <>
                    <kbd>
                      <EuiI18n
                        token="euiKeyboardShortcuts.ctrl"
                        default="Ctrl"
                      />
                    </kbd>{' '}
                    <kbd>
                      <EuiI18n
                        token="euiKeyboardShortcuts.homeTitle"
                        default="Home"
                      />
                    </kbd>
                  </>
                ),
                description: (
                  <EuiI18n
                    token="euiKeyboardShortcuts.ctrlHomeDescription"
                    default="Move to the first cell of the current page"
                  />
                ),
              },
              {
                title: (
                  <>
                    <kbd>
                      <EuiI18n
                        token="euiKeyboardShortcuts.ctrl"
                        default="Ctrl"
                      />
                    </kbd>{' '}
                    <kbd>
                      <EuiI18n
                        token="euiKeyboardShortcuts.endTitle"
                        default="End"
                      />
                    </kbd>
                  </>
                ),
                description: (
                  <EuiI18n
                    token="euiKeyboardShortcuts.ctrlEndDescription"
                    default="Move to the last cell of the current page"
                  />
                ),
              },
              {
                title: (
                  <kbd>
                    <EuiI18n
                      token="euiKeyboardShortcuts.pageUpTitle"
                      default="Page Up"
                    />
                  </kbd>
                ),
                description: (
                  <EuiI18n
                    token="euiKeyboardShortcuts.pageUpDescription"
                    default="Go to the last row of the previous page"
                  />
                ),
              },
              {
                title: (
                  <kbd>
                    <EuiI18n
                      token="euiKeyboardShortcuts.pageDownTitle"
                      default="Page Down"
                    />
                  </kbd>
                ),
                description: (
                  <EuiI18n
                    token="euiKeyboardShortcuts.pageDownDescription"
                    default="Go to the first row of the next page"
                  />
                ),
              },
              {
                title: (
                  <kbd>
                    <EuiI18n
                      token="euiKeyboardShortcuts.enterTitle"
                      default="Enter"
                    />
                  </kbd>
                ),
                description: (
                  <EuiI18n
                    token="euiKeyboardShortcuts.enterDescription"
                    default="Open cell details and actions"
                  />
                ),
              },
              {
                title: (
                  <kbd>
                    <EuiI18n
                      token="euiKeyboardShortcuts.escapeTitle"
                      default="Escape"
                    />
                  </kbd>
                ),
                description: (
                  <EuiI18n
                    token="euiKeyboardShortcuts.escapeDescription"
                    default="Close cell details and actions"
                  />
                ),
              },
            ]}
          />
        </EuiText>
      </EuiPopover>
    ),
    [isOpen, title, titleId, styles]
  );

  return { keyboardShortcuts };
};
