import { login } from './commands/login';

// делать авторизацию через интерфейс долго и не очень безопасно,
// поэтому делаем авторизацию через запрос
Cypress.Commands.add('login', login);

declare global {
    namespace Cypress {
        interface Chainable {
            login(username?: string, password?: string): Chainable<void>
        }
    }
}

export { };
