import { getYearsExperienceFromSeniority } from '~/utils/offer'

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
    const resultCalculateSalary = useState<any>('resultCalculateSalary', () => ({...templateResultCalculateSalary}))

    const paramsOfferPotential = useState<any>('paramsOfferPotential', () => ({
        stack_ids: [],
        seniority_id: null,
        english_id: null,
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

    const getDeveloperType = (skillsId: number[]) => {
        // ID skill developer type
        const front = [1, 7, 18, 260, 262, 455]
        const backend = [2, 3, 4, 5, 6, 10, 11, 13, 29, 31, 36, 37, 51, 266, 325, 570, 741]
        const mobile = [14, 85, 86, 89, 138, 707, 708]
        const devops = [66, 67, 68, 69, 219, 269]
        const data = [12, 60, 109, 146, 163, 230, 231, 232, 265, 299, 312, 431, 447, 478, 500, 528, 583, 742, 883]
        const qa = [235]

        // ID developer types
        const FRONTEND = 1
        const BACKEND = 2
        const FULLSTACK = 3
        const MOBILE = 4
        const DEVOPS = 5
        const DATA = 7
        const QA = 33

        let profile = FULLSTACK

        if (skillsId.some(id => front.includes(id)) && skillsId.some(id => backend.includes(id))) {
            profile = FULLSTACK
        } else if (skillsId.some(id => front.includes(id))) {
            profile = FRONTEND
        } else if (skillsId.some(id => backend.includes(id))) {
            profile = BACKEND
        } else if (skillsId.some(id => mobile.includes(id))) {
            profile = MOBILE
        } else if (skillsId.some(id => devops.includes(id))) {
            profile = DEVOPS
        } else if (skillsId.some(id => data.includes(id))) {
            profile = DATA
        } else if (skillsId.some(id => qa.includes(id))) {
            profile = QA
        }

        return profile
    }

    const isValidParams = () => {
        return (
            paramsOfferPotential.value.stack_ids.filter((val) => val !== null).length > 0 &&
            paramsOfferPotential.value.seniority_id &&
            paramsOfferPotential.value.english_id &&
            paramsOfferPotential.value.work_modality_id &&
            paramsOfferPotential.value.maximum_salary
        )
    }

    const fetchOfferPotential = async ($fetch, path= '/v4/web/offer/evaluator') => {
        if (!isValidParams()) {
            resetResultOfferPotential()
            loadingOfferPotential.value = false
            return
        }

        loadingOfferPotential.value = true

        const params = {
            stack_ids: paramsOfferPotential.value.stack_ids,
            english_id: paramsOfferPotential.value.english_id,
            seniority_id: paramsOfferPotential.value.seniority_id,
            work_modality_id: paramsOfferPotential.value.work_modality_id,
            maximum_salary: paramsOfferPotential.value.maximum_salary,
        }

        $fetch.get('/v4/web/offer/evaluator', {params})
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

    const fetchCalculateSalary = async ($fetch, path= '/v4/web/offer/calculate-salary') => {
        if (!isValidParams()) {
            resetResultCalculateSalary()
            loadingOfferPotential.value = false
            return
        }

        loadingCalculateSalary.value = true

        const params = {
            skills_id: paramsOfferPotential.value.stack_ids,
            years_experience: getYearsExperienceFromSeniority(paramsOfferPotential.value.seniority_id),
            english_level: paramsOfferPotential.value.english_id,
            work_modality_id: paramsOfferPotential.value.work_modality_id,
            minimum_salary: paramsOfferPotential.value.minimum_salary,
            maximum_salary: paramsOfferPotential.value.maximum_salary,
            developer_type_id: paramsOfferPotential.value.developer_type_id
        }

        if (params.work_modality_id !== ID_WORK_MODALITY_REMOTE_GLOBAL) {
            params.work_modality_id = ID_WORK_MODALITY_REMOTE_GLOBAL
        }

        if (params.developer_type_id === null) {
            params.developer_type_id = getDeveloperType(params.skills_id)
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
        paramsOfferPotential,
        resetResultOfferPotential,
        resetResultCalculateSalary,
        fetchOfferPotential,
        fetchCalculateSalary
    }
}
