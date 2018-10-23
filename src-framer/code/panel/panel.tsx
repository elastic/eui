import { EuiPanel, SIZES } from '@elastic/eui/lib/components/panel/panel.js';
import { ControlType, PropertyControls } from 'framer';
import * as React from 'react';

// Define type of property
interface Props {
  hasShadow: boolean;
  paddingSize: SIZES;
  betaBadgeLabel: string;
}

export class Panel extends React.Component<Props> {

  // Set default properties
  public static defaultProps = {
    paddingSize: 'm',
    hasShadow: false,
  };

  // Items shown in property panel
  public static propertyControls: PropertyControls = {
    hasShadow: { type: ControlType.Boolean, title: 'hasShadow' },
    betaBadgeLabel: { type: ControlType.String, title: 'betaBadgeLabel' },
    paddingSize: {
      type: ControlType.SegmentedEnum,
      options: SIZES,
      title: 'paddingSize',
    },
  };

  public render() {
  return (
    <div style={{ display: 'flex', position: 'absolute', height: '100%', width: '100%' }}>
      <EuiPanel
        hasShadow={this.props.hasShadow}
        paddingSize={this.props.paddingSize}
        betaBadgeLabel={this.props.betaBadgeLabel}
      >
        {this.props.children}
      </EuiPanel>
    </div>
  );
  }
}
