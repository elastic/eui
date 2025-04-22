import React from 'react';
import { EuiPanel, EuiAvatar, EuiSelectableListItem } from '@elastic/eui';

export const SitewideOption = () => {
  const props = {
    style: {
      height: 68,
      width: '100%',
    },
    title: 'Example of the EuiSelectableSitewideOption',
    showIcons: false,
    prepend: <EuiAvatar name="B" color="#eee" type="space" size="s" />,
    append: <EuiAvatar name="C" color="#eee" type="space" size="s" />,
    className: 'euiSelectableTemplateSitewide__listItem',
    role: 'presentation',
    'aria-selected': undefined,
  };

  return (
    <EuiPanel paddingSize="none">
      <EuiSelectableListItem {...props}>
        <span className="euiSelectableTemplateSitewide__listItemTitle">
          A. Label
        </span>
        <span className="euiSelectableTemplateSitewide__optionMetasList">
          <span
            className="euiSelectableTemplateSitewide__optionMeta euiSelectableTemplateSitewide__optionMeta--application">
            D. Meta
          </span>
          <span
            className="euiSelectableTemplateSitewide__optionMeta euiSelectableTemplateSitewide__optionMeta--deployment">
            Deployment
          </span>
          <span className="euiSelectableTemplateSitewide__optionMeta">
            Default display
          </span>
        </span>
      </EuiSelectableListItem>
    </EuiPanel>
  );
};
