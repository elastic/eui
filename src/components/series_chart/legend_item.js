import React, { PureComponent } from 'react';

const Container = ({ children, disabled }) => (
  <div
    className="euiLegendItemContainer"
    style={{
      opacity: disabled ? 0.4 : 1,
    }}>
    {children}
  </div>
);

const Indicator = ({ children, color }) => (
  <span
    className="euiLegendItemIndicator"
    style={{
      background: color,
    }}>
    {children}
  </span>
);

export default class Legend extends PureComponent {
  render() {
    const {
      onClick,
      color,
      text,
      fontSize,
      radius,
      disabled = false,
      className,
    } = this.props;

    return (
      <Container
        onClick={onClick}
        disabled={disabled}
        fontSize={fontSize}
        className={className}>
        <Indicator color={color} radius={radius} />
        {text}
      </Container>
    );
  }
}
