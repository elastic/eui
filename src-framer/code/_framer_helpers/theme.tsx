
import { ControlType, PropertyControls } from 'framer';
import * as React from 'react';
import { FrameSize } from './frame_size.tsx';

const DarkCSS = require('!!raw-loader!@elastic/eui/dist/eui_theme_dark.css');
const LightCSS = require('!!raw-loader!@elastic/eui/dist/eui_theme_light.css');

// Define type of property
interface Props {
  theme: string;
  bgColor: string;
}

export class Theme extends React.Component<Props> {
  // Set default properties
  public static defaultProps = {
    theme: 'light',
    bgColor: 'emptyShade',
  };

  // Items shown in property panel
  public static propertyControls: PropertyControls = {
    theme: {
      type: ControlType.SegmentedEnum,
      options: ['light', 'dark'],
      title: 'Theme',
    },
    bgColor: {
      type: ControlType.Enum,
      options: ['emptyShade', 'lightestShade'],
      title: '🧙‍♂️ bgColor',
    },
  };

  public render() {

    const lightBgColor = this.props.bgColor === 'emptyShade' ? '#FFF' : '#F5F5F5';
    const darkBgColor = this.props.bgColor === 'emptyShade' ? '#222' : '#242424';
    const bgColor = (this.props.theme === 'light' ? lightBgColor : darkBgColor);
    return (
      <FrameSize>
        <div style={{ background: bgColor, flexGrow: 1, display: 'flex' }}>
          <style
            type="text/css"
            dangerouslySetInnerHTML={{__html: this.props.theme === 'light' ? LightCSS : DarkCSS}}>
          </style>
        </div>
      </FrameSize>
    );
  }
}
