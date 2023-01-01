import { classNames } from '@/shared/lib/helpers/classNames/classNames';
import { memo, useMemo, useState } from 'react';
import { ThemeSwitcher } from '@/widgets/ThemeSwitcher';
import { LangSwitcher } from '@/widgets/LangSwitcher/LangSwitcher';
import { Button, ButtonSize, ButtonTheme } from '@/shared/ui/Button/Button';

import { useSelector } from 'react-redux';
import { VStack } from '@/shared/ui/Stack/VStack/VStack';
import { getSidebarItems } from '../../model/selectors/getSidebarItems';
import cls from './Sidebar.module.scss';
import { SidebarItem } from '../SidebarItem/SidebarItem';

interface SidebarProps {
    className?: string;
}

export const Sidebar = memo(({ className }: SidebarProps) => {
    const [collapsed, setCollapsed] = useState(false);

    const sidebarItemsList = useSelector(getSidebarItems);

    const onToggle = () => {
        setCollapsed((prev) => !prev);
    };

    const itemsList = useMemo(() => sidebarItemsList.map((elem) => (
        <SidebarItem
            key={elem.path}
            item={elem}
            collapsed={collapsed}
        />
    )), [collapsed, sidebarItemsList]);

    return (
        <section
            data-testid="sidebar"
            className={classNames(cls.Sidebar, { [cls.collapsed]: collapsed }, [className])}
        >
            <Button
                data-testid="sidebar-toogle"
                onClick={onToggle}
                className={cls.collapseBtn}
                theme={ButtonTheme.BACKGROUND_INVERTED}
                size={ButtonSize.L}
                square
            >
                {collapsed ? '>' : '<'}
            </Button>
            <VStack
                className={cls.items}
                role="navigation"
                gap="8"
            >
                {itemsList}
            </VStack>

            <div className={cls.switchers}>
                <ThemeSwitcher />
                <LangSwitcher
                    className={cls.lang}
                    short={collapsed}
                />
            </div>
        </section>
    );
});
