import {useState} from "react";
import {executeRequest} from "../services/api";
import {NextPage} from "next";
import {AccessTokenProps} from "../types/AccessTokenProps";

export const Login: NextPage<AccessTokenProps> = ({setToken}) => {

    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setLoading] = useState(false);

    const doLogin = async () => {
        try {
            setError('');
            setLoading(true);
            if (!login && !password) {
                setError('Favor informar email e senha');
            }
            const body = {login, password}
            const result = await executeRequest('login', 'POST', body);
            if (result && result.data) {
                localStorage.setItem('accessToken', result.data.token);
                localStorage.setItem('name', result.data.name);
                localStorage.setItem('email', result.data.email);
                setToken(result.data.token);
            } else {
                setError('Não foi possivel processar o login, tente novamente');
            }
        } catch (error: any) {
            console.log(error);
            if (error.response?.data?.error) {
                setError(error.response?.data?.error);
            } else {
                setError('Não foi possivel processar o login, tente novamente');
            }
        }

        setLoading(false);
    }

    return (
        <div className="container-login">
            <img src={"/logo.svg"} alt="Logo Fiap" className="logo"/>
            <form>
                <p className="error">{error}</p>
                <div className="input">
                    <img src={"/mail.svg"} alt="Informe seu email"/>
                    <input type="text" placeholder="Informe seu email" value={login}
                           onChange={event => setLogin(event.target.value)}/>
                </div>
                <div className="input">
                    <img src={"/lock.svg"} alt="Informe sua senha"/>
                    <input type="password" placeholder="Informe sua senha" value={password}
                           onChange={event => setPassword(event.target.value)}/>
                </div>
                <button type="button" onClick={doLogin} disabled={isLoading} className={isLoading ? 'loading' : ''}>
                    {isLoading ? '...Carregando' : 'Login'}
                </button>
            </form>
        </div>
    )
}