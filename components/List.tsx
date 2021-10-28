import {NextPage} from "next";
import {Task} from "../types/Task";
import {Item} from "./Item";
import {useState} from "react";
import {executeRequest} from "../services/api";
import moment from "moment";
import {Modal} from "react-bootstrap";

type ListProps = { tasks: Task[], getFilteredList(): void }

const List: NextPage<ListProps> = ({tasks, getFilteredList}) => {

    const [showModal, setShowModal] = useState(false);
    const [isLoading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [_id, setId] = useState<string | undefined>('');
    const [name, setName] = useState('');
    const [finishPrevisionDate, setFinishPrevisionDate] = useState('');
    const [finishDate, setFinishDate] = useState('');

    const closeModal = () => {
        setName('');
        setFinishPrevisionDate('');
        setLoading(false);
        setErrorMessage('');
        setShowModal(false);
    }

    const updateTask = async () => {
        try {
            setLoading(true);
            setErrorMessage('');
            if (!_id) {
                setErrorMessage('Favor selecionar a tarefa');
                setLoading(false);
                return;
            }
            if (!name && !finishPrevisionDate) {
                setErrorMessage('Favor informar os dados para cadastro da tarefa');
                setLoading(false);
                return;
            }
            const body: any = {name, finishPrevisionDate}
            if (finishDate) {
                body.finishDate = finishDate;
            }
            const result = await executeRequest('task?id=' + _id, 'PUT', body);
            if (result && result.data) {
                await getFilteredList();
                closeModal();
            }
        } catch (e: any) {
            console.log(e);
            if (e?.response?.data?.error) {
                setErrorMessage(e?.response?.data?.error);
            } else {
                setErrorMessage('Não foi possivel cadastrar tarefa, tente novamente');
            }
        }
        setLoading(false);
    }

    const deleteTask = async () => {
        try {
            setLoading(true);
            setErrorMessage('');
            if (!_id) {
                setErrorMessage('Favor selecionar a tarefa');
                setLoading(false);
                return;
            }
            await executeRequest('task?id=' + _id, 'DELETE');
            await getFilteredList();
            closeModal();
        } catch (e: any) {
            console.log(e);
            if (e?.response?.data?.error) {
                setErrorMessage(e?.response?.data?.error);
            } else {
                setErrorMessage('Não foi possivel deletar tarefa, tente novamente');
            }
        }
        setLoading(false);
    }

    const setTaskAndShow = (task: Task) => {
        setId(task._id);
        setName(task.name);
        setFinishPrevisionDate(moment(task.finishPrevisionDate).format('yyyy-MM-DD'));
        setFinishDate(task.finishDate ? moment(task.finishDate).format('yyyy-MM-DD') : '');
        setShowModal(true);
    }

    return (
        <>
            <div className={'component-list' + (tasks && tasks.length > 0 ? '' : ' empty-state')}>
                {tasks && tasks.length > 0
                    ?
                    tasks.map(task => <Item task={task} key={task._id} setTaskAndShow={setTaskAndShow}/>)
                    :
                    <>
                        <img src={"/empty.svg"} alt="Nenhuma tarefa encontrada"/>
                        <span>Você ainda não possui tarefas cadastradas!</span>
                    </>

                }
            </div>
            <Modal show={showModal}
                   onHide={() => closeModal()}
                   className="component-modal">
                <Modal.Body>
                    <p>Alterar a tarefa</p>
                    {errorMessage && <p className="error">{errorMessage}</p>}
                    <input type="text" placeholder="Nome da tarefa" value={name}
                           onChange={e => setName(e.target.value)}/>
                    <input type="text" placeholder="Data de previsão de conclusão" value={finishPrevisionDate}
                           onChange={e => setFinishPrevisionDate(e.target.value)} onFocus={e => e.target.type = "date"}
                           onBlur={e => finishPrevisionDate ? e.target.type = "date" : e.target.type = "text"}/>
                    <input type="text" placeholder="Data  de conclusão" value={finishDate}
                           onChange={e => setFinishDate(e.target.value)} onFocus={e => e.target.type = "date"}
                           onBlur={e => finishDate ? e.target.type = "date" : e.target.type = "text"}/>
                </Modal.Body>
                <Modal.Footer>
                    <div className="button col-12">
                        <button onClick={updateTask}
                                disabled={isLoading}>{isLoading ? "...Enviando dados" : "Atualizar"}</button>
                        <span onClick={deleteTask}>Excluir</span>
                    </div>
                </Modal.Footer>
            </Modal>
        </>

    );
}

export {List}