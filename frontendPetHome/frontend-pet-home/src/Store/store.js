import {makeAutoObservable} from "mobx";
import AuthService from "../API/AuthService";
import axios from 'axios';

export default class Store{
    isAuth = false;
    isLoading = true;
    constructor(){
        makeAutoObservable(this)
        this.login = this.login.bind(this)
        this.registration = this.registration.bind(this)
        this.logout = this.logout.bind(this)
        this.checkAuth = this.checkAuth.bind(this)
    }
    setLoading(boolean){
        this.isLoading = boolean;
    }
    setAuth(boolean){
        this.isAuth = boolean;
    }
    setUser(user){
        this.user=user
    }
    async login(username,password){
        try{
            await AuthService.login(username,password)
            this.setAuth(true);
        }catch(e){
            throw e
        }
    }
    async registration(registrationData){
        try{
            await AuthService.registration(registrationData)
        }catch(e){
            throw e
        }
    }
    async logout(){
        try{
            await AuthService.logout()
            this.setAuth(false);
        }catch(e){
            console.log(e.response?.data)
        }
    }
    async checkAuth(){
        try{
            await axios("https://localhost:7124/api/auth/refresh-token", {
                method: "post",
                withCredentials: true
              }) 
            this.setAuth(true);
        }catch(e){
            console.log(e.response?.data)
        }
    }
}
