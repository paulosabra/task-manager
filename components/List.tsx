import {NextPage} from "next";
import {Task} from "../types/Task";
import {Item} from "./Item";

type ListProps = {
    tasks: Task[]
}

const List: NextPage<ListProps> = ({tasks}) => {

    return (
        <div className={'component-list' + (tasks && tasks.length > 0 ? '' : ' empty-state')}>
            {tasks && tasks.length > 0
                ?
                tasks.map(task => <Item task={task} key={task._id}/>)
                :
                <>
                    <img src={"/empty.svg"} alt="Nenhuma tarefa encontrada"/>
                    <span>Você ainda não possui tarefas cadastradas!</span>
                </>

            }
        </div>
    );
}

export {List}