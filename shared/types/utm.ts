export type UtmKey = 'utm_id' | 'utm_source' | 'utm_medium' | 'utm_campaign' | 'utm_term' | 'utm_content'
export type UtmParams = Partial<Record<UtmKey, string>>
