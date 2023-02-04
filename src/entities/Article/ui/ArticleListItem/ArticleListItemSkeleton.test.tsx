import { screen } from '@testing-library/react';

import { componentRender } from '@/shared/lib/tests/componentRender/componentRender';

import { ArticleView } from '../../model/consts/consts';

import { ArticleListItemSkeleton } from './ArticleListItemSkeleton';

describe('ArticleListItemSkeleton', () => {
    test('render ArticleListItemSkeleton in LIST mode', () => {
        componentRender(<ArticleListItemSkeleton view={ArticleView.LIST} />);
        expect(
            screen.getByTestId('ArticleListItemSkeleton'),
        ).toBeInTheDocument();
    });
    test('render ArticleListItemSkeleton in GRID mode', () => {
        componentRender(<ArticleListItemSkeleton view={ArticleView.GRID} />);
        expect(
            screen.getByTestId('ArticleListItemSkeleton'),
        ).toBeInTheDocument();
    });
});
