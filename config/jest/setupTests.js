import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import jest from 'jest';
import 'jest-enzyme';
require('../env');

configure({ adapter: new Adapter() });
