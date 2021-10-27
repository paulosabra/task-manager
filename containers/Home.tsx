import {NextPage} from "next";
import {Header} from "../components/Header";
import {AccessTokenProps} from "../types/AccessTokenProps";
import {Filter} from "../components/Filter";
import {Footer} from "../components/Footer";

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
            <Filter/>
            <Footer/>
        </>
    );
}

export {Home}