import { PropTypes } from 'react-view';
import { EuiEmptyPrompt, EuiButton } from '../../../../src/components/';
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
    value: '<h2>You have no spice</h2>',
    type: PropTypes.ReactNode,
  };

  propsToUse.iconColor = {
    ...propsToUse.iconColor,
    type: PropTypes.Enum,
    defaultValue: 'subdued',
    options: {
      default: 'default',
      subdued: 'subdued',
      secondary: 'secondary',
      accent: 'accent',
      danger: 'danger',
      warning: 'warning',
      ghost: 'ghost',
    },
  };

  propsToUse.actions.type = PropTypes.String;
  propsToUse.body.type = PropTypes.String;
  propsToUse.body.value = `Navigators use massive amounts of spice to gain a limited form of
    prescience. This allows them to safely navigate interstellar space,
    enabling trade and travel throughout the galaxy.`;

  propsToUse.iconType = iconValidator(propsToUse.iconType, 'editorStrike');

  return {
    config: {
      componentName: 'EuiEmptyPrompt',
      props: propsToUse,
      scope: {
        EuiEmptyPrompt,
        EuiButton,
      },
      imports: {
        '@elastic/eui': {
          named: ['EuiEmptyPrompt', 'EuiButton'],
        },
      },
    },
  };
};
