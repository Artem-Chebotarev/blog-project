import { screen } from '@testing-library/react';

import { UserRole } from '@/entities/User';
import { componentRender } from '@/shared/config/tests/componentRender/componentRender';
import {
    getRouteAbout,
    getRouteAdminPanel,
    getRouteArticleDetails,
    getRouteArticles,
    getRouteMain,
    getRouteProfile,
} from '@/shared/const/router';

import { AppRouter } from './AppRouter';

import '@/shared/config/tests/intersectionObserverMock/intersectionObserverMock';

describe('AppRouter', () => {
    test('AboutPage should render', async () => {
        componentRender(<AppRouter />, {
            route: getRouteAbout(),
        });

        // findByTestId - нужно использовать, когда есть Suspense
        const page = await screen.findByTestId('AboutPage');
        expect(page).toBeInTheDocument();
    });

    test('MainPage should render', async () => {
        componentRender(<AppRouter />, {
            route: getRouteMain(),
        });

        // findByTestId - нужно использовать, когда есть Suspense
        const page = await screen.findByTestId('MainPage');
        expect(page).toBeInTheDocument();
    });

    test('redirect not authorized user on MainPage', async () => {
        componentRender(<AppRouter />, {
            route: getRouteProfile('1'),
        });

        const page = await screen.findByTestId('MainPage');
        expect(page).toBeInTheDocument();
    });

    test('access on ProfilePage (protected page) for authorized user', async () => {
        componentRender(<AppRouter />, {
            route: getRouteProfile('1'),
            initialState: {
                user: {
                    authData: {
                        id: 1,
                    },
                    _inited: true,
                },
            },
        });

        const page = await screen.findByTestId('ProfilePage');
        expect(page).toBeInTheDocument();
    });

    test('access on ArticleDetailsPage (protected page) for authorized user', async () => {
        componentRender(<AppRouter />, {
            route: getRouteArticleDetails('1'),
            initialState: {
                user: {
                    authData: {
                        id: 1,
                    },
                    _inited: true,
                },
            },
        });

        const page = await screen.findByTestId('ArticleDetailsPage');
        expect(page).toBeInTheDocument();
    });

    test('access on ArticlesPage (protected page) for authorized user', async () => {
        componentRender(<AppRouter />, {
            route: getRouteArticles(),
            initialState: {
                user: {
                    authData: {
                        id: 1,
                    },
                    _inited: true,
                },
            },
        });

        const page = await screen.findByTestId('ArticlesPage');
        expect(page).toBeInTheDocument();
    });

    test('access to AdminPanelPage is denied (there are no right roles)', async () => {
        componentRender(<AppRouter />, {
            route: getRouteAdminPanel(),
            initialState: {
                user: {
                    authData: {
                        id: 1,
                    },
                    _inited: true,
                },
            },
        });

        const page = await screen.findByTestId('ForbiddenPage');
        expect(page).toBeInTheDocument();
    });

    test('access to AdminPanelPage is granted (there are right roles)', async () => {
        componentRender(<AppRouter />, {
            route: getRouteAdminPanel(),
            initialState: {
                user: {
                    authData: {
                        id: 1,
                        roles: [UserRole.ADMIN],
                    },
                    _inited: true,
                },
            },
        });

        const page = await screen.findByTestId('AdminPanelPage');
        expect(page).toBeInTheDocument();
    });

    test('page not found', async () => {
        componentRender(<AppRouter />, {
            route: '/abcde',
        });

        // findByTestId - нужно использовать, когда есть Suspense
        const page = await screen.findByTestId('NotFoundPage');
        expect(page).toBeInTheDocument();
    });
});
