import React from 'react';
import { AuthState } from '../store/auth/types';

const AuthContext = React.createContext<AuthState>({ auth: {} });

export default AuthContext;
