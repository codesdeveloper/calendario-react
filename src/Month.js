import { week_names, list_tasks } from "./App";

export function Month(props) {

    const days_list = [];
    let coutTask = [];
    while (coutTask.length < 31) coutTask.push(0);

    let dayStart = new Date(props.current.year, props.current.month, 1).getDay();
    let dayCount = new Date(props.current.year, props.current.month + 1, 0).getDate();

    //checando se há tarefas nos dias
    list_tasks.map((val) => {
        if (val.year == props.current.year && val.month == props.current.month) {
            coutTask[val.day - 1] += 1;
        }
    })

    //adicionando espacos vazios
    for (let i = 0; i < dayStart; ++i)days_list.push(<div class="month-day"></div>);

    //adicionando dias do mes
    for (let i = 1; i <= dayCount; ++i)days_list.push(
        <div class="month-day">
            <span className="day-num" onClick={a => { click_day(i) }}>{(i < 10 ? '0' : '') + i}</span>
                {
                    (coutTask[i - 1] == 0) ? <span className="day-not-taref">não há tarefas</span>:

                    (coutTask[i - 1] == 1) ? <span className="day-taref" onClick={a => { click_tasks(i) }}>01 tarefa</span>:
                    (coutTask[i - 1] < 10) ? <span className="day-taref" onClick={a => { click_tasks(i) }}>0{coutTask[i - 1]} tarefas</span>:
                    <span className="day-taref" onClick={a => { click_tasks(i) }}>{coutTask[i - 1]} tarefas</span>

                }
        </div>);

    function click_day(day) {
        props.current.day = day;
        props.setType('day');
        props.animation(true);
    }

    function click_tasks(day) {
        props.current.day = day;
        props.setType('day');
        props.animation(true);
    }

    return (
        <div className="box-month">
            <div className="month-week">
                {week_names.map((i) => {
                    return (<span>{i}</span>)
                })}
            </div>
            <div className="month-content">
                {days_list}
            </div>
        </div>
    )
}