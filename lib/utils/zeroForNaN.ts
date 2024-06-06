export function zeroForNaN(input: number | string) {
    if (typeof input === 'string') {
        return Number.isNaN(parseInt(input)) ? 0 : parseInt(input)
    } else {
        return Number.isNaN(input) ? 0 : input
    }
}