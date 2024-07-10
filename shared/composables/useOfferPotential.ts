const salaryEquivalenceSeniority = {
    1: 2,
    2: 4,
    3: 6,
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
    const {$axios} = useNuxtApp()

    const loadingOfferPotential = useState<boolean>('loadingOfferPotential', () => false)
    const resultOfferPotential = useState<any>('resultOfferPotential', () => ({...templateResultOfferPotential}))

    const loadingCalculateSalary = useState<boolean>('loadingCalculateSalary', () => false)
    const resultCalculateSalary = useState<any>('resultCalculateSalary', () => ({...templateResultCalculateSalary}))

    const paramsOfferPotential = useState<any>('paramsOfferPotential', () => ({
        stack_ids: [],
        seniority_id: 3,
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

    const fetchOfferPotential = async () => {
        if (paramsOfferPotential.value.stack_ids.length === 0) {
            resetResultOfferPotential()
            return
        }

        loadingOfferPotential.value = true

        const params = {
            stack_ids: paramsOfferPotential.value.stack_ids,
            english_id: paramsOfferPotential.value.english_id,
            seniority_id: paramsOfferPotential.value.seniority_id,
            work_modality_id: paramsOfferPotential.value.work_modality_id,
            maximum_salary: paramsOfferPotential.value.maximum_salary,
            developer_type_id: paramsOfferPotential.value.developer_type_id
        }

        $axios.get('/v4/web/offer/evaluator', {params})
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

    const fetchCalculateSalary = async () => {
        if (paramsOfferPotential.value.stack_ids.length === 0) {
            resetResultCalculateSalary()
            return
        }

        loadingCalculateSalary.value = true

        const params = {
            skills_id: paramsOfferPotential.value.stack_ids,
            years_experience: salaryEquivalenceSeniority[paramsOfferPotential.value.seniority_id],
            english_level: paramsOfferPotential.value.english_id,
            work_modality_id: paramsOfferPotential.value.work_modality_id,
            minimum_salary: paramsOfferPotential.value.minimum_salary,
            maximum_salary: paramsOfferPotential.value.maximum_salary,
            developer_type_id: paramsOfferPotential.value.developer_type_id
        }

        if(params.developer_type_id === null) {
            params.developer_type_id = 3
        }

        $axios.post('/v4/web/offer/calculate-salary', params)
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
        fetchOfferPotential,
        fetchCalculateSalary
    }
}
