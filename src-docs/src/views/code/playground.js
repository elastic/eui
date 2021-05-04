import { PropTypes } from 'react-view';
import { EuiCodeBlock, EuiCode } from '../../../../src/components/';
import { propUtilityForPlayground } from '../../services/playground';

const codeDemo = `\n{\`${
  require('!!raw-loader!./code_examples/example.html').default
}\`}\n`;

export const codeBlockConfig = () => {
  const docgenInfo = Array.isArray(EuiCodeBlock.__docgenInfo)
    ? EuiCodeBlock.__docgenInfo[0]
    : EuiCodeBlock.__docgenInfo;
  const propsToUse = propUtilityForPlayground(docgenInfo.props);

  propsToUse.language.value = 'html';

  propsToUse.children = {
    type: PropTypes.ReactNode,
    value: codeDemo,
    hidden: false,
  };

  return {
    config: {
      componentName: 'EuiCodeBlock',
      props: propsToUse,
      scope: {
        EuiCodeBlock,
      },
      imports: {
        '@elastic/eui': {
          named: ['EuiCodeBlock'],
        },
      },
    },
  };
};

export const codeConfig = () => {
  const docgenInfo = Array.isArray(EuiCode.__docgenInfo)
    ? EuiCode.__docgenInfo[0]
    : EuiCode.__docgenInfo;
  const propsToUse = propUtilityForPlayground(docgenInfo.props);

  propsToUse.language.value = 'html';

  propsToUse.children = {
    type: PropTypes.ReactNode,
    value: codeDemo,
    hidden: false,
  };

  return {
    config: {
      componentName: 'EuiCode',
      props: propsToUse,
      scope: {
        EuiCode,
      },
      imports: {
        '@elastic/eui': {
          named: ['EuiCode'],
        },
      },
    },
  };
};
