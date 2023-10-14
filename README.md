## Запуск проекта

```
npm install - install dependencies
npm run start:dev или npm run start:dev:vite - start the server + frontend project in dev mode
```

----

## Scripts

- `npm run start` - Run frontend project on webpack dev server
- `npm run start:vite` - Run frontend project on vite
- `npm run start:dev` - Run frontend project on webpack dev server + backend
- `npm run start:dev:vite` - Run frontend project on vite + backend
- `npm run start:dev:server` - Run backend server
- `npm run build:prod` - Build in prod mode
- `npm run build:dev` - Build in dev mode (not minimized)
- `npm run analyze:prod` - Build in prod mode with bund analyzer
- `npm run analyze:dev` - Build in dev mode (not minimized) with bund analyzer
- `npm run lint:ts` - Check ts files with lint
- `npm run lint:ts:fix` - Correct ts files with lint
- `npm run lint:scss` - Check scss files with style lint
- `npm run lint:scss:fix` - Correct scss files style with style lint
- `npm run test:unit` - Run unit tests with jest
- `npm run test:unit:coverage` - Run unit tests with jest with report creation (built-in jest cli)
- `npm run test:ui` - Run screenshot tests with loki
- `npm run test:ui:ok` - Approve of new screenshots
- `npm run test:ui:ci` - Run screenshot tests locally
- `npm run test:ui:ci:remote` - Run screenshot tests in CI
- `npm run test:ui:report` - Generate a full report for screenshot tests
- `npm run test:ui:json` - Generate a json report for screenshot tests
- `npm run test:ui:html` - Generate a HTML report for screenshot tests
- `npm run storybook` - Run Storybook
- `npm run storybook:build` - Build storybook
- `npm run prepare` - pre commit hooks
- `npm run generate:slice` - Script for generating FSD slices
- `postinstall` - Clear cash in в node_modules

----

## Project architecture

The project is written in accordance with the Feature Sliced Design methodology

Documentation link - [feature sliced design](https://feature-sliced.design/docs/get-started/tutorial)

----

## Work with translations

The project uses the i18next library to work with translations.
Files with translations are stored in public/locales.

For comfortable work, we recommend installing the plugin for webstorm/vscode

Documentation i18next - [https://react.i18next.com/](https://react.i18next.com/)

----

## Tests

The project uses 4 types of tests:
1) unit tests with jest - `npm run test:unit`
2) Component Tests with React Testing Library -`npm run test:unit`
3) Screenshot tests with loki `npm run test:ui`
4) e2e testd with Cypress `npm run test:e2e`

More about tests - [documentation tests](/docs/tests.md)

----

## Linting

The project uses eslint to check typescript code and stylelint to check files with styles.

Also, for strict control of the main architectural principles,
a proprietary eslint plugin *eslint-plugin-path-checker-fsd* is used,
which contains 3 rules
1) path-checker - prohibits the use of absolute imports within a single module
2) layer-imports - checks the correctness of using layers from the FSD point of view
   (for example widgets cannot be used in features and entites)
3) public-api-imports - allows import from other modules only from the public api. Has auto fix

##### Run lints
- `npm run lint:ts` - Check ts files with lint
- `npm run lint:ts:fix` - Correct ts files with lint
- `npm run lint:scss` - Check scss files with style lint
- `npm run lint:scss:fix` - Correct scss files style lint

----
## Storybook

The project describes story cases for each component.
Requests to the server are mocked using storybook-addon-mock.

The file with the stories is created next to the component with the extension .stories.tsx

Run srotybook with command:
- `npm run storybook`

More about Storybook [Storybook](/docs/storybook.md)

Example:

```typescript jsx
import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Button, ButtonSize, ButtonTheme } from './Button';
import { Theme } from '@/shared/const/theme';

export default {
    title: 'shared/Button',
    component: Button,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof Button>;

const Template: ComponentStory<typeof Button> = (args) => <Button {...args} />;

export const Primary = Template.bind({});
Primary.args = {
    children: 'Text',
};

export const Clear = Template.bind({});
Clear.args = {
    children: 'Text',
    theme: ButtonTheme.CLEAR,
};
```


----

## Project configuration

For development, the project contains 2 configs:
1. Webpack - ./config/build
2. vite - vite.config.ts

Both bundlers are adapted to the main features of the application.

The entire configuration is stored in /config
- /config/babel - babel
- /config/build - config for webpack
- /config/jest - config for test environment
- /config/storybook - config for Storybook

The `scripts` folder contains various scripts for refactoring\simplifying code writing\generating reports, etc.

----

## CI pipeline and pre commit hooks

The github actions configuration is located in /.github/workflows.
In CI, all kinds of tests are run, project and storybook assembly, linting.

In pre commit hooks, we check the project with linters, config in /.husky

For local loki work, "target" is used: "chrome.docker",
For remote work ci/cd - "target": "chrome.app",

----

### Working with data

Interaction with the data is carried out using the Redux Toolkit.
If possible, reused entities should be normalized using EntityAdapter

Requests to the server are sent using [RTK query](/src/shared/api/rtkApi.ts)

To asynchronously connect the reducers (so as not to pull them into the main bundle), use
[useDynamicModuleLoad](/src/shared/lib/helpers/hooks/useDynamicModuleLoad/useDynamicModuleLoad.tsx)

----

### Working с feature-flags

It is allowed to use feature-flags only with the help of toggleFeatures

an object with options is passed to it

{
   name: name of feature-flag, 
   on: function, that executes after the feature has been turned on 
   of: function, that executes after the feature has been turned off 
}

To automatically remove a feature, use the remove-feature.ts script,
which takes 2 arguments
1. Name of the feature-flag being removed
2. State (on\off)

----

## Entities

- [Article](/src/entities/Article/README.md)
- [Comment](/src/entities/Comment/README.md)
- [Counter](/src/entities/Counter/README.md)
- [Country](/src/entities/Country/README.md)
- [Currency](/src/entities/Currency/README.md)
- [Notification](/src/entities/Notification/README.md)
- [Profile](/src/entities/Profile/README.md)
- [Rating](/src/entities/Rating/README.md)
- [User](/src/entities/User/README.md)

## Features

- [AddCommentForm](/src/features/AddCommentForm/README.md)
- [ArticleRating](/src/features/ArticleRating/README.md)
- [ArticleRecommendationsList](/src/features/ArticleRecommendationsList/README.md)
- [ArticleSortSelector](/src/features/ArticleSortSelector/README.md)
- [ArticleTypeTabs](/src/features/ArticleTypeTabs/README.md)
- [ArticleViewSelector](/src/features/ArticleViewSelector/README.md)
- [AuthByUsername](/src/features/AuthByUsername/README.md)
- [AvatarDropdown](/src/features/AvatarDropdown/README.md)
- [EditableProfileCard](/src/features/EditableProfileCard/README.md)
- [LangSwitcher](/src/features/LangSwitcher/README.md)
- [NotificationButton](/src/features/NotificationButton/README.md)
- [ThemeSwitcher](/src/features/ThemeSwitcher/README.md)



