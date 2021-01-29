import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { Link, Route, Switch } from 'react-router-dom';
import jwtDecode from 'jwt-decode';
import { useDispatch } from 'react-redux';
import favicon from '../shared/assets/favicon.png';
import setAuthToken from './utils/setAuthToken';
import { dispatchSetCurrentUser, logoutUser } from './store/auth/effects';

import Home from './pages/Home';
import Page1 from './pages/Page-1';
import Page2 from './pages/Page-2';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import Header from './components/Header/Header';
import routes from './routes';

import css from './App.module.css';
import './styles/sass/main.scss';

// Does not yet work with server side rendering:
// const Home = React.lazy(() => import('./pages/Home'));
// const Page1 = React.lazy(() => import('./pages/Page-1'));
// const Page2 = React.lazy(() => import('./pages/Page-2'));

const App: React.FC<any> = () => {
    const { t } = useTranslation();
    const dispatch = useDispatch();

    React.useEffect(() => {
        if (localStorage.jwtToken) {
            // Set auth token and get user info and export default
            setAuthToken(localStorage.jwtToken);
            // Decode token and get user info and export default
            const decoded = jwtDecode(localStorage.jwtToken);
            // Set user and isAuthenticated by call any action using bellow method
            dispatch(dispatchSetCurrentUser(decoded as any));

            // Check for expired token
            const currentTime = Date.now() / 1000;
            if ((decoded as any).exp < currentTime) {
                // Logout user
                dispatch(logoutUser());

                // Redirect to login
                window.location.href = '/';
            }
        }
    }, [dispatch]);

    return (
        // <Suspense fallback={<div>Loading</div>}>
        <div className={css.wrapper}>
            <Helmet
                defaultTitle="React SSR Starter – TypeScript Edition"
                titleTemplate="%s – React SSR Starter – TypeScript Edition"
                link={[{ rel: 'icon', type: 'image/png', href: favicon }]}
            />
            <Header />
            <Switch>
                <Route exact path={routes.home} component={Home} />
                <Route exact path={routes.page1} component={Page1} />
                <Route exact path={routes.page2} component={Page2} />
                <Route exact path={routes.login} component={Login} />
                <Route exact path={routes.register} component={Register} />
                <Route render={() => '404!'} />
            </Switch>
            <h2>{t('router-headline')}</h2>
            <ul>
                <li>
                    <Link to="/">{t('nav.home')}</Link>
                </li>
                <li>
                    <Link to="/page-1">{t('nav.page-1')}</Link>
                </li>
                <li>
                    <Link to="/page-2">{t('nav.page-2')}</Link>
                </li>
            </ul>
        </div>
        // </Suspense>
    );
};

export default App;
