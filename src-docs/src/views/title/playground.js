import { PropTypes } from 'react-view';
import { EuiTitle } from '../../../../src/components/';
import {
  propUtilityForPlayground,
  createOptionalEnum,
} from '../../services/playground';

export const titleConfig = () => {
  const docgenInfo = Array.isArray(EuiTitle.__docgenInfo)
    ? EuiTitle.__docgenInfo[0]
    : EuiTitle.__docgenInfo;
  const propsToUse = propUtilityForPlayground(docgenInfo.props);

  propsToUse.children = {
    ...propsToUse.children,
    type: PropTypes.ReactNode,
    value: '<h2>Text content</h2>',
    hidden: false,
  };

  propsToUse.textTransform = createOptionalEnum(propsToUse.textTransform);

  return {
    config: {
      componentName: 'EuiTitle',
      props: propsToUse,
      scope: {
        EuiTitle,
      },
      imports: {
        '@elastic/eui': {
          named: ['EuiTitle'],
        },
      },
    },
  };
};
