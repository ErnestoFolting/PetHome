import $api from '../HTTP/index'
export default class AdvertService {
    static async login(creds) {
        const response = await $api.post('/api/auth/login', creds)
        return response
    }
    static async registration(registrationData) {
        const response = await $api.post('/api/auth/register', registrationData, {
            headers: { "Content-Type": "multipart/form-data" }
        })
        return response.data
    }
    static async logout() {
        const response = await $api.post('/api/auth/logout')
        return response.data
    }
}
