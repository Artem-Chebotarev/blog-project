export type Mods = Record<string, boolean | string | undefined>

/**
 * Функция создания свойства className для компонентов
 * @param cls
 * @param mods
 * @param additional
 * @returns
 */
export function classNames(
    cls: string,
    mods: Mods = {},
    additional: Array<string | undefined> = [],
): string {
    return [
        cls,
        ...additional.filter(Boolean),
        ...Object.entries(mods)
            .filter(([_, value]) => Boolean(value))
            .map(([className]) => className),
    ]
        .join(' ');
}
