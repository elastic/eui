import { EuiText, TEXT_SIZES } from '@elastic/eui/lib/components/text/text';
import { ALIGNMENTS } from '@elastic/eui/lib/components/text/text_align';
import { COLORS } from '@elastic/eui/lib/components/text/text_color';
import { ControlType, PropertyControls } from 'framer';
import * as React from 'react';
import { FrameSize } from '../_framer_helpers/frame_size';

// Define type of property
interface Props {
  textChild: string;
  size: TEXT_SIZES;
  color: COLORS;
  textAlign: ALIGNMENTS;
  grow: boolean;
}

export class Button extends React.Component<Props> {

  // Set default properties
  public static defaultProps = {
    textChild: 'Some text',
  };

  // Items shown in property panel
  public static propertyControls: PropertyControls = {
    textChild: {
      type: ControlType.String,
      title: '🧙 textChild',
    },
    textAlign: {
      type: ControlType.SegmentedEnum,
      options: ALIGNMENTS,
      title: 'textAlign',
    },
    size: {
      type: ControlType.SegmentedEnum,
      options: TEXT_SIZES,
      title: 'size',
    },
    color: {
      type: ControlType.Enum,
      options: COLORS,
      title: 'color',
    },
    grow: {
      type: ControlType.Boolean,
      title: 'grow',
    },
  };

  public render() {
    return (
      <FrameSize>
        <EuiText
          size={this.props.size}
          color={this.props.color}
          textAlign={this.props.textAlign}
          grow={this.props.grow}
          // Display block so that the frame size dictates size in Framer
          style={{ display: 'block', flexGrow: 1, width: '100%' }}
        >
          {this.props.textChild}
        </EuiText>
      </FrameSize>
    );
  }
}
