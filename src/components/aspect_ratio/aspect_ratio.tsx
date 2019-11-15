import React, { HTMLAttributes, Component, cloneElement } from 'react';
import { CommonProps } from '../common';
import classNames from 'classnames';

export type EuiAspectRatioProps = HTMLAttributes<HTMLDivElement> &
  CommonProps & {
    height: number;
    width: number;
    maxWidth?: number;
    cropContent?: boolean;
  };

export class EuiAspectRatio extends Component<EuiAspectRatioProps> {
  childContent: HTMLDivElement | null = null;
  childWrapper: HTMLDivElement | null = null;

  setChildContentDemensions = () => {
    requestAnimationFrame(() => {
      const contentHeight = this.childContent
        ? this.childContent.scrollHeight
        : 0;
      const contentWidth = this.childContent
        ? this.childContent.scrollWidth
        : 0;
      const wrapperHeight = this.childWrapper
        ? this.childWrapper.scrollHeight
        : 0;
      const wrapperWidth = this.childWrapper
        ? this.childWrapper.scrollWidth
        : 0;
      console.log(contentWidth, contentHeight, wrapperWidth, wrapperHeight);

      let wrapperShape = 'horizontal';
      if (wrapperHeight / wrapperWidth > 1) {
        wrapperShape = 'vertical';
      }

      if (wrapperShape === 'vertical') {
        if (wrapperHeight > contentHeight) {
          this.childContent &&
            this.childContent.setAttribute(
              'style',
              'width: auto; height: 100%; top: -100%; bottom: -100%; left: -100%; right: -100%; margin: auto;'
            );
        } else {
          this.childContent &&
            this.childContent.setAttribute(
              'style',
              'width: 100%; height: auto; top: -100%; bottom: -100%; left: -100%; right: -100%; margin: auto;'
            );
        }
      }
    });
  };

  componentDidMount() {
    this.setChildContentDemensions();
  }

  componentDidUpdate() {
    this.setChildContentDemensions();
  }

  setChildContentRef = (node: HTMLDivElement | null) => {
    this.childContent = node;
  };

  render() {
    const {
      children,
      className,
      height,
      width,
      cropContent,
      maxWidth,
      ...rest
    } = this.props;

    const classes = classNames(
      'euiAspectRatio',
      {
        'euiAspectRatio--cropContent': cropContent,
      },
      className
    );

    const paddingBottom = `${(height / width) * 100}%`;

    const content = (
      <div
        className={classes}
        {...rest}
        style={{
          paddingBottom: paddingBottom,
          maxWidth: maxWidth ? maxWidth : 'auto',
        }}
        ref={node => {
          this.childWrapper = node;
        }}>
        {cloneElement(children as React.ReactElement<any>, {
          ref: (ref: any) => {
            this.setChildContentRef(ref);
          },
        })}
      </div>
    );

    let contentwithoptionalwrap = content;
    if (maxWidth) {
      contentwithoptionalwrap = (
        <div style={{ maxWidth: maxWidth }}>{content}</div>
      );
    }

    return contentwithoptionalwrap;
  }
}
