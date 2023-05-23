import { configure } from 'enzyme';
import Adapter from '@cfaester/enzyme-adapter-react-18';
import { TextEncoder } from 'util';

configure({ adapter: new Adapter() });

// Needs to be defined before jest env initialization
Object.defineProperty(global, 'TextEncoder', {
  value: TextEncoder,
});
