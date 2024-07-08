export const useOfferPotential = () => {
    const {$axios} = useNuxtApp()

    const loadingOfferPotential = useState<any>('loadingOfferPotential', () => false)

    const paramsOfferPotential = useState<any>('paramsOfferPotential', () => ({
        stack_ids: [],
        seniority_id: null,
        english_id: null,
        work_modality_id: null,
        maximum_salary: null,
        developer_type_id: null,
    }))

    const resultOfferPotential = useState<any>('resultOfferPotential', () => ({
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
    }))


    const resetResult = () => {
        resultOfferPotential.value = {
            popularity: {
                label: '',
                value: null,
            },
            affinity: {
                label: '',
                value: null,
            },
            potential: {
                label: '',
                value: null,
            },
            candidates: null
        }
    }

    const fetchOfferPotential = async () => {
        if (paramsOfferPotential.value.stack_ids.length === 0) {
            resetResult()
            return
        }

        loadingOfferPotential.value = true

        $axios.get('/v4/web/evaluator', { params: paramsOfferPotential.value })
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

    return {loadingOfferPotential, paramsOfferPotential, resultOfferPotential, fetchOfferPotential}
}
