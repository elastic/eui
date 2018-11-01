
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
    bgColor: 'white',
  };

  // Items shown in property panel
  public static propertyControls: PropertyControls = {
    theme: {
      type: ControlType.SegmentedEnum,
      options: ['light', 'dark'],
      title: 'Theme',
    },
    bgColor: {
      type: ControlType.SegmentedEnum,
      options: ['white', 'offWhite'],
      title: '↳ 🧙‍♂️ bgColor',
      hidden(props) {
      return props.theme === 'dark';
      },
    },
  };

  public render() {

    const whiteBgColor = '#FFF';
    const offWhiteBgColor = '#F5F5F5';
    const darkBgColor = '#222';
    const bgColor = (this.props.theme === 'light' && this.props.bgColor === 'white') ? whiteBgColor : (this.props.theme === 'light' && this.props.bgColor === 'offWhite') ? offWhiteBgColor : darkBgColor);
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
