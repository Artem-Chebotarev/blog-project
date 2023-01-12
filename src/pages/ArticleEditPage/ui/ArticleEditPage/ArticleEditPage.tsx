import { memo } from 'react';
import { useParams } from 'react-router-dom';

import { classNames } from '@/shared/lib/helpers/classNames/classNames';
import { Page } from '@/widgets/Page';

interface ArticleEditPageProps {
    className?: string;
}

const ArticleEditPage = memo((props: ArticleEditPageProps) => {
    const { className } = props;

    const { id } = useParams<{ id: string }>();

    const isEdit = Boolean(id);

    return (
        <Page
            className={classNames('', {}, [className])}
            data-testid="ArticleEditPage"
        >
            Article edit page
        </Page>
    );
});

export default ArticleEditPage;
