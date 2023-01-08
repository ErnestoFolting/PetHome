import { makeAutoObservable } from "mobx";
import AuthService from "../API/AuthService";
import axios from 'axios';
import { HubConnectionBuilder } from "@microsoft/signalr"
import { url } from "../HTTP";

export default class Store {
    isAuth = false;
    isLoading = true;
    userId = '';
    myHubConnection = null;
    constructor() {
        makeAutoObservable(this)
        this.login = this.login.bind(this)
        this.registration = this.registration.bind(this)
        this.logout = this.logout.bind(this)
        this.checkAuth = this.checkAuth.bind(this)
        this.createHubConnection = this.createHubConnection.bind(this)
    }
    setLoading(boolean) {
        this.isLoading = boolean;
    }
    setAuth(boolean) {
        this.isAuth = boolean;
    }
    setUserId(userId) {
        this.userId = userId
    }
    setMyHubConnection(hubConnection) {
        this.myHubConnection = hubConnection
    }
    async login(creds) {
        try {
            const response = await AuthService.login(creds)
            this.setAuth(true);
            this.setUserId(response?.data?.userId)
        } catch (e) {
            throw e
        }
    }
    async registration(registrationData) {
        try {
            await AuthService.registration(registrationData)
        } catch (e) {
            console.log(e)
            throw e
        }
    }
    async logout() {
        try {
            await AuthService.logout()
            this.setAuth(false);
            this.setUserId('')
            this.myHubConnection.stop()
            this.setMyHubConnection(null)
        } catch (e) {
            console.log(e)
        }
    }
    async checkAuth() {
        try {
            const response = await axios(url + "/api/auth/refresh-token", {
                method: "post",
                withCredentials: true
            })
            this.setAuth(true);
            this.setUserId(response?.data?.userId)
        } catch (e) {
            console.log(e.response?.data)
        }
    }
    async createHubConnection() {
        if (!this.myHubConnection) {
            const hubConnection = new HubConnectionBuilder().withUrl(url + "/performerSelectionHub").withAutomaticReconnect().build()
            try {
                await hubConnection?.start()
                console.log('HUB START')
                this.setMyHubConnection(hubConnection)
            } catch (e) {
                console.log("errorHub", e)
            }
        }
    }
}
