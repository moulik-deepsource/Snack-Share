import React, { useEffect } from 'react';

import { useSelector, useDispatch } from 'react-redux';

import { Link } from 'react-router-dom';
import { getProfile } from '../../store/profile/selectors';
// import { getAuth } from '../../store/auth/selectors';
import { getCurrentProfile } from '../../store/profile/effects';

import CircleLoading from '../CircleLoading/CircleLoading';

const InstructorDashboard = () => {
    const dispatch = useDispatch();
    const profile = useSelector(getProfile);
    console.log(profile);
    // const auth = useSelector(getAuth);

    useEffect(() => {
        dispatch(getCurrentProfile());
    }, [dispatch]);

    const dashboardContent =
        profile.profile === null || profile.loading ? (
            <h1>LOADING................</h1>
        ) : Object.keys(profile).length > 0 ? (
            <div>
                <h1>
                    Welcome{' '}
                    <Link to={`/profile/${profile?.profile?.handle}`} style={{ color: '#a5c41a' }}>
                        {profile?.profile?.handle}
                    </Link>
                </h1>

                <h3>Experience Credentials</h3>

                <h3>Education Credentials</h3>
            </div>
        ) : (
            <div>
                <p>You have not yet setup a profile, please add some info</p>
            </div>
        );

    return <>{dashboardContent}</>;
};

export default InstructorDashboard;
