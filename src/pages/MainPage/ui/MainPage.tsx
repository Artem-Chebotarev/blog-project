import { memo } from 'react';
import { useTranslation } from 'react-i18next';

// import { BugButton } from '@/app/providers/ErrorBoundary';
import { RatingCard } from '@/entities/Rating';
import { Page } from '@/widgets/Page';

const MainPage = memo(() => {
    const { t } = useTranslation();

    return (
        <Page>
            {/* <BugButton /> */}
            {t('Главная страница')}
            {/* <StarRating size={50} /> */}
            <RatingCard
                title="Как вам статья?"
                feedbackTitle="Оставьте отзыв о статье"
                hasFeedback
            />
        </Page>
    );
});

export default MainPage;
