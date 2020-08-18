import { PropTypes } from 'react-view';
import { EuiHighlight, EuiMark } from '../../../../src/components/';
import { propUtilityForPlayground } from '../../services/playground';

export const highlightConfig = () => {
  const docgenInfo = Array.isArray(EuiHighlight.__docgenInfo)
    ? EuiHighlight.__docgenInfo[0]
    : EuiHighlight.__docgenInfo;
  const propsToUse = propUtilityForPlayground(docgenInfo.props);

  propsToUse.children = {
    ...propsToUse.children,
    type: PropTypes.String,
    hidden: false,
    value: 'The quick brown fox jumped over the lazy dog',
  };

  propsToUse.search = {
    ...propsToUse.search,
    type: PropTypes.String,
    hidden: false,
  };

  return {
    config: {
      componentName: 'EuiHighlight',
      props: propsToUse,
      scope: {
        EuiHighlight,
      },
      imports: {
        '@elastic/eui': {
          named: ['EuiHighlight'],
        },
      },
    },
  };
};

export const markConfig = () => {
  const docgenInfo = Array.isArray(EuiMark.__docgenInfo)
    ? EuiMark.__docgenInfo[0]
    : EuiMark.__docgenInfo;
  const propsToUse = propUtilityForPlayground(docgenInfo.props);

  propsToUse.children.value = 'mark';

  return {
    config: {
      componentName: 'EuiMark',
      props: propsToUse,
      scope: {
        EuiMark,
      },
      imports: {
        '@elastic/eui': {
          named: ['EuiMark'],
        },
      },
    },
  };
};
