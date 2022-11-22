import $api from '../HTTP/index'

export default class UserDataService {
    static async getUserRequests(id) {
        const response = await $api.get('/api/userdata/myrequests')
        return response.data
    }
}
