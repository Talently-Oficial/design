export const ID_WORK_MODALITY_REMOTE_GLOBAL: number = 1

export const ID_WORK_MODALITY_REMOTE_LOCAL: number = 2

export const ID_WORK_MODALITY_OFFICE: number = 3

export const ID_WORK_MODALITY_HYBRID: number = 4

export const ICONS_WORK_MODALITY = ref<Record<number, string>>({
    [ID_WORK_MODALITY_REMOTE_GLOBAL]: 'mdi:world',
    [ID_WORK_MODALITY_REMOTE_LOCAL]: 'ic:outline-multiple-stop',
    [ID_WORK_MODALITY_OFFICE]: 'mdi:building',
    [ID_WORK_MODALITY_HYBRID]: 'uil:location-pin-alt',
})
