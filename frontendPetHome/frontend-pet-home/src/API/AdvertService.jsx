import $api from '../HTTP/index'

export default class AdvertService {
    static async getAllAdverts() {
        const response = await $api.get('/api/adverts')
        return response.data
    }
    static async getCertainAdvert(id) {
        const response = await $api.get('/api/adverts/' + id)
        return response.data
    }
}
