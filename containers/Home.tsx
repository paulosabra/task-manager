import {NextPage} from "next";
import {Header} from "../components/Header";
import {AccessTokenProps} from "../types/AccessTokenProps";
import {Filter} from "../components/Filter";
import {Footer} from "../components/Footer";
import {List} from "../components/List";
import {Task} from "../types/Task";
import {useEffect, useState} from "react";
import {executeRequest} from "../services/api";

const Home: NextPage<AccessTokenProps> = ({setToken}) => {

    const logout = () => {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('userName');
        localStorage.removeItem('userMail');
        setToken('');
    }

    const [task, setTasks] = useState<Task[]>([]);

    const getFilteredList = async () => {
        try {
            const result = await executeRequest('task', 'GET');
            if (result && result.data) {
                setTasks(result.data);
            }
        } catch (e: any) {
            console.log(e);
        }
    }

    useEffect(() => {
        getFilteredList();
    }, [])

    return (
        <>
            <Header logout={logout}/>
            <Filter/>
            <List tasks={task}/>
            <Footer/>
        </>
    );
}

export {Home}