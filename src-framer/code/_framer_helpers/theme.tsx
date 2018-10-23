import { ControlType, PropertyControls } from 'framer';
import * as React from 'react';

// Define type of property
interface Props {
  theme: string;
}

export class Theme extends React.Component<Props> {

  // Set default properties
  public static defaultProps = {
    theme: 'light',
  };

  // Items shown in property panel
  public static propertyControls: PropertyControls = {
    theme: {
      type: ControlType.Enum,
      options: ['light', 'dark'],
      title: 'Theme',
    },
  };

  public state = {
    theme: this.props.theme,
  };

  public componentWillUpdate() {
    require(`@elastic/eui/dist/eui_theme_${this.state.theme}.css`);
  }

  public render() {
    return (
      <div/>
    );
  }
}
