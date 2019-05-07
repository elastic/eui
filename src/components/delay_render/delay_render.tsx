import { Component } from 'react';

interface EuiDelayRenderProps {
  delay: number;
}

interface EuiDelayRenderState {
  delay: number;
  toggle: boolean;
}

export class EuiDelayRender extends Component<
  EuiDelayRenderProps,
  EuiDelayRenderState
> {
  static defaultProps = {
    delay: 500,
  };

  private delayID: number | undefined;
  private toBeDelayed: boolean = false;

  constructor(props: EuiDelayRenderProps) {
    super(props);
    this.state = {
      delay: this.props.delay,
      toggle: false,
    };
  }

  shouldUpdate() {
    this.setState(({ toggle }) => ({ toggle: !toggle }));
  }

  startDelaying = () => {
    window.clearTimeout(this.delayID);
    this.toBeDelayed = true;
    this.delayID = window.setTimeout(this.stopDelaying, this.state.delay);
  };
  stopDelaying = () => {
    window.clearTimeout(this.delayID);
    this.toBeDelayed = false;
    this.shouldUpdate();
  };

  componentDidMount() {
    this.toBeDelayed = true;
  }
  shouldComponentUpdate() {
    if (this.toBeDelayed) {
      this.startDelaying();
    }
    return true;
  }
  componentWillUnmount() {
    this.stopDelaying();
  }
  componentDidUpdate() {
    this.toBeDelayed = true;
  }

  render() {
    return !this.toBeDelayed ? this.props.children : null;
  }
}
