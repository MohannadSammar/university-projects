import axios from "axios";
import config from "../config";
import {User} from "../types/User"
export interface LoginCredentials {
    email: string,
    password: string
}

export interface SignUpCredentials {
    email: string,
    name: string
    password: string
    passwordConfirm: string
}

export const login = (credentials: LoginCredentials): Promise<User> => {
    return axios.post(config.api.base_url + '/login', credentials, {
        withCredentials: true
    })
        .then(res => res.data.user);
}

export const signup = (credentials: SignUpCredentials): Promise<User> => {
    return axios.post(config.api.base_url + '/signup', credentials, {
        withCredentials: true
    })
        .then(res => res.data.user);
}

export const logout = (): Promise<null> => {
    return axios
    .post(config.api.base_url + '/logout', null, {
      withCredentials: true
    })
    .then(() => null);
}

export const getUser = (): Promise<User> => {
    return axios.get(config.api.base_url + '/me', {
        withCredentials: true
      }).then(res => res.data.data);
}