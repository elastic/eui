import { SIZES, TYPES } from '@elastic/eui/lib/components/avatar/avatar.js';
import { ICON_TYPES } from '@elastic/eui/lib/components/icon/index.js';
import * as React from '@elastic/eui/lib/components/icon/index.js';
import { VISUALIZATION_COLORS } from '@elastic/eui/lib/services/index.js';
import { ControlType, PropertyControls } from 'framer';

// Define type of property
interface Props {
  color: VISUALIZATION_COLORS;
  size: SIZES;
  imageUrl: string;
  type: TYPES;
  name: string;
  initialsLength: [ 1, 2 ];
  initials: string;
}

export class Avatar extends React.Component<Props> {

  // Set default properties
  public static defaultProps = {
    name: 'Han Solo',
  };

  // Items shown in property panel
  public static propertyControls: PropertyControls = {
    name: {
      type: ControlType.String,
      title: 'name',
    },
    initialsLength: {
      type: ControlType.SegmentedEnum,
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
    color: {
      type: ControlType.Color,
      options: VISUALIZATION_COLORS,
      title: 'color',
    },
    type: {
      type: ControlType.SegmentedEnum,
      options: TYPES,
      title: 'color',
    },
    imageUrl: {
      type: ControlType.Image,
      title: 'imageUrl',
    },
  };

  public render() {
    return (
      <EuiAvatar
        name={this.props.name}
        initials={this.props.initials}
        initialsLength={this.props.initialsLength}
        type={this.props.type}
        imageUrl={this.props.imageUrl}
        size={this.props.size}
        color={this.props.color}
      >
        {this.props.text}
      </EuiAvatar>
    );
  }
}
