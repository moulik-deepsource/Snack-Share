import * as React from 'react';
import { shallow } from 'enzyme';

import InstructorDashboard from './InstructorDashboard';

describe('InstructorDashboard', () => {
    const defaultProps = {};

    it('tests something', () => {
        shallow(<InstructorDashboard {...defaultProps} />);
    });
});
