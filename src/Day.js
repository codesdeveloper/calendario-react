import { list_tasks } from "./App";

export function Day(props) {

    let hours = [];
    while(hours.length < 24)hours.push([]);

    list_tasks.map((val) => {
        if (val.year == props.current.year && val.month == props.current.month && val.day == props.current.day){ 
            hours[val.hours].push(val);
            return val;
        }
    })


    return (

        <div className="box-day">

            {hours.map((val, ind) => {
                return (
                    <div className="day-content">
                        <span className="day-hour">{(ind < 10 ? '0' : '') + ind + ' : 00'}</span>
                        <span className="hour-content">

                            {
                                (val.length == 0) ? <span className="hour-not-taref">não há tarefas</span>
                                    : <span className="hour-is-taref">
                                        {((val.length < 10 ? '0' : '') + val.length + ' ')}
                                        tarefa{val.length > 1 ? 's' : ''}
                                    </span>
                            }


                        </span>
                        <button className="add">+</button>
                    </div>
                )

            })}

        </div>


    )

}