import { memo } from 'react';
import { classNames } from '@/shared/lib/helpers/classNames/classNames';
import { Page } from '@/widgets/Page/Page';
import { EditableProfileCard } from '@/features/EditableProfileCard';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Text } from '@/shared/ui/Text/Text';

interface ProfilePageProps {
    className?: string;
}

const ProfilePage = memo(({ className }: ProfilePageProps) => {
    const { id } = useParams<{ id: string }>();

    return (
        <Page className={classNames('', {}, [className])}>
            <EditableProfileCard id={id!} />
        </Page>
    );
});

export default ProfilePage;
