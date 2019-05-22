// @ts-ignore
import { EuiFacetButton } from '@elastic/eui/lib/components/facet/facet_button.js';
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
  showIconProps: boolean;
  iconType: TYPES;
  iconColor: COLORS;
  iconSize: SIZES;
  isDisabled: boolean;
  isLoading: boolean;
  isSelected: boolean;
  quantity: number;
  childText: string;
}

export class FacetButton extends React.Component<Props> {
  // Set default properties
  static defaultProps = {
    childText: 'Facet button',
    quantity: 19,
    height: 40, // To give a decent start with sizing
    showIconProps: false,
  };

  // Items shown in property panel
  static propertyControls: PropertyControls = {
    childText: {
      type: ControlType.String,
      title: '🧙 childText',
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
      title: '🧙 icon?',
    },
    iconType: {
      type: ControlType.Enum,
      options: TYPES,
      title: '↳ icon',
      hidden(props: Props) {
        return props.showIconProps === false;
      },
    },
    iconSize: {
      type: ControlType.Enum,
      options: SIZES,
      title: '↳ iconSize',
      hidden(props: Props) {
        return props.showIconProps === false;
      },
    },
    iconColor: {
      type: ControlType.Enum,
      options: COLORS,
      title: '↳ iconColor',
      hidden(props: Props) {
        return props.showIconProps === false;
      },
    },
  };

  render() {
    return (
      <EuiFacetButton
        icon={
          this.props.showIconProps ? (
            <EuiIcon
              type={this.props.iconType}
              color={this.props.iconColor}
              size={this.props.iconSize}
            />
          ) : null
        }
        isDisabled={this.props.isDisabled}
        isLoading={this.props.isLoading}
        isSelected={this.props.isSelected}
        quantity={this.props.quantity}>
        {this.props.childText}
      </EuiFacetButton>
    );
  }
}
