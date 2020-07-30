import { PropTypes } from 'react-view';
import { EuiIcon } from '../../../../src/components/';
import { iconValidator } from '../../services/playground';

export default () => {
  const propsToUse = {};

  propsToUse.type = iconValidator(propsToUse.iconType);

  propsToUse.title = {
    type: PropTypes.String,
    description: 'title',
  };
  propsToUse.titleId = {
    type: PropTypes.String,
    description: 'title Id',
  };

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
