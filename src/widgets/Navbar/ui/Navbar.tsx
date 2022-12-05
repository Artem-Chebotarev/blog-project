import { classNames } from 'shared/lib/helpers/classNames/classNames';
import { Applink, ApplinkTheme } from 'shared/ui/Applink/Applink';
import cls from './Navbar.module.scss';

interface NavbarProps {
    className?: string;
}

export const Navbar = ({ className }: NavbarProps) => (
    <div className={classNames(cls.Navbar, {}, [className])}>
        <div className={cls.links}>
            /
        </div>
    </div>
);
