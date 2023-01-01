import { BugButton } from '@/app/providers/ErrorBoundary';
import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { ListBox } from '@/shared/ui/Popups';
import { HStack } from '@/shared/ui/Stack';
import { Page } from '@/widgets/Page/Page';

const MainPage = memo(() => {
    const { t } = useTranslation();

    return (
        <Page>
            <BugButton />
            {t('Главная страница')}
            <div>dsadasdas</div>
            <div>dsadasdas</div>
            <HStack>
                <div>12321312</div>
                <ListBox
                    defaultValue="Выберите значение"
                    onChange={(value: string) => { }}
                    value={undefined}
                    items={[
                        { value: '1', content: 'first' },
                        { value: '2', content: 'second', disabled: false },
                        { value: '3', content: 'third' },
                    ]}
                />
            </HStack>
            <div>dsadasdas</div>
            <div>dsadasdas</div>
        </Page>
    );
});

export default MainPage;
