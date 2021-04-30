import React from 'react';
import { IGlobalModalContext } from '../../interfaces';

export const GlobalModalContext = React.createContext<IGlobalModalContext | undefined>(undefined);
