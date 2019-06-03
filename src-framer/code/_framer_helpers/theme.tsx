// @ts-ignore
import DarkCSS from '!!raw-loader!@elastic/eui/dist/eui_theme_dark.css';
// @ts-ignore
import LightCSS from '!!raw-loader!@elastic/eui/dist/eui_theme_light.css';
import { ControlType, PropertyControls } from 'framer';
import * as React from 'react';
import { FrameSize } from './frame_size';

// Define type of property
interface Props {
  theme: string;
}

export class Theme extends React.Component<Props> {
  // Set default properties
  static defaultProps = {
    theme: 'light',
  };

  // Items shown in property panel
  static propertyControls: PropertyControls = {
    theme: {
      type: ControlType.SegmentedEnum,
      options: ['light', 'dark'],
      title: 'Theme',
    },
  };

  render() {
    const lightBgColor = '#FFF';
    const darkBgColor = '#222';
    const bgColor = this.props.theme === 'light' ? lightBgColor : darkBgColor;
    return (
      <FrameSize>
        <div style={{ background: bgColor, flexGrow: 1, display: 'flex' }}>
          <style
            type="text/css"
            dangerouslySetInnerHTML={{
              __html: this.props.theme === 'light' ? LightCSS : DarkCSS,
            }}
          />
        </div>
      </FrameSize>
    );
  }
}
