import {
  EuiTitle,
  TEXT_TRANSFORM,
  TITLE_SIZES,
  // @ts-ignore
} from '@elastic/eui/lib/components/title/title';
import { ControlType, PropertyControls } from 'framer';
import * as React from 'react';
import { FrameSize } from '../_framer_helpers/frame_size';

// Define type of property
interface Props {
  childText: string;
  size: TITLE_SIZES;
  textTransform: TEXT_TRANSFORM;
}

export class Title extends React.Component<Props> {
  // Set default properties
  static defaultProps = {
    childText: 'Title text goes here',
    size: 'l',
  };

  // Items shown in property panel
  static propertyControls: PropertyControls = {
    childText: {
      type: ControlType.String,
      title: '🧙 childText',
    },
    size: {
      type: ControlType.Enum,
      options: TITLE_SIZES,
      title: 'size',
    },
    textTransform: {
      type: ControlType.Enum,
      options: TEXT_TRANSFORM,
      title: 'textTransform',
    },
  };

  render() {
    return (
      <FrameSize>
        <EuiTitle
          size={this.props.size}
          textTransform={this.props.textTransform}
          // Display block so that the frame size dictates size in Framer
          style={{ display: 'block', flexGrow: 1, width: '100%' }}>
          <p>{this.props.childText}</p>
        </EuiTitle>
      </FrameSize>
    );
  }
}
