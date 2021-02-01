import React, { FormEvent } from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import withAuthProps from 'hoc/withAuthProps';
import { getAuth } from '../../store/auth/selectors';

import { logoutUser } from '../../store/auth/effects';

import { FilterStyles } from '../../styles/Filter.Styles';
import { HeaderStyles } from './Header.Styles';

const Header = ({ auth }: any) => {
    // eslint-disable-next-line prefer-const
    let authClone: any;
    if (!auth.users || auth?.isAuthenticated === false) {
        authClone = {
            isAuthenticated: false,
            users: {},
        };
    }
    if (auth?.isAuthenticated === true) {
        authClone = auth;
    }
    // const auth2 = useSelector(getAuth);
    const dispatch = useDispatch();
    const location = useLocation();
    const history = useHistory();
    console.log('dosomething', auth);
    console.log('dosomething2', authClone);
    // console.log('dosomething2', auth2);

    const checkHomeRoute = location?.pathname === '/';
    const checkLoginRoute = location?.pathname?.includes('login');
    const checkInstructorRoute = location?.pathname === '/register/instructor';
    const checkDashboardRoute = location?.pathname === '/dashboard';
    const checkUsersRoute = location?.pathname === '/allusers';
    const checkCourseRoute = location?.pathname === '/ShowCourseList';
    const checkCategoryRoute = location?.pathname === '/ShowCategoryList';
    const checkEnrollRoute = location?.pathname === '/EnrollmentList';
    const checkMyCoursesRoute =
        location?.pathname?.includes(`/services/${authClone?.users?.id}`) ||
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

    const logoutClick = (e: FormEvent) => {
        e.preventDefault();
        dispatch(logoutUser(() => history?.push('/')));
    };

    return (
        <>
            <HeaderStyles>
                <div className="container">
                    <h1 className="heading">
                        Snack<strong>Dev</strong>
                    </h1>
                    <p className="slogan">Share all knowledge we have with 😘</p>
                </div>
            </HeaderStyles>
            {authClone?.users?.role === 'admin' ? (
                <FilterStyles>
                    <Link to="/">
                        <span className={classNameHome}>Home</span>
                    </Link>
                    <Link to="/dashboard">
                        <span className={classNameDashboard}>DashBoard</span>
                    </Link>
                    <Link to="/allusers">
                        <span className={classNameUsers}>Users</span>
                    </Link>
                    <Link to="/ShowCourseList">
                        <span className={classNameCourse}>Courses</span>
                    </Link>
                    <Link to="/ShowCategoryList">
                        <span className={classNameCategory}>Categories</span>
                    </Link>
                    <Link to="/EnrollmentList">
                        <span className={classNameEnroll}>Enrolled Users</span>
                    </Link>
                    <Link to="" onClick={logoutClick}>
                        <span className="filter-item">Logout</span>
                    </Link>
                </FilterStyles>
            ) : authClone.users.role === 'instructor' ? (
                <FilterStyles>
                    <Link to="/">
                        <span className={classNameHome}>Home</span>
                    </Link>
                    <Link to={`/services/${authClone?.users?.id}`}>
                        <span className={classMyCourses}>My Courses</span>
                    </Link>
                    <Link to={`/addcourse/${authClone?.users?.id}`}>
                        <span className={classAddCourse}>Add Courses</span>
                    </Link>
                    <Link to={`/add-lecture/${authClone?.users?.id}`}>
                        <span className={classAddLecture}>Add Lecture</span>
                    </Link>
                    <Link to="/services">
                        <span className={classAllCourses}>All Courses</span>
                    </Link>
                    <Link to="/finaldashboard">
                        <span className={classProfile}>Profile</span>
                    </Link>
                    <Link to="/finalprofiles">
                        <span className={classAllProfile}>All Profiles</span>
                    </Link>
                    <Link to="" onClick={logoutClick}>
                        <span className="filter-item">Logout</span>
                    </Link>
                </FilterStyles>
            ) : authClone?.users?.role === 'student' ? (
                <FilterStyles>
                    <Link to="/">
                        <span className={classNameHome}>Home</span>
                    </Link>
                    <Link to={`/servicesforstudent/${authClone?.users?.id}`}>
                        <span className={classMyCourses}>My Courses</span>
                    </Link>
                    <Link to="/services">
                        <span className={classAllCourses}>All Courses</span>
                    </Link>
                    <Link to="" onClick={logoutClick}>
                        <span className="filter-item">Logout</span>
                    </Link>
                </FilterStyles>
            ) : (
                <FilterStyles>
                    <Link to="/">
                        <span className={classNameHome}>Home</span>
                    </Link>
                    <Link to="/login/student">
                        <span className={classNameLogin}>Login</span>
                    </Link>
                    <Link to="/register/instructor">
                        <span className={classNameInstructor}>Teach On SnackDev</span>
                    </Link>
                </FilterStyles>
            )}
        </>
    );
};

export default withAuthProps(Header);
