import { memo, Suspense, useCallback } from 'react';
import { Route, Routes } from 'react-router-dom';

import { AppRoutesProps } from '@/shared/types/router';
import { PageLoader } from '@/widgets/PageLoader';

import { routeConfig } from '../config/routerConfig';

import { RequireAuth } from './RequireAuth';
import { RequireRoles } from './RequireRoles';

export const AppRouter = memo(() => {
    const renderWithWrapper = useCallback((route: AppRoutesProps) => {
        const element = (
            <Suspense fallback={<PageLoader />}>{route.element}</Suspense>
        );

        return (
            <Route
                key={route.path}
                path={route.path}
                element={
                    route.authOnly ? (
                        <RequireAuth>
                            <RequireRoles roles={route.roles}>
                                {element}
                            </RequireRoles>
                        </RequireAuth>
                    ) : (
                        element
                    )
                }
            />
        );
    }, []);

    return <Routes>{Object.values(routeConfig).map(renderWithWrapper)}</Routes>;
});
