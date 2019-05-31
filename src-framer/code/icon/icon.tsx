import {
  COLORS,
  EuiIcon,
  SIZES,
  TYPES,
  // @ts-ignore
} from '@elastic/eui/lib/components/icon/icon.js';
import { ControlType, PropertyControls } from 'framer';
import * as React from 'react';

// Define type of property
interface Props {
  type: TYPES;
  size: SIZES;
  color: COLORS;
  width: number;
  height: number;
}

export class Icon extends React.Component<Props> {
  // Set default properties
  static defaultProps = {
    size: 'xl',
    type: 'logoElasticsearch',
    // Initial size at 32 for ease of use
    width: 32,
    height: 32,
  };

  // Items shown in property panel
  static propertyControls: PropertyControls = {
    type: {
      type: ControlType.Enum,
      options: TYPES,
      title: 'type',
    },
    color: {
      type: ControlType.Enum,
      options: COLORS,
      title: 'color',
    },
    size: {
      type: ControlType.SegmentedEnum,
      options: SIZES,
      title: 'size',
    },
  };

  render() {
    return (
      <EuiIcon
        type={this.props.type}
        color={this.props.color}
        size={this.props.size}
        width={this.props.width}
        height={this.props.height}
      />
    );
  }
}
