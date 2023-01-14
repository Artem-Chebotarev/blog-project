import { screen } from '@testing-library/react';

import { componentRender } from '@/shared/lib/tests/componentRender/componentRender';

import { Comment } from '../../model/types/comment';

import { CommentItem } from './CommentItem';

const comment: Comment = {
    id: 1,
    text: 'some comment',
    user: {
        id: 1,
        username: 'admin',
        avatar: 'https://pbs.twimg.com/media/FFUbOUsXwAAHlnf.jpg',
    },
};

describe('CommentItem', () => {
    test('render CommentItem', () => {
        componentRender(<CommentItem comment={comment} />);
        expect(screen.getByTestId('CommentCard.Content')).toBeInTheDocument();
    });

    test('render Skeleton', () => {
        componentRender(<CommentItem isLoading />);
        expect(screen.getByTestId('CommentCard.Loading')).toBeInTheDocument();
    });

    test('render nothing when there is no comment', () => {
        componentRender(<CommentItem />);
        expect(
            screen.queryByTestId('CommentCard.Content'),
        ).not.toBeInTheDocument();
    });
});
