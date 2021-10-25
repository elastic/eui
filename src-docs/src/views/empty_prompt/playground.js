import { PropTypes } from 'react-view';
import {
  EuiEmptyPrompt,
  EuiButton,
  EuiTitle,
  EuiText,
  EuiLink,
} from '../../../../src/components/';
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
    value: '<h2>No cases</h2>',
    type: PropTypes.ReactNode,
  };

  propsToUse.iconColor = {
    ...propsToUse.iconColor,
    type: PropTypes.Enum,
    defaultValue: 'subdued',
    options: {
      default: 'default',
      subdued: 'subdued',
      success: 'success',
      accent: 'accent',
      danger: 'danger',
      warning: 'warning',
      ghost: 'ghost',
    },
  };

  propsToUse.actions.type = PropTypes.String;

  propsToUse.body.type = PropTypes.String;
  propsToUse.body.value =
    'There are no cases to display. Please create a new case or change your filter settings.';

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

  propsToUse.iconType = iconValidator(propsToUse.iconType, 'logoSecurity');

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
