import { configure } from 'enzyme';

// Pick Enzyme adapter based on which React version is currently being tested.
// It has to be directly compared against process.env.REACT_VERSION
// for tree-shaking to work.
let Adapter;
if (process.env.REACT_VERSION === '18') {
  Adapter = require('@cfaester/enzyme-adapter-react-18').default;
} else {
  Adapter = require('@wojtekmaj/enzyme-adapter-react-17');
}

configure({ adapter: new Adapter() });
