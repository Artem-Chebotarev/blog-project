import { ReducersMapObject } from '@reduxjs/toolkit';
import { render } from '@testing-library/react';
import { ReactNode } from 'react';
import { I18nextProvider } from 'react-i18next';
import { MemoryRouter } from 'react-router-dom';

import { StateSchema, StoreProvider } from '@/app/providers/StoreProvider';
// eslint-disable-next-line path-checker-fsd/layer-imports
import { ThemeProvider } from '@/app/providers/ThemeProvider';
import { Theme } from '@/shared/const/theme';
// eslint-disable-next-line path-checker-fsd/layer-imports
import '@/app/styles/index.scss';

import i18nWithTests from '../../../config/i18n/i18nForTests';

export interface componentRenderOptions {
    route?: string;
    initialState?: DeepPartial<StateSchema>;
    asyncReducers?: DeepPartial<ReducersMapObject<StateSchema>>;
    theme?: Theme;
}

interface TestProviderProps {
    children: ReactNode;
    options?: componentRenderOptions;
}

export function TestProvider(props: TestProviderProps) {
    const { children, options = {} } = props;

    const {
        route = '/',
        initialState,
        asyncReducers,
        theme = Theme.LIGHT,
    } = options;

    return (
        <MemoryRouter initialEntries={[route]}>
            <StoreProvider
                initialState={initialState}
                asyncReducers={asyncReducers}>
                <I18nextProvider i18n={i18nWithTests}>
                    <ThemeProvider initialTheme={theme}>
                        <div className={`app ${theme}`}>{children}</div>
                    </ThemeProvider>
                </I18nextProvider>
            </StoreProvider>
        </MemoryRouter>
    );
}

export function componentRender(
    component: ReactNode,
    options: componentRenderOptions = {},
) {
    return render(<TestProvider options={options}>{component}</TestProvider>);
}
