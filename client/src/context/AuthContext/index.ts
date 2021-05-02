import React from 'react';
import { IAuthContext } from '../../interfaces';

export const AuthContext = React.createContext<IAuthContext | undefined>(undefined);
