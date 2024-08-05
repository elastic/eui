import React from 'react';

import {
  EuiPanel,
  EuiAvatar,
  EuiSelectableListItem,
  useEuiMemoizedStyles,
} from '../../../../../src';
import { euiSelectableTemplateSitewideRenderOptions } from '../../../../../src/components/selectable/selectable_templates';
import { euiSelectableTemplateSitewideStyles } from '../../../../../src/components/selectable/selectable_templates/selectable_template_sitewide.styles';

export default () => {
  const styles = useEuiMemoizedStyles(euiSelectableTemplateSitewideStyles);
  const props = {
    style: {
      height: 68,
      width: '100%',
    },
    title: 'Example of the EuiSelectableSitewideOption',
    showIcons: false,
    prepend: <EuiAvatar name="B" color="#eee" type="space" size="s" />,
    append: <EuiAvatar name="C" color="#eee" type="space" size="s" />,
    css: styles.euiSelectableTemplateSitewide__listItem,
    className: 'euiSelectableTemplateSitewide__listItem',
    role: 'presentation',
    'aria-selected': undefined,
  };

  return (
    <EuiPanel paddingSize="none">
      <EuiSelectableListItem {...props}>
        {euiSelectableTemplateSitewideRenderOptions(
          {
            label: 'A. Label',
            meta: [
              {
                text: 'D. Meta',
                type: 'application',
              },
              {
                text: 'Deployment',
                type: 'deployment',
              },
              {
                text: 'Default display',
              },
            ],
          },
          ''
        )}
      </EuiSelectableListItem>
    </EuiPanel>
  );
};
