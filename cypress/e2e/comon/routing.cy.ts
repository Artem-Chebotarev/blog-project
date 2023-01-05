import { selectByTestId } from 'cypress/helpers/selectByTestId';

describe('Routing', () => {
    describe('User is athorized', () => {
        beforeEach(() => {
            cy.login('admin', '123');
        });

        it('Visit ProfilePage', () => {
            cy.visit('/profile/1');
            cy.get(selectByTestId('ProfilePage')).should('exist');
        });
        it('Visit ArticlesPage', () => {
            cy.visit('/articles');
            cy.get(selectByTestId('ArticlesPage')).should('exist');
        });
    });

    describe('User is NOT athorized', () => {
        it('Visit MainPage', () => {
            cy.visit('/');
            cy.get(selectByTestId('MainPage')).should('exist');
        });
        it('Visit ProfilePage', () => {
            cy.visit('/profile/1');
            cy.get(selectByTestId('MainPage')).should('exist');
        });
        it('Page os not found', () => {
            cy.visit('/abcde1');
            cy.get(selectByTestId('NotFoundPage')).should('exist');
        });
    });
});
