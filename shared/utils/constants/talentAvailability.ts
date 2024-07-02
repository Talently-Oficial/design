export const ID_TALENT_AVAILABILITY_INTERVIEWS: number = 1

export const ID_TALENT_AVAILABILITY_OFFERS: number = 2

export const ID_TALENT_AVAILABILITY_NOT_AVAILABLE: number = 3

export const LABELS_TALENT_AVAILABILITY: { [key: number]: string } = {
    [ID_TALENT_AVAILABILITY_INTERVIEWS]: 'Disponible para entrevistas',
    [ID_TALENT_AVAILABILITY_OFFERS]: 'Abierto a ofertas',
    [ID_TALENT_AVAILABILITY_NOT_AVAILABLE]: 'No disponible',
}

export const COLORS_TALENT_AVAILABILITY: { [key: number]: string } = {
    [ID_TALENT_AVAILABILITY_INTERVIEWS]: 'green',
    [ID_TALENT_AVAILABILITY_OFFERS]: 'yellow',
    [ID_TALENT_AVAILABILITY_NOT_AVAILABLE]: 'red',
}
