import { COLORS, EuiCallOut, SIZES } from '@elastic/eui/lib/components/call_out/call_out.js';
import { ICON_TYPES } from '@elastic/eui/lib/components/icon/index.js';
import { ControlType, PropertyControls } from 'framer';
import * as React from 'react';

// Define type of property
interface Props {
  title: string;
  iconType: ICON_TYPES;
  color: COLORS;
  size: SIZES;
  childText: string;
}

export class Button extends React.Component<Props> {

  // Set default properties
  public static defaultProps = {
    title: 'Title',
    color: 'primary',
    iconType: null,
    size: 'm',
    childText: 'Some random text where the children prop would go',
  };

  // Items shown in property panel
  public static propertyControls: PropertyControls = {
    title: {
      type: ControlType.String,
      title: 'title',
    },
    childText: {
      type: ControlType.String,
      title: '🖍 child text',
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
    iconType: {
      type: ControlType.Enum,
      options: ICON_TYPES,
      title: 'iconType',
      hidden(props) {
      return props.showIconProps === false;
      },
    },
  };

  public render() {
    return (
        <EuiCallOut
          size={this.props.size}
          color={this.props.color}
          iconType={this.props.iconType}
          title={this.props.title}
        >
          {this.props.childText}
        </EuiCallOut>
    );
  }
}
