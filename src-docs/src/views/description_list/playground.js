import { EuiDescriptionList } from '../../../../src/components';
import {
  propUtilityForPlayground,
  generateCustomProps,
} from '../../services/playground';

export const descriptionListConfig = () => {
  const docgenInfo = Array.isArray(EuiDescriptionList.__docgenInfo)
    ? EuiDescriptionList.__docgenInfo[0]
    : EuiDescriptionList.__docgenInfo;
  const propsToUse = propUtilityForPlayground(docgenInfo.props);

  const listItems = `[
    {
      title: 'The Elder Scrolls: Morrowind',
      description: 'The opening music alone evokes such strong memories.',
    },
    {
      title: 'TIE Fighter',
      description:
        'The sequel to XWING, join the dark side and fly for the Emperor.',
    },
  ]`;
  propsToUse.listItems = {
    ...propsToUse.listItems,
    value: listItems,
  };

  return {
    config: {
      componentName: 'EuiDescriptionList',
      props: propsToUse,
      scope: {
        EuiDescriptionList: EuiDescriptionList,
      },
      imports: {
        '@elastic/eui': {
          named: ['EuiDescriptionList'],
        },
      },
      customProps: {
        ...generateCustomProps(['listItems']),
      },
    },
  };
};
