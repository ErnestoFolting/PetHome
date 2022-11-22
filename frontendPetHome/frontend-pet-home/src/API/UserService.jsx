import $api from '../HTTP/index'

export default class UserService {
    static async getCertainUser(id) {
        const response = await $api.get('/api/users/' + id)
        return response.data
    }
    static async getUserProfile() {
        const response = await $api.get('/api/userdata/myprofile' )
        return response.data
    }
}
