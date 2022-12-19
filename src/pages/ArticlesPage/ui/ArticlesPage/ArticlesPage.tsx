import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/helpers/classNames/classNames';

import cls from './ArticlesPage.module.scss';

interface ArticlesPageProps {
    className?: string;
}

const ArticlesPage = memo(({ className }: ArticlesPageProps) => {
    const { t } = useTranslation();

    return (
        <div className={classNames(cls.ArticlesPage, {}, [className])}>
            ARTICLES PAGE
        </div>
    );
});

export default memo(ArticlesPage);