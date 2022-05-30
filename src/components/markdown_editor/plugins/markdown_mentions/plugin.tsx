/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { useEffect, useRef } from 'react';
import { EuiCodeBlock } from '../../../code';
import { EuiMarkdownEditorUiPlugin } from '../../markdown_types';
import { MentionsNodeDetails } from './types';
import { EuiSelectable, EuiSelectableProps } from '../../../selectable';
import { keys, useEuiTheme } from '../../../../services/';
import {
  EuiHighlight,
  EuiText,
  EuiTextColor,
  EuiAvatar,
} from '../../../../components';
import { euiMarkdownMentionsStyles } from './markdown_mentions.styles';

export const mentionsPlugin: EuiMarkdownEditorUiPlugin<MentionsNodeDetails> = {
  name: 'mentionsPlugin',
  button: {
    label: 'Mention',
    iconType: 'mention',
  },
  helpText: (
    <EuiCodeBlock language="md" paddingSize="s" fontSize="l">
      {'@someone'}
    </EuiCodeBlock>
  ),
  popover: ({ node, textarea, onSave, onCancel }) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const selectableRef = useRef<EuiSelectable>(null);

    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
      const onKeyDown: GlobalEventHandlers['onkeydown'] = (e) => {
        if (e.key === keys.ARROW_UP) {
          e.stopPropagation();
          e.preventDefault();
          selectableRef.current?.incrementActiveOptionIndex(-1);
        } else if (e.key === keys.ARROW_DOWN) {
          e.stopPropagation();
          e.preventDefault();
          selectableRef.current?.incrementActiveOptionIndex(1);
        } else if (e.key === keys.ENTER) {
          e.stopPropagation();
          e.preventDefault();
          selectableRef.current?.selectActiveItem();
        } else if (e.key === keys.ESCAPE) {
          onCancel();
        }
      };

      selectableRef.current?.incrementActiveOptionIndex(1); // pre-select the first item
      textarea.focus(); // clicking the mentions button will also trigger this popover
      textarea.addEventListener('keydown', onKeyDown);

      return () => {
        textarea.removeEventListener('keydown', onKeyDown);
      };
    }, [textarea, onCancel]);

    const onChange: EuiSelectableProps['onChange'] = (options) => {
      for (let i = 0; i < options.length; i++) {
        if (options[i].checked) {
          onSave(`@${options[i].label} `, { block: false });
          return;
        }
      }
    };

    const euiTheme = useEuiTheme();
    const styles = euiMarkdownMentionsStyles(euiTheme);
    const cssStyles = styles.euiMarkdownMentions;
    const cssItemStyles = styles.euiMarkdownMentions__item;
    const cssItemLabelStyles = styles.euiMarkdownMentions__itemLabel;
    const cssItemFullNameStyles = styles.euiMarkdownMentions__itemFullName;

    const renderOption = (option, searchValue) => {
      return (
        <EuiText size="s">
          <span css={cssItemStyles}>
            <EuiAvatar name={option.label} size="s" />

            <span css={cssItemLabelStyles}>
              <EuiHighlight search={searchValue}>{option.label}</EuiHighlight>
            </span>

            <EuiTextColor css={cssItemFullNameStyles} color="subdued">
              {option.firstName} {option.lastName}
            </EuiTextColor>
          </span>
        </EuiText>
      );
    };

    return (
      <EuiSelectable
        css={cssStyles}
        ref={selectableRef}
        options={node?.config.options}
        onChange={onChange}
        height="full"
        renderOption={renderOption}
        listProps={{
          showIcons: false,
          rowHeight: 36,
        }}
      >
        {(list) => list}
      </EuiSelectable>
    );
  },
};
