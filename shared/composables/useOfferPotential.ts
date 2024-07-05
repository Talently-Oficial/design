export const useOfferPotential = () => {
    const loadingOfferPotential = useState<any>('loadingOfferPotential', () => false)

    const paramsOfferPotential = useState<any>('paramsOfferPotential', () => ({
        stack_ids: [
            1,
            2,
            3,
            4
        ],
        seniority_id: 3,
        english_id: 3,
        work_modality_id: 1,
        maximum_salary: 1000,
        developer_type_id: 3,
    }))

    const resultOfferPotential = useState<any>('resultOfferPotential', () => ({
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
    }))

    const fetchOfferPotential = async () => {
        const {$axios} = useNuxtApp()

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
