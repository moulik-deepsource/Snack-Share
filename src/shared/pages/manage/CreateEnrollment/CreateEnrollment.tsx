import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PageHeader from 'components/layout/PageHeader/PageHeader';
import CreateEnrollmentContainer from 'containers/manage/CreateEnrollmentContainer/CreateEnrollmentContainer';

import { getUsers } from 'store/users/selectors';
import { getCourses } from 'store/courses/selectors';
import { getAllUsers } from 'store/users/effects';
import { getAllCourses } from 'store/courses/effects';
import CircleLoader from 'components/loader/CircleLoader/CircleLoader';

const CreateEnrollment = () => {
    const dispatch = useDispatch();
    const users = useSelector(getUsers);
    const courses = useSelector(getCourses);

    React.useEffect(() => {
        dispatch(getAllUsers());
        dispatch(getAllCourses());
    }, [dispatch]);

    return (
        <>
            <PageHeader title="Create Enrollment" />
            {users.loading || courses.loading ? (
                <CircleLoader />
            ) : (
                <CreateEnrollmentContainer users={users.users} courses={courses.courses} />
            )}
        </>
    );
};

export default CreateEnrollment;
