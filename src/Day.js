
export function Day(props) {

    let current = props.current;

    let hours = [];
    while (hours.length < 24) hours.push([]);

    props.tasks.map((val) => {
        if (val.year == current.getFullYear() && val.month == current.getMonth() && val.day == current.getDate()) {
            hours[val.hour].push(val);
            return val;
        }
    })

    function add(hour) {
        let month = current.getMonth() + 1;
        if (month < 10) month = "0" + month

        let day = current.getDate();
        if (day < 10) day = '0' + day;

        props.setModal({
            title: 'Nova Tarefa',
            date: current.getFullYear() + '-' + month + '-' + day,
            time: (hour < 10 ? '0' : '') + hour + ':00',
            sucess: (base) => {
                props.tasks.push(base);
                props.animation(true);
            }
        });
    }

    function show(hour, val) {

        let month = current.getMonth() + 1;
        if (month < 10) month = "0" + month

        let day = current.getDate();
        if (day < 10) day = '0' + day;

        props.setModal({
            title:  day + '-' + month + '-' + current.getFullYear() + " as " + (hour < 10 ? '0' : '') + hour + ':00',
            type: 'list-task',
            values: val
            
        });
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
                                    : <span onClick={e => show(ind, val)} className="hour-is-taref">
                                        {((val.length < 10 ? '0' : '') + val.length + ' ')}
                                        tarefa{val.length > 1 ? 's' : ''}
                                    </span>
                            }
                        </span>
                        <button onClick={e => add(ind)} className="add">+</button>
                    </div>
                )

            })}
        </div>
    )
}