import { PropTypes } from 'react-view';
import { EuiCallOut, EuiText } from '../../../../src/components/';
import {
  propUtilityForPlayground,
  iconValidator,
} from '../../services/playground';

export default () => {
  const docgenInfo = Array.isArray(EuiCallOut.__docgenInfo)
    ? EuiCallOut.__docgenInfo[0]
    : EuiCallOut.__docgenInfo;
  const propsToUse = propUtilityForPlayground(docgenInfo.props);

  propsToUse.iconType = iconValidator(propsToUse.iconType);

  propsToUse.title = {
    ...propsToUse.title,
    value: 'Check it out',
    type: PropTypes.String,
  };

  propsToUse.children = {
    ...propsToUse.children,
    value: `<p>
   Any content inside of <strong>EuiCallOut</strong> will appear here.
  </p>`,
    type: PropTypes.ReactNode,
    description: 'Content to display inside the callout below the title',
    hidden: false,
  };

  return {
    config: {
      componentName: 'EuiCallOut',
      props: propsToUse,
      scope: {
        EuiCallOut,
        EuiText,
      },
      imports: {
        '@elastic/eui': {
          named: ['EuiCallOut', 'EuiText'],
        },
      },
    },
  };
};
