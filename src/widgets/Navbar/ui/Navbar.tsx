import { classNames } from "shared/lib/helpers/classNames/classNames";
import { Applink, AppLinkTheme } from "shared/ui/AppLink/Applink";

import cls from './Navbar.module.scss';

interface NavbarProps {
    className?: string;
};

export const Navbar = ({ className }: NavbarProps) => {
    return (
        <div className={classNames(cls.Navbar, {}, [className])}>
            <div className={classNames(cls.links)}>
                <Applink 
                    to={'/'} 
                    theme={ AppLinkTheme.SECONDARY }
                >
                    Главная
                </Applink>
                <Applink 
                    to={'/about'} 
                    theme={ AppLinkTheme.SECONDARY }
                >
                    О сайте
                </Applink>
            </div>
        </div>
    )
};


