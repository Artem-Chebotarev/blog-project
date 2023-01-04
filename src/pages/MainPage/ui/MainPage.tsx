import { memo } from 'react';
import { useTranslation } from 'react-i18next';

// import { BugButton } from '@/app/providers/ErrorBoundary';
import { Counter } from '@/entities/Counter';
import { RatingCard } from '@/entities/Rating';
import { Page } from '@/widgets/Page';

const MainPage = memo(() => {
    const { t } = useTranslation();

    return (
        <Page data-testid="MainPage">
            {/* <BugButton /> */}
            {t('Главная страница')}
            {/* <StarRating size={50} /> */}
            <RatingCard
                title="Как вам статья?"
                feedbackTitle="Оставьте отзыв о статье"
                hasFeedback
            />
            <Counter />
        </Page>
    );
});

export default MainPage;
