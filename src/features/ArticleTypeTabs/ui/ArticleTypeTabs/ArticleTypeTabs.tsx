import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { ArticleType } from '@/entities/Article';
import { classNames } from '@/shared/lib/helpers/classNames/classNames';
import { TabItem, Tabs } from '@/shared/ui/Tabs';

interface ArticleTypeTabsProps {
    className?: string;
    value: ArticleType;
    onChangeTab: (elem: TabItem<ArticleType>) => void;
}

export const ArticleTypeTabs = (props: ArticleTypeTabsProps) => {
    const { className, value, onChangeTab } = props;

    const { t } = useTranslation();

    const typeTabs = useMemo<TabItem<ArticleType>[]>(
        () => [
            {
                value: ArticleType.ALL,
                content: t('Все'),
            },
            {
                value: ArticleType.IT,
                content: t('Айти'),
            },
            {
                value: ArticleType.ECONOMICS,
                content: t('Экономика'),
            },
            {
                value: ArticleType.SCIENCE,
                content: t('Наука'),
            },
        ],
        [t],
    );

    return (
        <Tabs
            className={classNames('', {}, [className])}
            tabs={typeTabs}
            value={value}
            onTabClick={onChangeTab}
        />
    );
};
