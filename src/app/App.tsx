import { Suspense, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getUserInited, userActions } from '@/entities/User';
import { LOCAL_STORAGE_THEME_KEY } from '@/shared/const/localStorage';
import { Theme } from '@/shared/const/theme';
import { classNames } from '@/shared/lib/helpers/classNames/classNames';
import { Navbar } from '@/widgets/Navbar';
import { Sidebar } from '@/widgets/Sidebar';

import { AppRouter } from './providers/router';

export const App = () => {
    const dispatch = useDispatch();

    const inited = useSelector(getUserInited);

    const mountTheme = localStorage.getItem(LOCAL_STORAGE_THEME_KEY) as Theme || Theme.LIGHT;

    useEffect(() => {
        dispatch(userActions.initAuthData());

        document.body.className = mountTheme;
    }, [dispatch, mountTheme]);

    return (
        inited
            ? (
                <div className={classNames('app', {}, [])}>
                    <Suspense fallback="">
                        <Navbar />
                        <div className="content-page">
                            <Sidebar />
                            <AppRouter />
                        </div>
                    </Suspense>
                </div>
            ) : null
    );
};
