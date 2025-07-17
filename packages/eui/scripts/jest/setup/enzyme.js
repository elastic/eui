import { configure } from 'enzyme';

// Pick Enzyme adapter based on which React version is currently being tested.
// It has to be directly compared against process.env.REACT_VERSION
// for tree-shaking to work.
let Adapter;
if (process.env.REACT_VERSION === '17') {
  Adapter = require('@wojtekmaj/enzyme-adapter-react-17');
} else {
  Adapter = require('@cfaester/enzyme-adapter-react-18').default;

  // set IS_REACT_ACT_ENVIRONMENT to silence "The current testing environment
  // is not configured to support act()" errors for now
  // TODO: Remove when enzyme tests are replaced with RTL
  global.IS_REACT_ACT_ENVIRONMENT = true;
}

configure({ adapter: new Adapter() });
