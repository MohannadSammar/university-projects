import { useRouter } from 'next/router';
import React, { createContext, useEffect, useMemo, useRef, useState } from 'react';
import { 
    LoginCredentials, 
    SignUpCredentials, 
    logout as logoutAction,
    signup as signupAction, 
    login as loginAction, 
    getUser} from '../actions/authActions';
import { Loader } from '../components/common/Loader/Loader';
import { NotPermitted } from '../components/common/NotPermitted/NotPermitted';
import { User } from '../types/User';

export type AuthState = {
    user?: User | null,
    isLoggedIn: boolean,
    isLoading: boolean,
    isLoginError: boolean,
    loginError: Error | any | null,
    isSignUpError: boolean,
    signUpError: Error | any | null,
    isLogoutError: boolean,
    logoutError: Error | any | null,
    login: (c: LoginCredentials) => Promise<void>,
    signup: (c: SignUpCredentials) => Promise<void>,
    logout: () => Promise<void>,
    refetchUser: () => Promise<void>,
}

export const defaultState: AuthState = {
    user: null,
    isLoggedIn: false,
    isLoading: false,
    isLoginError: false,
    loginError: null,
    isSignUpError: false,
    signUpError: null,
    isLogoutError: false,
    logoutError: null,
    login: () => new Promise((r) => r()),
    signup: () => new Promise((r) => r()),
    logout: () => new Promise((r) => r()),
    refetchUser: () => new Promise((r) => r()),
}

export const AuthContext = createContext<AuthState>(defaultState);


const AuthProvider: React.FC = ({ children }) => {

    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<Error | any | null>(null);
    const [loginError, setLoginError] = useState<Error | any | null>(null);
    const [signUpError, setSignUpError] = useState<Error | any | null>(null);
    const [logoutError, setLogoutError] = useState<Error | any | null>(null);
    const router = useRouter();
    const isInitialLoad = useRef<boolean>(true);

    const login = async (credentials: LoginCredentials) => {
        setLoginError(null);
        setIsLoading(true);
        try{
            const user = await loginAction(credentials);
            setUser(user);
        }catch(err: any) {
            setLoginError(err);
        }
        setIsLoading(false);
    }

    const signup = async (credentials: SignUpCredentials) => {
        setSignUpError(null);
        setIsLoading(true);
        try{
            const user = await signupAction(credentials);
            setUser(user);
        }catch(err: any) {
            setSignUpError(err);
        }
        setIsLoading(false);
    }

    const logout = async () => {
        setLogoutError(null);
        setIsLoading(true);
        try{
            await logoutAction();
            setUser(null);
        }catch(err: any) {
            setLogoutError(err);
        }
        setIsLoading(false);
    }

    const refetchUser = async () => {
        setError(null);
        setIsLoading(true);
        try{
            const user = await getUser();
            setUser(user);
        }catch(err: any) {
            setUser(null);
        }
        isInitialLoad.current = false;
        setIsLoading(false);
    }

    useEffect( () => {
        refetchUser();
    }, [])

    const state = useMemo(() => ({
        user,
        isLoggedIn: !!user,
        loginError,
        isLoginError: !!loginError,
        signUpError,
        isSignUpError: !!signUpError,
        logoutError,
        isLogoutError: !!logoutError,
        isLoading,
        login,
        signup,
        logout,
        refetchUser
    }), [
        user,
        isLoading,
        error,
        loginError
    ]);

    const notPermitted = !state.isLoggedIn && !(router.pathname == "/login" || router.pathname == "/signup" || router.pathname == "/") && !isInitialLoad.current;
    
    const Content = notPermitted 
      ? <NotPermitted/>
      : children
    
    const InitialLoader = isInitialLoad.current 
      ? <Loader/>
      : null
    

    return (
        <AuthContext.Provider value={ state }>
            {Content}
            {InitialLoader}
        </AuthContext.Provider>
    )
}

export default AuthProvider;