import React from 'react';
import AuthContext from '../contexts/auth.context';

const withAuthProps = (Component: any) => (props: any) => (
    <AuthContext.Consumer>
        {({ auth }) => <Component auth={auth} {...props} />}
    </AuthContext.Consumer>
);

export default withAuthProps;
