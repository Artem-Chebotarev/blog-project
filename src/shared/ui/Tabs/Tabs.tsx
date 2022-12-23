import { memo, ReactNode, useCallback } from 'react';
import { classNames } from 'shared/lib/helpers/classNames/classNames';
import { Card, CardTheme } from 'shared/ui/Card/Card';

import cls from './Tabs.module.scss';

export interface TabItem<T extends string> {
    value: T;
    content: ReactNode
}

interface TabsProps<T extends string> {
    className?: string;
    tabs: TabItem<T>[];
    value: T;
    onTabClick: (value: TabItem<T>) => void;
}

const typedMemo: <K>(c: K) => K = memo;

export const Tabs = typedMemo(<T extends string>(props: TabsProps<T>) => {
    const {
        className,
        tabs,
        value,
        onTabClick,
    } = props;

    const clickHandler = useCallback((value: TabItem<T>) => () => {
        onTabClick(value);
    }, [onTabClick]);

    return (
        <div className={classNames(cls.Tabs, {}, [className])}>
            {tabs.map((elem) => (
                <Card
                    theme={elem.value === value ? CardTheme.NORMAL : CardTheme.OUTLINED}
                    className={cls.tab}
                    key={elem.value}
                    onClick={clickHandler(elem)}
                >
                    {elem.content}
                </Card>
            ))}
        </div>
    );
});
