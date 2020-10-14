import { PropTypes } from 'react-view';
import { EuiFacetButton, EuiFacetGroup } from '../../../../src/components/';
import { propUtilityForPlayground } from '../../services/playground';
import * as t from '@babel/types';

export const facetButtonConfig = () => {
  const docgenInfo = Array.isArray(EuiFacetButton.__docgenInfo)
    ? EuiFacetButton.__docgenInfo[0]
    : EuiFacetButton.__docgenInfo;
  const propsToUse = propUtilityForPlayground(docgenInfo.props);

  propsToUse.onClick = {
    ...propsToUse.onClick,
    type: PropTypes.Custom,
    value: undefined,
    custom: {
      ...propsToUse.onClick.custom,
      use: 'switch',
      label: 'Simulate',
    },
  };

  propsToUse.children = {
    type: PropTypes.String,
    value: 'Facet content',
    hidden: false,
  };

  propsToUse.quantity = {
    ...propsToUse.quantity,
    value: 10,
  };

  return {
    config: {
      componentName: 'EuiFacetButton',
      props: propsToUse,
      scope: {
        EuiFacetButton,
      },
      imports: {
        '@elastic/eui': {
          named: ['EuiFacetButton'],
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

export const facetLayoutConfig = () => {
  const docgenInfo = Array.isArray(EuiFacetGroup.__docgenInfo)
    ? EuiFacetGroup.__docgenInfo[0]
    : EuiFacetGroup.__docgenInfo;
  const propsToUse = propUtilityForPlayground(docgenInfo.props);

  propsToUse.children = {
    type: PropTypes.ReactNode,
    value: `<EuiFacetButton quantity={6}>
    Facet one
  </EuiFacetButton>
  <EuiFacetButton quantity={10}>
     Facet two
  </EuiFacetButton>
  <EuiFacetButton quantity={25}>
    Facet three
  </EuiFacetButton>`,
    hidden: false,
  };

  return {
    config: {
      componentName: 'EuiFacetGroup',
      props: propsToUse,
      scope: {
        EuiFacetButton,
        EuiFacetGroup,
      },
      imports: {
        '@elastic/eui': {
          named: ['EuiFacetButton', 'EuiFacetGroup'],
        },
      },
    },
  };
};
