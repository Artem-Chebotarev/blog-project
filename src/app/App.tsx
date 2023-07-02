import { Suspense, useEffect } from 'react';
import { useSelector } from 'react-redux';

import { getUserInited , initAuthData } from '@/entities/User';
import { LOCAL_STORAGE_THEME_KEY } from '@/shared/const/localStorage';
import { Theme } from '@/shared/const/theme';
import { classNames } from '@/shared/lib/helpers/classNames/classNames';
import { useAppDispatch } from '@/shared/lib/helpers/hooks/useAppDispatch/useAppDispatch';
import { Navbar } from '@/widgets/Navbar';
import { PageLoader } from '@/widgets/PageLoader';
import { Sidebar } from '@/widgets/Sidebar';

import { AppRouter } from './providers/router';

export const App = () => {
    const dispatch = useAppDispatch();

    const inited = useSelector(getUserInited);

    const mountTheme =
        (localStorage.getItem(LOCAL_STORAGE_THEME_KEY) as Theme) || Theme.LIGHT;

    useEffect(() => {
        dispatch(initAuthData());

        document.body.className = mountTheme;
    }, [dispatch, mountTheme]);

    if (!inited) {
        return <PageLoader />;
    }

    return inited ? (
        <div className={classNames('app', {}, [])}>
            <Suspense fallback="">
                <Navbar />
                <div className="content-page">
                    <Sidebar />
                    <AppRouter />
                </div>
            </Suspense>
        </div>
    ) : null;
};
