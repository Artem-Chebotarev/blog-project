import { MutableRefObject, useEffect, useRef } from 'react';

export interface UseInfiniteScrollOptions {
    // вызывается, когда мы пересекли тот или иной элемент
    callback?: () => void;
    triggerRef: MutableRefObject<HTMLElement>;
    // сам враппер, внутри которого находится скролл
    // это Page, так как в этом компоненте находится скролл
    // враппером может быть и document, когда скролл глобальный на всю страницу
    wrapperRef: MutableRefObject<HTMLElement>;
}

export function useInfiniteScroll({ callback, triggerRef, wrapperRef }: UseInfiniteScrollOptions) {
    useEffect(() => {
        let observer: IntersectionObserver | null = null;

        const wrapperElement = wrapperRef.current;
        const triggerElement = triggerRef.current;

        if (callback) {
            const options = {
                root: wrapperElement,
                rootMargin: '0px',
                threshold: 1.0,
            };

            observer = new IntersectionObserver(([entry]) => {
                // для того, чтобы callback отрабатывал только когда элемент появляется в зоне
                // видимости
                // то есть не будет второго вызова, когда элемент покидает зону видимости
                if (entry.isIntersecting) {
                    callback();
                }
            }, options);

            observer.observe(triggerElement);
        }

        return () => {
            if (observer && triggerElement) {
                // eslint-disable-next-line react-hooks/exhaustive-deps
                observer.unobserve(triggerElement);
            }
        };
    }, [callback, triggerRef, wrapperRef]);
}
