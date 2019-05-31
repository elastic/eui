// @ts-ignore
import { EuiText, TEXT_SIZES } from '@elastic/eui/lib/components/text/text';
// @ts-ignore
import { ALIGNMENTS } from '@elastic/eui/lib/components/text/text_align';
// @ts-ignore
import { COLORS } from '@elastic/eui/lib/components/text/text_color';
import { ControlType, PropertyControls } from 'framer';
import * as React from 'react';
import { FrameSize } from '../_framer_helpers/frame_size';

// Define type of property
interface Props {
  childText: string;
  size: TEXT_SIZES;
  color: COLORS;
  textAlign: ALIGNMENTS;
  grow: boolean;
}

export class Text extends React.Component<Props> {
  // Set default properties
  static defaultProps = {
    childText: 'Add your text in the overide',
  };

  // Items shown in property panel
  static propertyControls: PropertyControls = {
    childText: {
      type: ControlType.String,
      title: '🧙 childText',
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

  render() {
    return (
      <FrameSize>
        <EuiText
          size={this.props.size}
          color={this.props.color}
          textAlign={this.props.textAlign}
          grow={this.props.grow}
          // Display block so that the frame size dictates size in Framer
          style={{ display: 'block', flexGrow: 1, width: '100%' }}>
          {this.props.childText}
        </EuiText>
      </FrameSize>
    );
  }
}
