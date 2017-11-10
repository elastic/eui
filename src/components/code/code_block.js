import React, {
  Component,
} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import hljs from 'highlight.js';

const colorToClassNameMap = {
  light: 'euiCodeBlock--light',
  dark: 'euiCodeBlock--dark',
};

export const COLORS = Object.keys(colorToClassNameMap);

const fontSizeToClassNameMap = {
  s: 'euiCodeBlock--fontSmall',
  m: 'euiCodeBlock--fontMedium',
  l: 'euiCodeBlock--fontLarge',
};

export const FONT_SIZES = Object.keys(fontSizeToClassNameMap);

const paddingSizeToClassNameMap = {
  s: 'euiCodeBlock--paddingSmall',
  m: 'euiCodeBlock--paddingMedium',
  l: 'euiCodeBlock--paddingLarge',
};

export const PADDING_SIZES = Object.keys(paddingSizeToClassNameMap);

export class EuiCodeBlock extends Component {
  static propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
  }

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.highlight();
  }

  componentDidUpdate() {
    this.highlight();
  }

  render() {
    const {
      children,
      className,
      color,
      fontSize,
      language,
      overflowHeight,
      paddingSize,
      transparentBackground,
      ...otherProps
    } = this.props;

    const classes = classNames(
      'euiCodeBlock',
      colorToClassNameMap[color],
      fontSizeToClassNameMap[fontSize],
      paddingSizeToClassNameMap[paddingSize],
      {
        'euiCodeBlock--transparentBackground': transparentBackground,
      },
      className
    );

    const codeClasses = classNames('euiCodeBlock__code', language);

    let optionalOverflowHeight = 'auto';

    if (overflowHeight) {
      optionalOverflowHeight = overflowHeight;
    }

    return (
      <span
        className={classes}
        style={{ height: optionalOverflowHeight }}
      >
        <span className="euiCodeBlock__pre">
          <code
            ref={ref => { this.code = ref; }}
            className={codeClasses}
            {...otherProps}
          >
            {children}
          </code>
        </span>
      </span>
    );
  }

  highlight() {
    if (this.props.language) {
      hljs.highlightBlock(this.code);
    }
  }
}

EuiCodeBlock.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  color: PropTypes.string,
  paddingSize: PropTypes.oneOf(PADDING_SIZES),
  fontSize: PropTypes.oneOf(FONT_SIZES),
  transparentBackground: PropTypes.bool,
};

EuiCodeBlock.defaultProps = {
  color: 'light',
  transparentBackground: false,
  paddingSize: 'l',
  fontSize: 's',
};
