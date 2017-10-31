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
    hljs.highlightBlock(this.code);
  }

  render() {
    const {
      children,
      className,
      language,
      color,
      fontSize,
      paddingSize,
      overflowHeight,
      ...rest
    } = this.props;

    const classes = classNames(
      'euiCodeBlock',
      colorToClassNameMap[color],
      fontSizeToClassNameMap[fontSize],
      paddingSizeToClassNameMap[paddingSize],
      className
    );

    let optionalOverflowHeight = 'auto';

    if (overflowHeight) {
      optionalOverflowHeight = overflowHeight;
    }

    return (
      <div
        className={classes}
        style={{ height: optionalOverflowHeight }}
      >
        <pre className="euiCodeBlock__pre">
          <code
            ref={ref => { this.code = ref; }}
            className={language}
            {...rest}
          >
            {children}
          </code>
        </pre>
      </div>
    );
  }
}

EuiCodeBlock.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  color: PropTypes.string,
  paddingSize: PropTypes.oneOf(PADDING_SIZES),
  fontSize: PropTypes.oneOf(FONT_SIZES),
};

EuiCodeBlock.defaultProps = {
  color: 'dark',
  paddingSize: 'l',
  fontSize: 's',
};
