import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import { saveJsonSettings, useJsonSettings } from "@/entities/User";
import { detectDevice as isMobile } from '@/shared/lib/helpers/detectDevice/detectDevice';
import { useAppDispatch } from "@/shared/lib/helpers/hooks/useAppDispatch/useAppDispatch";
import { Drawer } from "@/shared/ui/Drawer";
import { Modal } from "@/shared/ui/Modal";
import { Text } from "@/shared/ui/Text";

export const ArticlePageGreeting = () => {
  const { t } = useTranslation();

  const [isOpen, setIsOpen] = useState(false);

  const { isArticlePageWasOpened } = useJsonSettings();

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!isArticlePageWasOpened) {
      setIsOpen(true);
      dispatch(saveJsonSettings({ isArticlePageWasOpened: true }));
    }
  }, [dispatch, isArticlePageWasOpened]);

  const onClose = () => setIsOpen(false);

  const text = (
    <Text 
      title={t('Добро пожаловать на страницу статей!')} 
      text={t('Здесь вы можете просматривать и искать статьи на различные темы')}
    />
  );

  if (isMobile()) {
    return (
      <Drawer lazy isOpen={isOpen} onClose={onClose}>
        {text}
        </Drawer>
    )
  }

  return (
    <Modal lazy isOpen={isOpen} onClose={onClose}>
      {text}
    </Modal>
  )
}
