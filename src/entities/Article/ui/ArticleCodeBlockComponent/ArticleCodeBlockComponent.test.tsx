import { screen } from '@testing-library/react';

import { componentRender } from '@/shared/lib/tests/componentRender/componentRender';

import { ArticleBlockType } from '../../model/consts/consts';
import { ArticleBlock } from '../../model/types/article';

import { ArticleCodeBlockComponent } from './ArticleCodeBlockComponent';

const block: ArticleBlock = {
    id: 4,
    type: ArticleBlockType.CODE,
    code: "const path = require('path');\n\nconst server = jsonServer.create();\n\nconst router = jsonServer.router(path.resolve(__dirname, 'db.json'));\n\nserver.use(jsonServer.defaults({}));\nserver.use(jsonServer.bodyParser);",
};

describe('ArticleCodeBlockComponent', () => {
    test('render ArticleCodeBlockComponent', () => {
        componentRender(<ArticleCodeBlockComponent block={block} />);
        expect(
            screen.getByTestId('ArticleCodeBlockComponent'),
        ).toBeInTheDocument();
    });
});
