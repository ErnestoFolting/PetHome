import $api from '../HTTP/index'
export default class RequestService {
    static async sendRequest(advertId) {
        const response = await $api.post('/api/requests', advertId,{headers: {
            'Content-Type': 'application/json'
          }})
        return response.errors
    }
    static async confirmRequest(requestId) {
        const response = await $api.put('/api/requests/confirm/' + requestId)
        return response.errors
    } 
    static async rejectRequest(requestId) {
        const response = await $api.put('/api/requests/reject/' + requestId)
        return response.errors
    } 
}
