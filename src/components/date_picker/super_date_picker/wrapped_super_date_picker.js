import React from 'react';
import { EuiSuperDatePicker } from './super_date_picker';

// EuiSuperDatePicker has state that needs to be reset when start or end change.
// Instead of using getDerivedStateFromProps, this wrapper adds a key to the component.
// When a key changes, React will create a new component instance rather than update the current one
// https://reactjs.org/blog/2018/06/07/you-probably-dont-need-derived-state.html#recommendation-fully-uncontrolled-component-with-a-key
export function WrappedEuiSuperDatePicker(props) {
  return (
    <EuiSuperDatePicker
      key={`${props.start}-${props.end}`}
      {...props}
    />
  );
}

WrappedEuiSuperDatePicker.defaultProps = {
  start: 'now-15m',
  end: 'now',
};
