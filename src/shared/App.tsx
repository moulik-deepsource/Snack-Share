import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import { Route, Switch, useHistory } from 'react-router-dom';
import jwtDecode from 'jwt-decode';
import { useDispatch, useSelector } from 'react-redux';
//
import { getCurrentProfile, getCurrentProfile2 } from 'store/profile/effects';
import favicon from '../shared/assets/favicon.png';
import setAuthToken from './utils/setAuthToken';
import { dispatchSetCurrentUser, logoutUser } from './store/auth/effects';
import { getAuth } from './store/auth/selectors';
import { getProfile } from './store/profile/selectors';

import Home from './pages/Home';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';

import { GlobalStyle } from './styles/GlobalStyles';

import routes from './routes';

import css from './App.module.css';
import './styles/sass/main.scss';

// Does not yet work with server side rendering:
// const Home = React.lazy(() => import('./pages/Home'));
// const Page1 = React.lazy(() => import('./pages/Page-1'));
// const Page2 = React.lazy(() => import('./pages/Page-2'));

const App: React.FC<any> = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const auth = useSelector(getAuth);
    const profile = useSelector(getProfile);

    React.useEffect(() => {
        if (localStorage.jwtToken) {
            // Set auth token and get user info and export default
            setAuthToken(localStorage.jwtToken);
            // Decode token and get user info and export default
            const decoded = jwtDecode(localStorage.jwtToken);
            // Set user and isAuthenticated by call any action using bellow method
            dispatch(dispatchSetCurrentUser(decoded as any));
            dispatch(getCurrentProfile(localStorage.jwtToken));
            // Check for expired token
            const currentTime = Date.now() / 1000;
            if ((decoded as any).exp < currentTime) {
                // Logout user
                dispatch(logoutUser(() => history?.push('/')));
            }
        }
    }, [dispatch, history]);

    console.log('is authenticated', auth.isAuthenticated);
    console.log('user', auth.users);
    console.log('loading', profile.loading);
    console.log('profile', profile.profile);
    console.log('profiles', profile.profiles);

    if (profile.loading === true) {
        return <h1>LOADING................</h1>;
    }

    return (
        // <Suspense fallback={<div>Loading</div>}>
        <div className={css.wrapper}>
            <GlobalStyle />
            <Helmet
                defaultTitle="React SSR Starter – TypeScript Edition"
                titleTemplate="%s – React SSR Starter – TypeScript Edition"
                link={[{ rel: 'icon', type: 'image/png', href: favicon }]}
            />
            <Header />
            <Switch>
                <Route exact path={routes.home} component={Home} />
                <Route exact path={routes.login} component={Login} />
                <Route exact path={routes.register} component={Register} />
                <Route render={() => '404!'} />
            </Switch>
            <Footer />
        </div>
        // </Suspense>
    );
};

export default App;
