import { memo, MutableRefObject, useRef, UIEvent, ReactNode } from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';

import { StateSchema } from '@/app/providers/StoreProvider';
import { classNames } from '@/shared/lib/helpers/classNames/classNames';
import { useAppDispatch } from '@/shared/lib/helpers/hooks/useAppDispatch/useAppDispatch';
import { useInfiniteScroll } from '@/shared/lib/helpers/hooks/useInfiniteScroll/useInfiniteScroll';
import { useInitialEffect } from '@/shared/lib/helpers/hooks/useInitialEffect/useInitialEffect';
import { useThrottle } from '@/shared/lib/helpers/hooks/useThrottle/useThrottle';
import { TestProps } from '@/shared/types/tests';

import cls from './Page.module.scss';
import { getScrollSaveByPath } from './components/ScrollSave/model/selectors/scrollSaveSelectors';
import { scrollSaveActions } from './components/ScrollSave/model/slice/scrollSaveSlice';

interface PageProps extends TestProps {
    className?: string;
    children: ReactNode;
    onScrollEnd?: () => void;
}

export const PAGE_ID = 'PAGE_ID';

export const Page = memo((props: PageProps) => {
    const {
        className,
        children,
        onScrollEnd,
        'data-testid': dataTestId = 'Page',
    } = props;

    const dispatch = useAppDispatch();

    const { pathname } = useLocation();

    const wrapperRef = useRef() as MutableRefObject<HTMLDivElement>;
    const triggerRef = useRef() as MutableRefObject<HTMLDivElement>;

    /**
     * тк getScrollSaveByPath помимо стейта принимает еще один аргумент,
     * мы не можем его передать напрямую в
     * useSelector, так как useSelector принимает только один аргумент,
     * поэтому нужно использовать внутри функцию
     */
    const scrollPosition = useSelector((state: StateSchema) =>
        getScrollSaveByPath(state, pathname),
    );

    useInfiniteScroll({
        wrapperRef,
        triggerRef,
        callback: onScrollEnd,
    });

    useInitialEffect(() => {
        wrapperRef.current.scrollTop = scrollPosition;
    });

    const onScroll = useThrottle((event: UIEvent<HTMLDivElement>) => {
        dispatch(
            scrollSaveActions.setScrollPosition({
                path: pathname,
                position: event.currentTarget.scrollTop,
            }),
        );
    }, 1000);

    return (
        <main
            className={classNames(cls.Page, {}, [className])}
            ref={wrapperRef}
            onScroll={onScroll}
            id={PAGE_ID}
            data-testid={`${dataTestId}`}>
            {children}
            {onScrollEnd ? (
                <div className={cls.trigger} ref={triggerRef} />
            ) : null}
        </main>
    );
});
