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

export class EuiCodeBlockImpl extends Component {
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
      inline,
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
        'euiCodeBlock--inline': inline,
      },
      className
    );

    const codeClasses = classNames('euiCodeBlock__code', language);

    const optionalStyles = {};

    if (overflowHeight) {
      optionalStyles.height = overflowHeight;
    }

    const codeSnippet = (
      <code
        ref={ref => { this.code = ref; }}
        className={codeClasses}
        {...otherProps}
      >
        {children}
      </code>
    );

    const wrapperProps = {
      className: classes,
      style: optionalStyles
    };

    if (inline) {
      return (
        <span {...wrapperProps}>
          {codeSnippet}
        </span>
      );
    }

    return (
      <div {...wrapperProps}>
        <pre className="euiCodeBlock__pre">
          {codeSnippet}
        </pre>
      </div>
    );
  }

  highlight() {
    if (this.props.language) {
      hljs.highlightBlock(this.code);
    }
  }
}

EuiCodeBlockImpl.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  color: PropTypes.string,
  paddingSize: PropTypes.oneOf(PADDING_SIZES),
  fontSize: PropTypes.oneOf(FONT_SIZES),
  transparentBackground: PropTypes.bool,
  inline: PropTypes.bool,
};

EuiCodeBlockImpl.defaultProps = {
  color: 'light',
  transparentBackground: false,
  paddingSize: 'l',
  fontSize: 's',
};
