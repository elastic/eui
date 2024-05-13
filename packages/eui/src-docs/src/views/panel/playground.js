import { PropTypes } from 'react-view';
import { EuiPanel, EuiText } from '../../../../src/components/';
import { propUtilityForPlayground } from '../../services/playground';
import * as t from '@babel/types';

export const panelConfig = () => {
  const docgenInfo = Array.isArray(EuiPanel.__docgenInfo)
    ? EuiPanel.__docgenInfo[0]
    : EuiPanel.__docgenInfo;
  const propsToUse = propUtilityForPlayground(docgenInfo.props);

  propsToUse.children = {
    value: `<EuiText>
    <p>
      Any content inside of <strong>EuiPanel</strong> will appear here.
    </p>
  </EuiText>`,
    type: PropTypes.ReactNode,
    hidden: false,
  };

  propsToUse.onClick = {
    ...propsToUse.onClick,
    type: PropTypes.Custom,
    value: undefined,
    custom: {
      use: 'switch',
      label: 'Simulate',
    },
  };

  return {
    config: {
      componentName: 'EuiPanel',
      props: propsToUse,
      scope: {
        EuiPanel,
        EuiText,
      },
      imports: {
        '@elastic/eui': {
          named: ['EuiPanel', 'EuiText'],
        },
      },
      customProps: {
        onClick: {
          generate: (val) => {
            if (!val) return null;
            const obj = t.arrowFunctionExpression(
              [],
              t.blockStatement([]),
              false
            );
            return obj;
          },
        },
      },
    },
  };
};
