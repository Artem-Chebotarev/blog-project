// ES2020
const rtf = new Intl.RelativeTimeFormat('ru', {
    numeric: 'always',
    style: 'long',
    localeMatcher: 'best fit',
});

// console.log(rtf.format(1, 'minute'));
// console.log(rtf.format(-1, 'day'));
// console.log(rtf.format(2, 'day'));
// console.log(rtf.format(-2, 'day'));
// console.log(rtf.format(20, 'day'));

/**
 * Функция расчета времени относительно текущего положения
 * @param date момент времени
 * @param lang локаль на которой выводится разница во времени
 * @returns
 */
export function getRelativePathString(
    date: Date | number,
    lang = navigator.language,
) {
    const timeMs = typeof date === 'number' ? date : date.getTime();

    const deltaSeconds = Math.round((timeMs - Date.now()) / 1_000);

    const cutoffs = [
        60,
        3_600,
        86_400,
        86_400 * 7,
        86_400 * 30,
        86_400 * 365,
        Infinity,
    ];

    const units: Intl.RelativeTimeFormatUnit[] = [
        'second',
        'minute',
        'hour',
        'day',
        'week',
        'month',
        'year',
    ];

    const unitIndex = cutoffs.findIndex(
        (cutoff) => cutoff > Math.abs(deltaSeconds),
    );

    const divisor = unitIndex ? cutoffs[unitIndex - 1] : 1;

    const rtf = new Intl.RelativeTimeFormat(lang, { numeric: 'auto' });

    return rtf.format(Math.floor(deltaSeconds / divisor), units[unitIndex]);
}

// console.log(getRelativePathString(new Date('2025-02-28T22:15:06'), 'ru'));
