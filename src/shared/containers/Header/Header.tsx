import * as React from 'react';
import { useLocation } from 'react-router-dom';
import withAuthProps from '../../hoc/withAuthProps';

const Header = ({ auth }: any) => {
    const location = useLocation();
    const checkHomeRoute = location?.pathname === '/';
    const checkLoginRoute = location?.pathname?.includes('login');
    const checkInstructorRoute = location?.pathname === '/register/instructor';
    const checkDashboardRoute = location?.pathname === '/dashboard';
    const checkUsersRoute = location?.pathname === '/allusers';
    const checkCourseRoute = location?.pathname === '/ShowCourseList';
    const checkCategoryRoute = location?.pathname === '/ShowCategoryList';
    const checkEnrollRoute = location?.pathname === '/EnrollmentList';
    const checkMyCoursesRoute =
        location?.pathname?.includes(`/services/${auth.users.id}`) ||
        location?.pathname?.includes('/servicesforstudent/');
    const CheckAddcourseRoute = location?.pathname?.includes('addcourse');
    const checkAddLectureRoute = location?.pathname?.includes('add-lecture');
    const checkAllCoursesRoute = location?.pathname === '/services';
    const checkProfileRoute = location?.pathname === '/finaldashboard';
    const checkAllProfileRoute = location?.pathname === '/finalprofiles';

    const classNameHome = `filter-item ${checkHomeRoute ? 'active' : ''}`;
    const classNameInstructor = `filter-item ${checkInstructorRoute ? 'active' : ''}`;
    const classNameLogin = `filter-item ${checkLoginRoute ? 'active' : ''}`;
    const classNameDashboard = `filter-item ${checkDashboardRoute ? 'active' : ''}`;
    const classNameUsers = `filter-item ${checkUsersRoute ? 'active' : ''}`;
    const classNameCourse = `filter-item ${checkCourseRoute ? 'active' : ''}`;
    const classNameCategory = `filter-item ${checkCategoryRoute ? 'active' : ''}`;
    const classNameEnroll = `filter-item ${checkEnrollRoute ? 'active' : ''}`;
    const classMyCourses = `filter-item ${checkMyCoursesRoute ? 'active' : ''}`;
    const classAddCourse = `filter-item ${CheckAddcourseRoute ? 'active' : ''}`;
    const classAddLecture = `filter-item ${checkAddLectureRoute ? 'active' : ''}`;
    const classAllCourses = `filter-item ${checkAllCoursesRoute ? 'active' : ''}`;
    const classProfile = `filter-item ${checkProfileRoute ? 'active' : ''}`;
    const classAllProfile = `filter-item ${checkAllProfileRoute ? 'active' : ''}`;
    return <div />;
};

export default withAuthProps(Header);
