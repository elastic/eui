import {
  COLORS,
  EuiButton,
  ICON_SIDES,
  SIZES,
  // @ts-ignore
} from '@elastic/eui/lib/components/button/button.js';
// @ts-ignore
import { ICON_TYPES } from '@elastic/eui/lib/components/icon/index.js';
import { ControlType, PropertyControls } from 'framer';
import * as React from 'react';
import { FrameSize } from '../_framer_helpers/frame_size';

// Define type of property
interface Props {
  childText: string;
  iconType: ICON_TYPES;
  color: COLORS;
  iconSide: string;
  size: SIZES;
  showIconProps: boolean;
  fullWidth: boolean;
  fill: boolean;
  width: number;
  height: number;
}

export class Button extends React.Component<Props> {
  // Set default properties
  static defaultProps = {
    childText: 'Button text',
    color: 'primary',
    iconType: null,
    iconSide: 'left',
    showIconProps: false,
    fullWidth: false,
  };

  // Items shown in property panel
  static propertyControls: PropertyControls = {
    childText: {
      type: ControlType.String,
      title: '🧙 childText',
    },
    fill: {
      type: ControlType.Boolean,
      title: 'fill',
    },
    size: {
      type: ControlType.SegmentedEnum,
      options: SIZES,
      title: 'size',
    },
    color: {
      type: ControlType.Enum,
      options: COLORS,
      title: 'color',
    },
    fullWidth: {
      type: ControlType.Boolean,
      title: '🧙‍♀️ fullWidth',
    },
    showIconProps: {
      type: ControlType.Boolean,
      title: '🧙 icon?',
    },
    iconType: {
      type: ControlType.Enum,
      options: ICON_TYPES,
      title: '↳ iconType',
      hidden(props: Props) {
        return props.showIconProps === false;
      },
    },
    iconSide: {
      type: ControlType.SegmentedEnum,
      options: ICON_SIDES,
      title: '↳ iconSide',
      hidden(props: Props) {
        return props.showIconProps === false;
      },
    },
  };

  render() {
    return (
      <FrameSize>
        <EuiButton
          size={this.props.size}
          fill={this.props.fill}
          color={this.props.color}
          iconType={this.props.iconType}
          iconSide={this.props.iconSide}
          style={{ width: this.props.fullWidth ? '100%' : 'auto' }}
          width={this.props.width}
          height={this.props.height}>
          {this.props.childText}
        </EuiButton>
      </FrameSize>
    );
  }
}
