import { useState } from "react";
import { classNames } from "shared/lib/helpers/classNames/classNames";
import { LangSwitcher } from "widgets/LangSwitcher/ui/LangSwitcher";
import { ThemeSwitcher } from "widgets/ThemeSwitcher";

import cls from "./Sidebar.module.scss";

interface SidebarProps {
    className?: string;
};

export const Sidebar = ({ className }: SidebarProps) => {
    const [collapsed, setCollapsed] = useState(false);

    const onToggle = () => {
        setCollapsed(prev => !prev);
    }

    return (
        <div className={classNames(cls.Sidebar, { [cls.collapsed]: collapsed}, [className])}>
            <button className={cls.btn} onClick={onToggle}>toggle</button>
            <div className={cls.switchers}>
                <ThemeSwitcher />
                <LangSwitcher />
            </div>
        </div>
    );
};