import {list_tasks, months, tasks_change } from "./App";
import { useState } from "react";
import { Modal } from "./Modal";

export function Task(props) {

    let [isModal, setIsmodal] = useState(false);
    let [title, setTitle] = useState('');
    let [modalData, setModalData] = useState(null);
    let [modalType, setModalType] = useState(null);

    let list_months = [];
    let box_month = null;
    let ind = -1;
    let ind2 = -1;

    list_tasks.map(e => {
        if(e.month == ind && e.year == ind2) box_month.tasks.push(e);
        else{  
            if(box_month != null)list_months.push(box_month);
            box_month = {title: months[e.month] + ' de ' + e.year, tasks: [e] }
            ind = e.month;
            ind2 = e.year;
        }
    }); if(box_month != null)list_months.push(box_month);

    function add(){
        setIsmodal(true);
        setModalType('add');
        setTitle('Nova Tarefa');
        setModalData(null);
    }

    function edit(data){
        setIsmodal(true);
        setModalType('edit');
        setTitle('Editar Tarefa')
        setModalData(data);
    }

    function remove(data){
        setIsmodal(true);
        setModalType('remove');
        setTitle('Excluir Tarefa?');
        setModalData(data);
    }

    function sucess(data){
        list_tasks.push(data);
        tasks_change();
    }

    return (
        <div className="box-tasks">

            <div className="task-search">
                <select>
                    <option>janeiro de 2022</option>
                    <option>janeiro de 2022</option>
                    <option>janeiro de 2022</option>
                    <option>janeiro de 2022</option>
                    <option>janeiro de 2022</option>
                    <option>janeiro de 2022</option>
                    <option>janeiro de 2022</option>
                    <option>janeiro de 2022</option>
                    <option>janeiro de 2022</option>
                </select>
                <input placeholder="Digite o nome ou descrição da tarefa..." type='search' />
                <button onClick={e => add()}>Adicionar</button>
            </div>

        {
            list_months.map(e => {
                return( <div className="task-month">
                <span className="task-month-title">{e.title}</span>
                    {e.tasks.map(t => {
                        return(<div className="task">
                        <div className='task-left'>
                            <div className="task-date">
                                <span className="task-day">{t.day}</span>
                                <span className="task-hour">{ ((t.hour < 10) ? '0' : '') + t.hour }:00</span>
                            </div>
                            <div className="task-content">
                                <span className="task-name">{t.name}</span>
                                <span className="task-description">{t.description}</span>
                            </div>
                        </div>
    
                        <div className="task-actions">
                            <span onClick={e => {edit(t)}} className="edit"><i class="bi bi-pencil-fill"></i></span>
                            <span  onClick={e => {remove(t)}} className='remove'><i class="bi bi-trash3-fill"></i></span>
                        </div>
                    </div>);
                    })}
            </div>);
            })
        }     

            {(isModal) ? <Modal animation={props.animation} type={modalType} data={modalData} sucess={sucess} title={title} open={setIsmodal}/> : ''}
            {(document.documentElement.style.overflow = (isModal) ?  'hidden' : 'overlay') ? '' : ''}
        </div>
    )
}