import {NextPage} from "next";

const Footer: NextPage = ({}) => {

    return (
        <div className="component-footer">
            <button><img src={"/add.svg"} alt="Adicionar Tarefa"/> Adicionar Tarefa</button>
            <span>© Copyright {new Date().getFullYear()}. Todos os direitos reservados.</span>
        </div>
    );
}

export {Footer}