export function getPagesCount(totalElements, limitOnPage) {
    return Math.ceil(totalElements / limitOnPage)
}
