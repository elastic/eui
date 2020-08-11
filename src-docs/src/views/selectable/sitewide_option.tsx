import React from 'react';

import { EuiSelectableListItem } from '../../../../src/components/selectable';
import { EuiAvatar } from '../../../../src/components/avatar';
import { EuiPanel } from '../../../../src/components/panel';

export default () => {
  const props = {
    style: {
      height: 68,
      width: '100%',
    },
    title: 'Example of the EuiSelectableSitewideOption',
    showIcons: false,
    prepend: <EuiAvatar name="A" color="#eee" type="space" size="s" />,
    append: <EuiAvatar name="D" color="#eee" type="space" size="s" />,
    className: 'euiSelectableTemplateSitewide__listItem',
  };

  return (
    <EuiPanel paddingSize="none">
      <EuiSelectableListItem {...props}>
        <span className="euiSelectableTemplateSitewide__listItemTitle">
          B. Label
        </span>
        <span className="euiSelectableTemplateSitewide__optionMetasList">
          <span className="euiSelectableTemplateSitewide__optionMeta euiSelectableTemplateSitewide__optionMeta--application">
            C. Meta
          </span>
          <span className="euiSelectableTemplateSitewide__optionMeta euiSelectableTemplateSitewide__optionMeta--deployment">
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
