import {NextPage} from "next";
import {useState} from "react";
import {executeRequest} from "../services/api";

export type RegisterProps = {
    setRegister(e: string): void
}

export const Register: NextPage<RegisterProps> = ({setRegister}) => {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setLoading] = useState(false);

    const register = async () => {
        try {
            setError('');
            setLoading(true);
            if (!name && !email && !password) {
                setError('Favor preencher corretamento o formulário');
            }
            const body = {name, email, password}
            const result = await executeRequest('user', 'POST', body);
            if (result && result.data) {
                setRegister('')
            } else {
                setError('Não foi possivel registrar novo usuário, tente novamente');
            }

        } catch (error: any) {
            console.log(error);
            if (error.response?.data?.error) {
                setError(error.response?.data?.error);
            } else {
                setError('Não foi possivel registrar novo usuario, tente novamente');
            }
        }
        setLoading(false);
    }

    const goLogin = () => {
        setRegister('');
    }

    return (
        <div className="container-register">
            <img src={"/logo.svg"} alt="Logo Fiap" className="logo"/>
            <form>
                <p className="error">{error}</p>
                <div className="input">
                    <img src={"/user.svg"} alt="Informe seu nome completo"/>
                    <input type="text" placeholder="Nome completo" value={name}
                           onChange={event => setName(event.target.value)}/>
                </div>
                <div className="input">
                    <img src={"/mail.svg"} alt="Informe seu email"/>
                    <input type="email" placeholder="Email" value={email}
                           onChange={event => setEmail(event.target.value)}/>
                </div>
                <div className="input">
                    <img src={"/password.svg"} alt="Informe sua senha"/>
                    <input type="password" placeholder="Senha" value={password}
                           onChange={event => setPassword(event.target.value)}/>
                </div>
                <button type="button" onClick={register} disabled={isLoading}
                        className={isLoading ? 'loading' : ''}>{isLoading ? '...Carregando' : 'Registrar'}</button>
                <button type="button" onClick={goLogin} className="secondary-button">Cancelar
                </button>
            </form>
        </div>
    )
}