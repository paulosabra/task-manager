import {NextPage} from "next";
import {Task} from "../types/Task";

type ItemProps = {
    task: Task
}

const Item: NextPage<ItemProps> = ({task}) => {

    const getFormatDate = (finishDate: any | undefined, finishPrevisionDate: any) => {
        if (finishDate) {
            const date = new Date(finishDate)
            return `Concluido em: ${date.getDay() + '/' + date.getMonth() + '/' + date.getFullYear()}`;
        }
        const date = new Date(finishPrevisionDate)
        return `Previsao de conclusão em: ${date.getDay() + '/' + date.getMonth() + '/' + date.getFullYear()}`;
    }

    return (
        <div className={"component-item" + (task.finishDate ? '' : ' active')}>
            <img src={task.finishDate ? '/checked.svg' : '/not-checked.svg'}
                 alt={task.finishDate ? 'Tarefa concluida' : 'Tarefa em aberto'}/>
            <div>
                <p className={task.finishDate ? 'concluded' : ''}>{task.name}</p>
                <span>{getFormatDate(task.finishDate, task.finishPrevisionDate)}</span>
            </div>
        </div>
    );
}

export {Item}