import { BugButton } from 'app/providers/ErrorBoundary';
import { memo } from 'react';
import { useTranslation } from 'react-i18next';

const MainPage = memo(() => {
    const { t } = useTranslation();

    return (
        <div>
            <BugButton />
            {t('Главная страница')}
        </div>
    );
});

export default MainPage;
