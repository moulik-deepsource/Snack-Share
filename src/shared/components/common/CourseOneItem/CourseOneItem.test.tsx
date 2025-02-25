import * as React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import CourseOneItem from './CourseOneItem';
configure({ adapter: new Adapter() });
describe('CourseOneItem', () => {
    const defaultProps = {
        course: {},
        index: 0,
        enrollments: {},
    };

    it('tests something', () => {
        shallow(<CourseOneItem {...defaultProps} />);
    });
});
