import type {NextPage} from 'next'
import {Home} from '../containers/Home';
import {Login} from '../containers/Login';
import {useEffect, useState} from "react";

const Index: NextPage = () => {
    const [accessToken, setToken] = useState('');
    useEffect(() => {
        if (typeof window !== 'undefined') {
            const token = localStorage.getItem('accessToken');
            if (token) {
                setToken(token);
            }
        }
    }, []);
    return (accessToken ? <Home/> : <Login setToken={setToken}/>)
}

export default Index