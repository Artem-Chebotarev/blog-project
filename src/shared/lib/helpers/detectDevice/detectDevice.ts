/**
 * Функция определения типа устройства, на котором было запущено приложение
 * @returns
 */
export const detectDevice = () => {
    const isMobile = window.matchMedia;
    if (!isMobile) return false;

    const device = isMobile('(pointer:coarse)');
    return device.matches;
};
