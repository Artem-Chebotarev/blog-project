import { memo } from 'react';
// import { BugButton } from '@/app/providers/ErrorBoundary';
import { useSelector } from 'react-redux';

import { getUserAuthData } from '@/entities/User';
import { Text } from '@/shared/ui/Text';
import { Page } from '@/widgets/Page';

const MainPage = memo(() => {
    const authData = useSelector(getUserAuthData);

    return (
        <Page data-testid="MainPage">
            {/* <BugButton /> */}
            {/* <Counter /> */}
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
