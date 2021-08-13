import { EuiBreadcrumbs } from '../../../../src/components/breadcrumbs';
import {
  propUtilityForPlayground,
  generateCustomProps,
} from '../../services/playground';

export const breadcrumbsConfig = () => {
  const docgenInfo = Array.isArray(EuiBreadcrumbs.__docgenInfo)
    ? EuiBreadcrumbs.__docgenInfo[0]
    : EuiBreadcrumbs.__docgenInfo;
  const propsToUse = propUtilityForPlayground(docgenInfo.props);

  const breadcrumbs = `[
  {
    text: 'Animals',
    href: '#',
  },
  {
    text: 'Metazoans',
    href: '#',
  },
  {
    text: 'Chordates',
    href: '#',
  },
  {
    text: 'Vertebrates',
    href: '#',
  },
  {
    text: 'Tetrapods',
    href: '#',
  },
  {
    text: 'Reptiles',
    href: '#',
  },
  {
    text: 'Boa constrictor',
    href: '#',
  },
  {
    text: 'Nebulosa subspecies',
  },
]`;

  propsToUse.breadcrumbs = {
    ...propsToUse.breadcrumbs,
    value: breadcrumbs,
  };

  propsToUse.max = {
    ...propsToUse.max,
    value: 5,
  };

  return {
    config: {
      componentName: 'EuiBreadcrumbs',
      props: propsToUse,
      scope: {
        EuiBreadcrumbs,
      },
      imports: {
        '@elastic/eui': {
          named: ['EuiBreadcrumbs'],
        },
      },
      customProps: generateCustomProps(['breadcrumbs']),
    },
  };
};
