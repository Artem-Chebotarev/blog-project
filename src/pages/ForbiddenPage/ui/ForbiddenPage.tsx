import { memo, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { getUserAuthData } from '@/entities/User';
import { getRouteMain } from '@/shared/const/router';
import { Page } from '@/widgets/Page';

const ForbiddenPage = memo(() => {
    const { t } = useTranslation('forbidden');

    const navigate = useNavigate();

    const authData = useSelector(getUserAuthData);

    useEffect(() => {
        if (!authData) {
            navigate(getRouteMain());
        }
    }, [navigate, authData]);

    return (
        <Page data-testid="ForbiddenPage">
            {t('У вас нет доступа к этой странице')}
        </Page>
    );
});

export default ForbiddenPage;
