import * as articleCommands from './commands/article';
import * as commentCommands from './commands/comment';
import * as commonCommands from './commands/common';
import * as profileCommands from './commands/profile';
import * as ratingCommands from './commands/rating';

// делать авторизацию через интерфейс долго и не очень безопасно,
// поэтому делаем авторизацию через запрос
Cypress.Commands.addAll(commonCommands);
Cypress.Commands.addAll(profileCommands);
Cypress.Commands.addAll(articleCommands);
Cypress.Commands.addAll(commentCommands);
Cypress.Commands.addAll(ratingCommands);
// Cypress.Commands.overwrite('intercept', () => {
//     const { FIXTURE_MODE } = process.env;

//     if (FIXTURE_MODE === 'READ') {

//     }
//     if (FIXTURE_MODE === 'WRITE') {

//     }
// });

export { };
