import { memo, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getUserAuthData } from '@/entities/User';
import { Page } from '@/widgets/Page';
import { RoutePath } from '@/shared/const/router';

const ForbiddenPage = memo(() => {
    const { t } = useTranslation('forbidden');

    const navigate = useNavigate();

    const authData = useSelector(getUserAuthData);

    useEffect(() => {
        if (!authData) {
            navigate(RoutePath.main);
        }
    }, [navigate, authData]);

    return (
        <Page>
            {t('У вас нет доступа к этой странице')}
        </Page>
    );
});

export default ForbiddenPage;
