import { Suspense, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Sidebar } from 'widgets/Sidebar';
import { Navbar } from 'widgets/Navbar';
import { classNames } from 'shared/lib/helpers/classNames/classNames';
import { userActions } from 'entities/User';
import { AppRouter } from './providers/router';
import { LOCAL_STORAGE_THEME_KEY, Theme } from './providers/ThemeProvider';

export const App = () => {
    const dispatch = useDispatch();

    const mountTheme = localStorage.getItem(LOCAL_STORAGE_THEME_KEY) as Theme || Theme.LIGHT;

    useEffect(() => {
        dispatch(userActions.initAuthData());

        document.body.className = mountTheme;
    }, [dispatch, mountTheme]);

    return (
        <div className={classNames('app', {}, [])}>
            <Suspense fallback="">
                <Navbar />
                <div className="content-page">
                    <Sidebar />
                    <AppRouter />
                </div>
            </Suspense>
        </div>
    );
};
