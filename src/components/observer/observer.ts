import { Component, ReactNode } from 'react';

interface BaseProps {
  children: (ref: any) => ReactNode;
}

interface Observer {
  disconnect: () => void;
  observe: (element: Element, options?: { [key: string]: any }) => void;
}

export class EuiObserver<Props extends BaseProps> extends Component<Props> {
  protected name: string = 'EuiObserver';
  protected childNode: null | Element = null;
  protected observer: null | Observer = null;

  componentDidMount() {
    if (this.childNode == null) {
      throw new Error(`${this.name} did not receive a ref`);
    }
  }

  componentWillUnmount() {
    if (this.observer != null) {
      this.observer.disconnect();
    }
  }

  updateChildNode = (ref: Element) => {
    if (this.childNode === ref) return; // node hasn't changed

    // if there's an existing observer disconnect it
    if (this.observer != null) {
      this.observer.disconnect();
      this.observer = null;
    }

    this.childNode = ref;

    if (this.childNode != null) {
      this.beginObserve();
    }
  };

  beginObserve: () => void = () => {
    throw new Error('EuiObserver has no default observation method');
  };

  render() {
    return this.props.children(this.updateChildNode);
  }
}
