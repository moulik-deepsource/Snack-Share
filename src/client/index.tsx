import * as React from 'react';
import { hydrate } from 'react-dom';
import { Provider, useSelector } from 'react-redux';
import { Router } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';

import { ThemeProvider } from 'styled-components';
import { configureStore } from '../shared/store';
import App from '../shared/App';
import IntlProvider from '../shared/i18n/IntlProvider';
import createHistory from '../shared/store/history';

import AuthContext from '../shared/contexts/auth.context';

import { getAuth } from '../shared/store/auth/selectors';
import { AuthState } from '../shared/store/auth/types';
import { theme } from '../shared/styles/Theme';

const history = createHistory();

// Create/use the store
// history MUST be passed here if you want syncing between server on initial route
const store =
    window.store ||
    configureStore({
        initialState: window.__PRELOADED_STATE__,
    });

const AppWrapper = () => {
    const auth = useSelector(getAuth) || {
        isAuthenticated: false,
        users: {},
    };

    if (typeof window !== 'undefined') {
        localStorage.setItem('userid', JSON.stringify(auth?.users?.id));
        localStorage.setItem('userRole', JSON.stringify(auth?.users?.role));
    }

    return (
        <AuthContext.Provider value={{ auth } as AuthState}>
            <App />
        </AuthContext.Provider>
    );
};

hydrate(
    <Provider store={store}>
        <Router history={history}>
            <IntlProvider>
                <HelmetProvider>
                    <ThemeProvider theme={theme}>
                        <AppWrapper />
                    </ThemeProvider>
                </HelmetProvider>
            </IntlProvider>
        </Router>
    </Provider>,
    document.getElementById('app')
);

if (process.env.NODE_ENV === 'development') {
    if (module.hot) {
        module.hot.accept();
    }

    if (!window.store) {
        window.store = store;
    }
}
