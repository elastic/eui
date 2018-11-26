import { ControlType, PropertyControls } from 'framer';
import * as React from 'react';

// Define type of property
interface Props {
  frame?: boolean;
}

export class FrameSize extends React.Component<Props> {

  // Set default properties
  public static defaultProps = {
    frame: true,
  };

  // Items shown in property panel
  public static propertyControls: PropertyControls = {
    frame: {
      type: ControlType.boolean,
      title: '🖍 Fit to frame',
    },
  };

  public render() {
    let optionallyFramedComponent;
    if (this.props.frame) {
      optionallyFramedComponent = (
        <div style={{ display: 'flex', position: 'absolute', height: '100%', width: '100%' }}>
          {this.props.children}
        </div>
      );
    } else {
      optionallyFramedComponent = (this.props.children);
    }
    return (<React.Fragment>{optionallyFramedComponent}</React.Fragment>);
  }
}
