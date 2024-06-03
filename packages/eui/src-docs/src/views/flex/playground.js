import { PropTypes } from 'react-view';
import {
  EuiFlexGroup,
  EuiFlexItem,
  EuiFlexGrid,
} from '../../../../src/components/';
import { propUtilityForPlayground } from '../../services/playground';

import { flexItemHiglightStyles } from './wrapper_styles';

export const flexGroupConfig = () => {
  const docgenInfo = Array.isArray(EuiFlexGroup.__docgenInfo)
    ? EuiFlexGroup.__docgenInfo[0]
    : EuiFlexGroup.__docgenInfo;
  const propsToUse = propUtilityForPlayground(docgenInfo.props);

  propsToUse.children = {
    type: PropTypes.ReactNode,
    value: `<EuiFlexItem>Flex item</EuiFlexItem>
    <EuiFlexItem grow={false}>Grow false</EuiFlexItem>
    <EuiFlexItem component="span">
    This is a span component
  </EuiFlexItem>
  <EuiFlexItem>
    <p>Another flex item</p>
    <p>
      To showcase stretcing (or not) of items
    </p>
  </EuiFlexItem>`,
    hidden: false,
  };

  return {
    config: {
      componentName: 'EuiFlexGroup',
      props: propsToUse,
      scope: {
        EuiFlexGroup,
        EuiFlexItem,
      },
      imports: {
        '@elastic/eui': {
          named: ['EuiFlexGroup', 'EuiFlexItem'],
        },
      },
    },
    playgroundCssStyles: flexItemHiglightStyles,
  };
};

export const flexGridConfig = () => {
  const docgenInfo = Array.isArray(EuiFlexGrid.__docgenInfo)
    ? EuiFlexGrid.__docgenInfo[0]
    : EuiFlexGrid.__docgenInfo;
  const propsToUse = propUtilityForPlayground(docgenInfo.props);

  propsToUse.children = {
    type: PropTypes.ReactNode,
    value: `<EuiFlexItem><div>One</div></EuiFlexItem>
<EuiFlexItem><div>Two</div></EuiFlexItem>
<EuiFlexItem><div>Three</div></EuiFlexItem>
<EuiFlexItem><div>Four</div></EuiFlexItem>
<EuiFlexItem><div>Five</div></EuiFlexItem>
<EuiFlexItem><div>Six</div></EuiFlexItem>
<EuiFlexItem><div>Seven</div></EuiFlexItem>`,
    hidden: false,
  };

  propsToUse.columns = {
    ...propsToUse.columns,
    type: PropTypes.Number,
    value: 3,
  };

  return {
    config: {
      componentName: 'EuiFlexGrid',
      props: propsToUse,
      scope: {
        EuiFlexGrid,
        EuiFlexItem,
      },
      imports: {
        '@elastic/eui': {
          named: ['EuiFlexGrid', 'EuiFlexItem'],
        },
      },
    },
    playgroundCssStyles: flexItemHiglightStyles,
  };
};
