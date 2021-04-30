import React from 'react';
import { IFlashContext } from '../../interfaces';

export const FlashContext = React.createContext<IFlashContext | undefined>(undefined);
