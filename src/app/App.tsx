import { classNames } from "shared/lib/helpers/classNames/classNames";
import { useTheme } from "app/providers/ThemeProvider";
import { AppRouter } from "./providers/router";
import { Navbar } from "widgets/Navbar";

import './styles/index.scss';
import { Sidebar } from "widgets/Sidebar";
import { Suspense } from "react";

export const App = () => {
    const { theme } = useTheme(); 

    return (
        <div className={classNames('app', {}, [theme])}>
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