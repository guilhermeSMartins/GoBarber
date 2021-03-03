import React, { createContext, useCallback, useContext, useState } from 'react';
import api from '../services/api';

interface AuthState {
    token: string;
    user: object;
}

interface SignInCredentials {
    email: string,
    password: string
}
interface AuthContextData {
    user: object;
    signIn(email: string, password: string): Promise<void> | void;
    signOut(): void
}

const AuthContext = createContext<AuthContextData>({
    user: {},
    signIn(email: 'template@email.com', password: '12345') {},
    signOut() {}
});

const AuthProvider: React.FC = ({ children }) => {
    const [data, setData] = useState<AuthState>(() => {
        const token = localStorage.getItem('@GoBarber:token');
        const user = localStorage.getItem('@GoBarber:user');

        if(token && user) return { token, user: JSON.parse(user) }
        return { user: {}, token: '' }
    });

    const signIn = useCallback(async ({ email, password }) => {
        const response = await api.post('sessions', {
            email,
            password
        });
        
        const { token, user } = response.data;

        localStorage.setItem('@GoBarber:token', token);
        localStorage.setItem('@GoBarber:user', JSON.stringify(user));

        setData({ token, user });
    }, []);

    const signOut = useCallback(async () => {
        localStorage.removeItem('@GoBarber:token');
        localStorage.removeItem('@GoBarber:user');

        setData({ token: '', user: {} });
    }, []);

    return (
        <AuthContext.Provider value={ { user: data.user, signIn, signOut } }>
            { children }
        </AuthContext.Provider>
    );
}

function useAuth(): AuthContextData {
    const context = useContext(AuthContext);

    if(!context) 
        throw new Error('useAuth must be used within an AuthProvider');

    return context;
}

export { AuthProvider, useAuth }