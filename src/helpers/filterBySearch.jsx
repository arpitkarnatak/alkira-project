export function filterBySearch(searchTerm, item) {
    return item?.name.toLowerCase()?.includes(searchTerm.toLowerCase())
        || item?.city.toLowerCase()?.includes(searchTerm.toLowerCase())
        || item?.abbreviation.toLowerCase()?.includes(searchTerm.toLowerCase())
}
