import { PropTypes } from 'react-view';
import {
  EuiEmptyPrompt,
  EuiButton,
  EuiTitle,
  EuiText,
  EuiLink,
  ICON_COLORS,
} from '../../../../src/components';
import {
  propUtilityForPlayground,
  iconValidator,
} from '../../services/playground';

export default () => {
  const docgenInfo = Array.isArray(EuiEmptyPrompt.__docgenInfo)
    ? EuiEmptyPrompt.__docgenInfo[0]
    : EuiEmptyPrompt.__docgenInfo;
  const propsToUse = propUtilityForPlayground(docgenInfo.props);

  propsToUse.title = {
    ...propsToUse.title,
    value: '<h2>Start adding cases</h2>',
    type: PropTypes.ReactNode,
  };

  propsToUse.iconType = iconValidator(propsToUse.iconType, 'logoSecurity');
  propsToUse.iconColor = {
    ...propsToUse.iconColor,
    type: PropTypes.Enum,
    defaultValue: 'subdued',
    options: ICON_COLORS.reduce((a, v) => ({ ...a, [v]: v }), {}),
  };

  propsToUse.actions.type = PropTypes.String;

  propsToUse.body = {
    ...propsToUse.body,
    value:
      '<p>There are no cases to display. Add a new case or change your filter settings.</p>',
    type: PropTypes.ReactNode,
  };

  propsToUse.actions = {
    ...propsToUse.actions,
    value: `<EuiButton color="primary" fill>
  Add a case
</EuiButton>`,
    type: PropTypes.ReactNode,
  };

  propsToUse.footer = {
    ...propsToUse.footer,
    value: `<>
  <EuiTitle size="xxs">
    <h3>Want to learn more?</h3>
  </EuiTitle>
  <EuiLink href="#" target="_blank">
    Read documentation
  </EuiLink>
</>`,
    type: PropTypes.ReactNode,
  };

  return {
    config: {
      componentName: 'EuiEmptyPrompt',
      props: propsToUse,
      scope: {
        EuiEmptyPrompt,
        EuiButton,
        EuiTitle,
        EuiText,
        EuiLink,
      },
      imports: {
        '@elastic/eui': {
          named: [
            'EuiEmptyPrompt',
            'EuiButton',
            'EuiTitle',
            'EuiText',
            'EuiLink',
          ],
        },
      },
    },
  };
};
