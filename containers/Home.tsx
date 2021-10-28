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
    const [finishPrevisionDateStart, setFinishPrevisionDateStart] = useState('');
    const [finishPrevisionDateEnd, setFinishPrevisionDateEnd] = useState('');
    const [status, setStatus] = useState('0');

    const getFilteredList = async () => {
        try {
            let query = `?status=${status}`;
            if (finishPrevisionDateStart) {
                query += `&finishPrevisionDateStart=${finishPrevisionDateStart}`;
            }
            if (finishPrevisionDateEnd) {
                query += `&finishPrevisionDateEnd=${finishPrevisionDateEnd}`;
            }
            const result = await executeRequest('task' + query, 'GET');
            if (result && result.data) {
                setTasks(result.data);
            }
        } catch (e: any) {
            console.log(e);
        }
    }

    useEffect(() => {
        getFilteredList();
    }, [finishPrevisionDateStart, finishPrevisionDateEnd, status]);

    return (
        <>
            <Header logout={logout}/>
            <Filter
                finishPrevisionDateStart={finishPrevisionDateStart}
                finishPrevisionDateEnd={finishPrevisionDateEnd}
                status={status}
                setFinishPrevisionDateStart={setFinishPrevisionDateStart}
                setFinishPrevisionDateEnd={setFinishPrevisionDateEnd}
                setStatus={setStatus}
            />
            <List tasks={task}/>
            <Footer/>
        </>
    );
}

export {Home}