import { ControlType, PropertyControls } from 'framer';
import React, { cloneElement, createRef, Fragment, ReactElement, ReactNode } from 'react';

// Define type of property
interface Props {
  theme: string;
}

export class FrameSize extends React.Component<Props> {

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
    height: '',
    width: '',
  };

  private childRef = createRef<HTMLDivElement>();

  public componentDidMount() {
    this.state = {
      height: `${this.calcHeight()}px`,
      width: `${this.calcWidth()}px`,
    };
  }

  public calcHeight() {
    const node = this.childRef.current;

    if (node) {
      return node.clientHeight;
    }
    return;
  }

  public calcWidth() {
    const node = this.childRef.current;

    if (node) {
      return node.clientWidth;
    }
    return;
  }

  public renderClone(): ReactNode {
    return cloneElement(this.props.children as ReactElement<any>, {
      width: 50,
      height: 50,
    });
  }

  public render() {
    return (
      this.renderClone()
    );
  }
}
