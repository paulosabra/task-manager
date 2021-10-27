import {NextPage} from "next";
import {Header} from "../components/Header";
import {AccessTokenProps} from "../types/AccessTokenProps";

const Home: NextPage<AccessTokenProps> = ({setToken}) => {

    const logout = () => {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('userName');
        localStorage.removeItem('userMail');
        setToken('');
    }

    return (
        <>
            <Header logout={logout}/>
        </>
    );
}

export {Home}