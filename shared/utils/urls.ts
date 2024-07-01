export const isValidHttpUrl = (url: string) => {
    try {
        const newUrl = new URL(url)
        return newUrl.protocol === 'http:' || newUrl.protocol === 'https:'
    } catch (err) {
        return false
    }
}

export const isValidUrl = (url: string) => {
    try {
        new URL(url)
        return true
    } catch (err) {
        return false
    }
}
