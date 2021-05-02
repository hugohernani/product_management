import React from 'react';
import { IProductContext } from '../../interfaces';

export const ProductContext = React.createContext<IProductContext | undefined>(undefined);
