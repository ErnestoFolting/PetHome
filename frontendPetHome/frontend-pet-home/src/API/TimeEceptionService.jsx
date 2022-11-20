import $api from '../HTTP/index'

export default class TimeExceptionService {
    static async addUserTimeExceptions(dates) {
        const response = await $api.post('/api/timeexceptions/',dates)
        return response.data
    }
}
