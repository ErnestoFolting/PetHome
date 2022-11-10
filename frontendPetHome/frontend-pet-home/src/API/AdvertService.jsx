import axios from "axios";
export default class AdvertService {
    static async getAllAdverts() {
        const response = await axios.get('https://localhost:7124/api/adverts')
        return response.data
    }
    static async getCertainAdvert(id) {
        const response = await axios.get('https://localhost:7124/api/adverts/' + id)
        return response.data
    }
}
