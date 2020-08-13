import { PropTypes } from 'react-view';
import { EuiCodeEditor } from '../../../../src/components/';
import {
  propUtilityForPlayground,
  dummyFunction,
} from '../../services/playground';

import 'brace/theme/github';
import 'brace/mode/javascript';
import 'brace/snippets/javascript';

export const codeEditorConfig = () => {
  const docgenInfo = Array.isArray(EuiCodeEditor.__docgenInfo)
    ? EuiCodeEditor.__docgenInfo[0]
    : EuiCodeEditor.__docgenInfo;
  const propsToUse = propUtilityForPlayground(docgenInfo.props);

  propsToUse.value = {
    ...propsToUse.value,
    value: '',
    type: PropTypes.String,
  };

  propsToUse.onChange = {
    ...propsToUse.onChange,
    type: PropTypes.Custom,
    value: undefined,
    custom: {
      use: 'switch',
      label: 'Simulate',
    },
  };

  propsToUse.onBlur = {
    ...propsToUse.onBlur,
    type: PropTypes.Custom,
    value: undefined,
    custom: {
      ...propsToUse.onBlur.custom,
      use: 'switch',
      label: 'Simulate',
    },
  };

  propsToUse.onFocus = {
    ...propsToUse.onFocus,
    type: PropTypes.Custom,
    value: undefined,
    custom: {
      ...propsToUse.onFocus.custom,
      use: 'switch',
      label: 'Simulate',
    },
  };

  propsToUse.theme = {
    ...propsToUse.theme,
    type: PropTypes.String,
  };
  propsToUse.mode = {
    ...propsToUse.mode,
    type: PropTypes.String,
  };

  return {
    config: {
      componentName: 'EuiCodeEditor',
      props: propsToUse,
      scope: {
        EuiCodeEditor,
      },
      imports: {
        '@elastic/eui': {
          named: ['EuiCodeEditor'],
        },
        'brace/theme/github': {},
        'brace/snippets/javascript': {},
        'brace/mode/javascript': {},
      },
      customProps: {
        onChange: dummyFunction,
        onBlur: dummyFunction,
        onFocus: dummyFunction,
      },
    },
  };
};
