import React, {
  Component,
} from 'react';
import PropTypes from 'prop-types';

export class EuiOverlayMask extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    document.body.classList.add('euiBody-hasOverlayMask');
  }

  componentWillUnmount() {
    document.body.classList.remove('euiBody-hasOverlayMask');
  }

  render() {
    const {
      ...rest
    } = this.props;

    return (
      <div
        className="euiOverlayMask"
        {...rest}
      />
    );
  }
}

EuiOverlayMask.propTypes = {
  className: PropTypes.string,
};
