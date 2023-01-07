import { useCallback } from 'react';

import CopyIcon from '@/shared/assets/icons/copy-20-20.svg';
import { classNames } from '@/shared/lib/helpers/classNames/classNames';

import { Button, ButtonTheme } from '../Button/Button';

import cls from './Code.module.scss';

interface CodeProps {
    className?: string;
    text: string;
}

export const Code = (props: CodeProps) => {
    const { className, text } = props;

    const onCopy = useCallback(() => {
        navigator.clipboard.writeText(text);
    }, [text]);

    return (
        <pre className={classNames(cls.Code, {}, [className])}>
            <Button
                className={cls.copyBtn}
                theme={ButtonTheme.CLEAR}
                onClick={onCopy}>
                <CopyIcon className={cls.copyIcon} />
            </Button>
            <code>{text}</code>
        </pre>
    );
};
