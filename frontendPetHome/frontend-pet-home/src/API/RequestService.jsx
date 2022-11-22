import $api from '../HTTP/index'
export default class RequestService {
    static async sendRequest(advertId) {
        const response = await $api.post('/api/requests', advertId,{headers: {
            'Content-Type': 'application/vnd.myapp.type+json'
          }})
        return response.errors
    }
}
