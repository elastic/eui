import { EuiPanel, SIZES } from '@elastic/eui/lib/components/panel/panel.js';
import { ControlType, PropertyControls } from 'framer';
import * as React from 'react';
import { FrameSize } from '../_framer_helpers/frame_size.tsx';

// Define type of property
interface Props {
  hasShadow: boolean;
  paddingSize: SIZES;
  betaBadgeLabel: string;
  fitToFrame: boolean;
}

export class Panel extends React.Component<Props> {
  // Set default properties
  static defaultProps = {
    paddingSize: 'm',
    hasShadow: false,
    fitToFrame: true,
  };

  // Items shown in property panel
  static propertyControls: PropertyControls = {
    hasShadow: { type: ControlType.Boolean, title: 'hasShadow' },
    betaBadgeLabel: { type: ControlType.String, title: 'betaBadgeLabel' },
    paddingSize: {
      type: ControlType.SegmentedEnum,
      options: SIZES,
      title: 'paddingSize',
    },
    fitToFrame: { type: ControlType.Boolean, title: 'fitToFrame' },
  };

  render() {
    return (
      <FrameSize frame={this.fitToFrame}>
        <EuiPanel
          hasShadow={this.props.hasShadow}
          paddingSize={this.props.paddingSize}
          betaBadgeLabel={this.props.betaBadgeLabel}>
          {this.props.children}
        </EuiPanel>
      </FrameSize>
    );
  }
}
