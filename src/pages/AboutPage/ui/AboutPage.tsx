import { useTranslation } from "react-i18next";

const AboutPage = () => {
    const { t } = useTranslation('about');

    return (
        <div>
            { t("О сайте") }
        </div>
    );
};
// для того чтобы работал lazy компонент должен экспортироваться по дефолту
export default AboutPage;