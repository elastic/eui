import { EuiFacetButton } from '@elastic/eui/lib/components/facet/facet_button.js';
import { COLORS, EuiIcon, SIZES, TYPES } from '@elastic/eui/lib/components/icon/icon.js';
import { ControlType, PropertyControls } from 'framer';
import * as React from 'react';

// Define type of property
interface Props {
  showIconProps: boolean;
  iconType: TYPES;
  iconColor: COLORS;
  iconSize: SIZES;
  isDisabled: boolean;
  isLoading: boolean;
  isSelected: boolean;
  quantity: number;
  text: string;
}

export class Facet extends React.Component<Props> {

  // Set default properties
  public static defaultProps = {
    name: 'Han Solo',
    height: 300, // To give a decent start with sizing
    width: 600, // To give a decent start with sizing
    showIconProps: false,
  };

  // Items shown in property panel
  public static propertyControls: PropertyControls = {
    text: {
      type: ControlType.String,
      title: '🖍  text',
    },
    quantity: {
      type: ControlType.Number,
      title: 'quantity',
    },
    isDisabled: {
      type: ControlType.Boolean,
      title: 'isDisabled',
    },
    isLoading: {
      type: ControlType.Boolean,
      title: 'isLoading',
    },
    isSelected: {
      type: ControlType.Boolean,
      title: 'isSelected',
    },
    showIconProps: {
      type: ControlType.Boolean,
      title: '🖍 Need icon?',
    },
    iconType: {
      type: ControlType.Enum,
      options: TYPES,
      title: 'icon',
      hidden(props) {
        return props.showIconProps === false;
      },
    },
    iconSize: {
      type: ControlType.Enum,
      options: SIZES,
      title: 'iconSize',
      hidden(props) {
        return props.showIconProps === false;
      },
    },
    iconColor: {
      type: ControlType.Enum,
      options: COLORS,
      title: 'iconColor',
      hidden(props) {
        return props.showIconProps === false;
      },
    },
  };

  public render() {
    return (
      <EuiFacetButton
        icon={
          this.props.showIconProps ?
          <EuiIcon type={this.props.iconType} color={this.props.iconColor} size={this.props.iconSize} />
          : null
        }
        isDisabled={this.props.isDisabled}
        isLoading={this.props.isLoading}
        isSelected={this.props.isSelected}
        quantity={this.props.quantity}
      >
        {this.props.text}
      </EuiFacetButton>
    );
  }
}
