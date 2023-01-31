import { PropTypes } from 'react-view';
import {
  EuiSkeletonText,
  EuiText,
  EuiSkeletonTitle,
  EuiTitle,
  EuiSkeletonCircle,
  EuiAvatar,
  EuiSkeletonRectangle,
  EuiPanel,
} from '../../../../src/components/';
import { propUtilityForPlayground } from '../../services/playground';

export const skeletonTextConfig = () => {
  const docgenInfo = Array.isArray(EuiSkeletonText.__docgenInfo)
    ? EuiSkeletonText.__docgenInfo[0]
    : EuiSkeletonText.__docgenInfo;
  const propsToUse = propUtilityForPlayground(docgenInfo.props);

  propsToUse.lines = {
    ...propsToUse.lines,
    type: PropTypes.Number,
    value: 3,
  };

  propsToUse.children = {
    type: PropTypes.ReactNode,
    value: `<EuiText>
  <p>Hello world</p>
</EuiText>`,
    hidden: false,
  };

  return {
    config: {
      componentName: 'EuiSkeletonText',
      props: propsToUse,
      scope: {
        EuiSkeletonText,
        EuiText,
      },
      imports: {
        '@elastic/eui': {
          named: ['EuiSkeletonText', 'EuiText'],
        },
      },
    },
  };
};

export const skeletonTitleConfig = () => {
  const docgenInfo = Array.isArray(EuiSkeletonTitle.__docgenInfo)
    ? EuiSkeletonTitle.__docgenInfo[0]
    : EuiSkeletonTitle.__docgenInfo;
  const propsToUse = propUtilityForPlayground(docgenInfo.props);

  propsToUse.children = {
    ...propsToUse.children,
    type: PropTypes.ReactNode,
    value: `<EuiTitle>
  <h4>Hello world</h4>
</EuiTitle>`,
    hidden: false,
  };

  return {
    config: {
      componentName: 'EuiSkeletonTitle',
      props: propsToUse,
      scope: {
        EuiSkeletonTitle,
        EuiTitle,
      },
      imports: {
        '@elastic/eui': {
          named: ['EuiSkeletonTitle', 'EuiTitle'],
        },
      },
    },
  };
};

export const skeletonCircleConfig = () => {
  const docgenInfo = Array.isArray(EuiSkeletonCircle.__docgenInfo)
    ? EuiSkeletonCircle.__docgenInfo[0]
    : EuiSkeletonCircle.__docgenInfo;
  const propsToUse = propUtilityForPlayground(docgenInfo.props);

  propsToUse.children = {
    ...propsToUse.children,
    type: PropTypes.ReactNode,
    value: '<EuiAvatar name="Hello World" />',
    hidden: false,
  };

  return {
    config: {
      componentName: 'EuiSkeletonCircle',
      props: propsToUse,
      scope: {
        EuiSkeletonCircle,
        EuiAvatar,
      },
      imports: {
        '@elastic/eui': {
          named: ['EuiSkeletonCircle', 'EuiAvatar'],
        },
      },
    },
  };
};

export const skeletonRectangleConfig = () => {
  const docgenInfo = Array.isArray(EuiSkeletonRectangle.__docgenInfo)
    ? EuiSkeletonRectangle.__docgenInfo[0]
    : EuiSkeletonRectangle.__docgenInfo;
  const propsToUse = propUtilityForPlayground(docgenInfo.props);

  propsToUse.width = {
    ...propsToUse.value,
    type: PropTypes.String,
    value: '24px',
  };
  propsToUse.height = {
    ...propsToUse.value,
    type: PropTypes.String,
    value: '24px',
  };

  propsToUse.children = {
    ...propsToUse.children,
    type: PropTypes.ReactNode,
    value: '<EuiPanel color="subdued" />',
    hidden: false,
  };

  return {
    config: {
      componentName: 'EuiSkeletonRectangle',
      props: propsToUse,
      scope: {
        EuiSkeletonRectangle,
        EuiPanel,
      },
      imports: {
        '@elastic/eui': {
          named: ['EuiSkeletonRectangle', 'EuiPanel'],
        },
      },
    },
  };
};
