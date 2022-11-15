import $api from '../HTTP/index'
export default class AdvertService {
    static async login(username,password) {
        const response = await $api.post('/api/auth/login', { username,password})
        return response.data
    }
    static async registration(username,password) {
        const response = await $api.post('api/auth/registration', { username,password})
        return response.data
    }
    static async logout() {
        const response = await $api.post('/api/auth/logout')
        return response.data
    }
}
