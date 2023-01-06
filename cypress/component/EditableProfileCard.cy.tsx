import { EditableProfileCard } from '@/features/EditableProfileCard';
import { TestProvider } from '@/shared/lib/tests/componentRender/componentRender';

const USER_ID = 1;

describe('EditableProfileCard', () => {
    it('render', () => {
        cy.intercept('GET', '**/profile/*', { fixture: 'profile.json' });
        cy.mount(
            <TestProvider
                options={{
                    initialState: {
                        user: {
                            authData: {
                                id: USER_ID,
                            },
                        },
                    },
                }}
            >
                <EditableProfileCard id={String(USER_ID)} />
            </TestProvider>,
        );
    // описываем тест кейс
    });
});
