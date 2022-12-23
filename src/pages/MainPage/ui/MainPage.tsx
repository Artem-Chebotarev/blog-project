import { BugButton } from 'app/providers/ErrorBoundary';
import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { Page } from 'widgets/Page/Page';

const MainPage = memo(() => {
    const { t } = useTranslation();

    return (
        <Page>
            <BugButton />
            {t('Главная страница')}
        </Page>
    );
});

export default MainPage;
