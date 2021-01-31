import * as React from 'react';
import { shallow } from 'enzyme';

import CircleLoading from './CircleLoading';

describe('CircleLoading', () => {
    const defaultProps = {};

    it('tests something', () => {
        shallow(<CircleLoading {...defaultProps} />);
    });
});
