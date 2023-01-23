import { memo } from 'react';
import { useSelector } from 'react-redux';

import { getUserAuthData } from '@/entities/User';
import { Text } from '@/shared/ui/Text';
import { Page } from '@/widgets/Page';

const MainPage = memo(() => {
    const authData = useSelector(getUserAuthData);

    return (
        <Page data-testid="MainPage">
            {!authData && (
                <>
                    <Text title="Login: user" />
                    <Text title="Password: 123" />
                </>
            )}
        </Page>
    );
});

export default MainPage;
