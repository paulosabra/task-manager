import {useState} from "react";
import {executeRequest} from "../services/api";
import {NextPage} from "next";

export type LoginProps = {
    setToken(e: string): void
    setRegister(e: string): void
}

export const Login: NextPage<LoginProps> = ({setToken, setRegister}) => {

    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setLoading] = useState(false);

    const goHome = async () => {
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

    const goRegister = () => {
        setRegister('Registrar');
    }

    return (
        <div className="container-login">
            <img src={"/logo.svg"} alt="Logo Fiap" className="logo"/>
            <form>
                <p className="error">{error}</p>
                <div className="input">
                    <img src={"/mail.svg"} alt="Informe seu email"/>
                    <input type="email" placeholder="Email" value={login}
                           onChange={event => setLogin(event.target.value)}/>
                </div>
                <div className="input">
                    <img src={"/password.svg"} alt="Informe sua senha"/>
                    <input type="password" placeholder="Senha" value={password}
                           onChange={event => setPassword(event.target.value)}/>
                </div>
                <button type="button" onClick={goHome} disabled={isLoading} className={isLoading ? 'loading' : ''}>
                    {isLoading ? '...Carregando' : 'Login'}
                </button>
                <button type="button" onClick={goRegister} className="secondary-button">Registrar</button>
            </form>
        </div>
    )
}