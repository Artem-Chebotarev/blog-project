import { ArticleSortField } from 'entities/Article/model/types/article';
import { memo, useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/helpers/classNames/classNames';
import { SortOrder } from 'shared/types';
import { Select, SelectOption } from 'shared/ui/Select/Select';

import cls from './ArticleSortSelector.module.scss';

interface ArticleSortSelectorProps {
    className?: string;
    sort: ArticleSortField;
    order: SortOrder;
    onChangeSort: (value: ArticleSortField) => void;
    onChangeOrder: (value: SortOrder) => void;
}

export const ArticleSortSelector = memo((props: ArticleSortSelectorProps) => {
    const {
        className,
        sort,
        order,
        onChangeSort,
        onChangeOrder,
    } = props;

    const { t } = useTranslation();

    const orderOptions = useMemo<SelectOption<SortOrder>[]>(() => [
        {
            value: SortOrder.ASC,
            content: t('возрастанию'),
        },
        {
            value: SortOrder.DESC,
            content: t('убыванию'),
        },
    ], [t]);

    const sortFieldOptions = useMemo<SelectOption<ArticleSortField>[]>(() => [
        {
            value: ArticleSortField.VIEW,
            content: t('количеству просмотров'),
        },
        {
            value: ArticleSortField.TITLE,
            content: t('названию'),
        },
        {
            value: ArticleSortField.CREATED,
            content: t('дате создания'),
        },
    ], [t]);

    /**
     * Это bad practises и так делать не нужно (кастовать типы в данном случае)
     * из-за возможных ошибок при явном приведении типов
     */
    // const changeSortHandler = useCallback((value: string) => {
    //     onChangeSort(value as ArticleSortField);
    // }, [onChangeSort]);

    // const changeOrderHandler = useCallback((value: string) => {
    //     onChangeOrder(value as SortOrder);
    // }, [onChangeOrder]);

    return (
        <div className={classNames(cls.ArticleSortSelector, {}, [className])}>
            <Select<ArticleSortField>
                label={t('Сортировать ПО')}
                options={sortFieldOptions}
                value={sort}
                onChange={onChangeSort}
            />
            <Select<SortOrder>
                label={t('по')}
                options={orderOptions}
                value={order}
                onChange={onChangeOrder}
            />
        </div>
    );
});
