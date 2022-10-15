import { useState } from "react";
import { months } from "./App";

export function Task(props) {

    let [search, setSearch] = useState('');
    let [filter, setFilter] = useState(-1);

    let list_months = [];
    let box_month = null;
    let ind = -1;
    let ind2 = -1;

    props.tasks.map(e => {
        if (e.month == ind && e.year == ind2) box_month.tasks.push(e);
        else {
            if (box_month != null) list_months.push(box_month);
            box_month = { title: months[e.month] + ' de ' + e.year, tasks: [e] }
            ind = e.month;
            ind2 = e.year;
        }
    }); if (box_month != null) list_months.push(box_month);

    function add() {
        props.setModal({
            title: 'Nova Tarefa',
            sucess: (base) => {
                props.tasks.push(base);
                props.animation(true);
            }
        });
    }

    function edit(t) {
        let month = t.month + 1;
        if (month < 10) month = "0" + month

        let day = t.day;
        if (day < 10) day = "0" + day

        let hour = t.hour;
        if (hour < 10) hour = '0' + hour;

        props.setModal({
            title: 'Editar Tarefa',
            name: t.name,
            description: t.description,
            date: t.year + '-' + month + '-' + day,
            time: hour + ':00',
            sucess: (base) => {
                props.tasks.map(e => {
                    if (e.id == t.id) {
                        e.name = base.name;
                        e.description = base.description;
                        e.day = base.day;
                        e.month = base.month;
                        e.year = base.year;
                        e.hour = base.hour;
                    }
                })
                props.animation(true);
            }
        });
    }

    function remove(data) {
        props.setModal({
            title: 'Deletar Tarefa',
            name: data.name,
            description: data.description,
            type: 'remove',
            sucess: () => {
                props.setTasks(props.tasks.filter(e => (e.id != data.id)));
                props.animation(true);
            }
        });
    }

    function change() {
        setSearch(document.querySelector('.task-search input').value);
        setFilter(document.getElementById('select-filter').value);
    }

    return (
        <div className="box-tasks">

            <div className="task-search">
                <select onChange={change} id="select-filter">
                    <option value='-1'>Todas as tarefas</option>
                   {
                    list_months.map((e, i) => {
                        return(<option value={i}>{e.title}</option>)
                    })
                   }
                </select>
                <button className="b-hide" onClick={e => add()}>Adicionar</button>
                <input onChange={change} placeholder="Digite o nome ou descrição da tarefa..." type='search' />
                <button onClick={e => add()}>Adicionar</button>
            </div>

            {
                list_months.map((e, i) => {
                    let is = false;
                    e.tasks.map(t => {
                        if (t.name.toLowerCase().includes(search.toLowerCase()) || t.description.toLowerCase().includes(search.toLowerCase()))
                            is = true;
                    });
                    if (is && (i == filter || filter == -1)) return (<div className='task-month'>
                        <span className="task-month-title">{e.title}</span>
                        {e.tasks.map(t => {

                            if (t.name.toLowerCase().includes(search.toLowerCase()) || t.description.toLowerCase().includes(search.toLowerCase()))
                                return (<div className="task">
                                    <div className='task-left'>
                                        <div className="task-date">
                                            <span className="task-day">{t.day}</span>
                                            <span className="task-hour">{((t.hour < 10) ? '0' : '') + t.hour}:00</span>
                                        </div>
                                        <div className="task-content">
                                            <span className="task-name">{t.name}</span>
                                            <span className="task-description">{t.description}</span>
                                        </div>
                                    </div>

                                    <div className="task-actions">
                                        <span onClick={e => { edit(t) }} className="edit"><i class="bi bi-pencil-fill"></i></span>
                                        <span onClick={e => { remove(t) }} className='remove'><i class="bi bi-trash3-fill"></i></span>
                                    </div>
                                </div>)

                        })}
                    
                    
                    }
                    </div>);
                })
            }
        </div>
    )
}