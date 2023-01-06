import { memo, useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { detectDevice as isMobile } from '@/shared/lib/helpers/detectDevice/detectDevice';
import { Button, ButtonSize, ButtonTheme } from '@/shared/ui/Button';
import { Card } from '@/shared/ui/Card';
import { Drawer } from '@/shared/ui/Drawer';
import { Input } from '@/shared/ui/Input';
import { Modal } from '@/shared/ui/Modal';
import { HStack, VStack } from '@/shared/ui/Stack';
import { StarRating } from '@/shared/ui/StarRaiting';
import { Text, TextAlign } from '@/shared/ui/Text';

interface RatingCardProps {
    className?: string;
    title?: string;
    feedbackTitle?: string;
    hasFeedback?: boolean;
    onCancel?: (starsCount: number) => void;
    onAccept?: (starsCount: number, feedback?: string) => void;
    rate?: number;
    align?: TextAlign.CENTER;
}

export const RatingCard = memo((props: RatingCardProps) => {
    const {
        className,
        title,
        feedbackTitle,
        hasFeedback,
        onCancel,
        onAccept,
        rate = 0,
        align,
    } = props;

    const { t } = useTranslation();

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [starsCount, setStarsCount] = useState(rate);
    const [feedback, setFeedback] = useState('');

    const onSelectStars = useCallback((selectedStarsCount: number) => {
        setStarsCount(selectedStarsCount);

        if (hasFeedback) {
            setIsModalOpen(true);
        } else {
            onAccept?.(starsCount);
        }
    }, [hasFeedback, onAccept, starsCount]);

    const acceptHandler = useCallback(() => {
        setIsModalOpen(false);
        onAccept?.(starsCount, feedback);
    }, [feedback, onAccept, starsCount]);

    const cancelHandler = useCallback(() => {
        setIsModalOpen(false);
        onCancel?.(starsCount);
    }, [onCancel, starsCount]);

    const onChangeFeedback = useCallback((value: string) => {
        setFeedback(value);
    }, []);

    const modalContent = (
        <>
            <Text title={feedbackTitle} />
            <Input
                placeholder={t('Ваш отзыв')}
                value={feedback}
                onChange={onChangeFeedback}
                data-testid="RatingCard.Input"
            />
        </>
    );

    return (
        <Card
            className={className}
            max
            data-testid="RatingCard"
        >
            <VStack
                align="center"
                gap="8"
            >
                <Text title={starsCount ? t('Спасибо за оценку') : title} />
                <StarRating
                    size={40}
                    onSelect={onSelectStars}
                    selectedStars={starsCount}
                    align={align}
                />
            </VStack>

            {isMobile() ? (
                <Drawer
                    isOpen={isModalOpen}
                    lazy
                >
                    <VStack gap="32">
                        {modalContent}
                        <Button
                            onClick={acceptHandler}
                            size={ButtonSize.L}
                            fullWidth
                        >
                            {t('Отправить')}
                        </Button>
                    </VStack>
                </Drawer>
            )
                : (
                    <Modal
                        isOpen={isModalOpen}
                        onClose={cancelHandler}
                        lazy
                    >
                        <VStack
                            gap="32"
                            max
                        >
                            {modalContent}
                            <HStack
                                justify="end"
                                gap="16"
                                max
                            >
                                <Button
                                    onClick={acceptHandler}
                                    data-testid="RatingCard.Send"
                                >
                                    {t('Отправить')}
                                </Button>
                                <Button
                                    theme={ButtonTheme.OUTLINE_RED}
                                    onClick={cancelHandler}
                                    data-testid="RatingCard.Close"
                                >
                                    {t('Закрыть')}
                                </Button>
                            </HStack>
                        </VStack>
                    </Modal>
                )}
        </Card>
    );
});
