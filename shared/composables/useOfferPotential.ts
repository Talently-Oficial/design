import {AxiosInstance} from 'axios'

interface OfferPotentialParams {
    skill_ids: (number | null)[]
    seniority_id: number | null
    years_experience: number | null
    english_level_id: number | null
    minimum_salary: number | null
    maximum_salary: number | null
    work_modality_id: number | null // Optional
    developer_type_id: number | null // Optional
}

const templateResultOfferPotential = {
    popularity: {
        label: null,
        value: null,
    },
    affinity: {
        label: null,
        value: null,
    },
    potential: {
        label: null,
        value: null,
    },
    candidates: null
}

const templateResultCalculateSalary = {
    high: null,
    low: null,
    salary: null,
    score: 'none'
}

export const useOfferPotential = () => {
    const loadingOfferPotential = useState<boolean>('loadingOfferPotential', () => false)
    const resultOfferPotential = useState<any>('resultOfferPotential', () => ({...templateResultOfferPotential}))

    const loadingCalculateSalary = useState<boolean>('loadingCalculateSalary', () => false)
    const resultOfferSuggestion = useState<any>('resultSuggestion', () => [])

    const resultCalculateSalary = useState<any>('resultCalculateSalary', () => ({...templateResultCalculateSalary}))

    const paramsOfferPotential = useState<OfferPotentialParams>('paramsOfferPotential', () => ({
        skill_ids: [],
        seniority_id: null,
        years_experience: null,
        english_level_id: null,
        work_modality_id: null,
        minimum_salary: null,
        maximum_salary: null,
        developer_type_id: null,
    }))

    const resetResultOfferPotential = () => {
        resultOfferPotential.value = templateResultOfferPotential
    }

    const resetResultCalculateSalary = () => {
        resultCalculateSalary.value = templateResultCalculateSalary
    }

    const isValidParamsOfferPotential = () => {
        return (
            paramsOfferPotential.value.skill_ids.filter((val) => val !== null).length > 0 &&
            paramsOfferPotential.value.english_level_id &&
            paramsOfferPotential.value.seniority_id &&
            paramsOfferPotential.value.maximum_salary
        )
    }

    const isValidParamsCalculateSalary = () => {
        return (
            paramsOfferPotential.value.skill_ids.filter((val) => val !== null).length > 0 &&
            paramsOfferPotential.value.years_experience &&
            paramsOfferPotential.value.english_level_id &&
            paramsOfferPotential.value.minimum_salary &&
            paramsOfferPotential.value.maximum_salary
        )
    }

    const setSuggestions = (form) => {
        if(!isValidParamsOfferPotential() && !isValidParamsCalculateSalary()) return

        const suggestions = []

        const {affinity, potential, popularity} = resultOfferPotential.value
        const {low, score} = resultCalculateSalary.value

        const skills = form.stacks
        const selectedMinSalary = form.salary_min
        const selectedYearExperience = form.min_years_experience
        const selectedLanguageProficiency = form.language_proficiency_id
        const averageYearsExperience = 5

        if (potential.value === 100) return

        const checkLowAndMiddlePotentialScore = () => {
            return potential.value < 60
        }

        const checkSkillAndLowSalary = () => {
            const required = skills.filter((val) => {
                return !!val.is_required
            })

            return skills.length >= 6 && required.length > 3 && score === 'low'
        }

        const checkYearsOfExperience = () => {
            return (
                selectedYearExperience > averageYearsExperience && (potential.label === 'Low' || potential.label === 'Middle' || potential.label === 'Bajo' || potential.label === 'Medio')
            )
        }

        const checkEnglishLevelAndSalary = () => {
            return selectedLanguageProficiency >= ID_INTERMEDIATE_ENGLISH_LEVEL && score === 'low'
        }

        const checkLowAffinity = () => {
            return affinity.value <= 2
        }

        const checkLowTarget = () => {
            return popularity.value < 1
        }

        const checkLowSalary = () => {
            return selectedMinSalary < low
        }

        if (checkLowAndMiddlePotentialScore()) {
            suggestions.push(LOW_AND_MIDDLE_POTENTIAL_SCORE)
        }

        if (checkSkillAndLowSalary()) {
            suggestions.push(SKILL_AND_LOW_SALARY)
        }

        if (checkYearsOfExperience()) {
            suggestions.push(HIGH_YEARS_OF_EXPERIENCE)
        }

        if (checkEnglishLevelAndSalary()) {
            suggestions.push(ENGLISH_LEVEL_AND_SALARY)
        }

        if (checkLowAffinity()) {
            suggestions.push(AVERAGE_AFFINITY_LOG)
        }

        if (checkLowTarget()) {
            suggestions.push(LOW_TARGET)
        }

        if (checkLowSalary()) {
            const roleIndex = form.developer_types.findIndex(
                (val) => val.id === form.developer_type_id,
            )
            if (roleIndex !== -1)
                suggestions.push(LOW_SALARY.replace('[rol]', form.developer_types[roleIndex].name))
        }

        resultOfferSuggestion.value = suggestions
    }

    const fetchOfferPotential = async ($fetch: AxiosInstance, path: string = '/v4/web/offer/evaluator'): Promise<void> => {
        if (!isValidParamsOfferPotential()) {
            resetResultOfferPotential()
            loadingOfferPotential.value = false
            return
        }

        loadingOfferPotential.value = true

        const params = {
            skill_ids: paramsOfferPotential.value.skill_ids,
            english_level_id: paramsOfferPotential.value.english_level_id,
            seniority_id: paramsOfferPotential.value.seniority_id,
            work_modality_id: paramsOfferPotential.value.work_modality_id,
            maximum_salary: paramsOfferPotential.value.maximum_salary,
        }

        $fetch.get(path, {params})
            .then(({data}) => {
                resultOfferPotential.value = data.result
            })
            .catch((error) => {
                console.log(error)
            })
            .finally(() => {
                loadingOfferPotential.value = false
            })
    }

    const fetchCalculateSalary = async ($fetch: AxiosInstance, path: string = '/v4/web/offer/calculate-salary'): Promise<void> => {
        if (!isValidParamsCalculateSalary()) {
            resetResultCalculateSalary()
            loadingCalculateSalary.value = false
            return
        }

        loadingCalculateSalary.value = true

        const params = {
            skill_ids: paramsOfferPotential.value.skill_ids,
            years_experience: paramsOfferPotential.value.years_experience,
            english_level_id: paramsOfferPotential.value.english_level_id,
            minimum_salary: paramsOfferPotential.value.minimum_salary,
            maximum_salary: paramsOfferPotential.value.maximum_salary,
            work_modality_id: paramsOfferPotential.value.work_modality_id,
            developer_type_id: paramsOfferPotential.value.developer_type_id
        }

        $fetch.post(path, params)
            .then(({data}) => {
                resultCalculateSalary.value = data.result
            })
            .catch((error) => {
                console.log(error)
            })
            .finally(() => {
                loadingCalculateSalary.value = false
            })
    }

    return {
        loadingOfferPotential,
        loadingCalculateSalary,
        resultOfferPotential,
        resultCalculateSalary,
        resultOfferSuggestion,
        paramsOfferPotential,
        setSuggestions,
        resetResultOfferPotential,
        resetResultCalculateSalary,
        fetchOfferPotential,
        fetchCalculateSalary
    }
}
