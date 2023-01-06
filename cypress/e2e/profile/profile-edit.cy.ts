let profileId = '';

describe('User moves on profile page', () => {
    beforeEach(() => {
        cy.login().then((data) => {
            profileId = String(data.id);
            cy.visit(`/profile/${data.id}`);
        });
    });
    afterEach(() => {
        cy.resetProfile(profileId);
    });
    it('and profile successfully loads', () => {
        cy.getByTestId('ProfileCard.firstname').should('have.value', 'test');
    });
    it('and edit profile', () => {
        const newName = 'new';
        const newLastname = 'lastname';
        cy.updateProfile(newName, newLastname);
        cy.getByTestId('ProfileCard.firstname').should('have.value', newName);
        cy.getByTestId('ProfileCard.lastname').should('have.value', newLastname);
    });
});
