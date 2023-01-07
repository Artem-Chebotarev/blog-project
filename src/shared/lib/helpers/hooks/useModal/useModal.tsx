import {
    MutableRefObject,
    useCallback,
    useEffect,
    useRef,
    useState,
} from 'react';

interface UseModalProps {
    onClose?: () => void;
    isOpen?: boolean;
    animationDelay: number;
}

/**
 * Переиспользуемый хук для модальных компонентов (drawer/modal)
 * @param props {onClose, isOpen, animationDelay}
 * @returns
 */

export function useModal(props: UseModalProps) {
    const { onClose, isOpen, animationDelay } = props;

    const [isClosing, setIsClosing] = useState(false);
    const [isMounted, setIsMounted] = useState(false);

    const timerRef = useRef() as MutableRefObject<
        ReturnType<typeof setTimeout>
    >;

    // Управление монтированием
    useEffect(() => {
        if (isOpen) {
            setIsMounted(true);
        }
    }, [isOpen]);

    const close = useCallback(() => {
        if (onClose) {
            setIsClosing(true);

            timerRef.current = setTimeout(() => {
                onClose();
                setIsClosing(false);
            }, animationDelay);
        }
    }, [onClose, animationDelay]);

    // На каждый перерендер компонента эти функции создаются заного (новые ссылки)
    const onKeyDown = useCallback(
        (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                close();
            }
        },
        [close],
    );

    // без этой функции клик по модалке будет отрабатывать как клик outside
    // const onContentClick = (event: React.MouseEvent) => {
    //     event.stopPropagation();
    // };

    useEffect(() => {
        if (isOpen) {
            window.addEventListener('keydown', onKeyDown);
        }

        return () => {
            clearTimeout(timerRef.current);
            window.removeEventListener('keydown', onKeyDown);
        };
    }, [isOpen, onKeyDown]);

    return {
        isClosing,
        isMounted,
        close,
    };
}
