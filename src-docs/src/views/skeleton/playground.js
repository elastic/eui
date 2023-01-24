import { PropTypes } from 'react-view';
import {
  EuiSkeletonText,
  EuiSkeletonTitle,
  EuiSkeletonCircle,
  EuiSkeletonRectangle,
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

  return {
    config: {
      componentName: 'EuiSkeletonText',
      props: propsToUse,
      scope: {
        EuiSkeletonText,
      },
      imports: {
        '@elastic/eui': {
          named: ['EuiSkeletonText'],
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

  return {
    config: {
      componentName: 'EuiSkeletonTitle',
      props: propsToUse,
      scope: {
        EuiSkeletonTitle,
      },
      imports: {
        '@elastic/eui': {
          named: ['EuiSkeletonTitle'],
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

  return {
    config: {
      componentName: 'EuiSkeletonCircle',
      props: propsToUse,
      scope: {
        EuiSkeletonCircle,
      },
      imports: {
        '@elastic/eui': {
          named: ['EuiSkeletonCircle'],
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

  return {
    config: {
      componentName: 'EuiSkeletonRectangle',
      props: propsToUse,
      scope: {
        EuiSkeletonRectangle,
      },
      imports: {
        '@elastic/eui': {
          named: ['EuiSkeletonRectangle'],
        },
      },
    },
  };
};
