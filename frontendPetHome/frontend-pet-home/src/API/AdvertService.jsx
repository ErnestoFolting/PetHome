import $api from '../HTTP/index'

export default class AdvertService {
    static async getAllAdverts() {
        const response = await $api.get('/api/adverts')
        return response.data
    }
    static async getUserAdverts() {
        const response = await $api.get('/api/userdata/myadverts')
        return response.data
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
        const response = await $api.post('/api/adverts/', advertData)
        return response.data
    }
}
