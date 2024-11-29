import type { LocationQuery } from 'vue-router'
import type { UtmKey, UtmParams } from '~/types/utm'

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

export const filterUtmFromObject = (query: LocationQuery): UtmParams => {
    const utmParams: UtmParams = {}
    const utmKeys: UtmKey[] = ['utm_id', 'utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content']

    for (const key of utmKeys) {
        if (query[key]) {
            utmParams[key] = Array.isArray(query[key])
                ? query[key][query[key].length - 1]
                : query[key] as string
        }
    }

    return utmParams
}
