import $api from '../HTTP/index'

export default class AdvertService {
    static async getAllAdverts(queryParams) {
        const response = await $api.get('/api/adverts', {
            params: {
                PageNumber: queryParams?.currentPage,
                PageSize: queryParams?.advertsLimit,
                isDatesFit: queryParams?.isDatesFit,
                priceFrom: queryParams?.costFrom,
                priceTo: queryParams?.costTo
            }
        })
        return response
    }
    static async getUserAdverts(queryParams) {
        const response = await $api.get('/api/userdata/myadverts', {
            params: {
                PageNumber: queryParams?.currentPage,
                PageSize: queryParams?.advertsLimit,
                advertsStatus: queryParams?.advertsStatus,
                priceFrom: queryParams?.costFrom,
                priceTo: queryParams?.costTo
            }
        })
        return response
    }
    static async getUserCertainAdvert(id) {
        const response = await $api.get('/api/userdata/myadverts/' + id)
        return response.data
    }
    static async getCertainAdvert(id) {
        const response = await $api.get('/api/adverts/' + id)
        return response.data
    }
    static async createAdvert(advertData) {
        const response = await $api.post('/api/adverts/', advertData, {
            headers: { "Content-Type": "multipart/form-data" }
        })
        return response.data
    }
    static async markAsFinished(id) {
        const response = await $api.put('/api/adverts/finish/' + id)
        return response.data
    }
    static async deleteAdvert(id) {
        const response = await $api.delete('/api/adverts/' + id)
        return response.data
    }
}
