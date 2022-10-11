import { useState } from "react";
import {list_tasks, tasks_change } from "./App";
import { Modal } from "./Modal";

export function Week(props) {

    let [isModal, setIsmodal] = useState(false);
    let [title, setTitle] = useState('');
    let [modalData, setModalData] = useState(null);

    let current = props.current;

    //gerar numero da semana
    var currentdate = new Date(current.getFullYear(), current.getMonth(), current.getDate() - 1);
    var oneJan = new Date(currentdate.getFullYear(), 0, 1);
    var numberOfDays = Math.floor((currentdate - oneJan) / (24 * 60 * 60 * 1000));
    let week_ind = Math.ceil((numberOfDays) / 7) - 1;
    let week_days = [];
    let coutHours = [];
    let coutTask = [];

    var start = null;
    for (var i = 1; i <= 7; ++i) {
        var date = new Date(2022, 0, i);
        if (date.getDay() == 0) {
            start = date;
            break;
        }
    };

    for (var j = 0; j < 52; ++j) {
        var ind_week = [];
        for (var k = 0; k < 7; ++k) {
            ind_week.push({
                day: start.getDate(),
                month: start.getMonth()
            })

            start.setDate(start.getDate() + 1);
        }
        week_days.push(ind_week);
    }

    for (var i = 0; i < 24; ++i) {
        coutHours.push(<span>{((i < 10) ? '0' : '') + i + ':00'}</span>);
        week_days[week_ind].map((val) => {
            let c = 0;

            list_tasks.map((e) => {
                if(e.year == current.getFullYear() && e.month == val.month && e.day == val.day && e.hour == i)c += 1;
            });

            coutTask.push(<span>
                {(c == 0) ? <span className="not">-</span>:
                 (c == 1) ? '01 tarefa' : 
                 (c < 10) ? ('0' + c + ' tarefas') : (c + ' tarefas')}
                <span onClick={e => {add(val, i)}} className="add">+</span>
            </span>);
        })
    }

    function day_click(val) {
        current.setDate(val.day);
        current.setMonth(val.month);
        props.setType('day');
        props.animation(true);
    }

    function add(val, i){
        setIsmodal(true);
        setTitle('Nova Tarefa');
        //val.hour = i;
        //setModalData(val);
    }

    function sucess(data){
        list_tasks.push(data);
        tasks_change();
    }

    document.addEventListener('scroll', (e) => {
        let list = document.querySelector('.week-list');
        if(list == null) return;
        else if (window.scrollY > 155) list.classList.add('fixe');
        else list.classList.remove('fixe');
    })

    return (

        <div className="box-week">
            <div className="week-list">{
                week_days[week_ind].map(((val) => {
                    return (<span onClick={e => day_click(val)}>{((val.day < 10) ? '0' : '') + val.day}</span>)
                }))
            }</div>

            <div className="week-container">
                <div className="week-hour">
                    {coutHours}
                </div>
                <div className="week-content">
                    {coutTask}
                </div>
            </div>

            {(isModal) ? <Modal animation={props.animation} data={modalData} sucess={sucess} title={title} open={setIsmodal}/> : ''}
            {(document.documentElement.style.overflow = (isModal) ?  'hidden' : 'overlay') ? '' : ''}

        </div>
    )
}