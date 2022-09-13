// type Mods = {
//     [key:string]: boolean | string;
// }

// в качестве ключа string, в качестве значения либо boolean, либо string
// по сути обычный объект, но с ограниченным количеством значений
type Mods = Record<string, boolean | string>

export function classNames(cls: string, mods: Mods, additional: string[]): string {
    return [
        cls,
        ...additional,
        Object.entries(mods)
            .filter(([className, value]) => Boolean(value))
            .map(([className]) => className)
    ].join(' ');
}