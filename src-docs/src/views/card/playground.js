import { PropTypes } from 'react-view';
import { EuiCard } from '../../../../src/components/';
import { propUtilityForPlayground } from '../../services/playground';

export default () => {
  const docgenInfo = Array.isArray(EuiCard.__docgenInfo)
    ? EuiCard.__docgenInfo[0]
    : EuiCard.__docgenInfo;
  const propsToUse = propUtilityForPlayground(docgenInfo.props);

  propsToUse.title = {
    ...propsToUse.title,
    type: PropTypes.String,
    value: 'title',
  };

  propsToUse.description = {
    ...propsToUse.description,
    type: PropTypes.String,
    value: 'description',
  };

  propsToUse.image = {
    ...propsToUse.image,
    type: PropTypes.String,
  };

  return {
    config: {
      componentName: 'EuiCard',
      props: propsToUse,
      scope: {
        EuiCard,
      },
      imports: {
        '@elastic/eui': {
          named: ['EuiCard'],
        },
      },
    },
  };
};
