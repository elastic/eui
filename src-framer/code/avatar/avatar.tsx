import {
  EuiAvatar,
  SIZES,
  TYPES,
  // @ts-ignore
} from '@elastic/eui/lib/components/avatar/avatar.js';
// @ts-ignore
import { ControlType, PropertyControls } from 'framer';
import React from 'react';

const initialsOptions = ['1', '2'];

// Define type of property
interface Props {
  size: SIZES;
  imageUrl: string;
  type: TYPES;
  name: string;
  initialsLength: keyof typeof initialsOptions;
  initials: string;
}

export class Avatar extends React.Component<Props> {
  // Set default properties
  static defaultProps = {
    name: 'Han Solo',
    height: 32, // To give a decent start with sizing
    width: 32, // To give a decent start with sizing
  };

  // Items shown in property panel
  static propertyControls: PropertyControls = {
    name: {
      type: ControlType.String,
      title: 'name',
    },
    initialsLength: {
      type: ControlType.SegmentedEnum,
      options: initialsOptions,
      title: 'initialsLength',
    },
    initials: {
      type: ControlType.String,
      title: 'initials',
    },
    size: {
      type: ControlType.SegmentedEnum,
      options: SIZES,
      title: 'size',
    },
    type: {
      type: ControlType.SegmentedEnum,
      options: TYPES,
      title: 'type',
    },
    imageUrl: {
      type: ControlType.Image,
      title: 'imageUrl',
    },
  };

  render() {
    return (
      <EuiAvatar
        name={this.props.name}
        initials={this.props.initials}
        initialsLength={Number(this.props.initialsLength)}
        type={this.props.type}
        imageUrl={this.props.imageUrl}
        size={this.props.size}
      />
    );
  }
}
