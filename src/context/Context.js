import { createContext } from 'react';
import { settings } from 'config';

const AppContext = createContext(settings);

export const ProductContext = createContext({ products: [] });

export const AuthWizardContext = createContext({ user: {} });

export default AppContext;
