import {useState, useEffect, useContext, createContext} from 'react';
import { supabase } from '../supabase';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        supabase.auth.getSession().then(({data : {session} }) => {
            setUser(session?.user || null);
            setLoading(false);
        });

        const { data: listener } = supabase.auth.onAuthStateChange((event, session) => {
            setUser(session?.user || null);
            setLoading(false);
        });

        return () => listener.subscription.unsubscribe()
    }, []);


    const signOut = () => supabase.auth.signOut();

    return (    
        <AuthContext.Provider value={{ user, loading, signOut }}>
            {children}
        </AuthContext.Provider>
    )

}



export const useAuth = () => useContext(AuthContext)