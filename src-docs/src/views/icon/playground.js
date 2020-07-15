import { PropTypes } from 'react-view';
import { EuiIcon } from '../../../../src/components/';
import {
  mapOptions,
  //   propUtilityForPlayground,
} from '../../services/playground';
import { iconTypes } from './icons';

export default () => {
  const propsToUse = {};

  propsToUse.onIconLoad = {
    type: PropTypes.Function,
    value: '() => console.log("loaded")',
  };
  propsToUse.title = {
    type: PropTypes.String,
    description: 'title',
  };
  propsToUse.titleId = {
    type: PropTypes.String,
    description: 'title Id',
  };
  propsToUse.type = {
    type: PropTypes.Enum,
    description: 'iconType can also be a string',
    options: mapOptions(iconTypes),
  };
  //   propsToUse.color = {
  //     type: PropTypes.Enum,
  //     description: 'color',
  //     options: optionsColor,
  //   };
  propsToUse.size = {
    type: PropTypes.Enum,
    description: 'size',
    options: {
      original: 'original',
      s: 's',
      m: 'm',
      l: 'l',
      xl: 'xl',
      xxl: 'xxl',
    },
  };

  return {
    config: {
      componentName: 'EuiIcon',
      props: propsToUse,
      scope: {
        EuiIcon,
      },
      imports: {
        '@elastic/eui': {
          named: ['EuiIcon'],
        },
      },
    },
  };
};
