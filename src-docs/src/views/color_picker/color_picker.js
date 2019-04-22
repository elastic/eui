import React, {
  Component,
} from 'react';

import { EuiColorPicker, EuiFormRow, EuiHue, EuiSaturation } from '../../../../src/components';
// import { isValidHex } from '../../../../src/services';

function isValidHex(hex) {
  return /(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i.test(hex);
}

function hslToHex({ h, s, l }) {
  h /= 360;
  s /= 100;
  l /= 100;
  let r, g, b;
  if (s === 0) {
    r = g = b = l; // achromatic
  } else {
    const hue2rgb = (p, q, t) => {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1 / 6) return p + (q - p) * 6 * t;
      if (t < 1 / 2) return q;
      if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
      return p;
    };
    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;
    r = hue2rgb(p, q, h + 1 / 3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1 / 3);
  }
  const toHex = x => {
    const hex = Math.round(x * 255).toString(16);
    return hex.length === 1 ? `0${  hex}` : hex;
  };
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

function hexToHsl(hex) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);

  let r = parseInt(result[1], 16);
  let g = parseInt(result[2], 16);
  let b = parseInt(result[3], 16);

  r /= 255, g /= 255, b /= 255;
  let max = Math.max(r, g, b), min = Math.min(r, g, b);
  let h, s, l = (max + min) / 2;

  if(max === min) {
    h = s = 0; // achromatic
  } else {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch(max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break;
      case g: h = (b - r) / d + 2; break;
      case b: h = (r - g) / d + 4; break;
    }
    h /= 6;
  }

  s = s * 100;
  s = Math.round(s);
  l = l * 100;
  l = Math.round(l);
  h = Math.round(360 * h);

  return  { h, s, l };
}

export class ColorPicker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      color: {
        h: 180,
        s: 100,
        l: 50
      },
      show: true
    };
  }

  handleChange = (value) => {
    this.setState({ color: hexToHsl(value) });
  };

  render() {
    const hasErrors = !isValidHex(this.state.color) && (this.state.color !== '');

    let errors;
    if (hasErrors) {
      errors = ['Provide a valid hex value'];
    }

    return (
      <React.Fragment>
        <EuiFormRow
          label="Pick a color"
          isInvalid={hasErrors}
          error={errors}
        >
          <EuiColorPicker
            onChange={this.handleChange}
            color={hslToHex(this.state.color)}
            isInvalid={hasErrors}
          />
        </EuiFormRow>
        <EuiHue
          hue={this.state.color.h}
          onChange={
            (hue) => this.setState({ color: { ...this.state.color, h: hue } })
          }
        />
        <button onClick={() => this.setState(
          (state) => {
            return { show: !state.show };
          })
        }
        >hide
        </button>
        {this.state.show && <EuiSaturation
          color={this.state.color}
          onChange={
            (color) => this.setState({ color })
          }
        />}
      </React.Fragment>
    );
  }
}
