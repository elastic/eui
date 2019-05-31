import {
  ALIGNMENTS,
  EuiCard,
  LAYOUT_ALIGNMENTS,
  // @ts-ignore
} from '@elastic/eui/lib/components/card/card.js';
import {
  COLORS,
  EuiIcon,
  SIZES,
  TYPES,
  // @ts-ignore
} from '@elastic/eui/lib/components/icon/icon.js';
import { ControlType, PropertyControls } from 'framer';
import * as React from 'react';
import { FrameSize } from '../_framer_helpers/frame_size';

// Define type of property
interface Props {
  title: string;
  description: string;
  icon: TYPES;
  image: string;
  textAlign: ALIGNMENTS;
  betaBadgeLabel: string;
  layout: LAYOUT_ALIGNMENTS;
  showIconProps: boolean;
  iconSize: SIZES;
  iconColor: COLORS;
  // Helper prop for providing a unsplash image
  randomImage: boolean;
}

export class Card extends React.Component<Props> {
  // Set default properties
  static defaultProps = {
    title: 'Hey there',
    showIconProps: false,
    iconSize: 'xl',
    description: 'I am a witty description for a card',
    randomImage: false,
  };

  // Items shown in property panel
  static propertyControls: PropertyControls = {
    title: {
      type: ControlType.String,
      title: 'title',
    },
    description: {
      type: ControlType.String,
      title: 'description',
    },
    betaBadgeLabel: {
      type: ControlType.String,
      title: 'betaBadgeLabel',
    },
    textAlign: {
      type: ControlType.SegmentedEnum,
      options: ALIGNMENTS,
      title: 'textAlign',
    },
    layout: {
      type: ControlType.SegmentedEnum,
      options: LAYOUT_ALIGNMENTS,
      title: 'layout',
    },
    randomImage: {
      type: ControlType.Boolean,
      title: '🧙 random img?',
    },
    image: {
      type: ControlType.Image,
      title: 'image',
      hidden(props: Props) {
        return props.randomImage === true;
      },
    },
    showIconProps: {
      type: ControlType.Boolean,
      title: '🧙 icon?',
    },
    icon: {
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
      title: 'iconColor',
      hidden(props: Props) {
        return props.showIconProps === false;
      },
    },
  };

  render() {
    return (
      <FrameSize>
        <EuiCard
          textAlign={this.props.textAlign}
          layout={this.props.layout}
          icon={
            this.props.showIconProps ? (
              <EuiIcon
                size={this.props.iconSize}
                color={this.props.iconColor}
                type={this.props.icon}
              />
            ) : null
          }
          image={
            this.props.randomImage
              ? 'https://source.unsplash.com/400x200/?Nature'
              : this.props.image
          }
          title={this.props.title}
          description={this.props.description}
          betaBadgeLabel={this.props.betaBadgeLabel}
        />
      </FrameSize>
    );
  }
}
