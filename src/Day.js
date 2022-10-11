import { list_tasks, tasks_change } from "./App";
import { Modal } from "./Modal";
import { useState } from "react";

export function Day(props) {

    let [isModal, setIsmodal] = useState(false);
    let [title, setTitle] = useState('');
    let [modalData, setModalData] = useState(null);

    let current = props.current;

    let hours = [];
    while (hours.length < 24) hours.push([]);

    list_tasks.map((val) => {
        if (val.year == current.getFullYear() && val.month == current.getMonth() && val.day == current.getDate()) {
            hours[val.hour].push(val);
            return val;
        }
    })

    function add() {
        setIsmodal(true);
        setTitle('Nova Tarefa');
        setModalData(null);
    }

    function sucess(data) {
        list_tasks.push(data);
        tasks_change();
    }

    function show() {
        setIsmodal(true);
        setTitle('Nova Tarefa');
        setModalData(null);
    }

    return (

        <div className="box-day">

            {hours.map((val, ind) => {
                return (
                    <div className="day-content">
                        <span className="day-hour">{(ind < 10 ? '0' : '') + ind + ' : 00'}</span>
                        <span className="hour-content">

                            {
                                (val.length == 0) ? <span className="hour-not-taref">-</span>
                                    : <span onClick={e => show(ind)} className="hour-is-taref">
                                        {((val.length < 10 ? '0' : '') + val.length + ' ')}
                                        tarefa{val.length > 1 ? 's' : ''}
                                    </span>
                            }


                        </span>
                        <button onClick={e => add()} className="add">+</button>
                    </div>
                )

            })}


            {(isModal) ? <Modal data={modalData} sucess={sucess} title={title} open={setIsmodal} /> : ''}
            {(document.documentElement.style.overflow = (isModal) ? 'hidden' : 'overlay') ? '' : ''}
        </div>


    )

}