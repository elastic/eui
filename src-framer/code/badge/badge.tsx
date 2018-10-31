import { COLORS, EuiBadge, ICON_SIDES } from '@elastic/eui/lib/components/badge/badge.js';
import { ICON_TYPES } from '@elastic/eui/lib/components/icon/index.js';
import { ControlType, PropertyControls } from 'framer';
import * as React from 'react';

// Define type of property
interface Props {
  childText: string;
  iconType: ICON_TYPES;
  color: COLORS;
  iconSide: string;
  showIconProps: boolean;
  height: number;
}

export class Badge extends React.Component<Props> {

  // Set default properties
  public static defaultProps = {
    childText: 'Badge text',
    color: 'primary',
    iconType: null,
    iconSide: 'left',
    showIconProps: false,
    // Initial height for ease of use in framer
    height: 20,
  };

  // Items shown in property panel
  public static propertyControls: PropertyControls = {
    childText: {
      type: ControlType.String,
      title: '🧙 childText',
    },
    color: {
      type: ControlType.Enum,
      options: COLORS,
      title: 'color',
    },
    showIconProps: {
      type: ControlType.Boolean,
      title: '🧙 icon?',
    },
    iconType: {
      type: ControlType.Enum,
      options: ICON_TYPES,
      title: '↳ iconType',
      hidden(props) {
        return props.showIconProps === false;
      },
    },
    iconSide: {
      type: ControlType.SegmentedEnum,
      options: ICON_SIDES,
      title: '↳ iconSide',
      hidden(props) {
        return props.showIconProps === false;
      },
    },
  };

  public render() {
  return (
    <EuiBadge
      color={this.props.color}
      iconType={this.props.showIconProps ? this.props.iconType : null}
      iconSide={this.props.iconSide}
    >
      {this.props.childText}
    </EuiBadge>
  );
  }
}
