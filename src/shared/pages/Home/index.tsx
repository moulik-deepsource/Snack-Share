import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { setLocale } from 'store/app/actions';
import { Locale } from 'store/app/types';
import withAuthProps from 'hoc/withAuthProps';
import { getAuth } from 'store/auth/selectors';
import { getProfile } from '../../store/profile/selectors';

const Home: React.FC<any> = ({ auth }: any) => {
    const { t } = useTranslation();
    const auth2 = useSelector(getAuth);
    const dispatch = useDispatch();
    // eslint-disable-next-line prefer-const
    const profile = useSelector(getProfile);
    console.log('profile666', profile?.profile?.res);
    const handleLocaleChange = useCallback(
        (e: React.FormEvent<HTMLButtonElement>) => {
            dispatch(setLocale(e.currentTarget.value as Locale));
        },
        [dispatch]
    );

    if (profile?.profile?.res === 'There is no profile for this user') {
        return <h1>No profile for this user</h1>;
    }

    return (
        <React.Fragment>
            {/* <h2>{t('i18n-example')}</h2>
            <p>
                <button value="de_DE" onClick={handleLocaleChange}>
                    Deutsch
                </button>
                <button value="en_US" onClick={handleLocaleChange}>
                    English
                </button>
            </p> */}
        </React.Fragment>
    );
};

export default withAuthProps(Home);
