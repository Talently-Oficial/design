const ID_SENIORITY_JUNIOR = 1
const ID_SENIORITY_MID = 2
const ID_SENIORITY_SENIOR = 3

const salaryEquivalenceSeniority = [
    {
        id: ID_SENIORITY_JUNIOR,
        label: 'junior',
        years: 2,
    },
    {
        id: ID_SENIORITY_MID,
        label: 'mid',
        years: 4,
    },
    {
        id: ID_SENIORITY_SENIOR,
        label: 'senior',
        years: 6,
    }
]

export const getSeniorityFromYearsExperience = (years: number): number => {
    const seniority = salaryEquivalenceSeniority.find((val) => val.years >= years)
    return seniority ? seniority.id : ID_SENIORITY_SENIOR
}

export const getYearsExperienceFromSeniority = (seniority: number): number => {
    const seniorityYears = salaryEquivalenceSeniority.find((val) => val.id === seniority)
    return seniorityYears ? seniorityYears.years : 6
}
