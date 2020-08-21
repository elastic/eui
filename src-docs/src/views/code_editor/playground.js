import { PropTypes } from 'react-view';
import { EuiCodeEditor } from '../../../../src/components/';
import {
  propUtilityForPlayground,
  dummyFunction,
} from '../../services/playground';

import 'brace/theme/github';
import 'brace/theme/cobalt';
import 'brace/theme/dawn';
import 'brace/theme/eclipse';
import 'brace/theme/iplastic';
import 'brace/theme/monokai';
import 'brace/theme/solarized_dark';
import 'brace/theme/solarized_light';
import 'brace/theme/terminal';
import 'brace/theme/twilight';
import 'brace/theme/xcode';

import 'brace/mode/c_cpp';
import 'brace/mode/csharp';
import 'brace/mode/css';
import 'brace/mode/dart';
import 'brace/mode/golang';
import 'brace/mode/html';
import 'brace/mode/java';
import 'brace/mode/javascript';
import 'brace/mode/less';
import 'brace/mode/text';
import 'brace/mode/typescript';

import 'brace/snippets/javascript';
import 'brace/snippets/typescript';
import 'brace/snippets/java';
import 'brace/snippets/c_cpp';
import 'brace/snippets/css';

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
    custom: {
      ...propsToUse.theme.custom,
      helpText:
        'Some available themes are cobalt, dawn, eclipse, github, iplastic, monokai, solarozed_dark, solarized_light, terminal, xcode',
    },
  };
  propsToUse.mode = {
    ...propsToUse.mode,
    type: PropTypes.String,
    custom: {
      ...propsToUse.mode.custom,
      helpText:
        'Some available modes are c_cpp, csharp, css, dart, golang, html, java, javascript, less, text, typescript',
    },
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
        'brace/theme/cobalt': {},
        'brace/theme/dawn': {},
        'brace/theme/eclipse': {},
        'brace/theme/github': {},
        'brace/theme/iplastic': {},
        'brace/theme/monokai': {},
        'brace/theme/solarized_dark': {},
        'brace/theme/solarized_light': {},
        'brace/theme/terminal': {},
        'brace/theme/twilight': {},
        'brace/theme/xcode': {},
        'brace/mode/c_cpp': {},
        'brace/mode/csharp': {},
        'brace/mode/css': {},
        'brace/mode/dart': {},
        'brace/mode/golang': {},
        'brace/mode/html': {},
        'brace/mode/java': {},
        'brace/mode/javascript': {},
        'brace/mode/less': {},
        'brace/mode/text': {},
        'brace/mode/typescript': {},
        'brace/snippets/javascript': {},
        'brace/snippets/typescript': {},
        'brace/snippets/java': {},
        'brace/snippets/c_cpp': {},
        'brace/snippets/css': {},
      },
      customProps: {
        onChange: dummyFunction,
        onBlur: dummyFunction,
        onFocus: dummyFunction,
      },
    },
  };
};
